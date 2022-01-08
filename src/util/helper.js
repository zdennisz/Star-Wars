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

export const checkIfMissingProperties = (obj) => {
	let amount = 0;
	for (const value of Object.values(obj)) {
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
	for (const value of Object.values(pilots)) {
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

export const calculateLargestSum = (data) => {
	const result = {};
	for (const [key, value] of Object.entries(data)) {
		result[key] = 0;
		const set = new Set();
		for (const innervalue of Object.values(value)) {
			if (
				!set.has(innervalue.homeworld) &&
				innervalue.population !== "unknown"
			) {
				result[key] += parseInt(innervalue.population);
				set.add(innervalue.homeworld);
			}
		}
	}
	let maxKey = "";
	let maxValue = 0;
	for (const [key, value] of Object.entries(result)) {
		if (maxValue < value) {
			maxKey = key;
			maxValue = value;
		}
	}
	return maxKey;
};

export const getHomePlanetsAndPopulation = (data) => {
	const newArr = [];
	for (const [key, value] of Object.entries(data)) {
		newArr.push({ homeworld: value.homeworld, population: value.population });
	}

	return newArr;
};
export const getPilotsOfHomeWorld = (data) => {
	const newArr = [];
	for (const [key, value] of Object.entries(data)) {
		newArr.push({ pilot: value.name });
	}

	return newArr;
};

export const removeUnusedProperty = (data) => {
	let newObj = {};
	for (const [key, value] of Object.entries(data)) {
		if (Object.getPrototypeOf(value) !== Object.prototype) {
			newObj[key] = value;
		}
	}

	return newObj;
};
