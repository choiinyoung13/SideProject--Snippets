'use server'

import { createServerSupabaseClient } from '../_util/supabase/server'

function handleError(error) {
  if (error) {
    console.error(error)
    throw error
  }
}

export async function getMovies({ searchInput = '', page, pageSize }) {
  const supabase = await createServerSupabaseClient()
  const { data, count, error } = await supabase
    .from('movie')
    .select('*')
    .ilike('title', `%${searchInput.toLowerCase()}%`)
    .range((page - 1) * pageSize, page * pageSize - 1)

  const hasNextPage = count > page * pageSize

  if (error) {
    handleError(error)
  }

  return { data, page, pageSize, hasNextPage }
}

export async function getMoviesById(id: number) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.from('movie').select('*').eq('id', id)

  if (error) {
    handleError(error)
  }

  return data
}
