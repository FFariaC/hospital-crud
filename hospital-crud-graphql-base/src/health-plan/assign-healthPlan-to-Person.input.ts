import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AssignHealthPlanToPerson {
    
    @Field(() => Int, { nullable: true })
    personId: number

    @Field(() => Int, { nullable: true })
    healthPlanId: number
}