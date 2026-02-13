import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default('true'),
  weeklyDigest: boolean('weekly_digest').default('true'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Chest X-ray scans uploaded for AI analysis
export const scans = pgTable('scans', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fileUrl: text('file_url').notNull(),
  patientName: text('patient_name').notNull(),
  patientAge: integer('patient_age').notNull(),
  analysisResult: jsonb('analysis_result'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// Detected lesions from AI scan analysis
export const lesions = pgTable('lesions', {
  id: text('id').primaryKey(),
  scanId: text('scan_id').references(() => scans.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  confidenceScore: text('confidence_score').notNull(),
  location: text('location').notNull(),
  size: text('size'),
  createdAt: timestamp('created_at').notNull(),
});
