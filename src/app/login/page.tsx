
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/shared/logo";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="absolute top-6 left-6">
        <Logo iconSize={28} textSize="text-2xl" />
      </div>
      <LoginForm />
      <p className="mt-8 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  );
}
