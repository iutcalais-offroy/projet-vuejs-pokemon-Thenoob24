<template>
  <div>
    <h1>Mes Decks</h1>
    <div v-for="deck in userDecks" :key="deck.id" style="margin: 10px;">
      <div>{{ deck.name }}</div>
      <n-button type="primary" @click="viewDeck(deck)">Voir le contenu</n-button>
      <n-button type="error" @click="deleteDeck(deck.id)">Supprimer</n-button>
    </div>
  </div>
  <n-modal v-model:show="showModal" title="Contenu du Deck">
    <div v-if="selectedDeck" class="pokemon-grid">
      <div v-for="card in selectedDeck.cards" :key="card.id" class="pokemon-card">
        <PokemonCard :pokemon="card" />
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDeckStore } from '../store/Deck.store';
import { NModal, NButton } from 'naive-ui';

const deckStore = useDeckStore();
const { userDecks } = deckStore;

const showModal = ref(false);
const selectedDeck = ref(null);

const viewDeck = (deck: any) => {
    selectedDeck.value = deck;
    showModal.value = true;
};

const deleteDeck = async (id: number) => {
    await deckStore.removeDeck(id);
};

// Fetch decks when the component is mounted
deckStore.fetchDecks();
</script>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
.pokemon-card {
  margin: 10px;
}
</style>