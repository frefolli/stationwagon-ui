import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
// import Draggable from "react-draggable";
import Button from "../controls/Button";

interface ModalProps {
	show: boolean;
	accept?: string;
	reject: string;
	doAccept?: () => void;
	doReject: () => void;
	children: Array<JSX.Element> | JSX.Element;
	center?: boolean;
}

/**
 *	@class Modal
 *
 *	Un contenitore adatto per Modali pop-up.
 *	Tra le feature, la possibilita' di passare azioni (accept, reject) in modo semplice e la possibilita' di trascinare il modale (funzionalmente inutile ma molto figo).
 * */
/*<DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title" />*/
export default class Modal extends React.Component<ModalProps> {
	render() {
		return (
			<Dialog
				open={this.props.show}
				onClose={() => this.props.doReject()}
				PaperComponent={Paper}
				aria-labelledby="draggable-dialog-title"
				fullWidth={true}
				maxWidth={"md"}
				className="modale"
				aria-label="Modal"
			>
				<DialogContent>{this.props.children}</DialogContent>
				<DialogActions>
					<Button
						onClick={() => this.props.doReject()}
						text={this.props.reject}
					/>
					{this.props.accept !== undefined ? (
						<Button
							onClick={() => (this.props.doAccept || (() => {}))()}
							text={this.props.accept}
						/>
					) : (
						""
					)}
				</DialogActions>
			</Dialog>
		);
	}
}
