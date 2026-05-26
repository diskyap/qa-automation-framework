import { faker } from '@faker-js/faker'

const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const postalCode = faker.location.zipCode()

export { firstName, lastName, postalCode }
