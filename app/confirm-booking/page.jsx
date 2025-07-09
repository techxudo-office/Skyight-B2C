"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { City } from "country-state-city";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import ProgressBar from "./components/ProgressBar";
import {
  visitVisa_section,
  progressSteps,
} from "./components/VisitVisaConstant";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle as CircleIcon } from "lucide-react";

export default function ConfirmBookingPage() {
  // 1️⃣ Build travellers from URL
  const params = useSearchParams();
  const adults = parseInt(params.get("adults") || "0", 10);
  const children = parseInt(params.get("children") || "0", 10);
  const infants = parseInt(params.get("infants") || "0", 10);

  const travellerDefs = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= adults; i++)
      arr.push({ role: "Adult", label: `Adult ${i}` });
    for (let i = 1; i <= children; i++)
      arr.push({ role: "Child", label: `Child ${i}` });
    for (let i = 1; i <= infants; i++)
      arr.push({ role: "Infant", label: `Infant ${i}` });
    return arr;
  }, [adults, children, infants]);

  // 2️⃣ RHF setup
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      travellers: travellerDefs.map(() => ({
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
      })),
      // payment
      email_address: "",
      // employment
      current_employment_status: "",
      employer_name: "",
      job_title: "",
      work_address: "",
      monthly_income: "",
    },
  });

  // Field Array for travellers
  const { fields: travellerFields } = useFieldArray({
    control,
    name: "travellers",
  });

  // watch country selections to populate cities per traveller
  const travellerValues = watch("travellers");

  useEffect(() => {
    travellerValues.forEach((t, i) => {
      if (t.country) {
        const opts = City.getCitiesOfCountry(t.country).map((c) => ({
          label: c.name,
          value: c.name,
        }));
        // store per-traveller city options
        setTravCityOptions((prev) => {
          const next = [...prev];
          next[i] = opts;
          return next;
        });
        // clear city field
        setValue(`travellers.${i}.city`, "");
      }
    });
  }, [travellerValues, setValue]);

  // local state for each traveler's city options
  const [travCityOptions, setTravCityOptions] = useState(
    travellerDefs.map(() => [])
  );

  // 3️⃣ Steps logic
  const sections = [
    { title: "Traveller Details", fields: visitVisa_section[0].fields },
    ...visitVisa_section.slice(1),
  ];
  const totalSteps = sections.length;
  const [currentStep, setCurrentStep] = useState(0);

  const validateStep = async () => {
    const names = [];
    if (currentStep === 0) {
      // all travellers
      travellerFields.forEach((_, i) =>
        visitVisa_section[0].fields.forEach((f) => {
          names.push(`travellers.${i}.${f.name}`);
        })
      );
    } else {
      visitVisa_section[currentStep].fields.forEach((f) => names.push(f.name));
    }
    return trigger(names);
  };

  const onNext = async () => {
    if (await validateStep())
      setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  };
  const onPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    console.log("SUBMIT", data);
  };

  // 4️⃣ Render
  return (
    <div className="w-full p-4 mx-auto shadow-lg md:p-14 bg-card text-foreground rounded-xl">
      <h1 className="mb-2 text-3xl font-bold text-center">
        Visit Visa Application
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        Please fill in your details carefully
      </p>

      <ProgressBar
        currentStep={currentStep + 1}
        steps={progressSteps.map((s, i) => ({
          id: i + 1,
          title: i === 0 ? "Traveller Details" : s.title,
          icon: s.icon,
        }))}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 border rounded-lg bg-background border-border">
              <h3 className="px-3 py-2 mb-6 text-xl font-medium border-b border-muted">
                {sections[currentStep].title}
              </h3>

              {/* Traveller Details step */}
              {currentStep === 0 &&
                travellerFields.map((_, i) => (
                  <div key={i} className="mb-8">
                    <h4 className="mb-4 text-lg font-semibold">
                      {travellerDefs[i].label}
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {visitVisa_section[0].fields.map((field) => {
                        const name = `travellers.${i}.${field.name}`;
                        const Icon = field.icon;
                        const value = travellerValues[i]?.[field.name];
                        const options =
                          field.name === "city"
                            ? travCityOptions[i]
                            : (field.options ?? []).map((o) =>
                                typeof o === "string"
                                  ? { label: o, value: o }
                                  : o
                              );

                        return (
                          <div key={name} className="flex flex-col gap-2">
                            <label
                              htmlFor={name}
                              className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
                            >
                              {Icon && (
                                <Icon size={16} className="text-primary" />
                              )}
                              {field.label}
                            </label>

                            {field.type === "select" ? (
                              <Controller
                                control={control}
                                name={name}
                                rules={getValidationRules(field)}
                                render={({ field: { onChange, value } }) => (
                                  <Dropdown
                                    value={
                                      options.find((o) => o.value === value) ??
                                      null
                                    }
                                    onChange={(opt) =>
                                      onChange(opt?.value ?? "")
                                    }
                                    options={options}
                                    placeholder={`Select ${field.label}`}
                                    disabled={field.name === "city" && !value}
                                    instanceId={name}
                                  />
                                )}
                              />
                            ) : (
                              <Input
                                id={name}
                                type={field.type}
                                placeholder={field.label}
                                {...register(name, getValidationRules(field))}
                                className={
                                  errors[name] ? "border-destructive" : ""
                                }
                              />
                            )}

                            {errors[name] && (
                              <p className="text-sm text-destructive">
                                {errors[name]?.message}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

              {/* Other steps */}
              {currentStep > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {visitVisa_section[currentStep].fields.map((field) => {
                    const name = field.name;
                    const Icon = field.icon;
                    return (
                      <div key={name} className="flex flex-col gap-2">
                        <label
                          htmlFor={name}
                          className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
                        >
                          {Icon && <Icon size={16} className="text-primary" />}
                          {field.label}
                        </label>

                        {field.type === "select" ? (
                          <Controller
                            control={control}
                            name={name}
                            rules={getValidationRules(field)}
                            render={({ field: { onChange, value } }) => {
                              const opts = (field.options ?? []).map((o) =>
                                typeof o === "string"
                                  ? { label: o, value: o }
                                  : o
                              );
                              return (
                                <Dropdown
                                  value={
                                    opts.find((o) => o.value === value) ?? null
                                  }
                                  onChange={(opt) => onChange(opt?.value ?? "")}
                                  options={opts}
                                  placeholder={`Select ${field.label}`}
                                  instanceId={name}
                                />
                              );
                            }}
                          />
                        ) : (
                          <Input
                            id={name}
                            type={field.type}
                            placeholder={field.label}
                            {...register(name, getValidationRules(field))}
                            className={errors[name] ? "border-destructive" : ""}
                          />
                        )}

                        {errors[name] && (
                          <p className="text-sm text-destructive">
                            {errors[name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Next / Prev / Submit */}
              <div className="flex justify-between mt-6">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={onPrev}
                    className="flex items-center px-4 py-1 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground"
                  >
                    <ChevronLeft size={18} className="mr-2" />
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="flex items-center px-4 py-1 ml-auto text-white rounded-lg bg-primary hover:bg-primary/80"
                  >
                    Next
                    <ChevronRight size={18} className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 ml-auto text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit Application
                    <CircleIcon className="ml-2" size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}

// Shared validation generator
function getValidationRules(field) {
  const rules = {};
  if (field.required) rules.required = `${field.label} is required`;

  if (field.type === "email") {
    rules.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    };
  }
  if (field.name === "passport_expiry_date") {
    rules.validate = (v) =>
      dayjs(v).isAfter(dayjs()) || "Passport expiry must be in the future";
  }
  if (field.name === "date_of_birth") {
    rules.validate = (v) => {
      const age = dayjs().diff(dayjs(v), "years");
      if (age < 18) return "Must be at least 18 years old";
      if (age > 120) return "Please enter a valid birth date";
      return true;
    };
  }
  if (field.validation) {
    if (field.validation.min) {
      rules.minLength = {
        value: field.validation.min,
        message: field.validation.message,
      };
    }
    if (field.validation.max) {
      rules.maxLength = {
        value: field.validation.max,
        message: field.validation.message,
      };
    }
  }
  return rules;
}
