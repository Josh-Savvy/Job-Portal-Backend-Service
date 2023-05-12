import { Module, forwardRef } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { UserModule } from 'src/user/user.module';
import { Industry } from 'src/user/entities/industry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, Industry]),
    forwardRef(() => UserModule),
  ],
  providers: [JobService, JobResolver],
  exports: [JobService],
})
export class JobModule {}
