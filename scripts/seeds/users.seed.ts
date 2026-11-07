import { randomBytes } from "node:crypto";

import { faker } from "@faker-js/faker";

import { auth } from "@/lib/auth/auth";

export interface SeedUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export async function seedUser(): Promise<SeedUser> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = randomBytes(24).toString("base64url");

  const { user } = await auth.api.signUpEmail({
    body: {
      name: `${firstName} ${lastName}`,
      email,
      password,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password,
  };
}
