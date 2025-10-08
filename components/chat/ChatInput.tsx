import React, { KeyboardEvent } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

const ChatInput = ({ onSubmit }: ChatInputProps) => {
    const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
        mode: "onChange",
    });

    const submit = handleSubmit((data) => {
        reset({ message: "" });
        onSubmit(data);
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            submit();
            e.preventDefault();
        }
    };

    return (
        <form
            onSubmit={submit}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
        >
            <textarea
                {...register("message", {
                    required: true,
                    validate: (value) => value.trim().length > 0,
                })}
                className="w-full border-0 rounded-md focus:outline-0 resize-none"
                placeholder="Ask anything about this course"
                maxLength={1000}
                autoFocus
            />
            <Button
                disabled={!formState.isValid}
                type="submit"
                className="rounded-full w-9 h-9 mt-2"
            >
                <FaArrowUp />
            </Button>
        </form>
    );
};

export default ChatInput;
