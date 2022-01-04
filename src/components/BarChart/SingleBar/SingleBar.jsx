import React from "react";
import BarText from "../BarText/BarText";
import Bar from "../Bar/Bar";
import "./SingleBar.css";
const SingleBar = ({
	// barAmount,
	// barTitle,
	barHeight,
	// xOffset,
	// yOffset,
	barCoorY,
	barIndex,
}) => {
	return (
		<g className='bar'>
			{/* <BarText xOffset={xOffset} yOffset={yOffset} text={barTitle} /> */}
			<Bar barHeight={barHeight} y={barCoorY} barIndex={barIndex} />
			{/* <BarText xOffset={xOffset + 30} yOffset={yOffset + 30} text={barAmount} /> */}
		</g>
	);
};

export default SingleBar;
