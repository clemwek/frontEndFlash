interface ProgressBarProps {
    current: number;
    total: number;
    mastered: number;
}

export default function ProgressBar({
    current,
    total,
    mastered,
}: ProgressBarProps) {
    const progressPercentage = total > 0 ? (current / total) * 100 : 0;
    const masteredPercentage = total > 0 ? (mastered / total) * 100 : 0;

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                    Card {current} of {total}
                </span>
                <span className="text-green-500 font-medium">
                    {mastered} mastered
                </span>
            </div>

            <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div
                    className="absolute h-full bg-green-500/30 transition-all duration-300"
                    style={{ width: `${masteredPercentage}%` }}
                />
                <div
                    className="absolute h-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{Math.round(progressPercentage)}% completed</span>
                <span>{Math.round(masteredPercentage)}% mastered</span>
            </div>
        </div>
    );
}
