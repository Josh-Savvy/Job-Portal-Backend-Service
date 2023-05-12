import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { AccountTypeDecorator } from 'src/auth/decorators/accountType.decorator';
import { AccountType } from './enums';
import { AccountTypeGuard } from 'src/auth/guards/accountType.guard';
import { JobType } from 'src/job/job.type';
import { IndustryType } from './types/industry.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async getFreelancers(): Promise<UserType[]> {
    return await this.userService.getFreelancers();
  }
  @Query(() => [UserType])
  async getEmployers(): Promise<UserType[]> {
    return await this.userService.getEmployers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserType)
  getUser(@CurrentUser() user: UserType): UserType {
    return user;
  }

  @AccountTypeDecorator(AccountType.ADMIN, AccountType.EMPLOYER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Query(() => [UserType])
  getAllUsers(): Promise<UserType[]> {
    return this.userService.findAll();
  }

  @AccountTypeDecorator(AccountType.FREELANCER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Query(() => [JobType])
  async getAppliedJobs(@Args('userId') userId: string): Promise<JobType[]> {
    return await this.userService.getAppliedJobs(userId);
  }

  @AccountTypeDecorator(AccountType.ADMIN)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Mutation(() => IndustryType)
  async addIndustry(
    @Args('title') title: string,
    @Args('icon') icon: string,
  ): Promise<IndustryType> {
    return await this.userService.addIndustry(title, icon);
  }

  @Query(() => [IndustryType])
  async getAllIndustries(): Promise<IndustryType[]> {
    return await this.userService.getAllIndustries();
  }
}
