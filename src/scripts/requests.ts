const api_prod = 'https://bookmarks-list.netlify.app/api/v1/'
const api_dev = 'http://localhost:4321/api/v1/'

export const getCategories = async () => {
    try {
        const response = await fetch(api_prod + 'main-category')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getSubCategories = async () => {
    try {
        const response = await fetch(api_prod + 'sub-category')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getProviders = async () => {
    try {
        const response = await fetch(api_prod + 'providers')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
export const getMain = async () => {
    try {
        const response = await fetch(api_prod + 'main')
        const data = await response.json()
       return data
    } catch (error) {
        console.error(error)
    }
}
    
    