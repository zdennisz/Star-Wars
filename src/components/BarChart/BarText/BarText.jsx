import React from "react";
import "./BarText.css";
const BarText = ({ xOffset, yOffset, text }) => {
	return (
		<text x={xOffset} y={yOffset} dy='.35em'>
			{text}
		</text>
	);
};

export default BarText;
