export const getRequest = async (param, page) => {
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
		const response = await getRequest(param, 1);
		let result = [];
		const totalData = response.count;
		const totalPages = Math.ceil(totalData / response.results.length);
		const promiseArray = [];
		for (let i = 0; i < totalPages; i++) {
			promiseArray.push(getRequest(param, i + 1));
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
		const promiseArray = [];
		let result = {};

		for (const [key, value] of Object.entries(dataObj)) {
			value.pilots.forEach((pilot) => {
				promiseArray.push(getCustomRequest(pilot));
			});
		}

		let resolvedPromises = await Promise.all(promiseArray);
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
		const promiseArray = [];
		let result = {};
		for (const [key, value] of Object.entries(dataObj)) {
			promiseArray.push(getCustomRequest(value.homeworld));
		}

		let resolvedPromises = await Promise.all(promiseArray);
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
