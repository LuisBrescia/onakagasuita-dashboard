import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast'; 

export const useReservaStore = defineStore('reservaStore', {
  state: () => ({
    reservaData: {
      cliente_id: null as number | null,
      unidade_id: 0,
      salao_id: 0,
      horario_selecionado: '',
      num_mesas: 1,
      email: '',
    },
    reservaSuccess: false,
  }),
  getters: {
    reserva: (state) => state.reservaData,
    success: (state) => state.reservaSuccess,
  },
  actions: {
    async confirmarReserva(toast: any) {
      try {
        const reservaData = this.reservaData;

        const response = await fetch('/api/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservaData),
        });

        // Verifique o tipo de conteúdo da resposta
        if (response.ok) {
          const contentType = response.headers.get('Content-Type');
          
          // Verifique se a resposta é JSON
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            toast.add({
              severity: 'success',
              summary: 'Reserva Confirmada!',
              detail: 'Sua reserva foi realizada com sucesso!',
            });
            this.reservaSuccess = true;
          } else {
            // Se não for JSON, registre o conteúdo como texto
            const text = await response.text();
            console.error('Resposta não JSON:', text); // Log do erro
            throw new Error(`Resposta inesperada do servidor: ${text}`);
          }
        } else {
          // Caso de erro no servidor
          const errorData = await response.text(); // Usar text() para capturar HTML
          console.error('Erro ao fazer a reserva:', errorData); // Log do erro
          throw new Error(errorData || 'Erro desconhecido ao fazer a reserva');
        }
      } catch (error: any) {
        console.error('Erro ao fazer a reserva:', error);
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message || 'Não foi possível realizar a reserva. Tente novamente.',
        });
        this.reservaSuccess = false;
      }
    },
  },
  persist: true,
});
