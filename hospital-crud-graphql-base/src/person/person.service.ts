import { BadRequestException, Injectable, NotFoundException,  } from '@nestjs/common';
import { Person } from './person.entity';
import { CreatePersonInput } from './person.input';
import { PersonRepository } from './person.repository';
@Injectable()
export class PersonService {
    constructor(
         private personRepository: PersonRepository,
    ) {}

    async getPerson(id: number): Promise<Person> {
        const personFound = await this.personRepository.findOne(id)
        if(!personFound) {
            throw new NotFoundException(`Pessoa com ID ${id} nao encontrada`)
        }
         return personFound
    }

    async getAllPerson(): Promise<Person[]>{
        const allPerson = await this.personRepository.find()
        if(allPerson.length === 0) {
            throw new NotFoundException('Nenhuma pessoa encontrada')
        }
        return allPerson
    }

    async createPerson(createPersonInput: CreatePersonInput): Promise<Person> {    
        const person = await this.personRepository.createPerson(createPersonInput)
        if (!person) {
            throw new BadRequestException('Nao foi possivel criar uma pessoa com essas informacoes')
        }
        return person
    }
}
