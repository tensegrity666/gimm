import * as dotenv from 'dotenv';

dotenv.config();

export const { PORT = '3000' } = process.env;
