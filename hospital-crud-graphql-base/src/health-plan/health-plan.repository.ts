import { Person } from "../person/person.entity";
import { EntityRepository, Repository } from "typeorm";
import { HealthPlan } from "./health-plan.entity";
import { CreateHealthPlanInput } from "./health-plan.input";

@EntityRepository(HealthPlan)
export class HealthPlanRepository extends Repository<HealthPlan> {

    createHealthPlan(createHealthPlanInput: CreateHealthPlanInput): Promise<HealthPlan> {
        const { name, description } = createHealthPlanInput
        const healthPlan = new HealthPlan()
        healthPlan.name = name
        healthPlan.description = description
        healthPlan.createdAt = new Date()
        return this.save(healthPlan)
    }

    async assignHealthPlanToPerson(healthPlanId: number, person: Person): Promise<HealthPlan>{        
        const healthPlan = await this.findOne(healthPlanId)  
        healthPlan.person = person        
        return await this.save(healthPlan)
    }

    async viewHealthPlans(person: Person): Promise<HealthPlan[]> {
        const healthPlans = await this.find({
            where: [
                {person: person}
            ]
        })
        return healthPlans
    }
}