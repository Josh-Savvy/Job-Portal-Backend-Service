import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './types/user.type';
import { createHash, generateSlug } from 'common/utils';
import { AccountType, RegAccountType } from './enums';
import { Industry } from './entities/industry.entity';
import { IndustryType } from './types/industry.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}
  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['notifications', 'savedJobs', 'appliedJobs', 'category'],
    });
    if (!user)
      throw new HttpException(
        { message: 'User not found!', status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  async findAll(): Promise<UserType[]> {
    const data = await this.userRepository.find({
      //   take: limit,
      //   skip,
      relations: ['notifications', 'savedJobs', 'appliedJobs', 'category'],
    });
    return data;
  }
  async getFreelancers(): Promise<UserType[]> {
    const data = await this.userRepository.find({
      where: { accountType: AccountType.FREELANCER },
      //   take: limit,
      //   skip,
    });
    return data;
  }
  async getEmployers(): Promise<UserType[]> {
    const data = await this.userRepository.find({
      where: { accountType: AccountType.EMPLOYER },
      //   take: limit,
      //   skip,
    });
    return data;
  }
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['notifications', 'savedJobs', 'appliedJobs', 'category'],
    });
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    return user;
  }

  async findByEmployerEmail(adminEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: adminEmail,
        accountType: AccountType.ADMIN || AccountType.EMPLOYER,
      },
      relations: ['notifications'],
    });
    if (!user)
      throw new HttpException(
        "Employer with this email doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const user = await this.userRepository.findOne({
      where: { email: createUserInput.email },
      relations: ['category'],
    });
    if (user)
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    const newUser = new User();
    newUser.name = createUserInput.name;
    newUser.email = createUserInput.email;
    const hashedPassword = await createHash(createUserInput.password);
    newUser.password = hashedPassword;
    newUser.name = createUserInput.name;
    const category = await this.industryRepository.findOne({
      where: { id: createUserInput.categoryId },
      relations: ['users'],
    });
    if (!category)
      throw new HttpException("Category doesn't exist.", HttpStatus.NOT_FOUND);
    newUser.category = category;
    category.users.push(newUser);
    if (createUserInput.accountType === RegAccountType.EMPLOYER) {
      newUser.accountType = AccountType.EMPLOYER;
      return await this.userRepository.save(newUser);
    }
    // else if (createUserInput.accountType === AccountType.ADMIN) {
    //   newUser.accountType = AccountType.ADMIN;
    //   return await this.userRepository.save(newUser);
    // }
    return await this.userRepository.save(newUser);
  }

  async getSavedJobs(userId: string) {
    return (await this.findById(userId)).savedJobs;
  }
  async getAppliedJobs(userId: string) {
    return (await this.findById(userId)).appliedJobs;
  }
  async update(user: UserType): Promise<User> {
    if (!user)
      throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND);
    // async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    //   if (!id || !isValidUUID(id))
    //     throw new HttpException(
    //       'Please provide valid user id',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   const user = await this.findById(id);
    //   if (!user) {
    //     throw new HttpException('User cannot be found', HttpStatus.NOT_FOUND);
    //   }
    //   const updatedUser = { ...user, ...updateUserInput };
    return await this.userRepository.save(user);
  }

  async addIndustry(title: string, icon: string): Promise<Industry> {
    if (!title)
      throw new HttpException(
        'Category title cannot be empty',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const slug = await generateSlug(title);
    const industry = await this.industryRepository.findOne({
      where: { slug, title },
    });
    if (industry)
      throw new HttpException(
        `${title} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    const newIndustry = new Industry();
    newIndustry.title = title;
    newIndustry.slug = slug;
    newIndustry.icon = icon;
    return await this.industryRepository.save(newIndustry);
  }

  async getAllIndustries(): Promise<IndustryType[]> {
    const industries = await this.industryRepository.find({
      relations: ['jobs'],
    });
    return industries;
  }
}
