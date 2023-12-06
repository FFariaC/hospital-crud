import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { HealthPlanType } from "./health-plan.graphql";
import { HealthPlanService } from "./health-plan.service";
import { CreateHealthPlanInput } from "./health-plan.input";
import { AssignHealthPlanToPerson } from "./assign-healthPlan-to-Person.input";

@Resolver()
export class HealthPlanResolver {

    constructor(
        private healthPlanService: HealthPlanService
    ) {}

    @Query(()=> HealthPlanType)
    getHealthPlan(
        @Args('id') id: number
    ) {
        return this.healthPlanService.getHealthPlan(id)
    }

    @Query(() => [HealthPlanType])
    getAllHealthPlan() {
        return this.healthPlanService.getAllHealthPlans()
    }
    
    @Mutation(() => HealthPlanType)
    async createHealthPlan(
        @Args('createHealthPlanInput') createHealthPlanInput: CreateHealthPlanInput
    ) {
        return this.healthPlanService.createHealthPlan(createHealthPlanInput)
    }

    @Mutation(() => HealthPlanType)
    assignHealthPlanToPerson(
        @Args('assignHealthPlanToPerson') assignHealthPlanToPersonInput: AssignHealthPlanToPerson,
    ) {
        const { healthPlanId, personId } = assignHealthPlanToPersonInput
        return this.healthPlanService.assignHealthPlanToPerson(healthPlanId, personId)
    }
}