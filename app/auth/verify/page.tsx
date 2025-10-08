import { Suspense } from "react";
import VerifyToken from "@/components/auth/VerifyToken";

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyToken />
        </Suspense>
    );
}
