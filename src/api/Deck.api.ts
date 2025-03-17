import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDecks = async () => {
    const response: any = await apiClient.get("decks");
    console.log(response.data)
    return response.data;
}

export const deleteDeck = async (id: number) => {
    try {
        const response: any = await apiClient.delete(`decks/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error deleting deck:', error.response ? error.response.data : error.message);
        throw error;
    }
}
