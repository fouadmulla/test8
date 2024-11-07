"use client";

import { verifyEmail } from "@/cosmic/blocks/user/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyUserEmail = async () => {
      const code = searchParams.get("code");

      if (!code) {
        router.push("/login?error=Invalid verification link");
        return;
      }

      try {
        await verifyEmail(code);
        router.push("/login?success=Email verified successfully");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Verification failed";
        router.push(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    verifyUserEmail();
  }, [searchParams, router]);

  return (
    <div className="h-[400px] flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4">
        <Loader2 className="text-orange-600 w-8 h-8 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">
          Verifying your email...
        </p>
      </div>
    </div>
  );
}
