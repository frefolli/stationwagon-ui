import { Chip, Paper } from "@mui/material";

interface ChipsProps {
	value: Array<string>;
	onChange: (event: { target: { value: Array<string> } }) => void;
}

/**
 *	@class Chips
 *
 *	Un contenitore per "Chip", overo etichette.
 * */
const Chips = (props: ChipsProps) => {
	const handleDelete = (labelToDelete: string) => {
		props.onChange({
			target: { value: props.value.filter((label) => label !== labelToDelete) },
		});
	};

	return (
		<Paper
			elevation={3}
			sx={{
				// width: "300px",
				height: "100%",
				overflowY: "auto",
				padding: 2,
				display: "flex",
				flexWrap: "wrap",
				gap: 1,
			}}
		>
			{props.value.map((label) => (
				<Chip
					key={label}
					label={label}
					onDelete={() => handleDelete(label)}
					sx={{ cursor: "pointer" }}
				/>
			))}
		</Paper>
	);
};

export default Chips;
