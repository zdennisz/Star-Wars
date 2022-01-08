import React from "react";
import Bar from "../Bar/Bar";
import "./BarChart.scss";
import { normalizeData, findMax, findMin } from "../../../util/helper";
const BarChart = ({ planetInformation }) => {
	// Iterate over all the planets and find the maximum and minimum
	const maxValue = findMax(planetInformation);
	const minValue = findMin(planetInformation);

	// Normalize the data
	const normalizedData = normalizeData(planetInformation, maxValue, minValue);

	// Build the Chart
	return (
		<div className='bar-chart-container'>
			<svg
				className='chart'
				width='520'
				height='720'
				aria-labelledby='title desc'
				role='img'
				viewBox='-90 -100 520 720'
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
		</div>
	);
};

export default BarChart;
