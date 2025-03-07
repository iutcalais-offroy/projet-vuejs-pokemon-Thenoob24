<script setup lang="ts">
import { ref } from 'vue';
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

</script>

<template>
  <n-card :title="pokemon.name" style="width: 300px; margin: 10px;">
    <template #cover>
      <img :src="pokemon.imageUrl" alt="pokemon image" style="width: 100%; height: auto;">
    </template>
    <n-space vertical>
      <n-tag>{{ pokemon.type.name }}</n-tag>
      <n-descriptions>
        <n-descriptions-item label="Life Points">
          <n-icon><HeartOutline /></n-icon> {{ pokemon.lifePoints }}
        </n-descriptions-item>
        <n-descriptions-item label="Height">
          <n-icon><ScaleOutline /></n-icon> {{ pokemon.height }}
        </n-descriptions-item>
        <n-descriptions-item label="Weight">
          <n-icon><BarbellOutline /></n-icon> {{ pokemon.weight }}
        </n-descriptions-item>
      </n-descriptions>
    </n-space>
  </n-card>
</template>

