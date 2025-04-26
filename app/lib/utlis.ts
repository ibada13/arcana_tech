import axios from "./axios";
export async function  get(route:string) {
    try {
        const response = await axios.get(route)
        console.log(response.data)
        return response.data
    }
    catch (e) { 
        console.error(e)
    }
}


export async function post(route: string, data: any) {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        const response = await axios.post(route, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        })

        console.log(response.data)
        return response.data
    } catch (e) {
        console.error(e)
    }
}
