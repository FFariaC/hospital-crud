import { Test, TestingModule } from "@nestjs/testing"
import { appointmentSample, personSample } from "../utils/mocks"
import { AppointmentRepository } from "./appointments.repository"

const mockPerson = personSample
const mockAppointment = appointmentSample
  
describe('AppointmentRepository', () => {
    let repository: AppointmentRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppointmentRepository,
            ]
        }).compile()
        repository = module.get<AppointmentRepository>(AppointmentRepository)
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    it('should test save method', async () => {
        repository.save = jest.fn(() => Promise.resolve([mockAppointment]))
        expect(await repository.createAppointment(mockAppointment)).toStrictEqual([mockAppointment])
    })

    it('should test assignAppointmentsToPerson', async () => {
        repository.save = jest.fn(() => Promise.resolve([mockAppointment]))
        repository.findOne = jest.fn(() => Promise.resolve(mockAppointment))
        expect(await repository.assignAppointmentsToPerson(mockAppointment.id, mockPerson)).toStrictEqual([mockAppointment])
        expect(repository.findOne).toHaveBeenCalledWith(mockAppointment.id)
        expect(repository.save).toHaveBeenCalledTimes(1)
        expect(repository.findOne).toHaveBeenCalledTimes(1)
    })

})