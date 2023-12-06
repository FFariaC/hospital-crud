import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AppointmentType } from "./appointment.graphql";
import { CreateAppointmentInput } from "./appointment.input";
import { AppointmentService } from "./appointment.service";
import { AssignAppointmentsToPerson } from "./assign-appointments-to-person.input";

@Resolver(AppointmentType)
export class AppointmentResolver {

    constructor(
        private appointmentService: AppointmentService
    ) {}

    @Query(()=> AppointmentType)
    getAppointment(
        @Args('id') id: number
    ) {
        return this.appointmentService.getAppointment(id)
    }

    @Query(() => [AppointmentType])
    getAllAppointment() {
        return this.appointmentService.getAllAppointment()
    }
    
    @Mutation(() => AppointmentType)
    createAppointment(
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput
    ) {
        return this.appointmentService.createAppointment(createAppointmentInput)
    }

    @Mutation(() => AppointmentType)
    assignAppointmentsToPerson(
        @Args('assignAppointmentsToPerson') assignAppointmentsToPersonInput: AssignAppointmentsToPerson,
    ) {
        const { appointmentId, personId } = assignAppointmentsToPersonInput
        return this.appointmentService.assignAppointmentsToPerson(appointmentId, personId)
    }
}