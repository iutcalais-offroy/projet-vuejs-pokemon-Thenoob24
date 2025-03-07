<script setup>
import { NForm, NFormItemRow, NInput, NButton, NTabs, NTabPane, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useCreateUserStore } from "../store/User.store.ts";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const userStore = useCreateUserStore();
const { userCreated, userLoggedIn } = storeToRefs(userStore);
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const activeTab = ref('signin');
const message = useMessage();

const handleSignup = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  const formData = JSON.stringify({
    email: form.value.email,
    password: form.value.password,
  });
  try {
    await userStore.createUser(formData);
    message.success('User registered successfully!');
    activeTab.value = 'signin';
  } catch (error) {
    alert("Error creating user: " + error.message);
  }
};

const handleSignin = async () => {
  const formData = JSON.stringify({
    email: form.value.email,
    password: form.value.password,
  });
  try {
    const response = await userStore.loginUser(formData);
    localStorage.setItem('authToken', response.token);
    message.success('User logged in successfully!');
    router.push('/deckbuilder');
  } catch (error) {
    alert("Error logging in user: " + error.message);
  }
};

</script>

<template>
  <n-tabs v-model:value="activeTab">
    <n-tab-pane name="signin" tab="Se connecter">
      <n-form>
        <n-form-item-row label="Email">
          <n-input v-model:value="form.email" />
        </n-form-item-row>
        <n-form-item-row label="Mot de passe">
          <n-input type="password" v-model:value="form.password" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="handleSignin">
        Se connecter
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" tab="S'enregistrer">
      <n-form>
        <n-form-item-row label="Email">
          <n-input v-model:value="form.email" />
        </n-form-item-row>
        <n-form-item-row label="Mot de passe">
          <n-input type="password" v-model:value="form.password" />
        </n-form-item-row>
        <n-form-item-row label="Confirmer le mot de passe">
          <n-input type="password" v-model:value="form.confirmPassword" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="handleSignup">
        S'enregistrer
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>