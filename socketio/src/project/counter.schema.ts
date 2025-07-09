// counter.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true })
  declare id: string; // model name, e.g., 'projectId'

  @Prop({ required: true, default: 0 })
  seq: number; // auto-increment value
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
