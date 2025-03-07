<script lang="ts" setup>
import { ref, watch } from 'vue';
import PokemonCard from "../components/PokemonCard.component.vue"
import { usePokemonCardStore } from "../store/PokemonCard.store.ts"
import {storeToRefs} from "pinia";

const PokemonCardStore = usePokemonCardStore();
const { PokemonGenerated } = storeToRefs(PokemonCardStore);

const Pokemons = ref([]);

watch(PokemonGenerated, (newVal) => {
  Pokemons.value = newVal;
});

// Call generatePokemon when the component is mounted
PokemonCardStore.generatePokemon().then(result => {
  Pokemons.value = result;
});

</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap;">
      <div v-for="pokemon in Pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>