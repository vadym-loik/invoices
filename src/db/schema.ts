import { int, mysqlTable, varchar, binary } from 'drizzle-orm/mysql-core';
import { db } from '@/db/app';
import { relations, eq } from 'drizzle-orm';
// import { blob } from 'stream/consumers';

// PARTNER queries
export const partners = mysqlTable('partners', {
  id: int('id').notNull().primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  siret: varchar('siret', { length: 255 }).notNull(),
});

export type Partner = typeof partners.$inferSelect;

export const dynamic = 'force-dynamic';

export async function getPartnerData(): Promise<Partner[]> {
  const result = await db.select().from(partners);
  return result;
}

export async function getPartnerById(id: number): Promise<Partner> {
  const result = await db.select().from(partners).where(eq(partners.id, id));
  return result[0];
}

export async function updatePartnerById({
  id,
  name,
  address,
  type,
  siret,
}: {
  id: number;
  name: string;
  address: string;
  type: string;
  siret: string;
}) {
  const result = await db
    .update(partners)
    .set({ name, address, type, siret })
    .where(eq(partners.id, id));
  return result;
}

export async function deletePartnerById(id: number) {
  await db.delete(partners).where(eq(partners.id, id));
}

export async function addPartner({
  name,
  address,
  type,
  siret,
}: {
  name: string;
  address: string;
  type: string;
  siret: string;
}) {
  await db.insert(partners).values({ name, address, siret, type });
}

// INVOICE queries
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
