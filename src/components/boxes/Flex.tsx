import { Box, SxProps } from "@mui/material";
import * as React from "react";

interface FlexProps {
	children: Array<React.ReactNode> | React.ReactNode;
	columns?: string;
	gap?: string;
	center?: boolean;
	sx?: SxProps;
}

/**
 *	@class Flex
 *
 * Un elemento simile a un Box che si comporta come una Grid per le pagine larghe e come un Flex per le pagine sottili.
 * La Grid è impostata di default su un sistema a due colonne. Questo può essere sovrascritto tramite il parametro `columns` che dovrebbe contenere le percentuali consumate da tutte le colonne desiderate.
 * */
export default class Flex extends React.Component<FlexProps> {
	render() {
		return (
			<Box
				sx={{
					display: { md: "grid", sx: "flex" },
					gridTemplateColumns: this.props.columns || "50% 50%",
					gap: this.props.gap || "30px",
					justifyContent: this.props.center ? "center" : "",
					...this.props.sx,
				}}
			>
				{this.props.children}
			</Box>
		);
	}
}
