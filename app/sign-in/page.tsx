import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to manage your job applications and continue your job search.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignIn() {
  return <AuthForm type="sign-in" />;
}
