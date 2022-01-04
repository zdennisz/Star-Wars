import React from "react";
import SingleBar from "../SingleBar/SingleBar";
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
			width='420'
			height='550'
			aria-labelledby='title desc'
			role='img'
		>
			{normalizedData.map((data, index) => (
				<SingleBar
					barAmount={data.pop}
					barTitle={data.name}
					key={index}
					barHeight={data.normalized}
					barCoorY={index === 0 ? 0 : 20 * index + 20}
					barIndex={index}
				/>
			))}
		</svg>
	);
};

export default BarChart;
