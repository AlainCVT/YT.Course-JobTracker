"use client";

import { Briefcase, Moon, Sun } from "lucide-react";
import Link from "next/link";

import SignOutButton from "@/components/auth/SignOutButton";
import Container from "@/components/Container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme";
import { useSession } from "@/lib/auth/auth-client";

import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const { toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container as="nav" className="flex h-16 items-center justify-between">
        <Button
          className="gap-2 py-6 text-xl font-semibold"
          render={<Link href="/" />}
          nativeButton={false}
          variant="ghost"
          size="lg"
        >
          <Briefcase className="size-8 text-primary" />
          Job Tracker
        </Button>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Button render={<Link href="/dashboard" />} nativeButton={false} variant="ghost">
                Dashboard
              </Button>
              <DropdownMenu>
                <Button
                  render={<DropdownMenuTrigger />}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
                <DropdownMenuContent className="w-3xs" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <SignOutButton />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button render={<Link href="/sign-in" />} nativeButton={false} variant="ghost">
                Log In
              </Button>
              <Button render={<Link href="/sign-up" />} nativeButton={false}>
                Start for free
              </Button>
            </>
          )}
          <Button
            aria-label="Toggle color theme"
            title="Toggle color theme"
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleTheme();
            }}
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
