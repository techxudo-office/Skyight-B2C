// components/PhoneInput.jsx
"use client";

import { forwardRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ChevronDown, Check } from "lucide-react";
import flags from "react-phone-number-input/flags";
import PhoneNumberInput, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

export function PhoneInput({ value, onChange, className }) {
  return (
    <PhoneNumberInput
      className={`flex w-full rounded-md border border-input bg-background text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}
      value={value}
      defaultCountry={"IR"}
      smartCaret={false}
      onChange={onChange}
      flagComponent={Flag}
      inputComponent={Input}
      countrySelectComponent={CountrySelector}
    />
  );
}

// 1) Base text input styling
const Input = forwardRef((props, ref) => (
  <input
    ref={ref}
    {...props}
    className="flex-1 px-3 py-2 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none"
  />
));
Input.displayName = "PhoneInputInput";

// 2) Flag renderer
const Flag = ({ country, countryName }) => {
  if (!country) return <span className="w-6" />;
  const FlagSvg = flags[country];
  return (
    <span className="w-6">{FlagSvg && <FlagSvg title={countryName} />}</span>
  );
};

// Only supported countries
const allCountries = getCountries().sort();

function CountrySelector({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const list = allCountries.filter((c) => {
    const name = new Intl.DisplayNames(["en"], { type: "region" }).of(c) || "";
    return (
      c.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="flex items-center px-3 border-r border-input bg-popover text-popover-foreground hover:bg-popover/90 focus:outline-none"
        >
          <Flag country={value} countryName={value} />
          <span className="ml-1 text-sm">{value?.toUpperCase() || "—"}</span>
          <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-50 w-64 border rounded-md shadow-md bg-popover border-border">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm bg-transparent border-b border-border placeholder:text-muted-foreground focus:outline-none"
            placeholder="Search country…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea.Root className="h-60">
            <ScrollArea.Viewport>
              <ul>
                {list.map((c) => {
                  const name =
                    new Intl.DisplayNames(["en"], {
                      type: "region",
                    }).of(c) || c;
                  const callingCode = getCountryCallingCode(c);
                  const isSelected = c === value;
                  return (
                    <li key={c}>
                      <button
                        onClick={() => {
                          onChange(c);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-popover/80 ${
                          isSelected ? "bg-primary/10" : ""
                        }`}
                      >
                        <Flag country={c} countryName={name} />
                        <span className="flex-1 ml-2">{name}</span>
                        <span className="text-xs text-muted-foreground">
                          +{callingCode}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 ml-2 text-primary" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb className="rounded-full bg-muted" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default PhoneInput;
