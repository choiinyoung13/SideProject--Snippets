"use server";

import { createServerSupabaseClient } from "../_util/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const files = formData.getAll("files") as File[];

  const uploadPromises = files.map(async (file) => {
    await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
      .upload(file.name, file, { upsert: true });
  });

  const results = await Promise.all(uploadPromises);
  return results;
}

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, {
      search,
    });

  handleError(error);

  return data;
}

export async function deleteFiles(fileName: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([fileName]);

  handleError(error);

  return data;
}
