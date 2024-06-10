const api_prod = 'https://bookmarks-list.netlify.app/api/v1/'
const api_dev = 'http://localhost:4321/api/v1/'

export async function sendData(data: MainFormData) {
    try {
      const response = await fetch(api_prod + 'main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const result = await response.json()
      return { success: true, data: result }
    } catch (error: any) {
      console.error('There was a problem with the fetch operation:', error)
      return { success: false, error: error.message }
    }
  }

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
    
    