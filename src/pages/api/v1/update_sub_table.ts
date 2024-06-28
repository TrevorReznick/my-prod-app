import type { APIRoute } from 'astro';
import { supabase } from '../../../providers/supabase'

export const POST: APIRoute = async ({ request }) => {
  console.log('request', request)
  const { id_src, user_id} = await request.json()

  const { data, error } = await supabase
      .from('sub_main_table')
      .upsert({ id_src: id_src, user_id: user_id })
      .eq('id_src', id_src)
      .select()
      
  if (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 },
    )
  }
  return new Response(JSON.stringify(data))

}