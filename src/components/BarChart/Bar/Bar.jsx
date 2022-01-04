import React from "react";
import "./Bar.css";
const Bar = (barHeight, y) => {
	return <rect width={barHeight} height='19' y={y}></rect>;
};

export default Bar;
