import type { APIRoute } from 'astro'
import { supabase } from '../../../providers/supabase'

export const GET: APIRoute = async () => {
  
  const { data, error } = await supabase
    .rpc('get_main')
    
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data))
};

/*export const GET: APIRoute = async () => {
  
  const query = `
    SELECT
      mt.id,
      mt.name,
      mt.url,
      mt.description,
      mt.ratings,
      smt.created_timestamp,
      smt.update_timestamp,
      smt.user_id,
      mc.cat_name,
      sc.sub_cat_name
    FROM
      public.main_table mt
    JOIN
      public.sub_main_table smt
    ON
      mt.id
    =
      smt.id_src
    JOIN 
      public.main_category mc
    ON 
      mt.id_cat 
    = 
      mc.id
    JOIN 
      public.sub_category sc 
    ON 
      mt.id_sub_cat
    = 
      sc.id
  `
  
  const { data, error } = await supabase.rpc('complex_query', { query })

  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    )
  }
  console.log('Orders with customers:', data)
  return new Response(JSON.stringify(data))
};
*/

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
