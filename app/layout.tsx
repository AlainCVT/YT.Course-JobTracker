import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/theme";
import { cn } from "@/lib/utils";

const robotoHeading = Roboto({ subsets: ["latin"], variable: "--font-heading" });

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Job Application Tracker",
    template: "%s | Job Tracker",
  },
  description:
    "Organize your job search with a free job application tracker. Manage applications, follow interview progress, and keep every opportunity in one place.",
  applicationName: "Job Tracker",
  keywords: [
    "job application tracker",
    "job search organizer",
    "application tracking",
    "job hunt Kanban board",
  ],
  openGraph: {
    type: "website",
    siteName: "Job Tracker",
    title: "Free Job Application Tracker",
    description:
      "Organize your job search, track applications, and follow every opportunity from application to offer.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Free Job Application Tracker",
    description:
      "Organize your job search, track applications, and follow every opportunity from application to offer.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        geist.variable,
        robotoHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
