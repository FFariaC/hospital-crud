import { Person } from "../person/person.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    date: Date

    @Column({nullable: true})
    idPatient: number

    @Column({nullable: true})
    idMedic: number

    @Column({nullable: true})
    idPlan: number

    @Column({nullable: true})
    createdAt: Date

    @Column({nullable: true})
    updatedAt: Date

    @ManyToOne(type => Person, person => person.appointments, {nullable: true, eager: true,  })
    person: Person

}