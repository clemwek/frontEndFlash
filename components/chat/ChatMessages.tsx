import { ClipboardEvent, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessages = ({ messages }: ChatMessages) => {
    const lastResponseRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        lastResponseRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onCopyMessage = (e: ClipboardEvent) => {
        const selection = window.getSelection()?.toString().trim();
        if (selection) {
            e.preventDefault();
            e.clipboardData.setData("text/plain", selection);
        }
    };
    return (
        <>
            {messages.map((message, index) => (
                <div
                    key={index}
                    onCopy={onCopyMessage}
                    ref={index === messages.length - 1 ? lastResponseRef : null}
                    className={`px-3 py-1 rounded-xl ${
                        message.role === "learner"
                            ? "bg-primary text-primary-foreground self-end"
                            : "bg-muted text-muted-foreground self-start"
                    }`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ ...props }) => (
                                <p className="wrap-anywhere" {...props} />
                            ),
                            a: ({ ...props }) => (
                                <a
                                    className="underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            ))}
        </>
    );
};

export default ChatMessages;
