import React from "react";
import TableRow from "./TableRow/TableRow";
import { HOMEWORLD } from "../../util/consts";
import "./Table.scss";
const Table = ({ tableData }) => {
	if (!tableData) {
		return null;
	}
	return (
		<table className='table'>
			<tbody className='table-container'>
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
