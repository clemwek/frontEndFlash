import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField = ({
    name,
    placeholder,
    label,
    type = "text",
    register,
    error,
    validation,
    value,
    disabled,
}: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                className={cn("form-input", {
                    "opacity-50 cursor-not-allowed": disabled,
                })}
                {...register(name, validation)}
                value={value}
                disabled={disabled}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
};

export default InputField;
