import {
	FormControl,
	FormControlLabel,
	InputLabel,
	Radio as MUIRadio,
	RadioGroup,
} from "@mui/material";

interface RadioProps<T> {
	options: Array<{ value: T; name: string }>;
	label?: string;
	value: T;
	onChange: (event: { target: { value: string } }) => void;
	testId?: string;
}

function Radio<T>(props: RadioProps<T>) {
	const options = props.options.map((option) => {
		return (
			<FormControlLabel
				value={option.value}
				control={<MUIRadio />}
				label={option.name}
				key={option.value as string}
			/>
		);
	});
	return (
		<FormControl sx={{ textAlign: "center" }} fullWidth>
			<InputLabel id={props.testId}>{props.label}</InputLabel>
			<RadioGroup value={props.value} onChange={props.onChange}>
				{options}
			</RadioGroup>
		</FormControl>
	);
}

export default Radio;
