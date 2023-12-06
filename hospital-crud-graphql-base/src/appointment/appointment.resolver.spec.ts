import { Test, TestingModule } from "@nestjs/testing"
import * as request from 'supertest'
import { appointmentSample, assignAppointmentsToPersonMutationSample, createAppointmentMutationSample, getAllAppointmentQuerySample, getAppointmentQuerySample } from "../utils/mocks"
import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { AppointmentService } from "./appointment.service"

const mockAppointment = appointmentSample
const assignAppointmentToPersonMutation = assignAppointmentsToPersonMutationSample
const createAppointmentMutation = createAppointmentMutationSample
const getAppointmentQuery = getAppointmentQuerySample
const getAllAppointmentQuery = getAllAppointmentQuerySample

describe('AppointmentResolver', () => {
    let app: INestApplication

    describe('createAppointment', () => {
        const appointmentService = {
          createAppointment: jest.fn(() => 
            Promise.resolve(mockAppointment)
          ),
        }
    
        beforeAll(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule(
              {
                  imports: [AppModule],
              },
          )
              .overrideProvider(AppointmentService)
              .useValue(appointmentService)
              .compile()
          app = moduleFixture.createNestApplication()
          await app.init()
        })
    
        beforeEach(() => {
          jest.clearAllMocks()
        })
    
        afterAll(async () => {
          await app.close()
        })
    
        it('should correctly call createAppointment mutation', async () => {
          const createAppointmentResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
              operationName: 'createAppointment',
              query: createAppointmentMutation,
              variables: {},
          })
          expect(createAppointmentResult.status).toBe(200)
          expect(appointmentService.createAppointment).toHaveBeenCalledTimes(1)
        })
      })
    
      describe('getAppointment', () => {
        const appointmentService = {
          getAppointment: jest.fn(() => 
          Promise.resolve(mockAppointment)
          ),
        }
    
        beforeAll(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule(
              {
                  imports: [AppModule],
              },
          )
              .overrideProvider(AppointmentService)
              .useValue(appointmentService)
              .compile()
          app = moduleFixture.createNestApplication()
          await app.init()
        })
    
        beforeEach(() => {
          jest.clearAllMocks()
        })
    
        afterAll(async () => {
          await app.close()
        })
    
        it('should correctly call getAppointment query', async () => {
          const getAppointmentResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: getAppointmentQuery
          })
          expect(getAppointmentResult.status).toBe(200)
          expect(appointmentService.getAppointment).toHaveBeenCalledTimes(1)
        })
      })
    
      describe('getAllAppointment', () => {
        const appointmentService = {
          getAllAppointment: jest.fn(() => 
          Promise.resolve([mockAppointment])
          ),
        }
    
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule(
                {
                    imports: [AppModule],
                },
            )
                .overrideProvider(AppointmentService)
                .useValue(appointmentService)
                .compile()
            app = moduleFixture.createNestApplication()
            await app.init()
          })
    
        beforeEach(() => {
          jest.clearAllMocks()
        })
    
        afterAll(async () => {
          await app.close()
        })
        
        it('should correctly call getAllAppointment query', async () => {
          const getAllAppointmentResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: getAllAppointmentQuery
          })
          expect(getAllAppointmentResult.status).toBe(200)
          expect(appointmentService.getAllAppointment).toHaveBeenCalledTimes(1)
        })    
      })

    describe('assignAppointmentsToPerson', () => {
      const appointmentService = {
        assignAppointmentsToPerson: jest.fn(() => 
        Promise.resolve(mockAppointment)
        ),
      }
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule(
            {
                imports: [AppModule],
            },
        )
            .overrideProvider(AppointmentService)
            .useValue(appointmentService)
            .compile()
        app = moduleFixture.createNestApplication()
        await app.init()
      })
  
      beforeEach(() => {
        jest.clearAllMocks()
      })
  
      afterAll(async () => {
        await app.close()
      })
  
      it('should correctly call assignAppointmentToPerson mutation', async () => {
        const assignResult = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: 'assignAppointmentsToPerson',
          query: assignAppointmentToPersonMutation,
          variables: {}
        })
        expect(assignResult.status).toBe(200)
        expect(appointmentService.assignAppointmentsToPerson).toHaveBeenCalledTimes(1)
      })
    })
  })