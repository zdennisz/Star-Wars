import React from "react";
import "./BarText.css";
const BarText = ({ barIndex, barHeight, text }) => {
	return (
		<text className='text' x={barIndex * 34 + 10} y={380} dy='.25em'>
			{text}
		</text>
	);
};

export default BarText;
