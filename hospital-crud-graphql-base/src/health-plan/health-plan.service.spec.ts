import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from '../person/person.service';
import { HealthPlanRepository } from './health-plan.repository';
import { HealthPlanService } from './health-plan.service';
import { personSample, healthPlanSample } from '../utils/mocks';

const mockPerson = personSample
const mockHealthPlan = healthPlanSample

const mockRepository = {
  getHealthPlan: jest.fn(),
  getAllHealthPlans: jest.fn(),
  createHealthPlan: jest.fn(),
  assignHealthPlanToPerson: jest.fn(),
  viewHealthPlans: jest.fn(),
  getPerson: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn()
}

describe('HealthPlanService', () => {
  let service: HealthPlanService;
  let healthPlanRepository: HealthPlanRepository;
  let personService: PersonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthPlanService,
        { provide: HealthPlanRepository, useValue: mockRepository },
        { provide: PersonService, useValue: mockRepository }
      ],
    }).compile();
    personService = module.get<PersonService>(PersonService)
    healthPlanRepository = module.get<HealthPlanRepository>(HealthPlanRepository)
    service = module.get<HealthPlanService>(HealthPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully call and execute getPlan', async () => {
    mockRepository.findOne.mockReturnValue(mockHealthPlan)
    const response = await service.getHealthPlan(mockHealthPlan.id)
    expect(healthPlanRepository.findOne).toHaveBeenCalledTimes(1)
    expect(healthPlanRepository.findOne).toBeCalledWith(mockHealthPlan.id)
    expect(response).toStrictEqual(mockHealthPlan)
  })

  it('should successfully create a Health Plan', async () => {
    mockRepository.createHealthPlan.mockReturnValue(mockHealthPlan)
    const created = await service.createHealthPlan(mockHealthPlan)
    expect(healthPlanRepository.createHealthPlan).toHaveBeenCalledTimes(1)
    expect(healthPlanRepository.createHealthPlan).toBeCalledWith(mockHealthPlan)
    expect(created).toStrictEqual(mockHealthPlan)
  })

  it('should call and execute getAllPlans', async () => {
    mockRepository.find.mockReturnValue([mockHealthPlan])
    const response = await service.getAllHealthPlans()
    expect(healthPlanRepository.find).toHaveBeenCalledTimes(1)
    expect(response).toStrictEqual([mockHealthPlan])
  })

  it('should successfully assign a Health Plan to a Person', async () => { 
    mockRepository.assignHealthPlanToPerson.mockReturnValue(mockHealthPlan)
    mockRepository.getPerson.mockReturnValue(mockPerson)
    const response = await service.assignHealthPlanToPerson(mockHealthPlan.id, mockPerson.id)
    expect(healthPlanRepository.assignHealthPlanToPerson).toHaveBeenCalledTimes(1)
    expect(response).toStrictEqual(mockHealthPlan)
  })

  it('should list Health Plans assigned to a Person', async () => {
    mockRepository.viewHealthPlans.mockReturnValue([mockHealthPlan])
    const response = await service.viewHealthPlans(mockPerson)
    expect(healthPlanRepository.viewHealthPlans).toHaveBeenCalled
    expect(response).toStrictEqual([mockHealthPlan])
  })

  it('should throw a notFoundException if it fails to get a Health Plan', async () => {
    mockRepository.findOne.mockReturnValue(null)
    expect(service.getHealthPlan(mockHealthPlan.id)).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Not Found Exception if getAllHealthPlans fails', async () => {
    mockRepository.find.mockReturnValue([])
    expect(service.getAllHealthPlans()).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Bad Request Exception if createHealthPlan fails', async () => {
    mockRepository.createHealthPlan.mockReturnValue(null)
    expect(service.createHealthPlan(mockHealthPlan)).rejects.toBeInstanceOf(BadRequestException)
  })

});
