import React from "react";
import "./BarTitle.css";
const BarTitle = ({ barIndex, barHeight, text }) => {
	return (
		<text className='text' x={barIndex * 60 + 20} y={380} dy='.25em'>
			{text}
		</text>
	);
};

export default BarTitle;
