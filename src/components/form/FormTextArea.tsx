import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type FormTextAreaProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
};

const FormTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
}: FormTextAreaProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            placeholder={placeholder || ""}
            className={className}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormTextArea;
