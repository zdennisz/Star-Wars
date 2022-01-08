import React, { useState, useEffect } from "react";
import ErrorMessage from "./../ErrorMessage/ErrorMessage";
import { checkIfMissingProperties, convertArrToObj } from "./../../util/helper";
import { getRequest } from "./../../util/api";
import BarChart from "./BarChart/BarChart";
const BarChartController = () => {
	const [planetData, setPlanetData] = useState({
		Tatooine: {},
		Alderaan: {},
		Naboo: {},
		Bespin: {},
		Endor: {},
	});

	const [planetPage, setPlanetPage] = useState(1);
	const [errorMessage, setErrorMessage] = useState(null);

	const retreievePlanetData = async (page) => {
		try {
			const plantes = await getRequest("planets", page);

			if (plantes.err) {
				setErrorMessage(plantes.err);
				return;
			}
			const result = plantes.results.map((planet) => {
				if (planetData[planet.name]) {
					return { [planet.name]: parseInt(planet.population) };
				}
			});

			const formattedResult = convertArrToObj(result);

			setPlanetData((prevState) => ({
				...prevState,
				...formattedResult,
			}));

			setPlanetPage((state) => ({
				page: state + 1,
			}));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		retreievePlanetData(planetPage);
	}, []);

	useEffect(() => {
		if (checkIfMissingProperties(planetData) > 0) {
			retreievePlanetData(planetPage);
		}
	}, [planetPage]);

	return (
		<>
			{errorMessage ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<BarChart planetInformation={planetData} />
			)}
		</>
	);
};

export default BarChartController;
