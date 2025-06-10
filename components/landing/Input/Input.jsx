// src/components/Input.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({
    type = 'text',
    label,
    id,
    placeholder,
    value,
    onChange,
    className = '',
    showPasswordToggle = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-text mb-2" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${showPasswordToggle ? 'pr-10' : ''
                        }`}
                    type={inputType}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center justify-center"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="text-lightGray cursor-pointer text-lg" />
                        ) : (
                            <FaEye className="text-lightGray cursor-pointer text-lg" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;