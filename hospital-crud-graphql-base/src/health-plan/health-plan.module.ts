/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { PersonRepository } from '../person/person.repository';
import { HealthPlanRepository } from './health-plan.repository';
import { HealthPlanResolver } from './health-plan.resolver';
import { HealthPlanService } from './health-plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthPlanRepository]),
    TypeOrmModule.forFeature([PersonRepository])
  ],
  providers: [HealthPlanResolver, HealthPlanService, PersonService],
  exports: [HealthPlanService]
})
export class HealthPlanModule {}
