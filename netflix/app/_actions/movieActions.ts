"use server";

import { createServerSupabaseClient } from "../_util/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovies({ searchInput = "" }) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .ilike("title", `%${searchInput.toLowerCase()}%`);

  if (error) {
    handleError(error);
  }

  return data;
}

export async function getMoviesById(id: number) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("movie").select("*").eq("id", id);

  if (error) {
    handleError(error);
  }

  return data;
}
