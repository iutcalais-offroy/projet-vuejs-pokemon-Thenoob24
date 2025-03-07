import {defineStore} from 'pinia';

import {ref} from 'vue';
import { getPokemon } from '../api/PokemonCard.api';

export const usePokemonCardStore = defineStore('PokemonCardStore', () => {
    const PokemonGenerated: any = ref([]);

    const generatePokemon = async () => {
        const result = await getPokemon();
        PokemonGenerated.value = result;
        console.log(result);
        return result;
    };
    return {generatePokemon };

});