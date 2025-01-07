<script setup lang="ts">
import FranquiaService from '@/services/FranquiaService';
import UnidadeService from '@/services/UnidadeService';
import type { UnidadeRequest } from '@/types/Unidade';
import { useUnidadeStore } from '@/stores/unidadeStore';

definePageMeta({
  layout: false,
  middleware: ['authenticated'],
});

const formData = ref<UnidadeRequest>({
  // * STEP 1 (Nome e franquia)
  nome_fantasia: '',

  // * STEP 2 (Associação)
  franquia_id: null,

  // * STEP 3 (Contato)
  telefone: '',
  email: '',

  // * STEP 4 (Localização)
  cidade: '',
  logradouro: '',
  cep: '',
});

const unidadeStore = useUnidadeStore();
const handleSubmitLoading = ref<boolean>(false);
const franquiasData = ref<any[]>([]);

const handleSubmit = async () => {
  handleSubmitLoading.value = true;

  try {
    const res = await UnidadeService.create(formData.value);
    console.log(res);
    unidadeStore.setUnidade(res);
    navigateTo('/admin/home/');
  } catch (error) {
    console.error(error);
  } finally {
    handleSubmitLoading.value = false;
  }
};

const getFranquias = async () => {
  try {
    franquiasData.value = await FranquiaService.getAll();
    console.log(franquiasData.value);
  } catch (error) {
    console.error(error);
  }
};

// const formRules = {
//   nome_fantasia: computed(() => !formData.value.nome_fantasia),
// };

const formRulesNomeFantasia = computed(
  () =>
    formData.value.nome_fantasia.length <= 3 ||
    formData.value.nome_fantasia.length > 21,
);

const handleCep = async (cep: string) => {
  if (!cep || cep.length !== 9) return; // Verifica se o CEP está completo (99999-999)
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`,
    );
    const data = await response.json();
    if (data.erro) {
      console.error('CEP inválido');
      return;
    }
    formData.value.cidade = data.localidade || '';
    formData.value.logradouro = data.logradouro || '';
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
  }
};

watch(
  () => formData.value.cep,
  (newCep) => {
    handleCep(newCep);
  },
);

onMounted(() => {
  getFranquias();
});
</script>

<template>
  <div class="h-screen w-screen dark:bg-surface-900">
    <div class="container mx-auto h-full pt-8">
      <Stepper value="1">
        <StepList>
          <Step value="1">Nome</Step>
          <Step value="2">Franquia</Step>
          <Step value="3">Contato</Step>
          <Step value="4">Localização</Step>
        </StepList>

        <StepPanels>
          <StepPanel
            v-slot="{ activateCallback }"
            value="1"
            class="container mx-auto mt-8 flex max-w-xl flex-col items-center gap-4"
          >
            <h1 class="mb-8 text-xl">Nomeie sua unidade</h1>

            <InputText
              v-model="formData.nome_fantasia"
              name="nome"
              type="text"
              placeholder="Nome fantasia"
              class="w-full text-center"
            />

            <p class="mb-8 text-xs">
              Esse nome pode ser qualquer coisa e será exibido para os usuários
              da plataforma.
            </p>

            <Button
              label="Próximo"
              color="primary"
              size="small"
              class="w-28"
              :disabled="formRulesNomeFantasia"
              @click="activateCallback('2')"
            />
          </StepPanel>

          <StepPanel
            v-slot="{ activateCallback }"
            value="2"
            class="container mx-auto mt-8 flex max-w-xl flex-col items-center gap-4"
          >
            <h1 class="mb-8 text-xl">Deseja associar a uma franquia?</h1>

            <Select
              v-model="formData.franquia_id"
              name="franquia_id"
              :options="[
                {
                  id: null,
                  nome_fantasia: 'Nenhuma',
                },
                ...franquiasData,
              ]"
              optionLabel="nome_fantasia"
              optionValue="id"
              placeholder="Sem franquia"
              class="w-full text-center"
            />

            <p class="mb-8 text-xs">
              É possível fazer uma dissociação pelo página de edição da unidade.
            </p>

            <div class="flex gap-4">
              <Button
                label="Voltar"
                severity="secondary"
                size="small"
                class="w-28"
                @click="activateCallback('1')"
              />
              <Button
                label="Próximo"
                size="small"
                class="w-28"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>

          <StepPanel
            v-slot="{ activateCallback }"
            value="3"
            class="container mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 text-center"
          >
            <h1 class="mb-8 text-xl">Contato</h1>

            <!-- <InputText
              v-model="formData.telefone"
              name="telefone"
              type="text"
              placeholder="Telefone"
              class="w-full"
            /> -->
            <InputMask
              v-model="formData.telefone"
              inputId="telefone"
              mask="(99) 99999-9999"
              fluid
              placeholder="Telefone"
            />

            <InputText
              v-model="formData.email"
              name="email"
              type="email"
              placeholder="E-mail"
              fluid
            />

            <p class="mb-8 text-xs">
              Por padrão é visível a todos que acessam a unidade.
            </p>

            <div class="flex gap-4">
              <Button
                label="Voltar"
                severity="secondary"
                size="small"
                class="w-28"
                @click="activateCallback('2')"
              />
              <Button
                label="Continuar"
                size="small"
                class="w-28"
                @click="activateCallback('4')"
              />
            </div>
          </StepPanel>

          <StepPanel
            v-slot="{ activateCallback }"
            value="4"
            class="container mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 text-center"
          >
            <h1 class="mb-8 text-xl">Localização</h1>

            <!-- CEP com InputMask -->
            <InputMask
              v-model="formData.cep"
              inputId="cep"
              mask="99999-999"
              fluid
              placeholder="CEP"
            />

            <InputText
              v-model="formData.cidade"
              name="cidade"
              type="text"
              placeholder="Cidade"
              class="w-full"
            />

            <InputText
              v-model="formData.logradouro"
              name="logradouro"
              type="text"
              placeholder="Logradouro"
              class="w-full"
            />

            <p class="mb-8 text-xs">
              Por padrão é visível a todos que acessam a unidade.
            </p>

            <div class="flex gap-4">
              <Button
                label="Voltar"
                severity="secondary"
                size="small"
                class="w-28"
                @click="activateCallback('3')"
              />
              <Button
                label="Concluir"
                size="small"
                class="w-28"
                :loading="handleSubmitLoading"
                @click="handleSubmit"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>
