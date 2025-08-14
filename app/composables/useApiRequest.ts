import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { useUsuarioStore } from '@/stores/usuarioStore';
import { useUnidadeStore } from '@/stores/unidadeStore';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type AllowedBody = Record<string, unknown> | BodyInit | null | undefined;

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

interface RequestOptions<TBody extends AllowedBody = undefined> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  query?: QueryParams;
}

export const useApiRequest = async <
  TResponse,
  TBody extends AllowedBody = undefined,
>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> => {
  const config = useRuntimeConfig();
  const usuarioStore = useUsuarioStore();
  const unidadeStore = useUnidadeStore();

  const defaultHeaders = {
    Authorization: `Bearer ${usuarioStore.token ?? ''}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-UID': unidadeStore.unidade ? unidadeStore.unidade.id.toString() : '',
  };

  // return $fetch(url, {
  //   ...options,
  //   onResponseError: (error: any) => {
  //     if (error.response.status === 401) {
  //       console.log('Usuário não autorizado');
  //       usuarioStore.logout({ forced: true });
  //       return;
  //     }

  //     throw error.response;
  //   },
  // });

  return await $fetch<TResponse>(`${config.public.baseURL}${url}`, {
    method: options.method ?? 'GET',
    body: options.body,
    query: options.query,
    headers: {
      ...defaultHeaders,
      ...(options.headers ?? {}),
    },
  } as NitroFetchOptions<NitroFetchRequest>);
};
