import { registerEnumType } from '@nestjs/graphql';

export enum JobNatureEnum {
  REMOTE = 'Remote',
  HYBRID = 'Hybrid',
  ONSITE = 'On-Site',
}

registerEnumType(JobNatureEnum, { name: 'JobNatureEnum' });
