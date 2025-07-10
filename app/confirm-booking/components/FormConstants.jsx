import {
  User,
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  BookOpen,
  UserCircle2,
} from "lucide-react";
import { Country } from "country-state-city";
// Prepare list of country choices for phone code/ DOB fields
const countries = Country.getAllCountries().map((country) => ({
  label: country.name,
  value: country.isoCode,
}));

export const form_constants = [
  {
    title: "Personal Information",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "select",
        options: [
          { label: "Mr", value: "MR" },
          { label: "Mrs", value: "MS" },
        ],
        icon: User,
        required: true,
      }, // icon assumed
      {
        name: "first_name",
        label: "First Name",
        type: "text",
        icon: User,
        required: true,
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
        icon: User,
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        icon: Mail,
        required: true,
      },
      {
        name: "telephone",
        label: "Phone Number",
        type: "number",
        icon: Phone,
        required: true,
      },
      {
        name: "mobile",
        label: "Mobile Number",
        type: "number",
        icon: Phone,
        required: true,
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: countries,
        icon: Globe,
        required: true,
      },
      {
        name: "city",
        label: "City",
        type: "select",
        options: [],
        icon: MapPin,
        required: true,
      },
      {
        name: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        icon: Calendar,
        required: true,
        futureDate: false,
        pastDate: true,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        icon: Globe,
        required: true,
      },
      {
        name: "passport_number",
        label: "Passport Number",
        type: "text",
        icon: UserCircle2,
        required: true,
      },
      {
        name: "passport_expiry_date",
        label: "Passport Exp Date",
        type: "date",
        icon: Calendar,
        required: true,
        pastDate: false,
        futureDate: true,
      },
    ],
  },
  {
    title: "Payment Details",
    fields: [
      {
        name: "email_address",
        label: "Email Address",
        type: "email",
        icon: Mail,
        required: true,
      },
    ],
  },
  {
    title: "Employement Details",
    fields: [
      {
        name: "current_employment_status",
        label: "Current Employment Status",
        type: "select",
        options: ["Employed", "Self-Employed", "Unemployed"],
        icon: Briefcase,
        required: true,
      },
      {
        name: "employer_name",
        label: "Employer Name (Optional)",
        type: "text",
        icon: Building2,
        required: false,
      },
      {
        name: "job_title",
        label: "Job Title",
        type: "text",
        icon: Briefcase,
        required: true,
      },
      {
        name: "work_address",
        label: "Work Address",
        type: "text",
        icon: MapPin,
        required: true,
      },
      {
        name: "monthly_income",
        label: "Monthly Income",
        type: "number",
        icon: DollarSign,
        required: true,
      },
    ],
  },
];

export const progressSteps = [
  { id: 1, title: "Personal Info", icon: <User size={18} /> },
  { id: 2, title: "Payment Details", icon: <Mail size={18} /> },
  { id: 3, title: "Employment Details", icon: <BookOpen size={18} /> },
];
