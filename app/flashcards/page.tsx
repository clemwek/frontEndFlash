"use client";

import { useState } from "react";
import FlashCardComponent from "@/components/flashcards/FlashCard";
import ProgressBar from "@/components/flashcards/ProgressBar";
import { Button } from "@/components/ui/button";

interface FlashCard {
    id: string;
    question: string;
    answer: string;
}

const sampleFlashcards: FlashCard[] = [
    {
        id: "1",
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        id: "2",
        question: "What is 2 + 2?",
        answer: "4",
    },
    {
        id: "3",
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
    },
    {
        id: "4",
        question: "What is the speed of light?",
        answer: "299,792,458 meters per second",
    },
    {
        id: "5",
        question: "Who wrote Romeo and Juliet?",
        answer: "William Shakespeare",
    },
];

export default function FlashcardsPage() {
    const [flashcards] = useState<FlashCard[]>(sampleFlashcards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [masteredCount, setMasteredCount] = useState(0);
    const [showCompletion, setShowCompletion] = useState(false);

    const handleMastered = async () => {
        setMasteredCount((prev) => prev + 1);
        handleNext();
    };

    const handleNotMastered = () => {
        handleNext();
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setShowCompletion(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setMasteredCount(0);
        setShowCompletion(false);
    };

    if (showCompletion) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md animate-fade-in">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-3xl font-bold mb-4">Great Job!</h1>
                    <p className="text-muted-foreground mb-2">
                        You completed all {flashcards.length} flashcards
                    </p>
                    <p className="text-2xl font-semibold text-green-500 mb-8">
                        {masteredCount} mastered
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={handleRestart} variant="default">
                            Study Again
                        </Button>
                        <Button
                            onClick={() => (window.location.href = "/courses")}
                            variant="outline"
                        >
                            Back to Courses
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (flashcards.length === 0) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">No flashcards available</p>
            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    return (
        <div className="container mx-auto py-8 min-h-screen flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center mb-8">
                Study Flashcards
            </h1>

            <ProgressBar
                current={currentIndex + 1}
                total={flashcards.length}
                mastered={masteredCount}
            />

            <FlashCardComponent
                question={currentCard.question}
                answer={currentCard.answer}
                onMastered={handleMastered}
                onNotMastered={handleNotMastered}
            />
        </div>
    );
}
