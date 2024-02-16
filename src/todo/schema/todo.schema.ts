import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
    id: {type: String},
    title: { type: String, required: true, minlength: 3, maxlength: 20 },
    description: { type: String, required: true,minlength: 10, maxlength: 100 },
    status: { type: String, required: true, enum: ['pending', 'completed', 'in-progress'] },
  });
  