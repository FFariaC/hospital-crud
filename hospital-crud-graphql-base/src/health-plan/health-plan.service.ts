import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { Person } from '../person/person.entity';
import { HealthPlan } from './health-plan.entity';
import { CreateHealthPlanInput } from './health-plan.input';
import { HealthPlanRepository } from './health-plan.repository';

@Injectable()
export class HealthPlanService {

    constructor(
        private healthPlanRepository: HealthPlanRepository,
        private personService: PersonService
    ) {}

    async getHealthPlan(id: number): Promise<HealthPlan> {
        const planFound = await this.healthPlanRepository.findOne(id)
        if(!planFound) {
            throw new NotFoundException(`Plano com ID ${id} nao encontrado`)
        }
        return planFound
    }

    async getAllHealthPlans(): Promise<HealthPlan[]>{
        const allHealthPlan = await this.healthPlanRepository.find()
        if(allHealthPlan.length == 0) {
            throw new NotFoundException('Nenhum plano encontrado')
        }
        return allHealthPlan 
    }
    
    async createHealthPlan(createHealthPlanInput: CreateHealthPlanInput): Promise<HealthPlan> {
        const healthPlan = await this.healthPlanRepository.createHealthPlan(createHealthPlanInput)
        if (!healthPlan) {
            throw new BadRequestException('Nao foi possivel criar um Health Plan com essas informacoes')
        }
        return healthPlan
    }
    
    async assignHealthPlanToPerson(healthPlanId: number, personId: number): Promise<HealthPlan>{   
        const person = await this.personService.getPerson( personId )  
        const plansToPerson = await this.healthPlanRepository.assignHealthPlanToPerson(healthPlanId, person)
        return plansToPerson    
    }
    
    async viewHealthPlans(person: Person): Promise<HealthPlan[]> {
        return await this.healthPlanRepository.viewHealthPlans(person)
    }
}
