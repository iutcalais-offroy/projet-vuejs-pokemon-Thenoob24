import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPokemons, getPokemon, getAttack, createDeck } from '../api/PokemonCard.api';
import { useMessage } from 'naive-ui';

export const usePokemonCardStore = defineStore('PokemonCardStore', () => {
    const PokemonGenerated: any = ref([]);
    const filteredPokemons: any = ref([]);
    const attackDetails: any = ref({});
    const deck: any = ref([]);
    const message = useMessage();

    const generatePokemons = async () => {
        const result = await getPokemons();
        PokemonGenerated.value = result;
        filteredPokemons.value = result;
        console.log(result);
        return result;
    };

    const generatePokemon = async (id: string) => {
        const result = await getPokemon(id);
        PokemonGenerated.value = result;
        console.log(result);
        return result;
    };

    const searchPokemon = (name: string) => {
        if (!name) {
            filteredPokemons.value = PokemonGenerated.value;
            return;
        }
        filteredPokemons.value = PokemonGenerated.value.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
        console.log(filteredPokemons.value);
    };

    const fetchAttackDetails = async (attackId: number) => {
        const result = await getAttack(attackId);
        attackDetails.value[attackId] = result;
        console.log(result);
        return result;
    };

    const addToDeck = (pokemon: any) => {
        if (!deck.value.some((p: any) => p.id === pokemon.id)) {
            deck.value.push(pokemon);
            console.log(deck.value);
        }
    };

    const removeFromDeck = (pokemon: any) => {
        deck.value = deck.value.filter((p: any) => p.id !== pokemon.id);
        console.log(deck.value);
    };

    const saveDeck = async (name: string) => {
        try {
            const cardIds = deck.value.map((pokemon: any) => pokemon.id);
            const result = await createDeck(name, cardIds);
            message.success('Deck saved successfully!');
            console.log(result);
            return result;
        } catch (error) {
            message.error('Failed to save deck. Please try again.');
            console.error('Error saving deck:', error);
        }
    };

    return { generatePokemons, generatePokemon, searchPokemon, fetchAttackDetails, addToDeck, removeFromDeck, saveDeck, filteredPokemons, attackDetails, deck };
});