import type { Metadata } from "next";

import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Your Free Account",
  description: "Create a free account to organize and track your job applications.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUp() {
  return <AuthForm type="sign-up" />;
}
