import { MAX_PX_VALUE } from "./consts";

export const normalizeData = (values, maxValue, minValue) => {
	const resultArr = [];
	for (const [key, value] of Object.entries(values)) {
		resultArr.push({
			name: key,
			pop: value,
			normalized:
				(MAX_PX_VALUE - 0) * ((value - minValue) / (maxValue - minValue)),
		});
	}
	return resultArr;
};

export const findMax = (obj) => {
	const allValues = Object.values(obj);

	return Math.max(...allValues);
};

export const findMin = (obj) => {
	const allValues = Object.values(obj);
	return Math.min(...allValues);
};

export const getPlanetData = async (param, page) => {
	try {
		const res = await fetch(`https://swapi.dev/api/${param}/?page=${page}`);
		return res.json();
	} catch (err) {
		return { err: "Failed to get the data please refresh" };
	}
};

export const convertArrToObj = (arr) => {
	let newObj = {};

	for (var i = 0; i < arr.length; ++i) {
		if (arr[i]) {
			for (const [key, value] of Object.entries(arr[i])) newObj[key] = value;
		}
	}

	return newObj;
};

export const checkIfMissingProperties = (obj) => {
	let amount = 0;
	for (const [key, value] of Object.entries(obj)) {
		if (Object.getPrototypeOf(value) === Object.prototype) {
			amount++;
		}
	}
	return amount;
};
