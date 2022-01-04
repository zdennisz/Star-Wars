import { MAX_PX_VALUE } from "./consts";

export const normalizeData = (values, maxValue, minValue) => {
	return values.map((value) => {
		return {
			name: value.name,
			pop:
				(MAX_PX_VALUE - 0) * ((value.pop - minValue) / (maxValue - minValue)),
		};
	});
	//return values.map((value) => (MAX_PX_VALUE * value.pop) / maxValue);
};

export const findMax = (arrOfObjects) => {
	const allValues = arrOfObjects.map((value) => value.pop);
	return Math.max(...allValues);
};

export const findMin = (arrOfObjects) => {
	const allValues = arrOfObjects.map((value) => value.pop);
	return Math.min(...allValues);
};
