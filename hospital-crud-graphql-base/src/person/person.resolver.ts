import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { HealthPlanService } from "../health-plan/health-plan.service";
import { AppointmentService } from "../appointment/appointment.service";
import { Person } from "./person.entity";
import { PersonType } from "./person.graphql";
import { CreatePersonInput } from "./person.input";
import { PersonService } from "./person.service";
@Resolver(of => PersonType)
export class PersonResolver {

    constructor(
        private personService: PersonService,
        private appointmentService: AppointmentService,
        private healthPlanService: HealthPlanService
    ) {}

    @Query(()=> PersonType)
    getPerson(
        @Args('id') id: number
    ) {
        return this.personService.getPerson(id)
    }

    @Query(() => [PersonType])
    getAllPerson() {
        return this.personService.getAllPerson()
    }

    @Mutation(() => PersonType)
    createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput
    ) {
        return this.personService.createPerson(createPersonInput)
    }

    @ResolveField()
    async appointments(@Parent() person: Person) {
        return this.appointmentService.viewAppointments(person)    
    }

    @ResolveField()
    async healthPlans(@Parent() person: Person) {
        return this.healthPlanService.viewHealthPlans(person)    
    }
}