import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from './interfaces/valid_roles';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
    virtuals: true,
  },
  toObject: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
    virtuals: true,
  },
})
export class User extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: [String],
    enum: Object.values(ValidRoles),
    default: [ValidRoles.user],
  })
  roles: ValidRoles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
