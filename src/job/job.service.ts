import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { JobCreateInput } from './dto/create-job.input';
import { JobType } from './job.type';
import { generateSlug, isValidUUID } from 'common/utils';
import { AccountType } from 'src/user/enums';
import { Industry } from 'src/user/entities/industry.entity';
import { IndustryType } from 'src/user/types/industry.type';
import { UserType } from 'src/user/types/user.type';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Industry)
    private readonly industryRepo: Repository<Industry>,
    private readonly userService: UserService,
  ) {}

  async createJob(
    jobCreateInput: JobCreateInput,
    user: UserType,
  ): Promise<any> {
    const jobExists = await this.jobRepository.findOne({
      where: {
        createdBy: user.email,
        position: jobCreateInput.position,
        title: jobCreateInput.title,
        company: jobCreateInput.company,
      },
    });
    if (jobExists) {
      throw new HttpException(
        "You've already created this a Job posting with the same title and position.",
        HttpStatus.BAD_REQUEST,
      );
    }
    const jobSlugExists = await this.jobRepository.findOne({
      where: {
        slug: generateSlug(
          `${jobCreateInput.position + '-' + jobCreateInput.company}`,
        ),
      },
    });
    if (jobSlugExists)
      throw new HttpException(
        'A Job posting from your company with the same title already exists.',
        HttpStatus.BAD_REQUEST,
      );

    const newJobPosting = await new Job();
    newJobPosting.title = jobCreateInput.title;
    newJobPosting.position = jobCreateInput.position;
    newJobPosting.company = jobCreateInput.company;
    newJobPosting.description = jobCreateInput.description;
    newJobPosting.location = jobCreateInput.location;
    newJobPosting.salary = jobCreateInput.salary;
    newJobPosting.nature = jobCreateInput.nature;
    newJobPosting.responsibilities = jobCreateInput.responsibilities;
    newJobPosting.createdBy = user.email;
    if (!jobCreateInput.categoryId)
      throw new HttpException(
        'You need to select at least one category',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const category = await this.industryRepo.findOne({
      where: { id: jobCreateInput.categoryId },
      relations: ['jobs'],
    });
    if (!category)
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    newJobPosting.category = category;
    category.jobs.push(newJobPosting);
    newJobPosting.slug = await generateSlug(
      `${jobCreateInput.position + '-' + jobCreateInput.company}`,
    );
    const isActive = user.accountType === AccountType.ADMIN;
    newJobPosting.active = isActive;
    await this.industryRepo.save(category);
    await this.jobRepository.save(newJobPosting);
    return `${
      !isActive ? `Dear ${user.name},` : ''
    } This job opening has been ${
      isActive ? `created by Admin - ${user.name}` : 'submitted for approval'
    }`;
  }

  async getJobById(id: string): Promise<JobType> {
    const jobById = await this.jobRepository.findOne({
      where: { id },
      relations: ['category', 'category.jobs'],
    });
    if (!jobById) {
      throw new HttpException(
        "Job with this credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return jobById;
  }
  async getJobBySlug(id: string): Promise<JobType> {
    const jobBySlug = await this.jobRepository.findOne({
      where: { slug: id },
      relations: ['category', 'category.jobs'],
    });
    if (!jobBySlug) {
      throw new HttpException(
        "Job with this credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return jobBySlug;
  }
  async getAllJobsByCategory(slug: string): Promise<JobType[]> {
    const jobs = await this.industryRepo.findOne({
      where: { slug },
      relations: ['jobs'],
    });
    if (!jobs) {
      return [];
    }
    return jobs.jobs;
  }
  async getAllJobs(): Promise<JobType[]> {
    return await this.jobRepository.find({
      relations: ['category', 'category.jobs'],
    });
  }
  async getAllCategories(): Promise<IndustryType[]> {
    return await this.industryRepo.find({ relations: ['jobs'] });
  }

  async getAllJobsForAdmin(user: UserType): Promise<JobType[]> {
    return await this.jobRepository.find({
      where: { createdBy: user.email },
      relations: ['applicants', 'category'],
    });
  }

  async applyForJob(userId: string, jobId: string): Promise<string> {
    const job = await this.jobRepository.findOne({
      where: { id: jobId },
      relations: ['usersBookmark', 'applicants', 'category'],
    });
    const user = await this.userService.findById(userId);

    if (!job) {
      throw new HttpException('Job not found!', HttpStatus.NOT_FOUND);
    }
    if (
      user.accountType === AccountType.ADMIN ||
      user.accountType === AccountType.EMPLOYER
    ) {
      throw new HttpException(
        `${user.accountType} cannot apply for this job`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (!job.active) {
      throw new HttpException('Job is not open yet', HttpStatus.BAD_REQUEST);
    }
    if (!job.active) {
      throw new HttpException(
        'This job openning is no longer available',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.savedJobs.find((job) => job.id === jobId)) {
      throw new HttpException(
        "You've already applied for this Job.",
        HttpStatus.BAD_REQUEST,
      );
    }
    user.appliedJobs.push(job);
    job.applicants.push(user);
    await this.jobRepository.save(job);
    await this.userService.update(user);
    return `Job application success`;
  }

  async saveJob(userId: string, jobId: string): Promise<string> {
    const job = await this.jobRepository.findOne({
      where: { id: jobId },
      relations: ['usersBookmark', 'applicants', 'category'],
    });
    const user = await this.userService.findById(userId);
    if (!job)
      throw new HttpException(
        `Job with ID ${jobId} not found`,
        HttpStatus.BAD_REQUEST,
      );

    if (!job.active) {
      throw new HttpException('Job is not available', HttpStatus.BAD_REQUEST);
    }

    if (user.savedJobs.find((job) => job.id === jobId)) {
      throw new HttpException(
        "You've already saved this Job.",
        HttpStatus.BAD_REQUEST,
      );
    }
    user.savedJobs.push(job);
    job.usersBookmark.push(user);
    await this.userService.update(user);
    return `You've successfully saved this job!`;
  }

  async closeJobOpening(jobId: string) {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });
    if (!job)
      throw new HttpException('Job opening not found', HttpStatus.NOT_FOUND);
    if (!job.active)
      throw new HttpException(
        'Job opening already closed',
        HttpStatus.NOT_FOUND,
      );
    job.active = false;
    this.jobRepository.save(job);
    return `Job Opening with ID ${job.id} has been closed`;
  }
}
