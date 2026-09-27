"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/actions/user-auth";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await logoutUser();
        router.push("/");
        router.refresh();
      }}
      className="text-sm font-semibold text-navy-mid no-underline"
    >
      Log out
    </button>
  );
}
