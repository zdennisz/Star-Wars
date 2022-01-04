import React from "react";
import SingleBar from "../SingleBar/SingleBar";
import "./BarChart.css";
import { normalizeData } from "../../../util/helper";
const BarChart = (planetInformation) => {
	// Iterate over all the planets and find the maximum
	const maxValue = planetInformation.reduce((prev, curr) =>
		prev.y > curr.y ? prev.y : curr.y
	);
	// Normalize the data
	const normalizedData = normalizeData(planetInformation, maxValue);

	// Build the Chart
	return (
		<svg
			className='chart'
			width='420'
			height='150'
			aria-labelledby='title desc'
			role='img'
		>
			{normalizedData.map((data) => (
				<SingleBar
					barAmount={data.amount}
					barHeight={data.barHeight}
					barTitle={data.barTitle}
				/>
			))}
		</svg>
	);
};

export default BarChart;
