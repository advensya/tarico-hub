import { OneFlow } from "../../app/components/flow/interface/index";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  jsonb,
} from "drizzle-orm/pg-core";

export const company = pgTable("company", {
  id: uuid().primaryKey().defaultRandom(),
  logo: text(),
  name: varchar().notNull(),
  description: text(),
  website: varchar(),
  address: text(),
  sector: text(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const user = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar().unique().notNull(),
  avatar: varchar(),
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
  password: varchar(),
  createdAt: timestamp().defaultNow().notNull(),
  companyId: uuid("companyId").references(() => company.id),
});

export const auth = pgTable("auth", {
  id: uuid().primaryKey().defaultRandom(),
  close: boolean().default(false),
  createdAt: timestamp().defaultNow().notNull(),
  userId: uuid("userId").references(() => user.id),
});

export const flow = pgTable("flow", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  data: jsonb().$type<OneFlow[]>().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export type User = typeof tables.user.$inferSelect;
export type Company = typeof tables.company.$inferSelect;
export type Flow = typeof tables.flow.$inferSelect;
