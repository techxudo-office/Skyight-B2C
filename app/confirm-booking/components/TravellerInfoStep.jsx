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
export default function TravellerInfoStep() {
  const { form, nextStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className={"flex flex-col gap-4"}>
        <FormField
          name="account.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="account.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}
