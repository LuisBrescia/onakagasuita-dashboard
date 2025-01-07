import { crudApiHandler } from '@/utils/crudApiHandler';

const config = useRuntimeConfig();
const apiURL = `${config.public.baseURL}/login`;

export default crudApiHandler(apiURL);