import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Prop()
  name: string;

  // @Prop()
  // user_id: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  // user: User;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
