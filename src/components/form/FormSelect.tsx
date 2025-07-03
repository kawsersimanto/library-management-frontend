import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps<
  T extends FieldValues,
  K extends FieldPath<T> = FieldPath<T>
> = {
  control: Control<T>;
  name: K;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  valueTransform?: (value: string) => T[K];
};

const FormSelect = <T extends FieldValues, K extends FieldPath<T>>({
  control,
  name,
  label,
  placeholder,
  options,
  valueTransform,
}: FormSelectProps<T, K>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          onValueChange={(value) => {
            const transformed = valueTransform ? valueTransform(value) : value;
            field.onChange(transformed);
          }}
          defaultValue={field.value?.toString()}
        >
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormSelect;
