import axios from 'axios';

export const loginUser = async (data:any) => {
    try {
        const apiUrl:string = process.env.VITE_API_URL as string + "users/login";
        const response: any = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}
