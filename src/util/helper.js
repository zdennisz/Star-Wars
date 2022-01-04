import { MAX_PX_VALUE } from "./consts";

export const normalizeData = (values, maxValue) => {
	return values.map((value) => {
		return (MAX_PX_VALUE * value) / maxValue;
	});
};
