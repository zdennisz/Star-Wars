import React from "react";
import BarTitle from "../BarTitle/BarTitle";
import BarRectangle from "../BarRectangle/BarRectangle";
import BarAmount from "../BarAmount/BarAmount";
import "./Bar.scss";

const Bar = ({ barAmount, barTitle, barHeight, barIndex }) => {
	return (
		<g className='bar'>
			<BarAmount barIndex={barIndex} barHeight={barHeight} text={barAmount} />
			<BarRectangle barHeight={barHeight} barIndex={barIndex} />
			<BarTitle barIndex={barIndex} barHeight={barHeight} text={barTitle} />
		</g>
	);
};

export default Bar;
