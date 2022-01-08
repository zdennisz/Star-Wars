import React from "react";
import TableController from "./components/Table/TableController";
import BarChartController from "./components/BarChart/BarChartController";
import "./App.scss";

function App() {
	return (
		<div className='App'>
			<TableController />
			<BarChartController />
		</div>
	);
}

export default App;
