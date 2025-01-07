// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig();
//     const apiURL = `${config.public.baseURL}/franquias`;

//     try {
//       const response = await $fetch(apiURL, {
//         method: 'GET',
//       });
  
//       return response;
//     } catch (error: any) {
//       throw createError({
//         statusCode: error.response?.status || 500,
//         statusMessage: error.response?.statusText || 'Erro no servidor',
//       });
//     }
//   });
  
import { crudApiHandler } from '~/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/franquias`;

export default crudApiHandler(apiURL);