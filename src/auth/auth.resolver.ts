import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup.input';
import { SignResponse } from './dto/sign.response';
import { SignInInput } from './dto/signin.input';
import { LogoutResponse } from './dto/logout.response';
import { Public } from './decorators/public.decorator';
import { NewTokensResponse } from './dto/newTokens.response';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from 'src/user/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => String, { name: 'auth' })
  findOne() {
    return 'Test';
  }

  @Public()
  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signupInput: SignUpInput) {
    return this.authService.signUp(signupInput);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => User)
  updateUser(@CurrentUserId() userId, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.authService.updateUser(userId, updateUserInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => LogoutResponse)
  logOut(@Args('id', { type: () => Int }) id: number) {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse)
  getNewTokens(
    @CurrentUserId() userId,
    @CurrentUser('refreshToken') refreshToken,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }
}
