import { crudApiHandler } from '~/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/operadores`;

export default crudApiHandler(apiURL);
