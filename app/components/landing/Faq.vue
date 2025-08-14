<script setup>
import { ref } from 'vue';

const tabs = ref([
  {
    title: 'Vocês acompanham nossa operação?',
    content:
      'Claro! Nos primeiros dias de operação, pelo menos, um membro de nossa equipe fará um treinamento e acompanhará você e sua equipe na utilização do totem. Na ocasião, tiraremos todas as dúvidas e explicaremos as funcionalidades.',
    value: '0',
  },
  {
    title: 'Como consigo ver minhas vendas? E relatórios?',
    content:
      'Temos um sistema completo por meio do qual você consegue ver e gerenciar suas vendas, extrair relatórios, configurar pratos, cadastros e muito mais, tudo de maneira remota, de onde você estiver. O melhor é que enviamos o fechamento diário no seu WhatsApp: mais praticidade para você.',
    value: '1',
  },
  {
    title: 'Quais são os meios de pagamentos aceitos? E as taxas do cartão?',
    content:
      'Aceitamos os mesmos métodos de pagamento e taxas que seu restaurante já tem, não interferimos em nada. Isso quer dizer que o totem fará a leitura dos cartões que você já aceita, com as mesmas taxas já negociadas junto às empresas de máquinas de cartão e/ou vouchers (vale-refeição). É legal avisá-lo de que também oferecemos soluções de pagamento exclusivas, que podem ter taxas mais interessantes para seu negócio. Fale com um de nossos representantes quando for nos contratar.',
    value: '2',
  },
]);
</script>

<template>
  <div>
    <h3 class="mb-6 text-center text-4xl font-semibold">
      Perguntas frequentes
    </h3>
    <div class="card-background mb-8 p-8">
      <div class="card">
        <Accordion value="0">
          <AccordionPanel
            v-for="tab in tabs"
            :key="tab.title"
            :value="tab.value"
          >
            <AccordionHeader>
              {{ tab.title }}
            </AccordionHeader>
            <AccordionContent>
              <p class="m-0 text-surface-700 dark:text-surface-300">
                {{ tab.content }}
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <div class="card-base flex flex-col items-center p-8">
      <AvatarGroup class="mb-4">
        <Avatar image="/victor.jpg" size="large" shape="circle" />
        <Avatar image="/luis.jpg" size="large" shape="circle" />
        <Avatar image="/paulo.jpg" size="large" shape="circle" />
        <Avatar image="/luiz.jpg" size="large" shape="circle" />
        <Avatar icon="pi pi-user" size="large" shape="circle" />
      </AvatarGroup>
      <h3
        class="mb-4 text-lg font-medium text-surface-900 dark:text-surface-50"
      >
        Alguma pergunta não respondida?
      </h3>
      <p class="mb-8 text-center text-surface-700 dark:text-surface-200">
        Fale conosco! Estamos prontos para te ajudar.
      </p>
      <Button
        icon="pi pi-send"
        severity="contrast"
        label="Entre em contato"
        type="button"
      />
    </div>
  </div>
</template>
