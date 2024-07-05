import type { APIRoute } from 'astro'

//PUBLIC_THUMBNAIL_WS_API_KEY

const thumbnail_ws_api_key = import.meta.env.PUBLIC_THUMBNAIL_WS_API_KEY

export const GET: APIRoute = async (request) => {

    console.log('Welcome to our API!')

    const url = new URL(request.url)
    console.log('url', url)
    const siteUrl = url.searchParams.get('url')
    console.log('siteUrl', siteUrl)

    if (!siteUrl) {
        return new Response(
            JSON.stringify({
                error: 'Missing URL parameter',
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }

    try {
        
        const response = await fetch(`https://api.thumbnail.ws/api/${thumbnail_ws_api_key}/thumbnail/get?url=${encodeURIComponent(siteUrl)}&width=200`)        
        
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()

        return new Response(
            JSON.stringify({
                message: 'Welcome to our API!',
                data: data,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}
