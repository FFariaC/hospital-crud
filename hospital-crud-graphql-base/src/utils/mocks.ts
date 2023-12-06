import { PersonSexOptions, PersonTypeOptions } from "../person/person.enum";

export const personSample = {  
    id: 1,
    name: 'Roger',
    birthDate: null,
    sex: PersonSexOptions.MASCULINE,
    type: PersonTypeOptions.PATIENT,
    document: "213121122",
    idHealthPlan: null,
    createdAt: new Date(),
    updatedAt: null,
    appointments: [],
    healthPlans: []
}

export const healthPlanSample = {
    id: 1,
    name: "Plano Gold",
    description: "Viver vale ouro",
    createdAt: new Date(),
    updatedAt: null,
    person: null
}

export const appointmentSample = {
    id: 1,
    date: null,
    idPatient: 1,
    idMedic: 1,
    idPlan: 1,
    createdAt: new Date(),
    updatedAt: null,
    person: null
}

export const mockAppointmentsToPeronSample = {
    personId: 1,
    appointmentId: 1
}

export const createPersonMutationSample =  `
mutation createPerson{
  createPerson(
	createPersonInput:{
    name: "Amari Cooper",
    type: PATIENT
  }){
    name,
    id
  }
}
`

export const createHealthPlanMutationSample = `
mutation createHealthPlan{
    createHealthPlan(createHealthPlanInput:{
    name: "Stanford",
    description:"Uni"
  }) {
    id,
    name
  }
}
`

export const createAppointmentMutationSample = `
mutation createAppointment{
  createAppointment(createAppointmentInput:{
    idPlan: 1,
    idMedic: 1,
  }){
    id
  }
}
`

export const getPersonQuerySample = `
query getPerson{
  getPerson(id: 1){
  	   name,
    		sex
    appointments{
      id,
    },
    healthPlans{
      id,
    	}
    }
}
`

export const getHealthPlanQuerySample = `
  query getHealthPlan{
    getHealthPlan(id: 1) {
    name,
    person{
      name
    }
  }
}
`

export const getAppointmentQuerySample = `
query getAppointment{
  getAppointment(
    id: 1
  ) {
    person {
      name
    }
  }
}
`

export const getAllPersonQuerySample = `
query getAllPerson{
  getAllPerson{
    name
    appointments{
      id
    }
    healthPlans{
      id
    }
  }
}
`

export const getAllHealthPlanQuerySample = `
  query getAllHealthPlan{
    getAllHealthPlan{
    id,
    description,
    person{
      id
    }
  }
}
`

export const getAllAppointmentQuerySample = `
query getAllAppointment{
  getAllAppointment{
    id,
    person {
      name
    }
  }
}
`

export const assignHealthPlanToPersonMutationSample = `
mutation assignHealthPlanToPerson{
  assignHealthPlanToPerson(
    assignHealthPlanToPerson:{
      healthPlanId: 1,
      personId:1,      
    })
  {
  	id,
    description
    person {
      name
    }
    }
  }
` 

export const assignAppointmentsToPersonMutationSample = `
mutation assignAppointmentsToPerson{
  assignAppointmentsToPerson(
    assignAppointmentsToPerson:{
      appointmentId: 1,
      personId:1,      
    })
  {
  	id,
    person {
      name
    }
    }
  }
`