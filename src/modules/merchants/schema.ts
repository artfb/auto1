import { schema } from 'normalizr';

export const merchantSchema = new schema.Entity('merchants');
export const merchantListSchema = [merchantSchema];
