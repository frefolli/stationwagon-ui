import React from "react";
import { Button as ReactButton } from "@mui/material";
import { Box } from "@mui/system";

interface ButtonProps {
	center?: boolean;
	onClick?: () => void;
	disable?: boolean;
	text: string;
	startIcon?: undefined;
	endIcon?: undefined;
	variant?: "text" | "outlined" | "contained";
	sx?: object;
}

class Button extends React.Component<ButtonProps> {
	render() {
		const button = (
			<ReactButton
				style={{ margin: 10, ...this.props.sx }}
				variant={this.props.variant || "contained"}
				color="primary"
				onClick={() => {
					if (this.props.onClick) {
						this.props.onClick();
					}
				}}
				startIcon={this.props.startIcon}
				endIcon={this.props.endIcon}
				disabled={this.props.disable ?? false}
			>
				{this.props.text}
			</ReactButton>
		);
		if (this.props.center) {
			return <Box textAlign="center">{button}</Box>;
		}
		return button;
	}
}

export default Button;
