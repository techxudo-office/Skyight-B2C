"use client";

import React from "react";
import ReactSelect from "react-select";
import { useTheme } from "next-themes"; // optional if you use next-themes

export default function Dropdown({
  value,
  loading,
  disabled,
  onChange,
  options = [],
  placeholder = "Select…",
  isClearable = false,
  styles = {},
  ensureUnique = true,
  ...props
}) {
  const { theme } = useTheme(); // 'light' or 'dark'

  const isDark = theme === "dark";

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: isDark ? "#1f2937" : "white", // gray-800 or white
      borderColor: state.isFocused
        ? isDark
          ? "#3b82f6"
          : "#3b82f6"
        : isDark
        ? "#374151"
        : "#d1d5db", // gray-700 or gray-300
      boxShadow: state.isFocused
        ? `0 0 0 1px ${isDark ? "#3b82f6" : "#3b82f6"}`
        : provided.boxShadow,
      "&:hover": {
        borderColor: "#3b82f6",
      },
      borderRadius: "0.375rem", // rounded-md
      minHeight: "2.5rem",
      color: isDark ? "#f9fafb" : "#111827",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#1f2937" : "white",
      borderRadius: "0.375rem",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? isDark
          ? "#374151"
          : "#e0f2fe"
        : state.isSelected
        ? isDark
          ? "#1d4ed8"
          : "#bfdbfe"
        : provided.backgroundColor,
      color: isDark ? "#f9fafb" : "#111827",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "#f3f4f6" : "#374151", // gray-100 or gray-700
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? "#9ca3af" : "#6b7280", // gray-400 or gray-500
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3b82f6" : isDark ? "#9ca3af" : "#6b7280",
      "&:hover": {
        color: "#3b82f6",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? "#f9fafb" : "#111827", // light in dark mode, dark in light mode
    }),
  };

  const processedOptions = ensureUnique
    ? Array.from(
        options
          .reduce((map, option) => {
            if (!map.has(option.value)) map.set(option.value, option);
            return map;
          }, new Map())
          .values()
      )
    : options;

  return (
    <ReactSelect
      value={value}
      isLoading={loading}
      onChange={onChange}
      isDisabled={disabled}
      placeholder={placeholder}
      isClearable={isClearable}
      options={processedOptions}
      styles={{ ...customStyles, ...styles }}
      className="text-sm"
      classNamePrefix="rs"
      instanceId={props.instanceId || props.name}
      {...props}
    />
  );
}
