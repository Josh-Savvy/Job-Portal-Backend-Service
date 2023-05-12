import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobService } from './job.service';
import { JobCreateInput } from './dto/create-job.input';
import { JobType } from './job.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AccountTypeDecorator } from 'src/auth/decorators/accountType.decorator';
import { AccountType } from 'src/user/enums';
import { AccountTypeGuard } from 'src/auth/guards/accountType.guard';
import { IndustryType } from 'src/user/types/industry.type';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { UserType } from 'src/user/types/user.type';

@Resolver()
export class JobResolver {
  constructor(private readonly jobService: JobService) {}
  @Query(() => [JobType])
  async getAllJobs() {
    return await this.jobService.getAllJobs();
  }
  @Query(() => [JobType])
  async getAllJobsByCategory(@Args('slug') slug: string) {
    return await this.jobService.getAllJobsByCategory(slug);
  }
  @AccountTypeDecorator(AccountType.ADMIN, AccountType.EMPLOYER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Mutation(() => String)
  async createJob(
    @Args('jobCreateInput') jobCreateInput: JobCreateInput,
    @CurrentUser() user: UserType,
  ) {
    return await this.jobService.createJob(jobCreateInput, user);
  }
  @AccountTypeDecorator(AccountType.ADMIN, AccountType.EMPLOYER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Query(() => [JobType])
  async getAllJobsForAdmin() {
    return await this.jobService.getAllJobsForAdmin();
  }

  @AccountTypeDecorator(AccountType.FREELANCER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Mutation(() => String)
  async applyForJob(
    @Args('userId') userId: string,
    @Args('jobId') jobId: string,
  ) {
    return this.jobService.applyForJob(userId, jobId);
  }

  @AccountTypeDecorator(AccountType.FREELANCER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Mutation(() => String)
  async saveJob(@Args('userId') userId: string, @Args('jobId') jobId: string) {
    return this.jobService.saveJob(userId, jobId);
  }

  @AccountTypeDecorator(AccountType.ADMIN, AccountType.EMPLOYER)
  @UseGuards(GqlAuthGuard, AccountTypeGuard)
  @Mutation(() => String)
  async closeJobOpening(@Args('jobId') jobId: string) {
    return this.jobService.closeJobOpening(jobId);
  }
}
