"use client";

import { Briefcase } from "lucide-react";
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
import { useSession } from "@/lib/auth/auth-client";

import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container as="nav" className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Button render={<Link href="/dashboard" />} nativeButton={false} variant="ghost">
                Dashboard
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
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
        </div>
      </Container>
    </header>
  );
}
