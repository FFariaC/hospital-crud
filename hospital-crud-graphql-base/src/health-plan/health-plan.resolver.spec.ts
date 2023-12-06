import { Test, TestingModule } from "@nestjs/testing"
import * as request from 'supertest'
import { HealthPlanService } from "./health-plan.service"
import { assignHealthPlanToPersonMutationSample, createHealthPlanMutationSample, getAllHealthPlanQuerySample, getHealthPlanQuerySample, healthPlanSample } from "../utils/mocks"
import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"

const mockHealthPlan = healthPlanSample
const assignHealthPlanToPersonMutation = assignHealthPlanToPersonMutationSample
const createHealthPlanMutation = createHealthPlanMutationSample
const getHealthPlanQuery = getHealthPlanQuerySample
const getAllHealthPlanQuery = getAllHealthPlanQuerySample

describe('HealthPlanResolver', () => {
    let app: INestApplication

    describe('createHealthPlan', () => {
        const healthPlanService = {
          createHealthPlan: jest.fn(() => 
            Promise.resolve(mockHealthPlan)
          ),
        }
    
        beforeAll(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule(
              {
                  imports: [AppModule],
              },
          )
              .overrideProvider(HealthPlanService)
              .useValue(healthPlanService)
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
    
        it('should correctly call createHealthPlan mutation', async () => {
          const createHealthPlanResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
              operationName: 'createHealthPlan',
              query: createHealthPlanMutation,
              variables: {},
          })
          expect(createHealthPlanResult.status).toBe(200)
          expect(healthPlanService.createHealthPlan).toHaveBeenCalledTimes(1)
        })
      })
    
      describe('getHealthPlan', () => {
        const healthPlanService = {
          getHealthPlan: jest.fn(() => 
          Promise.resolve(mockHealthPlan)
          ),
        }
    
        beforeAll(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule(
              {
                  imports: [AppModule],
              },
          )
              .overrideProvider(HealthPlanService)
              .useValue(healthPlanService)
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
    
        it('should correctly call getHealthPlan query', async () => {
          const getHealthPlanResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: getHealthPlanQuery
          })
          expect(getHealthPlanResult.status).toBe(200)
          expect(healthPlanService.getHealthPlan).toHaveBeenCalledTimes(1)
        })
      })
    
      describe('getAllHealthPlan', () => {
        const healthPlanService = {
          getAllHealthPlans: jest.fn(() => 
          Promise.resolve([mockHealthPlan])
          ),
        }
    
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule(
                {
                    imports: [AppModule],
                },
            )
                .overrideProvider(HealthPlanService)
                .useValue(healthPlanService)
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
        
        it('should correctly call getAllHealthPlan query', async () => {
          const getAllHealthPlanResult = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: getAllHealthPlanQuery
          })
          expect(getAllHealthPlanResult.status).toBe(200)
          expect(healthPlanService.getAllHealthPlans).toHaveBeenCalledTimes(1)
        })    
      })

    describe('assignHealthPlanToPerson', () => {
      const healthPlanService = {
        assignHealthPlanToPerson: jest.fn(() => 
        Promise.resolve(mockHealthPlan)
        ),
      }
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule(
            {
                imports: [AppModule],
            },
        )
            .overrideProvider(HealthPlanService)
            .useValue(healthPlanService)
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
  
      it('should correctly call assignHealthPlanToPerson mutation', async () => {
        const assignResult = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: 'assignHealthPlanToPerson',
          query: assignHealthPlanToPersonMutation,
          variables: {}
        })
        expect(assignResult.status).toBe(200)
        expect(healthPlanService.assignHealthPlanToPerson).toHaveBeenCalledTimes(1)
      })
    })
  })