import { Person } from "../person/person.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HealthPlan {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    createdAt: Date

    @Column({nullable: true})
    updatedAt: Date

    @ManyToOne(type => Person, person => person.healthPlans, {nullable: true, eager: true })
    person: Person

}