import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateHealthPlanInput {

    @Field(() => String, { nullable: true })
    name: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => Date, { nullable: true })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt: Date
}