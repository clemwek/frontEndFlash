import clsx from "clsx";
import React from "react";

const CourseTitleBadge = ({
    label,
    colorClass,
    active,
    onClick,
}: CourseTitleBadgeProps) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "flex items-center gap-3 px-6 py-3 rounded-lg border cursor-pointer transition-all duration-200 select-none",
                "w-full sm:max-w-64 h-12",
                active
                    ? "bg-sky-400 border-sky-500 hover:bg-sky-500 hover:border-sky-600"
                    : "bg-sky-50 border-sky-200 hover:bg-sky-100 hover:border-sky-400"
            )}
        >
            <div
                className={`w-6 h-6 rounded-md transition-all duration-200 ${colorClass}`}
            ></div>
            <span
                className={clsx(
                    "font-semibold transition-colors duration-200",
                    active ? "text-white" : "text-gray-800"
                )}
            >
                {label}
            </span>
        </div>
    );
};

export default CourseTitleBadge;
