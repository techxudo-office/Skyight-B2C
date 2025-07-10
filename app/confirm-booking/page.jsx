"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { City } from "country-state-city";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import { useSearchParams } from "next/navigation";
import ProgressBar from "./components/ProgressBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/utils/ValidationSchema";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { progressSteps, form_constants } from "./components/FormConstants";
import { ChevronLeft, ChevronRight, Circle as CircleIcon } from "lucide-react";


export default function ConfirmBookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  // build travellers from URL
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

  // initialize RHF with Zod resolver
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
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
      email_address: "",
      current_employment_status: "",
      employer_name: "",
      job_title: "",
      work_address: "",
      monthly_income: "",
    },
  });

  // field array for travellers
  const { fields: travellerFields } = useFieldArray({
    control,
    name: "travellers",
  });

  // watch countries to populate cities
  const travellerValues = watch("travellers");
  const [cityOptionsArr, setCityOptionsArr] = useState(
    travellerDefs.map(() => [])
  );
  useEffect(() => {
    travellerValues.forEach((t, i) => {
      if (t.country) {
        const opts = City.getCitiesOfCountry(t.country).map((c) => c.name);
        setCityOptionsArr((prev) => {
          const next = [...prev];
          next[i] = opts;
          return next;
        });
        setValue(`travellers.${i}.city`, "");
      }
    });
  }, [travellerValues, setValue]);

  // multi‑step logic
  const sections = [
    { title: "Traveller Details", fields: form_constants[0].fields },
    ...form_constants.slice(1),
  ];
  const totalSteps = sections.length;

  // helper to gather all the field keys in the current step
  const getCurrentStepFieldNames = () => {
    if (currentStep === 0) {
      // all traveller personal‐info fields
      return travellerFields.flatMap((_, i) =>
        form_constants[0].fields.map((f) => `travellers.${i}.${f.name}`)
      );
    } else {
      // payment or employment
      return form_constants[currentStep].fields.map((f) => f.name);
    }
  };

  const onNext = async () => {
    // run validations on this step's fields
    const names = getCurrentStepFieldNames();
    const valid = await trigger(names);
    if (valid) {
      setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
    }
  };
  const onPrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = (data) => {
    console.log("VALID DATA", data);
  };

  return (
    <div className="w-full p-4 mx-auto shadow-lg md:p-14 bg-card text-foreground rounded-xl">
      <h1 className="mb-2 text-3xl font-bold text-center">
        Confirm Your Booking
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

              {currentStep === 0 ? (
                travellerFields.map((_, i) => (
                  <div key={i} className="mb-8">
                    <h4 className="mb-4 text-lg font-semibold">
                      {travellerDefs[i].label}
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {sections[0].fields.map((field) => {
                        const path = `travellers.${i}.${field.name}`;
                        const Icon = field.icon;
                        const error =
                          errors.travellers?.[i]?.[field.name]?.message;

                        // string options vs object options
                        const opts =
                          field.name === "city"
                            ? cityOptionsArr[i].map((v) => ({
                                label: v,
                                value: v,
                              }))
                            : (field.options ?? []).map((o) =>
                                typeof o === "string"
                                  ? { label: o, value: o }
                                  : o
                              );

                        return (
                          <div key={path} className="flex flex-col gap-2">
                            <label
                              htmlFor={path}
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
                                name={path}
                                render={({ field: { onChange, value } }) => (
                                  <Dropdown
                                    value={
                                      opts.find((o) => o.value === value) ??
                                      null
                                    }
                                    onChange={(opt) =>
                                      onChange(opt?.value ?? "")
                                    }
                                    options={opts}
                                    placeholder={`Select ${field.label}`}
                                    instanceId={path}
                                    className={error ? "ring-destructive" : ""}
                                  />
                                )}
                              />
                            ) : (
                              <Input
                                id={path}
                                type={field.type}
                                placeholder={field.label}
                                {...register(path)}
                                className={
                                  error
                                    ? "border-destructive focus:ring-destructive"
                                    : ""
                                }
                              />
                            )}

                            {error && (
                              <p className="text-sm text-destructive">
                                {error}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                // payment & employment steps
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {sections[currentStep].fields.map((field) => {
                    const name = field.name;
                    const Icon = field.icon;
                    const error = errors[name]?.message;

                    const opts = (field.options ?? []).map((o) =>
                      typeof o === "string" ? { label: o, value: o } : o
                    );

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
                            render={({ field: { onChange, value } }) => (
                              <Dropdown
                                value={
                                  opts.find((o) => o.value === value) ?? null
                                }
                                onChange={(opt) => onChange(opt?.value ?? "")}
                                options={opts}
                                placeholder={`Select ${field.label}`}
                                instanceId={name}
                                className={error ? "ring-destructive" : ""}
                              />
                            )}
                          />
                        ) : (
                          <Input
                            id={name}
                            type={field.type}
                            placeholder={field.label}
                            {...register(name)}
                            className={
                              error
                                ? "border-destructive focus:ring-destructive"
                                : ""
                            }
                          />
                        )}

                        {error && (
                          <p className="text-sm text-destructive">{error}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={onPrev}
                    className="flex items-center px-4 py-1 rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground"
                  >
                    <ChevronLeft size={18} className="mr-2" /> Previous
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
                    Next <ChevronRight size={18} className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 ml-auto text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit <CircleIcon size={18} className="ml-2" />
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
