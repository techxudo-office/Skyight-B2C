"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle as CircleIcon } from "lucide-react";
import ProgressBar from "./components/ProgressBar";
import { progressSteps, form_constants } from "./components/FormConstants";
import { FormSchema } from "@/utils/ValidationSchema";
import {
  defaultTraveller,
  StepFields,
  TravellerSection,
  useTravellerDefs,
  usePopulateCities,
} from "./components/Sections";

export default function ConfirmBookingPage() {
  const params = useSearchParams();
  const travellersDef = useTravellerDefs(params);

  const {
    control,
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      travellers: travellersDef.map(() => defaultTraveller()),
      email_address: "",
      current_employment_status: "",
      employer_name: "",
      job_title: "",
      work_address: "",
      monthly_income: "",
    },
  });

  const { fields: travellers } = useFieldArray({
    control,
    name: "travellers",
  });

  // populate city options per traveller
  const travellerValues = watch("travellers");
  const [cityOpts, setCityOpts] = useState(travellersDef.map(() => []));
  usePopulateCities(travellerValues, setCityOpts, setValue);

  // multi‑step
  const sections = [
    { title: "Traveller Details", fields: form_constants[0].fields },
    ...form_constants.slice(1),
  ];
  const [step, setStep] = useState(0);
  const total = sections.length;

  const next = async () => {
    const names =
      step === 0
        ? travellers.flatMap((_, i) =>
            form_constants[0].fields.map((f) => `travellers.${i}.${f.name}`)
          )
        : form_constants[step].fields.map((f) => f.name);

    if (await trigger(names)) setStep((s) => Math.min(s + 1, total - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const onSubmit = (data) => console.log("Valid:", data);

  return (
    <div className="w-full p-4 mx-auto shadow-lg md:p-14 bg-card text-foreground rounded-xl">
      <h1 className="text-3xl font-bold text-center">Confirm Your Booking</h1>
      <p className="mb-8 text-center text-muted-foreground">
        Please fill in your details carefully
      </p>

      <ProgressBar
        currentStep={step + 1}
        steps={progressSteps.map((s, i) => ({
          id: i + 1,
          title: i === 0 ? "Traveller Details" : s.title,
          icon: s.icon,
        }))}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 border rounded-lg bg-background border-border">
              <h3 className="px-3 py-2 mb-6 text-xl font-medium border-b border-muted">
                {sections[step].title}
              </h3>

              {step === 0 ? (
                <TravellerSection
                  travellers={travellers}
                  travellerDefs={travellersDef}
                  cityOpts={cityOpts}
                  control={control}
                  register={register}
                  errors={errors}
                />
              ) : (
                <StepFields
                  fields={sections[step].fields}
                  register={register}
                  control={control}
                  errors={errors}
                />
              )}

              <div className="flex justify-between mt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={prev}
                    className="flex items-center px-4 py-1 rounded-lg bg-muted text-muted-foreground hover:bg-muted/70"
                  >
                    <ChevronLeft className="mr-2" /> Previous
                  </button>
                ) : (
                  <div />
                )}

                {step < total - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="flex items-center px-4 py-1 ml-auto text-white rounded-lg bg-primary hover:bg-primary/80"
                  >
                    Next <ChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 ml-auto text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Submit <CircleIcon className="ml-2" />
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
