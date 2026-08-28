import { Box } from "@mui/system";
import * as React from "react";

interface TableProps {
	children: Array<JSX.Element> | JSX.Element;
	width: number;
}

/**
 * @class Table
 *
 *	Un contenitore pensato per fare da sfondo a tabelle o componenti che richiedono uno sfondo bianco con bordo in rilievo e un ambiente centrato con margini.
 *	@deprecated Sarebbe meglio usare direttamente ambienti come Card di React MUI
 * */
export default class Table extends React.Component<TableProps> {
	render() {
		return (
			<Box
				sx={{
					width: this.props.width ?? "90%",
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: "30px",
					marginBottom: "30px",
					border: "5px",
					padding: "1.5%",
				}}
			>
				{this.props.children}
			</Box>
		);
	}
}
