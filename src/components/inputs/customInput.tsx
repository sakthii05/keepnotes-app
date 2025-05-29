import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
  FieldErrors,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode, useState } from "react";

interface CustomInputsProps {
  label: string;
  name: keyof FieldValues;
  errors: FieldErrors<FieldValues>;
  isrequired?: boolean;
  rules?: RegisterOptions<FieldValues>;
  control: Control<any>;
  disabled?: boolean;
  type?: "text" | "password" | "number";
  autoComplete?: string;
  afterChange?: (val: string) => void;
  startContent?: ReactNode;
  placeholder: string;
  size?: "lg" | "sm" | "md";
}

const CustomInput = (props: CustomInputsProps) => {
  const {
    label,
    name,
    isrequired,
    rules,
    errors,
    control,
    disabled,
    afterChange,
    placeholder,
  } = props;

  return (
    <div className="relative">
      <Controller
        name={name}
        defaultValue={""}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="flex flex-col gap-1 font-mono">
            {label && <label className="font-medium">{label}</label>}
            <input
              value={field.value}
              onChange={field.onChange}
              onBlur={(e) => {
                field.onChange(e.target.value.trim());
                field.onBlur();
              }}
              className="bg-white border-foreground border-2 text-foreground rounded-md px-2 py-1"
              disabled={disabled}
              placeholder={placeholder}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              render={(field) => (
                <div className="text-red-400  text-sm ">{field.message}</div>
              )}
            />
          </div>
         )}
       /> 
    </div>
  );
};
export default CustomInput;
