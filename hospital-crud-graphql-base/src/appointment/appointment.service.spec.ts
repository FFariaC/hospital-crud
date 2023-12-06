import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from '../person/person.service';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './appointments.repository';
import { personSample, appointmentSample } from '../utils/mocks';

const mockPerson = personSample
const mockAppointment = appointmentSample

const mockRepository = {
  getAppointment: jest.fn(),
  createAppointment: jest.fn(),
  getAllAppointment: jest.fn(),
  assignAppointmentsToPerson: jest.fn(),
  viewAppointments: jest.fn(),
  getPerson: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn()
}

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: AppointmentRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        { provide: AppointmentRepository, useValue: mockRepository },
        { provide: PersonService, useValue: mockRepository }
      ],
    }).compile();
    appointmentRepository = module.get<AppointmentRepository>(AppointmentRepository)
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully call and execute getAppointment', async () => {
    mockRepository.findOne.mockReturnValue(mockAppointment)
    const response = await service.getAppointment(mockAppointment.id)    
    expect(appointmentRepository.findOne).toHaveBeenCalledTimes(1)
    expect(appointmentRepository.findOne).toBeCalledWith(mockAppointment.id)
    expect(response).toStrictEqual(mockAppointment)
  })

  it('should successfully create an Appointment', async () => {
    mockRepository.createAppointment.mockReturnValue(mockAppointment)
    const created = await service.createAppointment(mockAppointment)
    expect(appointmentRepository.createAppointment).toHaveBeenCalledTimes(1)
    expect(appointmentRepository.createAppointment).toBeCalledWith(mockAppointment)
    expect(created).toStrictEqual(mockAppointment)
  })

  it('should call and execute getAllAppointment', async () => {
    mockRepository.find.mockReturnValue([mockAppointment])
    const response = await service.getAllAppointment()
    expect(appointmentRepository.find).toHaveBeenCalledTimes(1)
    expect(response).toStrictEqual([mockAppointment])
  })
  
  it('should successfully assign an Appointments to a Person', async () => { 
    mockRepository.assignAppointmentsToPerson.mockReturnValue(mockAppointment)
    const response = await service.assignAppointmentsToPerson(mockAppointment.id, mockPerson.id)
    expect(appointmentRepository.assignAppointmentsToPerson).toHaveBeenCalledTimes(1)
    expect(response).toStrictEqual(mockAppointment)
  })
  
  it('should list appointments assigned to a person', async () => {
    mockRepository.viewAppointments.mockReturnValue([mockAppointment])
    const response = await service.viewAppointments(mockPerson)
    expect(appointmentRepository.viewAppointments).toHaveBeenCalled
    expect(response).toStrictEqual([mockAppointment])
  })

  it('should throw a notFoundException if it fails to get an Appointment', async () => {
    mockRepository.findOne.mockReturnValue(null)
    expect(service.getAppointment(mockAppointment.id)).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Not Found Exception if getAllAppointment fails', async () => {
    mockRepository.find.mockReturnValue([])
    expect(service.getAllAppointment()).rejects.toBeInstanceOf(NotFoundException)
  })

  it('should throw a Bad Request Exception if createAppointment fails', async () => {
    mockRepository.createAppointment.mockReturnValue(null)
    expect(service.createAppointment(mockAppointment)).rejects.toBeInstanceOf(BadRequestException)
  })
  
});
