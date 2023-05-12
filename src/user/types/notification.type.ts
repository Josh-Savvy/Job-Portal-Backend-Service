import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@InputType('NotificationInputType')
@ObjectType()
export class NotificationType {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field(() => UserType, { nullable: true })
  user?: UserType;
  @Field({ nullable: true, defaultValue: false })
  isRead?: boolean;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt?: Date;
}
