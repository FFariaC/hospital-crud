/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { PersonRepository } from '../person/person.repository';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    TypeOrmModule.forFeature([PersonRepository]),
  ],
  providers: [AppointmentResolver, AppointmentService, PersonService],
  exports: [AppointmentService,]
})
export class AppointmentModule {}
