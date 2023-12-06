import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AppointmentType } from "../appointment/appointment.graphql";
import { HealthPlanType } from "../health-plan/health-plan.graphql";

@ObjectType()
export class PersonType{
    @Field(() => Int, { nullable: true })
    id: number

    @Field(() => String, { nullable: true })
    name: string

    @Field(() => Date, { nullable: true })
    birthDate: Date

    @Field(() => String, { nullable: true })
    sex: string

    @Field(() => String, { nullable: true })
    type: string

    @Field(() => String, { nullable: true })
    document: string

    @Field(() => String, { nullable: true })
    idHealthPlan: string

    @Field(() => Date, { nullable: true })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt: Date

    @Field(() => [AppointmentType], { nullable: true })
    appointments: AppointmentType[]

    @Field(() => [HealthPlanType], { nullable: true })
    healthPlans: HealthPlanType[]
}