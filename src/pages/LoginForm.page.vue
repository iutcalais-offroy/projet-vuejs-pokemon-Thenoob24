<script setup>
import { NForm, NFormItemRow, NInput, NButton, NTabs, NTabPane } from 'naive-ui';
</script>

<template>
  <n-tabs>
    <n-tab-pane name="signin" tab="Se connecter">
      <n-form>
        <n-form-item-row label="Email">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Mot de passe">
          <n-input type="password" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong>
        Se connecter
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" tab="S'enregistrer">
      <n-form>
        <n-form-item-row label="Email">
          <n-input />
        </n-form-item-row>
        <n-form-item-row label="Mot de passe">
          <n-input type="password" />
        </n-form-item-row>
        <n-form-item-row label="Confirmer le mot de passe">
          <n-input type="password" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong>
        S'enregistrer
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>