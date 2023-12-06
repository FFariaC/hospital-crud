import { Field, Int, ObjectType } from "@nestjs/graphql"
import { PersonType } from "../person/person.graphql"

@ObjectType()
export class HealthPlanType {

    @Field(() => Int, { nullable: true })
    id: number

    @Field(() => String, { nullable: true })
    name: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => Date, { nullable: true })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt: Date

    @Field(() => PersonType, { nullable: true })
    person: PersonType
}