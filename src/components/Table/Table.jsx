import React from "react";
import TableRow from "./TableRow/TableRow";
import { HOMEWORLD } from "../../util/consts";
const Table = ({ tableData }) => {
	console.log("tabledata", tableData);
	if (!tableData) {
		return null;
	}
	return (
		<table>
			<tbody>
				<TableRow
					rowName={"Vehicle name with the largest sum"}
					rowInfo={tableData.vehicleName}
				/>
				<TableRow
					rowName={"Related home planets and their respective population"}
					rowInfo={tableData.homeworld}
					type={HOMEWORLD}
				/>
				<TableRow rowName={"Related pilot names"} rowInfo={tableData.pilots} />
			</tbody>
		</table>
	);
};

export default Table;
