import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormInput({
  label,
  name,
  register,
  errors,
  type = "text",
}: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        {...register(name)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        type={type}
        className="bg-transparent placeholder:text-slate-400"
      />
      {errors[name] && (
        <span className="text-red-600 text-xs">{errors[name]?.message}</span>
      )}
    </div>
  );
}
