import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectorProps {
	options: Array<{ value: string; name: string }>;
	label?: string;
	value: string;
	optional?: boolean;
	onChange: (event: { target: { value: string } }) => void;
	error?: boolean;
	helperText?: string;
	style?: React.CSSProperties;
}

function Selector(props: SelectorProps) {
	const options = props.options.map((option) => {
		return (
			<MenuItem value={option.value} key={option.name}>
				{option.name}
			</MenuItem>
		);
	});
	if (props.optional) {
		options.push(
			<MenuItem value={""} key={""}>
				{""}
			</MenuItem>
		);
	}
	return (
		<FormControl sx={{ textAlign: "center" }} fullWidth>
			<InputLabel id={`selector-${props.label}`}>{props.label}</InputLabel>
			<Select
				data-testid={props.label}
				labelId={`selector-${props.label}`}
				label={props.label}
				value={props.value}
				onChange={props.onChange}
				error={props.error}
				style={props.style}
			>
				{options}
			</Select>
		</FormControl>
	);
}

export default Selector;
