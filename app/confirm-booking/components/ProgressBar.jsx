// components/ProgressBar.js
import React from "react";
import { Plane, Circle } from "lucide-react";

const ProgressBar = ({ currentStep = 1, steps }) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full mb-10 md:mb-12">
      <div className="relative h-1 bg-gray-200 rounded-full md:h-2">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-in-out bg-blue-600 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {/* Moving Plane Icon */}
        <div
          className="absolute z-20 transition-all duration-500 ease-in-out transform -translate-x-1/2 -translate-y-1/2 top-1/2"
          style={{
            left: `${progressPercentage}%`,
            // Ensure plane doesn't go beyond the boundaries
            left: `${Math.max(4, Math.min(96, progressPercentage))}%`,
          }}
        >
          <div className="relative">
            <div className="p-1 bg-white border-2 border-blue-600 rounded-full shadow-lg">
              <Plane size={16} className="text-blue-600 transform md:size-5" />
            </div>
            {/* Optional: Add a small trail effect */}
            <div className="absolute top-1/2 right-full w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400 transform -translate-y-1/2 opacity-60"></div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`relative z-10 md:w-8 md:h-8 w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isCompleted ? (
                  <Circle size={12} className="md:size-[16px]" />
                ) : (
                  React.cloneElement(step.icon, {
                    className: "size-4 md:size-[18px]",
                  })
                )}
                <span className="absolute top-full mt-1 w-max md:flex hidden text-[10px] md:text-sm text-center font-medium text-gray-600">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
