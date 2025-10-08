"use client";

import { useActionState, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

import { loginAction } from "@/services/actions";
import { getAppConfigFromLocalStorage } from "@/utils/localStorage";

const INITIAL_STATE = {
    zodErrors: null,
    apiErrors: null,
    errorMessage: null,
    successMessage: null,
    formData: null,
};

export function LoginForm() {
    const [formState, formAction] = useActionState(loginAction, INITIAL_STATE);
    const [token, setToken] = useState("");
    const [mode, setMode] = useState("");

    const zodErrors = formState?.zodErrors;
    const apiErrors = formState?.apiErrors?.message;
    const successMessage = formState?.successMessage?.message;

    const config = getAppConfigFromLocalStorage();

    useEffect(() => {
        if (config && config.mode === "demo") {
            setToken(formState?.successMessage?.token);
            setMode(config.mode);
        }
    }, [config, formState?.successMessage]);

    useEffect(() => {
        if (successMessage && config?.mode !== "demo") {
            toast.success(successMessage);
        }
    }, [successMessage, config?.mode]);

    return (
        <form className="p-6 md:p-8" action={formAction}>
            <div className="flex flex-col gap-6 my-20">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">STUDY NOTES AI</h1>
                    <p className="text-muted-foreground text-balance">
                        See how students raise their grades
                    </p>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="user@example.com"
                        defaultValue={formState?.formData?.email ?? ""}
                        autoFocus
                        aria-label="email"
                        required
                    />
                    {zodErrors && <p className="text-red-500">{zodErrors}</p>}
                </div>

                <Button type="submit" className="w-full">
                    Continue <ArrowRight />
                </Button>
                {apiErrors && <p className="text-red-500">{apiErrors}</p>}

                <div className="flex flex-col items-center gap-2">
                    {mode && (
                        <p className="text-green-500 font-bold animate-pulse">
                            {" "}
                            App is running in DEMO MODE
                        </p>
                    )}
                    {token && (
                        <p className="text-orange-500">
                            {" "}
                            <Link href={`/auth/verify?token=${token}`}>
                                Click to Verify Token
                            </Link>
                        </p>
                    )}
                    {successMessage && !mode && (
                        <div>
                            <p className="text-green-500">{successMessage}</p>
                        </div>
                    )}
                </div>
            </div>
            <Toaster richColors position="top-center" />
        </form>
    );
}
