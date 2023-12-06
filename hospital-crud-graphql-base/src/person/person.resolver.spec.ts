import { Test, TestingModule } from "@nestjs/testing"
import * as request from 'supertest'
import { PersonService } from "./person.service"
import { INestApplication } from "@nestjs/common"
import { AppModule } from "../app.module"
import { createPersonMutationSample, getAllPersonQuerySample, getPersonQuerySample, personSample } from "../utils/mocks"

const mockPerson = personSample
const createPersonMutation = createPersonMutationSample
const getPersonQuery = getPersonQuerySample
const getAllPersonQuery = getAllPersonQuerySample

describe('PersonResolver', () => {
  let app: INestApplication

  describe('createPerson', () => {
    const personService = {
      createPerson: jest.fn(() => 
        Promise.resolve(mockPerson)
      ),
    }

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule(
          {
              imports: [AppModule],
          },
      )
          .overrideProvider(PersonService)
          .useValue(personService)
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

    it('should correctly call createPerson mutation', async () => {
      const createPersonResult = await request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: 'createPerson',
          query: createPersonMutation,
          variables: {},
      })
      expect(createPersonResult.status).toBe(200)
      expect(personService.createPerson).toHaveBeenCalledTimes(1)
    })
  })

  describe('getPerson', () => {
    const personService = {
      getPerson: jest.fn(() => 
      Promise.resolve(mockPerson)
      ),
    }

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule(
          {
              imports: [AppModule],
          },
      )
          .overrideProvider(PersonService)
          .useValue(personService)
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

    it('should correctly call getPerson query', async () => {
      const getPersonResult = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getPersonQuery
      })
      expect(getPersonResult.status).toBe(200)
      expect(personService.getPerson).toHaveBeenCalledTimes(1)
    })
  })

  describe('getAllPerson', () => {
    const personService = {
      getAllPerson: jest.fn(() => 
      Promise.resolve([mockPerson])
      ),
    }

  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule(
          {
              imports: [AppModule],
          },
      )
          .overrideProvider(PersonService)
          .useValue(personService)
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
    
    it('should correctly call getAllPerson query', async () => {
      const getAllPersonResult = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getAllPersonQuery
      })
      expect(getAllPersonResult.status).toBe(200)
      expect(personService.getAllPerson).toHaveBeenCalledTimes(1)
    })    
  })
}) 