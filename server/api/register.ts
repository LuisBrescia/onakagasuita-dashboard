import { crudApiHandler } from '~/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/register`;

export default crudApiHandler(apiURL);