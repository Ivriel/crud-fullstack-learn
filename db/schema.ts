import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;// biar tipe datanya dinamis. kalau langsung di define di parameter function, entar malah harus ganti satu satu
export type UserInsert = typeof users.$inferInsert;
