import { registerEnumType } from '@nestjs/graphql';

export enum JobNatureEnum {
  REMOTE = 'Remote',
  ONSITE = 'On-Site',
}

registerEnumType(JobNatureEnum, { name: 'JobNatureEnum' });
