import React from "react";
import "./BarAmount.scss";

const BarAmount = ({ barIndex, text, barHeight }) => {
	return (
		<text
			className='text'
			x={barIndex * 70 + 25}
			y={350 - barHeight - 20}
			dy='.15em'
		>
			{text}
		</text>
	);
};

export default BarAmount;
