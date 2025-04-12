import axios from "./axios";
export async function  get(route:string) {
    try {
        const response = await axios.get(route)
        console.log(response.data.data)
        return response.data
    }
    catch (e) { 
        console.error(e)
    }
 }