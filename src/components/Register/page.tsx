"use server";

import { hashPassword } from "../../../auth";
import { prisma } from "../../../lib/prisma";



export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
}