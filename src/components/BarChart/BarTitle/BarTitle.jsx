import React from "react";
import "./BarTitle.scss";
const BarTitle = ({ barIndex, barHeight, text }) => {
	return (
		<text className='text' x={barIndex * 70 + 25} y={380} dy='.25em'>
			{text}
		</text>
	);
};

export default BarTitle;
