import React, { useEffect, useState, useRef } from "react";
import {
	getPilotInfo,
	getHomeWorldPop,
	convertPilotHomeWorld,
	mergePilotsWithHomeWorlds,
	mergeVechicleWithPilots,
} from "../../util/helper";
import {
	getBulkRequest,
	getPilotBulkRequest,
	getHomeWorldBulkRequest,
} from "../../util/api";
const Table = () => {
	const [vehicles, setVehicles] = useState(null);
	const firstInit = useRef(true);

	useEffect(() => {
		getVehicleData();
	}, []);

	useEffect(() => {
		if (vehicles && firstInit.current) {
			getPilots();
			firstInit.current = false;
		}
	}, [vehicles]);

	const getVehicleData = async () => {
		try {
			const response = await getBulkRequest("vehicles");
			const filteredData = {};

			response.forEach((vehicle) => {
				if (vehicle.pilots.length > 0) {
					filteredData[vehicle.name] = { pilots: vehicle.pilots };
				}
			});
			setVehicles(filteredData);
		} catch (err) {
			console.error(err);
		}
	};

	const getPilots = async () => {
		try {
			const pilots = await getPilotBulkRequest(vehicles);

			const formatedPilotsGetRequest = getPilotInfo(pilots);

			const homeWorlds = await getHomeWorldBulkRequest(
				formatedPilotsGetRequest
			);

			const homeWorldsPopulation = getHomeWorldPop(homeWorlds);

			const pilotsWithPlanetId = convertPilotHomeWorld(
				formatedPilotsGetRequest
			);

			const mergedPlanetsWithPilots = mergePilotsWithHomeWorlds(
				pilotsWithPlanetId,
				homeWorldsPopulation
			);

			setVehicles((prevState) => {
				return mergeVechicleWithPilots(prevState, mergedPlanetsWithPilots);
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		console.log("vehicles", vehicles);
	}, [vehicles]);

	return <div> </div>;
};

export default Table;
