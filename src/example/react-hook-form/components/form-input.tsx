import { TextField, BaseTextFieldProps } from "@mui/material";
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
} from "react-hook-form";
import React from "react";

interface FormInputProps<T extends FieldValues> {
  type?: BaseTextFieldProps["type"];
  fontSize?: string;
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  fontSize,
  defaultValue,
  label,
  width,
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
      sx={{
        width: { width },
        fontSize: { fontSize },
      }}
      inputProps={{
        style: { fontSize: fontSize },
      }}
      InputLabelProps={{ style: { fontSize: fontSize } }}
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
