const CourseTitleSkeleton = () => {
    return (
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg border border-gray-200 bg-gray-100 animate-pulse w-full sm:max-w-64 h-12">
            <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
        </div>
    );
};

export default CourseTitleSkeleton;
