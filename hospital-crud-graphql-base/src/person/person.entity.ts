import { Appointment } from "../appointment/appointment.entity";
import { HealthPlan } from "../health-plan/health-plan.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonSexOptions, PersonTypeOptions } from "./person.enum";

@Entity()
export class Person {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    name: string

    @Column({nullable: true})
    birthDate!: Date

    @Column({nullable: true})
    sex: PersonSexOptions

    @Column({nullable: true})
    type: PersonTypeOptions

    @Column({nullable: true})
    document: string

    @Column({nullable: true})
    idHealthPlan: string

    @Column({nullable: true})
    createdAt: Date

    @Column({nullable: true})
    updatedAt: Date

    @OneToMany(type => Appointment, appointment => appointment.person, { nullable: true,  })
    appointments: Appointment[]

    @OneToMany(type => HealthPlan, healthPlan => healthPlan.person, { nullable: true,  })
    healthPlans: HealthPlan[]

}