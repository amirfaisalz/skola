"use server";

import { z } from "zod";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";

import db from "@/lib/database";
import { userTable } from "@/lib/database/schema";
import { lucia, validateRequest } from "@/lib/lucia";
import { SignInSchema, SignUpSchema } from "@/types/auth";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await argon2.hash(values.password);
  const userId = generateId(15);

  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        hashedPassword,
      })
      .returning({
        id: userTable.id,
        email: userTable.email,
      });

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
      message: "Success create an account",
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error?.message,
    };
  }

  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, values.email),
  });

  if (!existingUser) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }

  if (!existingUser.hashedPassword) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }

  const isValidPassword = await argon2.verify(
    existingUser.hashedPassword,
    values.password
  );

  if (!isValidPassword) {
    return {
      success: false,
      data: null,
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: true,
    data: null,
    message: "Logged in successfully",
  };
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        success: false,
        data: null,
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error?.message,
    };
  }
};
