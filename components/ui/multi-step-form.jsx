import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  createContext,
} from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { z } from "zod";

export function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-xs text-center">{label}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-2",
                  isCompleted ? "bg-blue-600" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const MultiStepFormContext = createContext(null);

export function MultiStepForm({ schema, form, onSubmit, children, className }) {
  const steps = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) =>
          React.isValidElement(child) && child.type === MultiStepFormStep
      ),
    [children]
  );

  const header = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) && child.type === MultiStepFormHeader
      ),
    [children]
  );

  const footer = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) && child.type === MultiStepFormFooter
      ),
    [children]
  );

  const stepNames = steps.map((step) => step.props.name);
  const multiStepForm = useMultiStepForm(schema, form, stepNames);

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "flex flex-col overflow-hidden")}
      >
        {header}
        <div className="relative transition-transform duration-500">
          {steps.map((step, index) => {
            const isActive = index === multiStepForm.currentStepIndex;
            return (
              <AnimatedStep
                key={step.props.name}
                direction={multiStepForm.direction}
                isActive={isActive}
                index={index}
                currentIndex={multiStepForm.currentStepIndex}
              >
                {step}
              </AnimatedStep>
            );
          })}
        </div>
        {footer}
      </form>
    </MultiStepFormContext.Provider>
  );
}

export function MultiStepFormContextProvider({ children }) {
  const ctx = useMultiStepFormContext();
  return typeof children === "function" ? children(ctx) : children;
}

export const MultiStepFormStep = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const Cmp = asChild ? Slot : "div";
    return (
      <Cmp ref={ref} {...props}>
        <Slottable>{children}</Slottable>
      </Cmp>
    );
  }
);
MultiStepFormStep.displayName = "MultiStepFormStep";

export function useMultiStepFormContext() {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepForm"
    );
  }
  return context;
}

export function useMultiStepForm(schema, form, stepNames) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState();

  const isStepValid = useCallback(() => {
    const currentStepName = stepNames[currentStepIndex];
    if (schema.shape) {
      const currentStepSchema = schema.shape[currentStepName];
      if (!currentStepSchema) return true;
      const currentStepData = form.getValues(currentStepName) || {};
      const result = currentStepSchema.safeParse(currentStepData);
      return result.success;
    }
    throw new Error(`Unsupported schema type`);
  }, [schema, form, stepNames, currentStepIndex]);

  const nextStep = useCallback(
    (e) => {
      e.preventDefault();
      const valid = isStepValid();
      if (!valid) {
        const currentStepName = stepNames[currentStepIndex];
        const currentStepSchema = schema.shape[currentStepName];
        if (currentStepSchema) {
          Object.keys(currentStepSchema.shape).forEach((field) => {
            form.trigger(`${currentStepName}.${field}`);
          });
        }
        return;
      }
      if (valid && currentStepIndex < stepNames.length - 1) {
        setDirection("forward");
        setCurrentStepIndex((i) => i + 1);
      }
    },
    [isStepValid, currentStepIndex, stepNames, schema, form]
  );

  const prevStep = useCallback(
    (e) => {
      e.preventDefault();
      if (currentStepIndex > 0) {
        setDirection("backward");
        setCurrentStepIndex((i) => i - 1);
      }
    },
    [currentStepIndex]
  );

  const goToStep = useCallback(
    (index) => {
      if (index >= 0 && index < stepNames.length && isStepValid()) {
        setDirection(index > currentStepIndex ? "forward" : "backward");
        setCurrentStepIndex(index);
      }
    },
    [isStepValid, stepNames.length, currentStepIndex]
  );

  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return useMemo(
    () => ({
      form,
      currentStep: stepNames[currentStepIndex],
      currentStepIndex,
      totalSteps: stepNames.length,
      isFirstStep: currentStepIndex === 0,
      isLastStep: currentStepIndex === stepNames.length - 1,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    }),
    [
      form,
      stepNames,
      currentStepIndex,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    ]
  );
}

export const MultiStepFormHeader = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const Cmp = asChild ? Slot : "div";
    return (
      <Cmp ref={ref} {...props}>
        <Slottable>{children}</Slottable>
      </Cmp>
    );
  }
);
MultiStepFormHeader.displayName = "MultiStepFormHeader";

export const MultiStepFormFooter = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const Cmp = asChild ? Slot : "div";
    return (
      <Cmp ref={ref} {...props}>
        <Slottable>{children}</Slottable>
      </Cmp>
    );
  }
);
MultiStepFormFooter.displayName = "MultiStepFormFooter";

export function createStepSchema(steps) {
  return z.object(steps);
}

function AnimatedStep({ isActive, direction, children, index, currentIndex }) {
  const [shouldRender, setShouldRender] = useState(isActive);
  const stepRef = useRef(null);

  useEffect(() => {
    if (isActive) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && stepRef.current) {
      const focusable = stepRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) focusable.focus();
    }
  }, [isActive]);

  if (!shouldRender) return null;

  const base =
    "top-0 left-0 w-full h-full transition-all duration-300 ease-in-out";
  const visibility = isActive ? "opacity-100" : "opacity-0 absolute";
  const transform = isActive
    ? "translate-x-0"
    : direction === "forward" || index < currentIndex
    ? "-translate-x-full"
    : "translate-x-full";

  return (
    <div
      ref={stepRef}
      className={cn(base, visibility, transform)}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}
