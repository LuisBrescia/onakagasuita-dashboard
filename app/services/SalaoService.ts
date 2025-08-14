import type { Salao, SalaoRequest } from '@@/types/Salao';

const SalaoService = {
  getAll: async (): Promise<Salao[]> => {
    const { data } = await useApiRequest<Salao[]>('/saloes', {
      method: 'GET',
    });

    return data;
  },

  get: async (salaoId: number): Promise<Salao> => {
    const { data } = await useApiRequest<Salao>(`/saloes/${salaoId}`, {
      method: 'GET',
    });

    return data;
  },

  create: async (salao: SalaoRequest): Promise<Salao> => {
    const { data } = await useApiRequest<Salao>('/saloes', {
      method: 'POST',
      body: salao,
    });

    return data;
  },

  update: async (id: number, salao: SalaoRequest): Promise<Salao> => {
    const { data } = await useApiRequest<Salao>(`/saloes/${id}`, {
      method: 'PUT',
      body: salao,
    });

    return data;
  },

  delete: async (id: number): Promise<void> => {
    await useApiRequest<void>(`/saloes/${id}`, {
      method: 'DELETE',
    });
  },

  getLayout: async (salaoId: number) => {
    const res = await useApiRequest<string>(`/saloes/${salaoId}/layout`);

    return res;
  },

  saveLayout: async (salaoId: number, layout: any[]) => {
    const res = await useApiRequest<void>(`/saloes/${salaoId}/layout`, {
      method: 'POST',
      body: layout,
    });

    return res;
  },
};

export default SalaoService;
