"use client";

import { Home, People, Search, Send, Logout } from "@mui/icons-material";
import { createBrowserSupabaseClient } from "app/_util/supabase/client";
import Link from "next/link";

export default function SideBar() {
  const supabase = createBrowserSupabaseClient();

  return (
    <div className="flex flex-col justify-between h-screen p-6 border-r border-gray-300">
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          <Home className="text-3xl mb-10" />
        </Link>
        <Link href={"/people"}>
          <People className="text-3xl" />
        </Link>
        <Link href={"/discover"}>
          <Search className="text-3xl" />
        </Link>
        <Link href={"/chat"}>
          <Send className="text-3xl" />
        </Link>
      </div>
      <div
        className="cursor-pointer"
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        <Logout className="text-3xl" />
      </div>
    </div>
  );
}
