import React, { useEffect, useState, useCallback } from "react";
import {
	parsePilotHomeWorldInfo,
	parseHomeWorldPopulation,
	buildPilotsWithHomeWorld,
	mergePilotsWithHomeWorlds,
	mergeVechicleWithPilots,
	calculateLargestSum,
	getHomePlanetsAndPopulation,
	getPilotsOfHomeWorld,
} from "../../util/helper";
import {
	getBulkRequest,
	getPilotBulkRequest,
	getHomeWorldBulkRequest,
} from "../../util/api";
import Table from "./Table";
import Spinner from "../Spinner/Spinner";

const TableController = () => {
	const [vehicles, setVehicles] = useState(null);
	const [tableData, setTableData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const mergeAllInformation = useCallback((vechiles, pilots, homeWorlds) => {
		const mergedPlanetsWithPilots = mergePilotsWithHomeWorlds(
			pilots,
			homeWorlds
		);

		setVehicles(() => {
			return mergeVechicleWithPilots(vechiles, mergedPlanetsWithPilots);
		});
	}, []);

	const getHomeWorldData = useCallback(
		async (pilots, vehicleData) => {
			try {
				const homeWorlds = await getHomeWorldBulkRequest(pilots);

				const homeWorldsPopulation = parseHomeWorldPopulation(homeWorlds);

				const pilotsWithPlanets = buildPilotsWithHomeWorld(pilots);
				// Once we have the vehicles ,pilots & homeworlds we merge all the data
				mergeAllInformation(
					vehicleData,
					pilotsWithPlanets,
					homeWorldsPopulation
				);
			} catch (err) {
				console.error(err);
			}
		},
		[mergeAllInformation]
	);
	const getPilots = useCallback(
		async (vehicleData) => {
			try {
				const pilots = await getPilotBulkRequest(vehicleData);

				const formatedPilotsGetRequest = parsePilotHomeWorldInfo(pilots);
				// Once we have the pilots we go for the homeworlds
				getHomeWorldData(formatedPilotsGetRequest, vehicleData);
			} catch (err) {
				console.error(err);
			}
		},
		[getHomeWorldData]
	);

	const getVehicleData = useCallback(async () => {
		try {
			const response = await getBulkRequest("vehicles");

			const filteredVechicles = response.reduce((retObj, vehicle) => {
				if (vehicle.pilots.length > 0) {
					retObj[vehicle.name] = { pilots: vehicle.pilots };
				}
				return retObj;
			}, {});

			// Once we have the vehicles we get all the pilots
			getPilots(filteredVechicles);
		} catch (err) {
			console.error(err);
		}
	}, [getPilots]);

	useEffect(() => {
		// At first we get the vehicles data
		getVehicleData();
	}, [getVehicleData]);

	useEffect(() => {
		if (vehicles) {
			// Go over all the vehicles and calculate which one has the pilots with the highest population of the homeworld
			const largestSumVechicle = calculateLargestSum(vehicles);

			// Get the homeplanet and the population of the pilots with the highest population
			const homePlanetAndPop = getHomePlanetsAndPopulation(
				vehicles[largestSumVechicle]
			);
			// Get the pilots names
			const pilots = getPilotsOfHomeWorld(vehicles[largestSumVechicle]);

			setTableData({
				vehicleName: largestSumVechicle,
				homeworld: homePlanetAndPop,
				pilots: pilots,
			});
			setIsLoading(false);
		}
	}, [vehicles]);

	return <>{isLoading ? <Spinner /> : <Table tableData={tableData} />}</>;
};

export default TableController;
