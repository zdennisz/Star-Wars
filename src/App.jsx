import React from "react";
import "./App.scss";
import TableController from "./components/Table/TableController";
import BarChartController from "./components/BarChart/BarChartController";
function App() {
	return (
		<div className='App'>
			<TableController />
			<BarChartController />
		</div>
	);
}

export default App;
