import ChatBot from '@/components/chat/ChatBot';
// import Loader from "@/components/common/Loader";

const CoursePage = () => {
    return (
        <div className='h-screen w-full'>

            <ChatBot />
            CoursePage
            {/* <Loader
                size={80}
                color="bg-indigo-600"
                pulseColor="bg-indigo-400"
                fullscreen
                message="Fetching your study data..."
            /> */}
        </div>
    );
};

export default CoursePage;
