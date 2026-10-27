import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workerApplications = sqliteTable("worker_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  profession: text("profession").notNull(),
  ahpraStatus: text("ahpra_status").notNull(),
  preferredRegion: text("preferred_region").notNull(),
  message: text("message").notNull().default(""),
  resumeKey: text("resume_key").notNull(),
  resumeName: text("resume_name").notNull(),
  resumeType: text("resume_type").notNull(),
  resumeSize: integer("resume_size").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
