import React from "react";
import "./BarRectangle.css";
const BarRectangle = ({ barHeight, barIndex }) => {
	return (
		<rect
			width='40'
			height={barHeight}
			x={barIndex * 60}
			y={350 - barHeight}
		></rect>
	);
};

export default BarRectangle;
