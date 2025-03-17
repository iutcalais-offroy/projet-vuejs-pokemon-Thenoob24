import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const getPokemons = async () => {
    const response: any = await apiClient.get("pokemon-cards");
    console.log(response.data)
    return response.data;
}

export const getPokemon = async (id: string) => {
    const response: any = await apiClient.get(`pokemon-cards/${id}`);
    console.log(response.data)
    return response.data;
}

export const getAttack = async (attackId: number) => {
    const response: any = await apiClient.get(`attacks/${attackId}`);
    console.log(response.data)
    return response.data;
}

export const createDeck = async (name: string, cards: number[]) => {
    try {
        const response: any = await apiClient.post("decks", { name, cards });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating deck:', error.response ? error.response.data : error.message);
        throw error;
    }
}
