"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRedirectAfterAuth } from "@/hooks/useRedirectAfterAuth";
import { signOut } from "@/lib/auth/auth-client";

export default function SignOutButton() {
  const setRedirectAfterSignOut = useRedirectAfterAuth("/dashboard", false);

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          setRedirectAfterSignOut(true);
        } else {
          alert("Error signing out");
        }
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
}
