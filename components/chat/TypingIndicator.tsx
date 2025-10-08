import React from "react";

const TypingIndicator = () => {
    return (
        <div className="flex self-start gap-1 p-3 bg-muted rounded-xl">
            <Dot />
            <Dot className='[animation-delay:0.2s]'/>
            <Dot className='[animation-delay:0.4s]'/>
        </div>
    );
};

const Dot = ({ className }: DotProps) => {
    return (
        <div
            className={`w-2 h-2 bg-muted-foreground rounded-full animate-pulse ${className}`}
        ></div>
    );
};

export default TypingIndicator;
