"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  visitVisa_section,
  progressSteps,
} from "./components/VisitVisaConstant";
import { City } from "country-state-city";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import ProgressBar from "./components/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

export default function ConfirmBookingPage() {
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Initialize React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    resetField,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Personal Information
      full_name: "",
      gender: "",
      date_of_birth: dayjs().format("YYYY-MM-DD"),
      nationality: "",
      passport_number: "",
      passport_expiry_date: dayjs().format("YYYY-MM-DD"),
      // Payment Details
      email_address: "",
      // Employment Details
      current_employment_status: "",
      employer_name: "",
      job_title: "",
      work_address: "",
      monthly_income: "",
    },
  });

  // Get field names for current section
  const getCurrentSectionFields = () => {
    return visitVisa_section[currentSection].fields.map((field) => field.name);
  };

  // Validation rules generator
  const getValidationRules = (field) => {
    const rules = {};

    if (field.required) {
      rules.required = `${field.label} is required`;
    }

    if (field.type === "email") {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      };
    }

    if (field.type === "tel") {
      rules.pattern = {
        value: /^[+]?[0-9\s\-\(\)]+$/,
        message: "Invalid phone number",
      };
    }

    if (field.validation) {
      if (field.validation.min) {
        rules.minLength = {
          value: field.validation.min,
          message:
            field.validation.message ||
            `Minimum ${field.validation.min} characters required`,
        };
      }
      if (field.validation.max) {
        rules.maxLength = {
          value: field.validation.max,
          message:
            field.validation.message ||
            `Maximum ${field.validation.max} characters allowed`,
        };
      }
    }

    // Custom validation for passport expiry date
    if (field.name === "passport_expiry_date") {
      rules.validate = (value) => {
        const today = dayjs();
        const expiryDate = dayjs(value);
        if (expiryDate.isBefore(today)) {
          return "Passport expiry date must be in the future";
        }
        return true;
      };
    }

    // Custom validation for date of birth
    if (field.name === "date_of_birth") {
      rules.validate = (value) => {
        const today = dayjs();
        const birthDate = dayjs(value);
        const age = today.diff(birthDate, "years");
        if (age < 18) {
          return "You must be at least 18 years old";
        }
        if (age > 120) {
          return "Please enter a valid date of birth";
        }
        return true;
      };
    }

    return rules;
  };

  // Validate current section
  const validateCurrentSection = async () => {
    const currentFields = getCurrentSectionFields();
    const result = await trigger(currentFields);
    return result;
  };

  const handleNextSection = async () => {
    console.log("handle Next Section called");
    const isValid = await validateCurrentSection();
    if (isValid) {
      setCurrentSection((prev) =>
        Math.min(prev + 1, visitVisa_section.length - 1)
      );
    }
  };

  const handlePreviousSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data) => {
    console.log(data, "Data submitted");
  };

  // Watch all fields
  const values = watch();

  // 2️⃣ Local state for cities
  const [cityOptions, setCityOptions] = useState([]);

  // 3️⃣ Update cities whenever countryChanges
  useEffect(() => {
    if (values.country) {
      const cities = City.getCitiesOfCountry(values.country).map((c) => ({
        label: c.name,
        value: c.name,
      }));
      setCityOptions(cities);
      // clear any previously selected city
      setValue("city", "", { shouldValidate: true });
    } else {
      setCityOptions([]);
      setValue("city", "", { shouldValidate: true });
    }
  }, [values.country, setValue]);

  return (
    <div className="w-full p-4 mx-auto shadow-lg md:p-14 bg-card text-foreground rounded-xl">
      <h1 className="mb-2 text-3xl font-bold text-center">
        Visit Visa Application
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        Please fill in your details carefully
      </p>

      <ProgressBar currentStep={currentSection + 1} steps={progressSteps} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "600px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <div className="p-6 border rounded-lg bg-background border-border">
                <h3 className="px-3 py-2 mb-6 text-xl font-medium border-b border-muted">
                  {visitVisa_section[currentSection].title}
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {visitVisa_section[currentSection].fields.map((field) => {
                    const Icon = field.icon;
                    const fieldValue = values[field.name];

                    // Compute dropdownOptions (and override city via cityOptions if needed)
                    const dropdownOptions =
                      field.name === "city"
                        ? cityOptions
                        : (field.options ?? []).map((opt) =>
                            typeof opt === "string"
                              ? { label: opt, value: opt }
                              : opt
                          );

                    return (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label
                          htmlFor={field.name}
                          className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
                        >
                          {Icon && <Icon size={16} className="text-primary" />}
                          {field.label}
                        </label>

                        {field.type === "select" ? (
                          <Dropdown
                            value={
                              dropdownOptions.find(
                                (o) => o.value === fieldValue
                              ) ?? null
                            }
                            onChange={(opt) => {
                              // update RHF
                              setValue(field.name, opt?.value ?? "", {
                                shouldValidate: true,
                              });
                              // if country changed, clear city
                              if (field.name === "country") {
                                resetField("city");
                              }
                            }}
                            options={dropdownOptions}
                            placeholder={`Select ${field.label}`}
                            instanceId={field.name}
                            disabled={field.name === "city" && !values.country}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.label}
                            {...register(field.name, getValidationRules(field))}
                            className={
                              errors[field.name] ? "border-destructive" : ""
                            }
                          />
                        )}

                        {errors[field.name] && (
                          <p className="text-sm text-destructive">
                            {errors[field.name].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-6">
                  {currentSection > 0 ? (
                    <button
                      type="button"
                      onClick={handlePreviousSection}
                      className="flex items-center px-4 py-1 transition-colors rounded-lg bg-muted hover:bg-muted/70 text-muted-foreground"
                    >
                      <ChevronLeft size={18} className="mr-2" />
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentSection < visitVisa_section.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextSection}
                      className="flex items-center px-4 py-1 ml-auto text-white transition-colors rounded-lg bg-primary hover:bg-primary/80"
                    >
                      Next Section
                      <ChevronRight size={18} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center px-6 py-2 ml-auto text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Submit Application
                          <Circle className="ml-2" size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
