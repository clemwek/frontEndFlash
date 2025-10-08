declare global {
    type CourseFormData = {
        id?: string;
        name: string;
        educational_level: string;
        description?: string;
        user_id: string;
    };

    type Course = {
        id: string;
        name: string;
        educational_level: string;
        description: string;
        user_id: string;
    };

    type LoginFormData = {
        email: string;
    };

    type LoginResponse = {
        token: string;
        message?: string;
    };

    type VerificationResponse = {
        access_token: string;
        token_type: string;
        expires_in: number;
        message?: string;
    };

    type UserProfile = {
        id: string;
        email: string;
        name: string;
        educational_level: string;
        last_login?: string;
        needs_onboarding?: boolean;
    };

    type SelectFieldProps = {
        name: string;
        label: string;
        placeholder: string;
        options: readonly Option[];
        control: Control;
        error?: FieldError;
        required?: boolean;
    };

    type FormInputProps = {
        name: string;
        label: string;
        placeholder: string;
        type?: string;
        register: UseFormRegister;
        error?: FieldError;
        validation?: RegisterOptions;
        disabled?: boolean;
        value?: string;
    };

    type ChatFormData = {
        course_id: string;
        message: string;
    };

    type ChatResponse = {
        thread_id: string;
        response: string;
    };

    type Message = {
        content: string;
        role: "learner" | "bot";
    };

    type DotProps = {
        className?: string;
    };

    type ChatMessages = {
        messages: Message[];
    };

    type ChatInputProps = {
        onSubmit: (data: ChatFormData) => void;
    };

    type CourseTitleBadgeProps = {
        label: string;
        colorClass: string;
        active?: boolean;
        onClick: () => void;
    };
}

export {};
