import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart/BarChart";
import {
	getPlanetData,
	convertArrToObj,
	checkIfMissingProperties,
} from "./util/helper";
function App() {
	const [planetData, setPlanetData] = useState({
		Tatooine: {},
		Alderaan: {},
		Naboo: {},
		Bespin: {},
		Endor: {},
	});

	const [planetPage, setPlanetPage] = useState(1);

	const retreievePlanetData = async (page) => {
		try {
			const plantes = await getPlanetData("planets", page);

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
		retreievePlanetData(planetPage.page);
	}, []);

	useEffect(() => {
		if (checkIfMissingProperties(planetData) > 0) {
			retreievePlanetData(planetPage);
		}
	}, [planetPage]);

	return (
		<div className='App'>
			<BarChart planetInformation={planetData} />
		</div>
	);
}

export default App;
