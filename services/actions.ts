"use server";
import { z } from "zod";
import { loginService, verifyService } from "./auth";

const loginSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address",
    }),
});

export async function loginAction(prevState: any, formData: FormData) {
    console.log("Login server action");
    const email = formData.get("email");

    const validatedFields = loginSchema.safeParse({
        email: email,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            apiErrors: null,
        };
    }

    const responseData = await loginService(validatedFields.data.email);

    if (!responseData) {
        return {
            ...prevState,
            apiErrors: null,
            zodErrors: null,
            errorMessage: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            apiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to Login.",
        };
    }

    return {
        ...prevState,
        zodErrors: null,
        apiErrors: null,
        errorMessage: null,
        successMessage: responseData,
    };
}

export async function verifyTokenAction(prevState: any, formData: FormData) {
    console.log("Verify Token server action");

    const token = formData.get("token");

    if (!token || typeof token !== "string") {
        return {
            ...prevState,
            apiErrors: null,
            zodErrors: null,
            errorMessage: "Token is missing or invalid.",
        };
    }

    const responseData = await verifyService(token);

    console.log('action file',responseData)

    if (!responseData) {
        return {
            ...prevState,
            apiErrors: null,
            zodErrors: null,
            errorMessage: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            apiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to Verify Token.",
        };
    }

    return {
        ...prevState,
        zodErrors: null,
        apiErrors: null,
        errorMessage: null,
        successMessage: responseData,
    };
}
