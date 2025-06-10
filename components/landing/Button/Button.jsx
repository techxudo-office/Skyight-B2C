import React from 'react';

const Button = ({ className, onClick, children, icon: Icon, ...props }) => {
    return (
        <button
            onClick={onClick}
            {...props}
            className={`${className} py-3 px-4  rounded-lg bg-primary group relative overflow-hidden cursor-pointer
      `}
        >
            <div className='absolute -translate-x-full group-hover:translate-x-0 bg-teal-600 inset-0 w-[125%] h-full rounded-tr-full transition-all duration-350 ease-initial '></div>
            <div className='z-10 relative  flex items-center gap-2 text-white font-semibold'>
                {children}
                {Icon && (
                    <span className="w-4">
                        <Icon className="w-full" />
                    </span>
                )}
            </div>

        </button>
    );
};

export default Button;