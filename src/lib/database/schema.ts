import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
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
}, (table) => {
  return {
    emailIdx: index("user_email_idx").on(table.email),
    roleIdIdx: index("user_role_id_idx").on(table.roleId),
  }
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
}, (table) => {
  return {
    userIdIdx: index("session_user_id_idx").on(table.userId),
    expiresAtIdx: index("session_expires_at_idx").on(table.expiresAt),
  }
});

export const roleTable = pgTable("role", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
}, (table) => {
  return {
    nameIdx: index("role_name_idx").on(table.name),
  }
});

export const permissionTable = pgTable("permission", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  moduleId: text("module_id")
    .notNull()
    .references(() => moduleTable.id),
}, (table) => {
  return {
    moduleIdIdx: index("permission_module_id_idx").on(table.moduleId),
  }
});

export const moduleTable = pgTable("module", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
}, (table) => {
  return {
    nameIdx: index("module_name_idx").on(table.name),
  }
});

export const rolePermissionTable = pgTable("role_permission", {
  roleId: text("role_id")
    .notNull()
    .references(() => roleTable.id),
  permissionId: text("permission_id")
    .notNull()
    .references(() => permissionTable.id),
}, (table) => {
  return {
    roleIdIdx: index("role_permission_role_id_idx").on(table.roleId),
    permissionIdIdx: index("role_permission_permission_id_idx").on(table.permissionId),
  }
});

export type TRole = InferSelectModel<typeof roleTable>;
export type TPermission = InferSelectModel<typeof permissionTable>;
export type TRolePermission = InferSelectModel<typeof rolePermissionTable>;
export type TUser = InferSelectModel<typeof userTable>;
export type TSession = InferSelectModel<typeof sessionTable>;
export type TModule = InferSelectModel<typeof moduleTable>;