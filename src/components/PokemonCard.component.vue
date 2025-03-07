<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { NCard, NSpace, NTag, NDescriptions, NDescriptionsItem, NIcon } from 'naive-ui';
import { HeartOutline, ScaleOutline, BarbellOutline } from '@vicons/ionicons5';

const props = defineProps<{
  pokemon: {
    id: number,
    name: string,
    pokedexId: number,
    type: { id: number, name: string },
    imageUrl: string,
    lifePoints: number,
    attackId: number,
    height: number,
    weight: number,
  },
}>();

const cardColor = computed(() => {
  switch (props.pokemon.type.name.toLowerCase()) {
    case 'fire':
      return '#F08030'; // Fire type color
    case 'water':
      return '#6890F0'; // Water type color
    case 'grass':
      return '#78C850'; // Grass type color
    case 'electric':
      return '#F8D030'; // Electric type color
    case 'normal':
      return '#A8A878'; // Normal type color
    case 'bug':
      return '#A8B820'; // Bug type color
    case 'poison':
      return '#A040A0'; // Poison type color
    // Add more types as needed
    default:
      return 'gray';
  }
});

const tagBorderColor = computed(() => {
  switch (props.pokemon.type.name.toLowerCase()) {
    case 'fire':
      return '#A04000'; // Darker fire type color
    case 'water':
      return '#0050A0'; // Darker water type color
    case 'grass':
      return '#507C30'; // Darker grass type color
    case 'electric':
      return '#A08000'; // Darker electric type color
    case 'normal':
      return '#707058'; // Darker normal type color
    case 'bug':
      return '#707810'; // Darker bug type color
    case 'poison':
      return '#602060'; // Darker poison type color
    // Add more types as needed
    default:
      return 'black';
  }
});
</script>

<template>
  <n-card :title="pokemon.name" :style="{ width: '300px', margin: '10px', backgroundColor: cardColor, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', height: '500px' }">
    <template #cover>
      <div style="border: 2px solid black; background-color: white; padding: 5px; border-radius: 10px; width: 90%; margin: 0 auto;">
        <img :src="pokemon.imageUrl" alt="pokemon image" style="width: 100%; height: auto; border-radius: 10px;">
      </div>
    </template>
    <n-space vertical style="padding: 10px;">
      <n-tag :style="{ fontSize: '1.2em', fontWeight: 'bold', backgroundColor: cardColor,textColor:'white', borderWidth: '2px', borderStyle: 'solid' }">{{ pokemon.type.name }}</n-tag>
      <n-descriptions label-align="left" content-align="right" column="3">
        <n-descriptions-item label="Life Points">
          <n-icon><HeartOutline /></n-icon> {{ pokemon.lifePoints }}
        </n-descriptions-item>
        <n-descriptions-item label="Height">
          <n-icon><ScaleOutline /></n-icon> {{ pokemon.height }} m
        </n-descriptions-item>
        <n-descriptions-item label="Weight">
          <n-icon><BarbellOutline /></n-icon> {{ pokemon.weight }} kg
        </n-descriptions-item>
      </n-descriptions>
    </n-space>
  </n-card>
</template>

