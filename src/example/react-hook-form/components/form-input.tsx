import { TextField, BaseTextFieldProps } from "@mui/material";
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  type?: BaseTextFieldProps["type"];
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  label,
  type = "text",
}: FormInputProps<T>) => {
  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      label={label}
      error={!!error}
      helperText={error?.message}
      type={type}
      defaultValue={defaultValue}
      inputRef={ref}
    />
  );
};

export default FormInput;
