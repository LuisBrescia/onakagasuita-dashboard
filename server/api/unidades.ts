import { crudApiHandler } from '~/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/unidades`;

export default crudApiHandler(apiURL);
