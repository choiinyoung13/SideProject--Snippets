import LogoutButton from "./_components/LogoutButton";
import { createServerSupabaseClient } from "./_util/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <p className="text-xl font-bold mb-4">{`Welcome ${
        session?.user.email.split("@")[0]
      }`}</p>
      <LogoutButton />
    </main>
  );
}
