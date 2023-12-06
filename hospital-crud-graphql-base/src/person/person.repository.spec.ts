import { Test, TestingModule } from "@nestjs/testing"
import { personSample } from "../utils/mocks"
import { PersonRepository } from "./person.repository"

const mockPerson = personSample

describe('PersonRepository', () => {
    let repository: PersonRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonRepository,
            ]
        }).compile()
        repository = module.get<PersonRepository>(PersonRepository)
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    it('should test save method', async () => {
        repository.save = jest.fn(() => Promise.resolve([mockPerson]))
        expect(await repository.createPerson(mockPerson)).toStrictEqual([mockPerson])
        expect(repository.save).toBeCalledTimes(1)
    })

})