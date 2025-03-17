<script lang="ts" setup>
import { ref, watch } from 'vue';
import PokemonCard from "../components/PokemonCard.component.vue";
import { usePokemonCardStore } from "../store/PokemonCard.store.ts";
import { storeToRefs } from "pinia";
import { NModal, NButton } from 'naive-ui';

const PokemonCardStore = usePokemonCardStore();
const { filteredPokemons, deck } = storeToRefs(PokemonCardStore);

const searchQuery = ref('');
const showModal = ref(false);
const showPlusSymbol = ref(true);
const deckName = ref('');

watch(searchQuery, (newQuery) => {
  PokemonCardStore.searchPokemon(newQuery);
});

// Call generatePokemons when the component is mounted
PokemonCardStore.generatePokemons();

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const pokemonData = event.dataTransfer?.getData('pokemon');
  if (pokemonData) {
    const pokemon = JSON.parse(pokemonData);
    PokemonCardStore.addToDeck(pokemon);
    showPlusSymbol.value = false;
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDragLeave = (event: DragEvent) => {
  const pokemonData = event.dataTransfer?.getData('pokemon');
  if (pokemonData) {
    const pokemon = JSON.parse(pokemonData);
    PokemonCardStore.removeFromDeck(pokemon);
  }
};

const saveDeck = async () => {
  try {
    await PokemonCardStore.saveDeck(deckName.value);
    console.log('Deck saved successfully!');
  } catch (error) {
    console.error('Failed to save deck. Please try again.');
  }
};
</script>

<template>
  <div>
    <h1> Crée un deck </h1>
    <n-input v-model:value="deckName" placeholder="nom du deck" style="width: 1000px;" />
    <n-button type="primary" @click="saveDeck">Sauvegarder</n-button>
    <n-button type="primary" @click="showModal = true">Voir le deck</n-button>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>Deck</h1>
    <div style="display: flex; flex-wrap; wrap; justify-content: center; border: 2px dashed #ccc; padding: 20px; min-height: 200px; width: 80%; transition: all 0.3s; position: relative;" @drop="handleDrop" @dragover="handleDragOver" @dragleave="handleDragLeave">
      <div v-if="showPlusSymbol" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2em; color: #ccc;">+</div>
      <div v-for="pokemon in deck" :key="pokemon.id" style="margin: 10px;">
        <PokemonCard :pokemon="pokemon" :isDeckCard="true"/>
      </div>
    </div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>Liste des Pokemons</h1>
    <n-input v-model:value="searchQuery" placeholder="Search for a Pokemon" style="width: 1000px;" />
  </div>
  <div class="pokemon-grid">
    <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="pokemon-card">
      <PokemonCard :pokemon="pokemon"/>
    </div>
  </div>
 
  <n-modal v-model:show="showModal" title="Deck">
    <div style="display: flex; flex-wrap; justify-content: center;">
      <div v-for="pokemon in deck" :key="pokemon.id" style="margin: 10px;">
        <PokemonCard :pokemon="pokemon" :isDeckCard="true"/>
      </div>
    </div>
  </n-modal>
</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.pokemon-card {
  margin: 10px;
}
</style>