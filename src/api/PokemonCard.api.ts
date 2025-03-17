import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const getPokemons = async () => {
    try {
        const response: any = await apiClient.get("pokemon-cards");
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemons:', error.response ? error.response.data : error.message);
        console.error('Error details:', error.response ? error.response : error);
        throw error;
    }
}

export const getPokemon = async (id: string) => {
    try {
        const response: any = await apiClient.get(`pokemon-cards/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching pokemon with id ${id}:`, error.response ? error.response.data : error.message);
        console.error('Error details:', error.response ? error.response : error);
        throw error;
    }
}

export const getAttack = async (attackId: number) => {
    try {
        const response: any = await apiClient.get(`attacks/${attackId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching attack with id ${attackId}:`, error.response ? error.response.data : error.message);
        console.error('Error details:', error.response ? error.response : error);
        throw error;
    }
}

export const createDeck = async (name: string, cards:any []) => {
    try {
        const response: any = await apiClient.post("decks", { name, cards });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating deck:', error.response ? error.response.data : error.message);
        console.error('Error details:', error.response ? error.response : error);
        throw error;
    }
}
