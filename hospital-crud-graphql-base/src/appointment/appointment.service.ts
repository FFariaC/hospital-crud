import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Person } from '../person/person.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentInput } from './appointment.input';
import { AppointmentRepository } from './appointments.repository';
import { PersonService } from '../person/person.service';

@Injectable()
export class AppointmentService {
    constructor(
        private appointmentRepository: AppointmentRepository,
        private personService: PersonService
    ) {}

    async getAppointment(id: number): Promise<Appointment> {
        const appointmentFound = await this.appointmentRepository.findOne(id)
        if (!appointmentFound) {
            throw new NotFoundException(`Appointment com Id ${id} nao encontrado`)
        }
        return appointmentFound
    }

    async getAllAppointment(): Promise<Appointment[]>{
        const allAppointment  = await this.appointmentRepository.find()
        if(allAppointment.length == 0) {
            throw new NotFoundException('Nenhum appointment encontrado')
        }
        return allAppointment 
    }

    async createAppointment(createAppointmentInput: CreateAppointmentInput ): Promise<Appointment> {
        const appointment = await this.appointmentRepository.createAppointment(createAppointmentInput)
        if (!appointment) {
            throw new BadRequestException('Nao foi possivel criar um Appointment com essas informacoes')
        }
        return appointment
    }

    async assignAppointmentsToPerson(appointmentId: number, personId: number): Promise<Appointment>{
        const person = await this.personService.getPerson( personId )  
        const appointmentsToPerson = await this.appointmentRepository.assignAppointmentsToPerson(appointmentId, person)
        return appointmentsToPerson    
    }

    async viewAppointments(person: Person): Promise<Appointment[]> {
        return await this.appointmentRepository.viewAppointments(person)
    }
}
