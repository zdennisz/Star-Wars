import React, { useEffect, useState, useCallback } from "react";
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
import Table from "./Table";
const TableController = () => {
	const [vehicles, setVehicles] = useState(null);
	const [tableData, setTableData] = useState(null);

	const getPilots = useCallback(async (data) => {
		try {
			const pilots = await getPilotBulkRequest(data);

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

			setVehicles(() => {
				return mergeVechicleWithPilots(data, mergedPlanetsWithPilots);
			});
		} catch (err) {
			console.error(err);
		}
	}, []);

	const getVehicleData = useCallback(async () => {
		try {
			const response = await getBulkRequest("vehicles");
			const filteredData = {};

			response.forEach((vehicle) => {
				if (vehicle.pilots.length > 0) {
					filteredData[vehicle.name] = { pilots: vehicle.pilots };
				}
			});
			getPilots(filteredData);
		} catch (err) {
			console.error(err);
		}
	}, [getPilots]);

	useEffect(() => {
		getVehicleData();
	}, [getVehicleData]);

	useEffect(() => {
		console.log("vehicles", vehicles);
		if (vehicles) {
		}
	}, [vehicles]);

	return <Table tableData={"nak nak"} />;
};

export default TableController;
