"use client";
import { useState } from "react";

import { chatService } from "@/services/chat";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (prompt: ChatFormData) => {
        setMessages((prev) => [
            ...prev,
            { content: prompt.message, role: "learner" },
        ]);
        setIsBotTyping(true);
        setError("");

        try {
            // TODO: Find a way to get or pass or use course_id to this component dynamically. UPDATE COMING SOON
            /*
            HOWTO: To test this component in this current state, you would first have to create a course and then use the course_id here as can be seen below   
             */
            const message = {
                ...prompt,
                course_id: "d9c24596-0103-4475-97bc-d55c858f6f07",
            };

            const res = await chatService(message);

            if (!res) return;
            // TODO: Remove this console.log
            console.log("API Response:", res);
            setMessages((prev) => [
                ...prev,
                { content: res.response, role: "bot" },
            ]);
        } catch (error) {
            // TODO: In future, we log these errors in a service like Sentry - Telemetry
            console.error("Chat error:", error);
            setError("Something went wrong, try again!");
        } finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-3 my-10 px-4 overflow-auto">
                <ChatMessages messages={messages} />
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
};

export default ChatBot;
