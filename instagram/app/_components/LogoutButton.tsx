"use client";

import { Button } from "@material-tailwind/react";
import { createBrowserSupabaseClient } from "app/_util/supabase/client";

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      className="text-lg"
      color="red"
      onClick={async () => {
        await supabase.auth.signOut();
      }}
    >
      로그아웃
    </Button>
  );
}
