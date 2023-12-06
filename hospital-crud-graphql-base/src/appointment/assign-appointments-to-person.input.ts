import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AssignAppointmentsToPerson {
    
    @Field(() => Int, { nullable: true })
    personId: number

    @Field(() => Int, { nullable: true })
    appointmentId: number
}