import { json, timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

//user schema
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(3),
});

//website generator schemas
export const projectTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar(),
  designCode: varchar(),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});

export const frameTable = pgTable("frames", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  frameId: varchar(),
  projectId: varchar().references(() => projectTable.projectId),
  createdOn: timestamp().defaultNow(),
});

export const chatTable = pgTable("chats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chatMessage: json(),
  frameId: varchar().references(() => frameTable.frameId),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});
