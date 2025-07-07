import { Button } from "@/components/ui/button";
import { useMultiStepFormContext } from "@/components/ui/multi-step-form";
export default function BookingStep() {
  const { prevStep, form } = useMultiStepFormContext();
  const values = form.getValues();

  return (
    <div className={"flex flex-col space-y-4"}>
      <div className={"flex flex-col space-y-4"}>
        <div>Great! Please review the values.</div>

        <div className={"flex flex-col space-y-2 text-sm"}>
          <div>
            <span>Username</span>: <span>{values.account.username}</span>
          </div>
          <div>
            <span>Email</span>: <span>{values.account.email}</span>
          </div>
          <div>
            <span>Age</span>: <span>{values.profile.age}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type={"button"} variant={"outline"} onClick={prevStep}>
          Back
        </Button>

        <Button type={"submit"}>Create Account</Button>
      </div>
    </div>
  );
}
