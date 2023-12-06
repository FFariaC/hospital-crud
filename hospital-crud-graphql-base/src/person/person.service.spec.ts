import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { personSample } from '../utils/mocks';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';

const mockPerson = personSample

const mockRepository = {
  getPerson: jest.fn(),
  createPerson: jest.fn(),
  getAllPerson: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn()
}

describe('PersonService', () => {
  let service: PersonService;
  let repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PersonRepository, useValue: mockRepository },
      ],
    }).compile();
    repository = module.get<PersonRepository>(PersonRepository)
    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully call and execute getPerson', async () => {
    mockRepository.findOne.mockReturnValue(mockPerson)
    const response = await service.getPerson(mockPerson.id)    
    expect(repository.findOne).toHaveBeenCalledTimes(1)
    expect(repository.findOne).toBeCalledWith(mockPerson.id)
    expect(response).toStrictEqual(mockPerson)
  })

  it('should successfully create a Person', async () => {
    mockRepository.createPerson.mockReturnValue(mockPerson)
    mockRepository.save.mockReturnValue(mockPerson)
    mockRepository.create.mockReturnValue(mockPerson)
    const created = await service.createPerson(mockPerson)
    expect(repository.createPerson).toHaveBeenCalledTimes(1)
    expect(repository.createPerson).toBeCalledWith(mockPerson)
    expect(created).toStrictEqual(mockPerson)
  })

  it('should call and execute getAllPerson', async () => {
    mockRepository.find.mockReturnValue([mockPerson])
    const response = await service.getAllPerson()
    expect(repository.find).toHaveBeenCalledTimes(1)
    expect(response).toStrictEqual([mockPerson])
  })

  it('should throw a Not Found Exception if getPerson fails to get a Person', async () => {
    mockRepository.findOne.mockReturnValue(null)
    expect(service.getPerson(mockPerson.id)).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Not Found Exception if getAllPerson fails', async () => {
    mockRepository.find.mockReturnValue([])
    expect(service.getAllPerson()).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Bad Request Exception if createPerson fails', async () => {
    mockRepository.createPerson.mockReturnValue(null)
    expect(service.createPerson(mockPerson)).rejects.toBeInstanceOf(BadRequestException)
  })

});
