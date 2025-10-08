"use client";

import { useForm } from "react-hook-form";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { minLength } from "zod";
import SelectField from "@/components/forms/SelectField";
import { EDUCATIONAL_LEVELS } from "@/lib/constants";

const CreateCourse = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CourseFormData>({
        defaultValues: {
            name: "",
            educational_level: "",
            description: "",
            user_id: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (data: CourseFormData) => {
        try {
            console.log({ ...data, user_id: "1" });
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Create Course</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    name="name"
                    label="Course Name"
                    register={register}
                    placeholder="Enter course name"
                    validation={{
                        required: "Course name is required",
                        minLength: minLength(
                            3,
                            "Course name must be at least 3 characters"
                        ),
                    }}
                    error={errors.name}
                />
                <SelectField
                    name="educational_level"
                    label="Educational Level"
                    options={EDUCATIONAL_LEVELS}
                    control={control}
                    required
                    placeholder="Select educational level"
                    error={errors.educational_level}
                />

                <InputField
                    name="description"
                    type="textarea"
                    label="Course Description"
                    register={register}
                    placeholder="Enter course Description"
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Creating Course..." : "Create Course"}
                </Button>
            </form>
        </>
    );
};

export default CreateCourse;
