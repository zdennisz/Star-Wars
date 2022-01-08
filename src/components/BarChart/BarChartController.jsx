import React, { useState, useEffect, useCallback, useRef } from "react";
import BarChart from "./BarChart/BarChart";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "./../ErrorMessage/ErrorMessage";
import {
	checkIfMissingProperties,
	removeUnusedProperty,
} from "./../../util/helper";
import { getSinglePageRequest } from "./../../util/api";

const BarChartController = () => {
	const [planetData, setPlanetData] = useState({
		Tatooine: {},
		Alderaan: {},
		Naboo: {},
		Bespin: {},
		Endor: {},
	});
	const [isLoading, setIsLoading] = useState(true);
	const planetPage = useRef({ page: 1, canGoNext: true });
	const [errorMessage, setErrorMessage] = useState(null);

	const retreievePlanetData = useCallback(
		async (page) => {
			try {
				const plantes = await getSinglePageRequest("planets", page);

				if (plantes.err) {
					setErrorMessage(plantes.err);
					return;
				}
				// Itertae over the results and extract the planet name and population
				let result = {};
				plantes.results.forEach((planet) => {
					if (planetData[planet.name]) {
						result = {
							...result,
							[planet.name]:
								planet.population === "unknown"
									? 0
									: parseInt(planet.population),
						};
					}
				});

				// Check if we have more pages to lookup
				if (plantes.next === null) {
					planetPage.current.canGoNext = false;
				} else {
					planetPage.current.page = planetPage.current.page + 1;
				}
				// Update the state with the latest data
				setPlanetData((prevState) => ({
					...prevState,
					...result,
				}));
			} catch (err) {
				console.error(err);
			}
		},
		[planetData, planetPage]
	);

	useEffect(() => {
		// Check if we have more pages to lookup and if we have missing planet data
		if (
			checkIfMissingProperties(planetData) > 0 &&
			planetPage.current.canGoNext
		) {
			retreievePlanetData(planetPage.current.page);
		} else {
			setIsLoading(false);
		}
	}, [planetData, planetPage, retreievePlanetData]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : errorMessage ? (
				<ErrorMessage message={errorMessage} />
			) : (
				<BarChart planetInformation={removeUnusedProperty(planetData)} />
			)}
		</>
	);
};

export default BarChartController;
