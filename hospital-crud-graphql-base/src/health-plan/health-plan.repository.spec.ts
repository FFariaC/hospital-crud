import { Test, TestingModule } from "@nestjs/testing"
import { personSample, healthPlanSample } from "../utils/mocks"
import { HealthPlanRepository } from "./health-plan.repository"

const mockPerson = personSample
const mockHealthPlan = healthPlanSample
  
describe('HealthPlanRepository', () => {
    let repository: HealthPlanRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HealthPlanRepository,
            ]
        }).compile()
        repository = module.get<HealthPlanRepository>(HealthPlanRepository)
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    it('should test save method', async () => {
        repository.save = jest.fn(() => Promise.resolve([mockHealthPlan]))
        expect(await repository.createHealthPlan(mockHealthPlan)).toStrictEqual([mockHealthPlan])
        expect(repository.save).toHaveBeenCalledTimes(1)
    })

    it('should test assignHealthPlanToPerson', async () => {
        repository.save = jest.fn(() => Promise.resolve([mockHealthPlan]))
        repository.findOne = jest.fn(() => Promise.resolve(mockHealthPlan))
        expect(await repository.assignHealthPlanToPerson(mockHealthPlan.id, mockPerson)).toStrictEqual([mockHealthPlan])
        expect(repository.findOne).toHaveBeenCalledWith(mockHealthPlan.id)
        expect(repository.save).toHaveBeenCalledTimes(1)
        expect(repository.findOne).toHaveBeenCalledTimes(1)
    })

})