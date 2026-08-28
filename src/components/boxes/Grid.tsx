import { Box, SxProps } from "@mui/material";
import * as React from "react";

interface GridProps {
	children: Array<JSX.Element> | JSX.Element;
	columns?: string;
	marginLeft?: string;
	marginRight?: string;
	marginTop?: string;
	marginBottom?: string;
	center?: boolean;
	sx?: SxProps;
}

/**
 *	@class Grid
 *
 *	Un contenitore Box-like che si comporta come una griglia centrata tramite i margini.
 * */
export default class Grid extends React.Component<GridProps> {
	render() {
		return (
			<Box
				sx={{
					marginLeft: this.props.marginLeft || "5%",
					marginRight: this.props.marginRight || "5%",
					marginTop: this.props.marginTop || "2.5%",
					marginBottom: this.props.marginBottom || "2.5%",
					display: "grid",
					gap: "30px",
					gridTemplateColumns:
						this.props.columns || (!this.props.center ? "100%" : ""),
					justifyContent: this.props.center ? "center" : "",
					...this.props.sx,
				}}
			>
				{this.props.children}
			</Box>
		);
	}
}
