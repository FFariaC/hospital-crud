/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthPlanModule } from '../health-plan/health-plan.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { PersonRepository } from './person.repository';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonRepository]),
        AppointmentModule,
        HealthPlanModule
    ],
    providers: [PersonResolver, PersonService],
})
export class PersonModule {}
