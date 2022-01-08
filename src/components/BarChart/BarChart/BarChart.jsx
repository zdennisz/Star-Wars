import React from "react";
import Bar from "../Bar/Bar";
import "./BarChart.css";
import { normalizeData, findMax, findMin } from "../../../util/helper";
const BarChart = ({ planetInformation }) => {
	// Iterate over all the planets and find the maximum and minimum
	const maxValue = findMax(planetInformation);
	const minValue = findMin(planetInformation);

	// Normalize the data
	const normalizedData = normalizeData(planetInformation, maxValue, minValue);

	// Build the Chart
	return (
		<svg
			className='chart'
			width='520'
			height='550'
			aria-labelledby='title desc'
			role='img'
		>
			{normalizedData.map((data, index) => (
				<Bar
					barAmount={data.pop}
					barTitle={data.name}
					key={index}
					barHeight={data.normalized}
					barIndex={index}
				/>
			))}
		</svg>
	);
};

export default BarChart;
