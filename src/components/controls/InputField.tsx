import { useState } from "react";

interface InputFieldProps {
	type: string;
	name: string;
	placeholder: string;
	icon: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const InputField = ({
	type,
	name,
	placeholder,
	icon,
	value,
	onChange,
	required,
}: InputFieldProps) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	return (
		<div className="input-wrapper">
			<input
				type={type === "password" && isPasswordShown ? "text" : type}
				name={name}
				placeholder={placeholder}
				className="input-field"
				value={value}
				onChange={onChange}
				required={required === true}
			/>
			<i className="material-symbols-rounded">{icon}</i>
			{type === "password" && (
				<i
					onClick={() => setIsPasswordShown((prev) => !prev)}
					className="material-symbols-rounded eye-icon"
				>
					{isPasswordShown ? "visibility" : "visibility_off"}
				</i>
			)}
		</div>
	);
};

export default InputField;
