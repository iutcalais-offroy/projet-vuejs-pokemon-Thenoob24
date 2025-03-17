import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getDecks, deleteDeck } from '../api/Deck.api';

export const useDeckStore = defineStore('DeckStore', () => {
    const decks: any = ref([]);
    const userId = ref(localStorage.getItem('userId'));

    const fetchDecks = async () => {
        const result = await getDecks();
        decks.value = result;
        console.log(result);
        return result;
    };

    const removeDeck = async (id: number) => {
        try {
            await deleteDeck(id);
            decks.value = decks.value.filter((deck: any) => deck.id !== id);
            console.log(`Deck ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting deck:', error);
        }
    };

    const userDecks = computed(() => {
        return decks.value.filter((deck: any) => deck.userId === userId.value);
    });

    return { fetchDecks, removeDeck, userDecks };
});
