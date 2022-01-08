import React from "react";
import "./BarRectangle.scss";
const BarRectangle = ({ barHeight, barIndex }) => {
	console.log("barIndex", barIndex);
	return (
		<rect
			width='40'
			height={barHeight}
			x={barIndex * 60}
			y={350 - barHeight}
			className={`barRectangle-${barIndex}`}
		></rect>
	);
};

export default BarRectangle;
