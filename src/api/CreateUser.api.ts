import axios from 'axios';

export const createUser = async (data:any) => {
    try {
        const apiUrl:string = process.env.VITE_API_URL as string + "users";
        const response: any = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
