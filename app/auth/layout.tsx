"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getConfig } from "@/services/settings";
import { clearLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { LOCAL_STORAGE_CONFIG } from '@/lib/constants';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    useEffect(() => {
        // TODO: Will store in global state later
        const fetchAppConfig = async () => {
            const config = await getConfig();

            clearLocalStorage(LOCAL_STORAGE_CONFIG);
            setLocalStorage(LOCAL_STORAGE_CONFIG, JSON.stringify(config));
        };
        fetchAppConfig();
    }, []);

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            {children}
                            <div className="bg-muted relative hidden md:block">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src="/auth-login.jpg"
                                    alt="Image"
                                    priority={true}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By clicking continue, you agree to our{" "}
                        <a href="#">Terms of Service</a> and{" "}
                        <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
