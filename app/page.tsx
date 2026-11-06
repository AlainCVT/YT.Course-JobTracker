import { ArrowRight, Briefcase, CheckCircle2, type LucideIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

type FeatureData = {
  icon: LucideIcon;
  title: ReactNode;
  text: ReactNode;
};

const FEATURES: FeatureData[] = [
  {
    icon: Briefcase,
    title: "Organize Applications",
    text: "Create custom boards and columns to track your job applications at every stage of the process.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    text: "Monitor your application status from applied to interview to offer with visual Kanban boards.",
  },
  {
    icon: CheckCircle2,
    title: "Stay Organized",
    text: "Never lose track of an application. Keep all your job search information in one centralized place.",
  },
];

const Feature = ({ icon: Icon, title, text }: FeatureData) => (
  <div className="flex flex-col">
    <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="size-6 text-primary" />
    </div>
    <h3 className="mt-4 mb-3 text-2xl font-semibold text-black">{title}</h3>
    <p className="text-muted-foreground">{text}</p>
  </div>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Container as="section" className="py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-6xl font-bold">A better way to track your job application.</h1>
            <p className="mt-6 mb-10 text-xl text-muted-foreground">
              Capture, organize, and manage your job search in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                render={<Link href="/sign-up" />}
                nativeButton={false}
                size="lg"
                className="flex h-12 items-center gap-2 px-4 text-lg font-medium"
              >
                Start for free <ArrowRight />
              </Button>
              <span className="text-sm text-muted-foreground">
                Free forever. No credit card required.
              </span>
            </div>
          </div>
        </Container>
        <div className="border-t py-24">
          <Container as="section" className="grid gap-12 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <Feature key={`feature-${index}`} {...feature} />
            ))}
          </Container>
        </div>
      </main>
    </div>
  );
}
