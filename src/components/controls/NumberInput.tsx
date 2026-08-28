import { SxProps, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const validateInput = (newValue: string): number | null => {
	if (newValue === "") {
		return 0;
	}
	if (newValue.endsWith(".")) {
		newValue += "0";
	}
	const parsedValue = Number.parseFloat(newValue);
	if (!isNaN(parsedValue)) return parsedValue;
	return null;
};

interface NumberInputProps {
	onChange: (event: { target: { value: number } }) => void;
	sx?: SxProps;
	value: number;
	label: string;
	placeholder?: string;
}

/**
 * @class NumberInput
 *
 * Questo componente fornisce un campo di input per specificare una quantità, con convalida per garantire numeri non negativi.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.value - Il valore corrente del campo di input.
 * @param {function} props.onChange - Una funzione di callback per gestire le modifiche nel valore di input.
 * @param {string} props.label - L'etichetta per il campo di input.
 * @param {Object} [props.style] - Stile CSS facoltativo da applicare al campo di input.
 *
 * @returns {JSX.Element} Il componente NumberInput per specificare un numero. *
 * @example
 * // Esempio di utilizzo del componente NumberInput
 * <NumberInput value={quantity} onChange={handleNumberChange} label="Number" sx={{ width: "100%" }} />
 */

const NumberInput = (props: NumberInputProps) => {
	const [stringValue, setStringValue] = useState("");

	useEffect(() => {
		if (!stringValue.endsWith(".")) {
			const parsedValue = validateInput(stringValue);
			if (parsedValue !== null) {
				const asStringValue = parsedValue.toString();
				if (asStringValue !== stringValue) {
					setStringValue(asStringValue);
				}
				props.onChange({ target: { value: parsedValue } });
			} else {
				setStringValue("0");
				props.onChange({ target: { value: 0.0 } });
			}
		}
	}, [stringValue]);

	const theStile = props.sx || { width: "100%", textAlign: "center" };

	return (
		<TextField
			sx={theStile}
			type="text"
			value={stringValue}
			onChange={(event) => setStringValue(event.target.value)}
			onBlur={(event) => setStringValue(event.target.value)}
			label={props.label}
			placeholder={props.placeholder}
		/>
	);
};

export default NumberInput;
