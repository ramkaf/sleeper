import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class UserDocument extends AbstractDocument {

}

export const UserSchema =
  SchemaFactory.createForClass(UserDocument);
