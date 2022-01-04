import React from "react";
import "./Bar.css";
const Bar = ({ barHeight, y, barIndex }) => {
	return (
		<rect
			width='40'
			height={barHeight}
			x={barIndex * 60}
			y={350 - barHeight}
		></rect>
	);
};

export default Bar;
