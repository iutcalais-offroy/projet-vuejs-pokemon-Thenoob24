import axios from 'axios';

export const getPokemon = async () => {
    const apiUrl:string = process.env.VITE_API_URL as string + "pokemon-cards";
    const response: any = await axios.get(apiUrl);
    console.log(response.data)
    return response.data;
}
