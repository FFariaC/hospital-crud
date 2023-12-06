import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateAppointmentInput {
    @Field(() => Int, { nullable: true })
    id: number

    @Field(() => Date, { nullable: true })
    date: Date

    @Field(() => Int, { nullable: true })
    idPatient: number

    @Field(() => Int, { nullable: true })
    idMedic: number

    @Field(() => Int, { nullable: true })
    idPlan: number

    @Field(() => Date, { nullable: true })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt: Date
    
}