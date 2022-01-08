import React from "react";
import "./App.css";
import TableController from "./components/Table/TableController";
import BarChartController from "./components/BarChart/BarChartController";
function App() {
	return (
		<div className='App'>
			<div className='bar-chart-container'>
				<BarChartController />
			</div>
			<div className='table-container'>
				<TableController />
			</div>
		</div>
	);
}

export default App;
