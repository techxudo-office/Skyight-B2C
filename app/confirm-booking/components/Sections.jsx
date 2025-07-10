import Dropdown from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { City } from "country-state-city";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";
import { form_constants } from "./FormConstants";
import PhoneInput from "@/components/ui/PhoneInput";

export function TravellerSection({
  travellers,
  travellerDefs,
  cityOpts,
  control,
  register,
  errors,
}) {
  return (
    <>
      {travellers.map((_, i) => (
        <div key={i} className="mb-8">
          <h4 className="mb-4 text-lg font-semibold">
            {travellerDefs[i].label}
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {form_constants[0].fields.map((f) => {
              const path = `travellers.${i}.${f.name}`;
              return (
                <FieldRenderer
                  key={path}
                  name={path}
                  field={f}
                  control={control}
                  register={register}
                  options={
                    f.name === "city"
                      ? cityOpts[i].map((v) => ({ label: v, value: v }))
                      : (f.options ?? []).map((o) =>
                          typeof o === "string" ? { label: o, value: o } : o
                        )
                  }
                  error={errors.travellers?.[i]?.[f.name]?.message}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export function StepFields({ fields, register, control, errors }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {fields.map((f) => (
        <FieldRenderer
          key={f.name}
          name={f.name}
          field={f}
          control={control}
          register={register}
          options={(f.options ?? []).map((o) =>
            typeof o === "string" ? { label: o, value: o } : o
          )}
          error={errors[f.name]?.message}
        />
      ))}
    </div>
  );
}

export function FieldRenderer({
  name,
  field,
  control,
  register,
  options,
  error,
}) {
  const IconComp = field.icon;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        {IconComp && <IconComp size={16} className="text-primary" />}
        {field.label}
      </label>

      {field.type === "select" ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              instanceId={name}
              value={options.find((o) => o.value === value) ?? null}
              options={options}
              onChange={(opt) => onChange(opt?.value ?? "")}
              placeholder={`Select ${field.label}`}
              className={error ? "ring-destructive" : ""}
            />
          )}
        />
      ) : field.type === "phone" ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={
                value?.country_code
                  ? `${value.country_code}${value.area_code || ""}${
                      value.number
                    }`
                  : ""
              }
              onChange={(parsed) => {
                // Example: parsed = "+923120824490"
                if (!parsed) return onChange(null);

                const match = parsed.match(/^\+(\d{1,3})(\d{3})(\d{6,})$/);
                if (match) {
                  const [, country_code, area_code, number] = match;
                  onChange({
                    country_code,
                    area_code,
                    number,
                  });
                } else {
                  onChange(null); // fallback
                }
              }}
              className={error ? "border-destructive" : ""}
            />
          )}
        />
      ) : (
        <Input
          id={name}
          type={field.type}
          placeholder={field.label}
          {...register(name)}
          className={error ? "border-destructive focus:ring-destructive" : ""}
        />
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

// ────────────────────────────────────────────
// Hooks & Utils
// ────────────────────────────────────────────

export function useTravellerDefs(params) {
  const adults = parseInt(params.get("adults") || "0", 10);
  const children = parseInt(params.get("children") || "0", 10);
  const infants = parseInt(params.get("infants") || "0", 10);

  return useMemo(() => {
    const arr = [];
    for (let i = 1; i <= adults; i++)
      arr.push({ role: "Adult", label: `Adult ${i}` });
    for (let i = 1; i <= children; i++)
      arr.push({ role: "Child", label: `Child ${i}` });
    for (let i = 1; i <= infants; i++)
      arr.push({ role: "Infant", label: `Infant ${i}` });
    return arr;
  }, [adults, children, infants]);
}

export function usePopulateCities(values, setCityOpts, setValue) {
  useEffect(() => {
    values.forEach((t, i) => {
      if (t.country) {
        const opts = City.getCitiesOfCountry(t.country).map((c) => c.name);
        setCityOpts((prev) => {
          const next = [...prev];
          next[i] = opts;
          return next;
        });
        setValue(`travellers.${i}.city`, "");
      }
    });
  }, [values, setCityOpts, setValue]);
}

export function defaultTraveller() {
  return {
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    mobile: "",
    country: "",
    city: "",
    date_of_birth: dayjs().format("YYYY-MM-DD"),
    gender: "",
    passport_number: "",
    passport_expiry_date: dayjs().format("YYYY-MM-DD"),
  };
}
