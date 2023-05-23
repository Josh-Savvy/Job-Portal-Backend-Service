
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum JobNatureEnum {
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
    ONSITE = "ONSITE"
}

export enum AccountType {
    FREELANCER = "FREELANCER",
    EMPLOYER = "EMPLOYER",
    ADMIN = "ADMIN"
}

export enum RegAccountType {
    FREELANCER = "FREELANCER",
    EMPLOYER = "EMPLOYER"
}

export class JobInputType {
    id: string;
    title: string;
    position: string;
    description: string;
    slug: string;
    nature?: Nullable<JobNatureEnum>;
    location?: Nullable<string>;
    company: string;
    category?: Nullable<IndustryInputType>;
    createdBy: string;
    salary?: Nullable<string>;
    active?: Nullable<boolean>;
    responsibilities?: Nullable<string[]>;
    usersBookmark?: Nullable<UserInputType[]>;
    applicants?: Nullable<UserInputType[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class IndustryInputType {
    id: string;
    title?: Nullable<string>;
    icon?: Nullable<string>;
    slug?: Nullable<string>;
    users?: Nullable<UserInputType[]>;
    jobs?: Nullable<JobInputType[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class NotificationInputType {
    id: string;
    title: string;
    user?: Nullable<UserInputType>;
    isRead?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class UserInputType {
    id: string;
    name: string;
    email: string;
    username: string;
    adminUsername: string;
    profileViews?: Nullable<string>;
    accountType?: Nullable<AccountType>;
    category?: Nullable<IndustryInputType>;
    notifications?: Nullable<NotificationInputType[]>;
    savedJobs?: Nullable<JobInputType[]>;
    appliedJobs?: Nullable<JobInputType[]>;
    isActive?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
    accountType: RegAccountType;
    categoryId: string;
}

export class JobCreateInput {
    title: string;
    description: string;
    position: string;
    location: string;
    company: string;
    nature: JobNatureEnum;
    salary: string;
    experience: string;
    education: string;
    externalLink?: Nullable<string>;
    expiryDate?: Nullable<DateTime>;
    responsibilities?: Nullable<string[]>;
    tags?: Nullable<string[]>;
    categoryId?: Nullable<string>;
}

export class JobType {
    id: string;
    title: string;
    position: string;
    description: string;
    slug: string;
    nature?: Nullable<JobNatureEnum>;
    location?: Nullable<string>;
    company: string;
    category?: Nullable<IndustryType>;
    createdBy: string;
    salary?: Nullable<string>;
    active?: Nullable<boolean>;
    responsibilities?: Nullable<string[]>;
    usersBookmark?: Nullable<UserType[]>;
    applicants?: Nullable<UserType[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class IndustryType {
    id: string;
    title?: Nullable<string>;
    icon?: Nullable<string>;
    slug?: Nullable<string>;
    users?: Nullable<UserType[]>;
    jobs?: Nullable<JobType[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class NotificationType {
    id: string;
    title: string;
    user?: Nullable<UserType>;
    isRead?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class UserType {
    id: string;
    name: string;
    email: string;
    username: string;
    adminUsername: string;
    profileViews?: Nullable<string>;
    accountType?: Nullable<AccountType>;
    category?: Nullable<IndustryType>;
    notifications?: Nullable<NotificationType[]>;
    savedJobs?: Nullable<JobType[]>;
    appliedJobs?: Nullable<JobType[]>;
    isActive?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class LoginResponse {
    accessToken: string;
}

export abstract class IQuery {
    abstract getFreelancers(): UserType[] | Promise<UserType[]>;

    abstract getEmployers(): UserType[] | Promise<UserType[]>;

    abstract getUser(): UserType | Promise<UserType>;

    abstract getAllUsers(): UserType[] | Promise<UserType[]>;

    abstract getAppliedJobs(userId: string): JobType[] | Promise<JobType[]>;

    abstract getAllIndustries(): IndustryType[] | Promise<IndustryType[]>;

    abstract getAllJobs(): JobType[] | Promise<JobType[]>;

    abstract getJobById(jobId: string): JobType | Promise<JobType>;

    abstract getAllJobsByCategory(slug: string): JobType[] | Promise<JobType[]>;

    abstract getAllJobsForAdmin(): JobType[] | Promise<JobType[]>;
}

export abstract class IMutation {
    abstract addIndustry(title: string, icon: string): IndustryType | Promise<IndustryType>;

    abstract createUser(createUserInput: CreateUserInput): UserType | Promise<UserType>;

    abstract login(email: string, password: string): LoginResponse | Promise<LoginResponse>;

    abstract createJob(jobCreateInput: JobCreateInput): string | Promise<string>;

    abstract applyForJob(jobId: string): string | Promise<string>;

    abstract saveJob(jobId: string): string | Promise<string>;

    abstract closeJobOpening(jobId: string): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
