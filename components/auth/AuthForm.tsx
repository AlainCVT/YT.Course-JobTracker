"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitEvent, useRef, useState } from "react";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth/auth-client";

const AuthTexts: Record<
  "sign-in" | "sign-up",
  {
    name: string;
    title: string;
    description: string;
    suggestion: string;
    redirect: {
      title: string;
      link: string;
    };
  }
> = {
  "sign-in": {
    name: "sign in",
    title: "Sign In",
    description: "Enter your credentials to access your account.",
    suggestion: "Don't have an account?",
    redirect: {
      title: "Sign Up",
      link: "/sign-up",
    },
  },
  "sign-up": {
    name: "sign up",
    title: "Sign Up",
    description: "Create an account to start tracking your job applications.",
    suggestion: "Already have an account?",
    redirect: {
      title: "Sign In",
      link: "/sign-in",
    },
  },
};

type Props = {
  type: keyof typeof AuthTexts;
};

const signInForm = async (formData: FormData) => {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  return signIn.email({
    email,
    password,
  });
};

const signUpForm = async (formData: FormData) => {
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  return signUp.email({
    name,
    email,
    password,
  });
};

export default function AuthForm({ type }: Props) {
  const currentAuthText = AuthTexts[type];

  const formRef = useRef<HTMLFormElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    if (!formRef.current) return;

    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(formRef.current);

    try {
      const result = await (type === "sign-up" ? signUpForm(formData) : signInForm(formData));

      if (result.error) {
        setError(result.error.message ?? `Failed to ${currentAuthText.name}`);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="flex flex-1 items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{currentAuthText.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {currentAuthText.description}
          </CardDescription>
        </CardHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <CardContent className="space-y-2">
            {error && (
              <div className="rounded-md bg-destructive/10 px-2 py-1 text-sm text-destructive">
                {error}
              </div>
            )}
            {type === "sign-up" && (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" required autoComplete="off" placeholder="John Doe" />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                required
                autoComplete="off"
                placeholder="john.doe@example.com"
                type="email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                required
                autoComplete="off"
                type="password"
                minLength={8}
              />
            </Field>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : currentAuthText.title}
            </Button>
            <div>
              <span className="text-center text-sm text-muted-foreground">
                {currentAuthText.suggestion}
              </span>
              <Button
                type="button"
                render={<Link href={currentAuthText.redirect.link} />}
                nativeButton={false}
                variant="link"
              >
                {currentAuthText.redirect.title}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
}
