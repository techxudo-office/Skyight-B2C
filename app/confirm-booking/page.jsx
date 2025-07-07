"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  MultiStepForm,
  MultiStepFormContextProvider,
  MultiStepFormHeader,
  MultiStepFormStep,
  Stepper,
  createStepSchema,
} from "@/components/ui/multi-step-form";
import PaymentStep from "./components/PaymentStep";
import BookingStep from "./components/BookingStep";
import TravellerInfoStep from "./components/TravellerInfoStep";

const FormSchema = createStepSchema({
  account: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
  profile: z.object({
    password: z.string().min(8),
    age: z.coerce.number().min(18),
  }),
});

export default function ConfirmBookingPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: {
        username: "",
        email: "",
      },
      profile: {
        password: "",
        age: 0,
      },
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <MultiStepForm
      className={"space-y-10 p-8 rounded-xl border"}
      schema={FormSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={"flex w-full flex-col justify-center space-y-6"}
      >
        <h2 className={"text-xl font-bold"}>Create your account</h2>

        <MultiStepFormContextProvider>
          {({ currentStepIndex }) => (
            <Stepper
              variant={"numbers"}
              steps={["Account", "Profile", "Review"]}
              currentStep={currentStepIndex}
            />
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>

      <MultiStepFormStep name="account">
        <TravellerInfoStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="profile">
        <PaymentStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="review">
        <BookingStep />
      </MultiStepFormStep>
    </MultiStepForm>
  );
}
