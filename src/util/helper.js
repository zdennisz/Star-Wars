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

export const getAllVechicles = (allVechicles) => {
	if (allVechicles) {
		const result = allVechicles.map((vehicle) => {
			return { name: vehicle.name, pilots: vehicle.pilots };
		});
		return result;
	}
	return [];
};

export const getPilotInfo = (pilots) => {
	const newObj = {};
	for (const [key, value] of Object.entries(pilots)) {
		const splittedAnswer = value.url.split("/");
		const newKey = splittedAnswer[4] + splittedAnswer[5];
		newObj[newKey] = { name: value.name, homeworld: value.homeworld };
	}
	return newObj;
};

export const getHomeWorldPop = (homeWorlds) => {
	const newObj = {};
	for (const [key, value] of Object.entries(homeWorlds)) {
		newObj[key] = { name: value.name, population: value.population };
	}
	return newObj;
};

export const convertPilotHomeWorld = (pilots) => {
	const newObj = {};
	for (const [key, value] of Object.entries(pilots)) {
		const splittedAnswer = value.homeworld.split("/");
		const newKey = splittedAnswer[4] + splittedAnswer[5];
		newObj[key] = { name: value.name, homeworld: newKey };
	}

	return newObj;
};

export const mergePilotsWithHomeWorlds = (pilots, homeWorlds) => {
	const newObj = {};

	for (const [key, value] of Object.entries(pilots)) {
		newObj[key] = {
			name: value.name,
			homeworld: homeWorlds[value.homeworld].name,
			population: homeWorlds[value.homeworld].population,
		};
	}
	return newObj;
};
export const mergeVechicleWithPilots = (prevState, pilots) => {
	const newObj = {};
	for (const [key, value] of Object.entries(prevState)) {
		value.pilots.forEach((pilot) => {
			const splittedAnswer = pilot.split("/");
			const newKey = splittedAnswer[4] + splittedAnswer[5];
			newObj[key] = { ...newObj[key], [newKey]: pilots[newKey] };
		});
	}

	return newObj;
};
