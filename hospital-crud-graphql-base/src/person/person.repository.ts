import { EntityRepository, Repository } from "typeorm";
import { Person } from "./person.entity";
import { CreatePersonInput } from "./person.input";
@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {

    async createPerson(createPersonInput: CreatePersonInput) {
        const { name, birthDate, type, document, idHealthPlan, sex } = createPersonInput
        const person = new Person()
        person.name = name
        person.birthDate = birthDate
        person.type = type
        person.document = document
        person.idHealthPlan = idHealthPlan
        person.sex = sex
        person.createdAt = new Date()
        person.appointments = []
        person.healthPlans = []
        return this.save(person)
    }
}