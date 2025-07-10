import dayjs from "dayjs";
import { z } from "zod";



export const TravellerSchema = z.object({
    title: z.string().nonempty("Title is required"),
    first_name: z.string().nonempty("First Name is required"),
    last_name: z.string().nonempty("Last Name is required"),
    email: z.string().email("Invalid email address"),
    telephone: z.string().nonempty("Phone is required"),
    mobile: z.string().nonempty("Mobile is required"),
    country: z.string().nonempty("Country is required"),
    city: z.string().nonempty("City is required"),
    date_of_birth: z.string().refine((v) => {
        const age = dayjs().diff(dayjs(v), "years");
        return age >= 18 && age <= 120;
    }, "You must be between 18 and 120 years old"),
    gender: z.string().nonempty("Gender is required"),
    passport_number: z.string().nonempty("Passport Number is required"),
    passport_expiry_date: z
        .string()
        .refine(
            (v) => dayjs(v).isAfter(dayjs()),
            "Passport expiry must be in the future"
        ),
});

export const FormSchema = z.object({
    travellers: z.array(TravellerSchema).min(1, "At least one traveller"),
    // payment section
    email_address: z.string().email("Invalid email address"),
    // employment section
    current_employment_status: z
        .string()
        .nonempty("Employment Status is required"),
    employer_name: z.string().optional(),
    job_title: z.string().nonempty("Job Title is required"),
    work_address: z.string().nonempty("Work Address is required"),
    monthly_income: z
        .string()
        .refine((v) => /^\d+(\.\d+)?$/.test(v), "Must be a number"),
});