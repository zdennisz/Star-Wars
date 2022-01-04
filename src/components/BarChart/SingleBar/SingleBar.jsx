import React from "react";
import BarText from "../BarText/BarText";
import Bar from "../Bar/Bar";
import BarAmount from "../BarAmount/BarAmount";
import "./SingleBar.css";
const SingleBar = ({
	barAmount,
	barTitle,
	barHeight,
	// xOffset,
	// yOffset,
	barCoorY,
	barIndex,
}) => {
	return (
		<g className='bar'>
			<BarAmount barIndex={barIndex} barHeight={barHeight} text={barAmount} />
			<Bar barHeight={barHeight} y={barCoorY} barIndex={barIndex} />
			<BarText barIndex={barIndex} barHeight={barHeight} text={barTitle} />
		</g>
	);
};

export default SingleBar;
