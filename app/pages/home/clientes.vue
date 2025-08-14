<script setup>
definePageMeta({
  layout: 'home',
});

const {
  data: clientesData,
  pending: clientesPending,
  refresh: clientesRefresh,
} = await useFetchData('/clientes', {
  transform: (data) => data.data,
});

const formData = ref({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
});

const modalVisible = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  postCliente();
};

const postCliente = async () => {
  try {
    const { data } = await useFetchData('/clientes', {
      method: 'POST',
      body: formData.value,
    });
    console.log('Cliente cadastrado com sucesso', data);
    clientesRefresh();
  } catch (error) {
    console.log('Erro ao cadastrar cliente', error);
  }
};

const deleteCliente = async (id) => {
  try {
    const res = await useFetchData(`/clientes?id=${id}`, {
      method: 'DELETE',
    });
    console.log('Cliente deletado com sucesso', res);
    clientesRefresh();
  } catch (error) {
    console.log('Erro ao deletar cliente', error);
  }
};

const clientesTable = [
  { field: 'nome', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'telefone', header: 'Telefone' },
  { field: 'cpf', header: 'Cpf' },
];
</script>

<template>
  <Button label="Adicionar cliente" @click="modalVisible = true" />
  <h3 v-if="clientesPending">Carregando...</h3>
  <div v-else class="card">
    <DataTable :value="clientesData" size="large">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Clientes</span>
          <Button
            icon="pi pi-refresh"
            rounded
            raised
            @click="clientesRefresh"
          />
        </div>
      </template>
      <Column
        v-for="col of clientesTable"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      />
      <Column>
        <template #body="{ data }">
          <Button icon="pi pi-trash" @click="deleteCliente(data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="modalVisible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <label for="nome">Nome</label>
        <InputText
          id="nome"
          v-model="formData.nome"
          aria-describedby="nome-help"
        />
        <small id="nome-help">Informe o nome do cliente.</small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="categoria">E-mail</label>
        <InputText
          id="email"
          v-model="formData.email"
          aria-describedby="email-help"
        />
        <small id="email-help">Informe o e-mail do cliente.</small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="telefone">Telefone</label>
        <InputText
          id="telefone"
          v-model="formData.telefone"
          aria-describedby="telefone-help"
        />
        <small id="telefone-help">Informe o telefone do cliente.</small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="cpf">Cpf</label>
        <InputText
          id="cpf"
          v-model="formData.cpf"
          aria-describedby="cpf-help"
        />
        <small id="cpf-help">Informe o cpf do cliente.</small>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="modalVisible = false"
        />
        <Button
          type="button"
          label="Adicionar"
          @click="
            modalVisible = false;
            handleSubmit();
          "
        />
      </div>
    </div>
  </Dialog>
</template>
