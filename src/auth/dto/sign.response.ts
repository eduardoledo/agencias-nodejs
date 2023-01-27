import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field((type) => User)
  user: User;
}
