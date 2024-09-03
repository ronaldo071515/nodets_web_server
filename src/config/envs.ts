import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    // Puerto en el cual corre el servidor de la app
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

}