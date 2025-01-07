import { crudApiHandler } from '~/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/saloes`;

export default crudApiHandler(apiURL);
