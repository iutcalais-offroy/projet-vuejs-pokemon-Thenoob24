<script lang="ts" setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import HeaderMenu from './components/HeaderMenu.component.vue';
import { usePokemonCardStore } from './store/PokemonCard.store';
import PokemonCard from './components/PokemonCard.component.vue';

const store = usePokemonCardStore();
store.generatePokemons();
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-layout>
        <n-layout-header>
          <HeaderMenu/>
        </n-layout-header>
        <n-layout-content class="content">
          <n-space justify="center">
            <RouterView/>
          </n-space>
          <div id="app">
            <PokemonCard v-if="store.searchedPokemon" :pokemon="store.searchedPokemon" />
            <div v-else>
              <PokemonCard v-for="pokemon in store.generatePokemons" :key="pokemon.id" :pokemon="pokemon" />
            </div>
          </div>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.content {
  margin-top: 1em;
  margin-left: 3em;
  margin-right: 3em;
}
</style>