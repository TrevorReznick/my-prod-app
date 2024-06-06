import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async () => {
  const { data, error } = await supabase
    .from("main_table")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ request }) => {
  const { id_cat, id_sub_cat, ratings, url, description, name } = await request.json()
  const { data, error } = await supabase
    .from('main_table')
    .insert({ id_cat, id_sub_cat, ratings, url, description, name })
    .select();

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data))
}
