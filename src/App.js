import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart/BarChart";
import {
	getPlanetData,
	convertArrToObj,
	checkIfMissingProperties,
} from "./util/helper";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
function App() {
	const [planetData, setPlanetData] = useState({
		Tatooine: {},
		Alderaan: {},
		Naboo: {},
		Bespin: {},
		Endor: {},
	});

	const [planetPage, setPlanetPage] = useState(1);
	const [errorMessage, setErrorMessage] = useState();

	const retreievePlanetData = async (page) => {
		try {
			const plantes = await getPlanetData("planets", page);

			if (plantes.err) {
				console.log("err", plantes.err);
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
		<div className='App'>
			<div className='bar-chart-container'>
				{errorMessage ? (
					<ErrorMessage message={errorMessage} />
				) : (
					<BarChart planetInformation={planetData} />
				)}
			</div>
			<div className='table-container'></div>
		</div>
	);
}

export default App;
