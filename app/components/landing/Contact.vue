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
  <div class="card-background container mx-auto gap-16 border p-12 lg:flex">
    <div class="mb-8 lg:mb-0 lg:w-1/2">
      <h3 class="mb-4 text-3xl font-bold">Faz sentido para você?</h3>
      <p class="text-surface-700 dark:text-surface-300">
        Entre em contato agora e descubra como nosso sistema pode transformar a
        experiência de seus clientes e melhorar a gestão do seu restaurante!
      </p>
    </div>
    <div class="card flex flex-wrap gap-4 lg:w-1/2">
      <div class="flex-auto">
        <label for="nome" class="mb-2 block text-sm font-medium">Nome</label>
        <InputText v-model="formData.nome" inputId="nome" fluid />
      </div>

      <div class="flex-auto">
        <label for="nome_restaurante" class="mb-2 block text-sm font-medium">
          Nome do Restaurante
        </label>
        <InputText v-model="formData.nome_restaurante" inputId="nome" fluid />
      </div>

      <div class="flex-auto">
        <label for="telefone" class="mb-2 block text-sm font-medium">
          Telefone
        </label>
        <InputMask
          v-model="formData.telefone"
          inputId="telefone"
          mask="(99) 99999-9999"
          fluid
        />
      </div>

      <div class="flex-auto">
        <label for="email" class="mb-2 block text-sm font-medium">Email</label>
        <InputText v-model="formData.email" inputId="email" fluid />
      </div>

      <div class="flex-auto">
        <label for="message" class="mb-2 block text-sm font-medium">
          Mensagem
        </label>
        <Textarea
          inputId="message"
          v-model="formData.message"
          rows="5"
          cols="30"
          fluid
        />
      </div>

      <Button
        severity="contrast"
        icon="pi pi-send"
        class="w-full"
        label="Enviar"
      />
    </div>
  </div>
</template>
