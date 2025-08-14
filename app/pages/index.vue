<script setup>
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
    <section>
      <LandingHero class="container mx-auto" />
    </section>

    <section class="py-12">
      <LandingStats class="container mx-auto" />
    </section>

    <!-- <section>
      <LandingSolutions class="container mx-auto" />
    </section> -->

    <!-- <section class="py-12">
      <LandingPartners class="container mx-auto" />
    </section> -->

    <!-- <section>
      <LandingInvite class="container mx-auto" />
    </section> -->

    <section class="mt-16">
      <LandingContact class="container mx-auto" v-model:formData="formData" />
    </section>
  </main>
</template>
