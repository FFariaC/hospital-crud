import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";
import { PersonSexOptions, PersonTypeOptions } from "./person.enum";

registerEnumType(PersonTypeOptions, {
    name: 'PersonTypeOptions',
})

registerEnumType(PersonSexOptions, {
    name: 'PersonSexOptions'
})

@InputType()
export class CreatePersonInput {
    @Field(() => Int, { nullable: true })
    id: number

    @Field(() => String, { nullable: true })
    name: string

    @Field(() => Date, { nullable: true })
    birthDate: Date

    @Field(() => PersonSexOptions, { nullable: true })
    sex: PersonSexOptions

    @Field(() => PersonTypeOptions, { nullable: true })
    type: PersonTypeOptions

    @Field(() => String, { nullable: true })
    document: string

    @Field(() => String, { nullable: true })
    idHealthPlan: string

    @Field(() => Date, { nullable: true })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt: Date

}