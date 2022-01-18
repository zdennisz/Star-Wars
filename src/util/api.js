export const getSinglePageRequest = async (param, page) => {
	try {
		const res = await fetch(
			`https://swapi.py4e.com/api/${param}/?page=${page}`
		);
		return res.json();
	} catch (err) {
		return { err: "Failed to get the data please refresh" };
	}
};

export const getBulkRequest = async (param) => {
	try {
		const response = await getSinglePageRequest(param, 1);
		let result = [];
		const totalData = response.count;
		const totalPages = Math.ceil(totalData / response.results.length);
		const promiseArray = [];
		for (let i = 0; i < totalPages; i++) {
			promiseArray.push(getSinglePageRequest(param, i + 1));
		}
		let resolvedPromises = await Promise.all(promiseArray);
		for (let i = 0; i < resolvedPromises.length; i++) {
			result = [...result, ...resolvedPromises[i].results];
		}

		return result;
	} catch (err) {
		console.error(err);
	}
};

export const getPilotBulkRequest = async (dataObj) => {
	try {
		let result = {};
		const promiseMap = new Map();

		for (const value of Object.values(dataObj)) {
			value.pilots.forEach((pilot) => {
				if (!promiseMap.has(pilot)) {
					promiseMap.set(pilot, getCustomRequest(pilot));
				}
			});
		}
		let resolvedPromises = await Promise.all(Array.from(promiseMap.values()));
		for (let i = 0; i < resolvedPromises.length; i++) {
			result = { ...result, [i]: resolvedPromises[i] };
		}
		return result;
	} catch (err) {
		console.error(err);
	}
};

export const getHomeWorldBulkRequest = async (dataObj) => {
	try {
		const promiseMap = new Map();
		let result = {};
		for (const value of Object.values(dataObj)) {
			if (!promiseMap.has(value.homeworld)) {
				promiseMap.set(value.homeworld, getCustomRequest(value.homeworld));
			}
		}

		let resolvedPromises = await Promise.all(Array.from(promiseMap.values()));
		for (let i = 0; i < resolvedPromises.length; i++) {
			const splittedAnswer = resolvedPromises[i].url.split("/");
			const newKey = splittedAnswer[4] + splittedAnswer[5];
			result = { ...result, [newKey]: resolvedPromises[i] };
		}

		return result;
	} catch (err) {
		console.error(err);
	}
};

export const getCustomRequest = async (param) => {
	try {
		const res = await fetch(param);
		return res.json();
	} catch (err) {
		return { err: "Failed to get the data please refresh" };
	}
};
