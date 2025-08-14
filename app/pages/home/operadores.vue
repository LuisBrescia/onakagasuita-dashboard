<script setup lang="ts">
definePageMeta({
  layout: 'home',
});

const modalVisible = ref(false);

const formData = ref({
  nome: '',
  cpf: '',
  email: '',
  login: '',
  senha: '',
  unidade_id: '',
});

const {
  data: operadoresData,
  pending: operadoresPending,
  refresh: operadoresRefresh,
} = await useFetchData('/operadores', {
  transform: (data: any) => data.data,
});

const operadoresTable = [
  { field: 'nome', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'status', header: 'Status' },
  { field: 'cpf', header: 'CPF' },
  { field: 'unidade_id', header: 'Unidade ID' },
];

const handleSubmit = async (event: MouseEvent) => {
  event.preventDefault();
  postOperador();
};

const postOperador = async () => {
  try {
    const { data } = await useFetchData('/operadores', {
      method: 'POST',
      body: formData.value,
    });
    console.log('Operador cadastrado com sucesso', data);
    operadoresRefresh();
  } catch (error) {
    console.log('Erro ao cadastrar operador', error);
  }
};
</script>

<template>
  <div>
    <Button
      label="Adicionar Operador"
      class="mb-4 flex gap-4"
      @click="modalVisible = true"
    />

    <h3 v-if="operadoresPending">Carregando...</h3>

    <div v-else class="card">
      <DataTable :value="operadoresData" showGridlines>
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Unidades</span>
            <Button
              icon="pi pi-refresh"
              rounded
              raised
              @click="operadoresRefresh()"
            />
          </div>
        </template>
        <Column
          v-for="col of operadoresTable"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        />
      </DataTable>
    </div>

    <Dialog
      v-model:visible="modalVisible"
      modal
      header="Adicionar Operador"
      :style="{ width: '35rem' }"
    >
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <label for="login">Nome</label>
          <InputText
            id="nome"
            v-model="formData.nome"
            aria-describedby="nome-help"
          />
          <small id="nome-help">Informe o nome do operador.</small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">CPF</label>
          <InputText
            id="cpf"
            v-model="formData.cpf"
            aria-describedby="cpf-help"
          />
          <small id="cpf-help">Informe o cpf do operador.</small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">E-mail</label>
          <InputText
            id="email"
            v-model="formData.email"
            aria-describedby="email-help"
          />
          <small id="email-help">Informe o email do operador.</small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">Unidade ID</label>
          <InputText
            id="unidade_id"
            v-model="formData.unidade_id"
            aria-describedby="unidade_id-help"
          />
          <small id="cpf-help">
            Informe o id da unidade que será gerenciada pelo operador.
          </small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">Login</label>
          <InputText
            id="login"
            v-model="formData.login"
            aria-describedby="login-help"
          />
          <small id="nome_fantasia-help">
            Informe o login que o usuário utilizará para entrar no painel
            operacional.
          </small>
        </div>

        <div class="flex flex-col gap-2">
          <label for="senha">Senha</label>
          <InputText
            id="senha"
            v-model="formData.senha"
            aria-describedby="senha-help"
          />
          <small id="categoria-help">
            Informe a senha que o usuário utilizará para entrar no painel
            operacional.
          </small>
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            @click="modalVisible = false"
          />
          <Button type="button" label="Adicionar" @click="handleSubmit" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
