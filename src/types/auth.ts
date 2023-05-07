import { Document } from 'mongoose';

export interface IAuthPayload extends Pick<Document, '_id'> {}