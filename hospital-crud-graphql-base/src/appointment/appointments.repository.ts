import { Person } from "../person/person.entity";
import { EntityRepository, Repository } from "typeorm";
import { Appointment } from "./appointment.entity";
import { CreateAppointmentInput } from "./appointment.input";

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {

    async createAppointment(createAppointmentInput: CreateAppointmentInput ): Promise<Appointment> {
        const { date, idMedic, idPatient, idPlan } = createAppointmentInput
        const appointment = new Appointment()
        appointment.date = date
        appointment.idMedic = idMedic
        appointment.idPatient = idPatient
        appointment.idPlan = idPlan
        appointment.createdAt = new Date()
        return this.save(appointment)
    }

    async assignAppointmentsToPerson(appointmentId: number, person: Person): Promise<Appointment>{
        const appointment = await this.findOne(appointmentId)           
        appointment.person = person        
        return await this.save(appointment)
    }

    async viewAppointments(person: Person): Promise<Appointment[]> {
        const appointments = await this.find({
            where: [
                {person: person}
            ]
        })
        return appointments
    }
}