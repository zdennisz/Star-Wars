import React from "react";
import "./TableRow.scss";
import { HOMEWORLD } from "./../../../util/consts";
const TableRow = ({ rowName, rowInfo, type }) => {
	return (
		<tr>
			<th className='table-row'>{rowName}</th>
			<td className='table-row'>
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
