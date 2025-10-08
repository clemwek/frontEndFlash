"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Loader from "@/components/common/Loader";
import { verifyService } from "@/services/auth";
import { setLocalStorage } from "@/utils/localStorage";
import { LOCAL_STORAGE_TOKEN } from "@/lib/constants";

const VerifyToken = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const token = searchParams?.get("token");
    const hasVerifiedRef = useRef<string | null>(null);

    useEffect(() => {
        if (!token) {
            setMessage("Missing token.");
            return;
        }

        if (hasVerifiedRef.current === token) return;
        hasVerifiedRef.current = token;

        let cancelled = false;

        const exchangeToken = async () => {
            try {
                setLoading(true);
                const data = await verifyService(token);

                if (!data?.access_token) {
                    setMessage(data?.message || "Invalid or expired token.");
                    return;
                }

                setLocalStorage(LOCAL_STORAGE_TOKEN, data.access_token);

                router.replace("/courses");
            } catch (error) {
                if (!cancelled) {
                    console.error("Error verifying token:", error);
                    setMessage(
                        "Something went wrong while verifying the token."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        exchangeToken();

        return () => {
            cancelled = true;
        };
    }, [token, router]);

    return (
        <div className="flex flex-col gap-10 my-20">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-1">
                    Logging in to STUDYNOTE AI
                </h1>
                <p className="text-muted-foreground text-balance"></p>
            </div>

            <div className="grid gap-5">
                {loading && (
                    <Loader
                        size={32}
                        color="bg-green-600"
                        pulseColor="bg-green-400"
                        message="Verifying Token..."
                        animate-pulse-slow
                    />
                )}
                {message && (
                    <p className="text-amber-200 text-center">{message}</p>
                )}
            </div>
        </div>
    );
};

export default VerifyToken;
