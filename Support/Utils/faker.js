import { faker } from "@faker-js/faker";

export class FakerUtils {
  static generateBillingAddress() {
    return {
      city: faker.location.city(),
      address1: faker.location.streetAddress(),
      zipCode: faker.location.zipCode(),
      phoneNumber: `9${faker.string.numeric(9)}`,
    };
  }
}