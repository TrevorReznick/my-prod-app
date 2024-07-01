import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async () => {
  
  const { data, error } = await supabase
    //.rpc('get_main')    
    .from("main_category")
    .select(`
      main_category.*,
      sub_category:sub_category_id(*)
    `)
    .order("id", { ascending: true });
    
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

export const POST: APIRoute = async ({ request }) => {
  const { id_cat, id_sub_cat, ratings, url, description, name, id_provider, user_id } = await request.json()
  const { data, error } = await supabase
    .from('main_table')
    .insert({ id_cat, id_sub_cat, ratings, url, description, name, id_provider, user_id })
    .select()

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
