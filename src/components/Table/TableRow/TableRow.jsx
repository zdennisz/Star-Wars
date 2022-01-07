import React from "react";
import "./TableRow.css";
import { HOMEWORLD } from "./../../../util/consts";
const TableRow = ({ rowName, rowInfo, type }) => {
	return (
		<tr>
			<th>{rowName}</th>
			<td>
				{Array.isArray(rowInfo)
					? rowInfo.map((rowText) => {
							if (type === HOMEWORLD) {
								return rowText.homeworld + " " + rowText.population;
							} else {
								return rowText.pilot;
							}
					  })
					: rowInfo}
			</td>
		</tr>
	);
};

export default TableRow;
