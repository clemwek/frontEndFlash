"use client";

import { useEffect, useState } from "react";
import { flashcardService, FlashCard } from "@/services/flashcards";
import FlashCardComponent from "@/components/flashcards/FlashCard";
import ProgressBar from "@/components/flashcards/ProgressBar";
import { Button } from "@/components/ui/button";

export default function FlashcardsPage() {
    const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [masteredCount, setMasteredCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCompletion, setShowCompletion] = useState(false);

    useEffect(() => {
        loadFlashcards();
    }, []);

    const loadFlashcards = async () => {
        try {
            setLoading(true);
            const sets = await flashcardService.getFlashcardSets();

            if (sets.length === 0) {
                setError("No flashcard sets found. Create one first!");
                setLoading(false);
                return;
            }

            const cards = await flashcardService.getFlashcardsBySetId(
                sets[0].id
            );
            setFlashcards(cards);

            if (cards.length === 0) {
                setError("This set has no flashcards yet.");
            }
        } catch (err) {
            console.error("Error loading flashcards:", err);
            setError("Failed to load flashcards");
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                        Loading flashcards...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (showCompletion) {
        return (
            <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md animate-fade-in">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-3xl font-bold mb-4">
                        Great Job!
                    </h1>
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
                <p className="text-muted-foreground">
                    No flashcards available
                </p>
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
