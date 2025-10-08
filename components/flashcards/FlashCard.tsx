"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface FlashCardProps {
    question: string;
    answer: string;
    onMastered: () => void;
    onNotMastered: () => void;
}

export default function FlashCard({
    question,
    answer,
    onMastered,
    onNotMastered,
}: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className="relative h-96 cursor-pointer perspective-1000"
                onClick={handleFlip}
            >
                <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                    }`}
                >
                    <Card className="absolute w-full h-full backface-hidden flex items-center justify-center p-8 bg-card hover:shadow-lg transition-shadow">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                                Question
                            </p>
                            <p className="text-xl font-medium">{question}</p>
                        </div>
                    </Card>

                    <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-8 bg-card hover:shadow-lg transition-shadow">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                                Answer
                            </p>
                            <p className="text-xl font-medium">{answer}</p>
                        </div>
                    </Card>
                </div>
            </div>

            {isFlipped && (
                <div className="flex gap-4 mt-6 justify-center animate-fade-in">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNotMastered();
                        }}
                        className="px-6 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                        Not Yet
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onMastered();
                        }}
                        className="px-6 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                    >
                        Got It!
                    </button>
                </div>
            )}

            <p className="text-center text-sm text-muted-foreground mt-4">
                Click card to flip
            </p>
        </div>
    );
}
