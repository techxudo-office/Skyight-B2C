import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMultiStepFormContext } from "@/components/ui/multi-step-form";

export default function PaymentStep() {
  const { form, nextStep, prevStep } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className={"flex flex-col gap-4"}>
        <FormField
          name="profile.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="profile.age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type={"button"} variant={"outline"} onClick={prevStep}>
            Previous
          </Button>

          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </Form>
  );
}
