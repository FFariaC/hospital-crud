import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PersonType } from "../person/person.graphql";

@ObjectType()
export class AppointmentType {

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

    @Field(() => PersonType, { nullable: true })
    person: PersonType
}