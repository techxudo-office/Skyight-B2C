"use client";

import React from "react";
import ReactSelect from "react-select";

// default styles to integrate with Tailwind
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // blue-500 or gray-300
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : provided.boxShadow,
    "&:hover": {
      borderColor: "#3b82f6",
    },
    borderRadius: "0.375rem", // rounded-md
    minHeight: "2.5rem",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#e0f2fe" // blue-100
      : state.isSelected
      ? "#bfdbfe" // blue-200
      : provided.backgroundColor,
    color: "#111827", // neutral-900
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#374151", // gray-700
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280", // gray-500
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#3b82f6" : "#6b7280",
    "&:hover": {
      color: "#3b82f6",
    },
  }),
};

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  isClearable = false,
  styles = {},
  ...props
}) {
  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      styles={{ ...customStyles, ...styles }}
      className="text-sm"
      classNamePrefix="rs"
      {...props}
    />
  );
}
