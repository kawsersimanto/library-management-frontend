import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: FormInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage className="mb-2" />
      </FormItem>
    )}
  />
);

export default FormInput;
