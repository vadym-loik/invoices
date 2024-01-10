import { int, mysqlTable, varchar, binary } from 'drizzle-orm/mysql-core';
import { db } from '@/db/app';
import { relations } from 'drizzle-orm';
// import { blob } from 'stream/consumers';

export const partners = mysqlTable('partners', {
  id: int('id').notNull().primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }),
  type: varchar('type', { length: 255 }),
  siret: varchar('siret', { length: 255 }),
});

export type Partner = typeof partners.$inferSelect;

export const dynamic = 'force-dynamic';

export async function getPartnerData(): Promise<Partner[]> {
  const result = await db.select().from(partners);
  return result;
}

export const invoices = mysqlTable('invoices', {
  id: int('id').notNull().primaryKey().autoincrement(),
  data: binary('data').notNull(),
  partnerId: int('partnerId').notNull(),
});

export type Invoice = typeof invoices.$inferSelect;

export const partnersRelations = relations(partners, ({ many }) => ({
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  partnerId: one(partners, {
    fields: [invoices.partnerId],
    references: [partners.id],
  }),
}));
