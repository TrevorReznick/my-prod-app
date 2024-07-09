import type { APIRoute } from 'astro'

//const thumbnail_ws_api_key = import.meta.env.PUBLIC_THUMBNAIL_WS_API_KEY

export const GET: APIRoute = async (request) => {
    console.log('Get Screenshot Api!')
    const url = new URL(request.url)
    console.log('url', url)
    let temp: any = url.searchParams.get('url')
    const siteUrl = encodeURIComponent(temp)
    //console.log('siteUrl', siteUrl)
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
        
        //const response = await fetch(`https://api.thumbnail.ws/api/${thumbnail_ws_api_key}/thumbnail/get?url=${encodeURIComponent(siteUrl)}&width=200`)
        const url = `https://url-screenshot-api1.p.rapidapi.com/screenshot?url=${siteUrl}`
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '379bce5eb3msh4d699d2b4e5eadcp156716jsnad3b8f073b87',
                'x-rapidapi-host': 'url-screenshot-api1.p.rapidapi.com'
            }
        }
        const response = await fetch(url, options)
        const buffer = await response.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
          
        
        /*
        const result = await response.text()
        console.log('result??? ', result) 
        */
         

        return new Response(
            JSON.stringify({
                message: 'Screenshot Api request done!',
                data: `data:image/jpeg;base64, ${base64Image}`
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

