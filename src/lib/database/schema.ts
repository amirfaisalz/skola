import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password"),
  roleId: text("role_id")
    .notNull()
    .references(() => roleTable.id),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const roleTable = pgTable("role", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export type TRole = InferSelectModel<typeof roleTable>;

export const permissionTable = pgTable("permission", {
  id: text("id").primaryKey(),
  roleId: text("role_id")
    .notNull()
    .references(() => roleTable.id), // Reference to the roles table
  name: text("name").notNull(),
});
