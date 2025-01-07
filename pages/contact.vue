<script setup>
import { reactive } from 'vue';

const formData = reactive({
  nome: '',
  email: '',
  nome_restaurante: '',
  telefone: '',
  message: '',
});
</script>

<template>
  <main>
    <section class="mt-16">
      <LandingContact class="container mx-auto" v-model:formData="formData" />
    </section>
  </main>
</template>
