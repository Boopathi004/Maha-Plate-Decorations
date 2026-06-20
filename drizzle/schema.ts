import { mysqlTable, int, varchar, text, longtext, timestamp, boolean, decimal, mysqlEnum } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Users Table
export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  openId: varchar('openId', { length: 64 }).unique().notNull(),
  name: text('name'),
  email: varchar('email', { length: 320 }),
  loginMethod: varchar('loginMethod', { length: 64 }),
  role: mysqlEnum('role', ['user', 'admin']).default('user'),
  createdAt: timestamp('createdAt').default(sql`NOW()`),
  updatedAt: timestamp('updatedAt').default(sql`NOW()`).onUpdateNow(),
  lastSignedIn: timestamp('lastSignedIn').default(sql`NOW()`),
});

// Bookings Table
export const bookings = mysqlTable('bookings', {
  id: int('id').autoincrement().primaryKey(),
  clientName: varchar('clientName', { length: 255 }).notNull(),
  clientEmail: varchar('clientEmail', { length: 320 }).notNull(),
  clientPhone: varchar('clientPhone', { length: 20 }).notNull(),
  eventType: varchar('eventType', { length: 100 }).notNull(),
  eventDate: timestamp('eventDate').notNull(),
  plateCount: int('plateCount').notNull(),
  packageType: mysqlEnum('packageType', ['basic', 'premium', 'elite']).notNull(),
  specialRequests: longtext('specialRequests'),
  status: mysqlEnum('status', ['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
  totalPrice: decimal('totalPrice', { precision: 10, scale: 2 }),
  createdAt: timestamp('createdAt').default(sql`NOW()`),
  updatedAt: timestamp('updatedAt').default(sql`NOW()`).onUpdateNow(),
});

// Reviews Table
export const reviews = mysqlTable('reviews', {
  id: int('id').autoincrement().primaryKey(),
  clientName: varchar('clientName', { length: 255 }).notNull(),
  clientEmail: varchar('clientEmail', { length: 320 }).notNull(),
  rating: int('rating').notNull(),
  reviewText: longtext('reviewText').notNull(),
  eventType: varchar('eventType', { length: 100 }),
  isApproved: boolean('isApproved').default(false),
  createdAt: timestamp('createdAt').default(sql`NOW()`),
  approvedAt: timestamp('approvedAt'),
  updatedAt: timestamp('updatedAt').default(sql`NOW()`).onUpdateNow(),
});

// Gallery Images Table
export const galleryImages = mysqlTable('galleryImages', {
  id: int('id').autoincrement().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('imageUrl').notNull(),
  imageKey: varchar('imageKey', { length: 255 }).notNull(),
  eventType: varchar('eventType', { length: 100 }).notNull(),
  displayOrder: int('displayOrder').default(0),
  isActive: boolean('isActive').default(true),
  createdAt: timestamp('createdAt').default(sql`NOW()`),
  updatedAt: timestamp('updatedAt').default(sql`NOW()`).onUpdateNow(),
});

// Service Packages Table
export const servicePackages = mysqlTable('servicePackages', {
  id: int('id').autoincrement().primaryKey(),
  packageType: mysqlEnum('packageType', ['basic', 'premium', 'elite']).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: longtext('description'),
  basePrice: decimal('basePrice', { precision: 10, scale: 2 }).notNull(),
  inclusions: longtext('inclusions'),
  maxPlates: int('maxPlates'),
  decorationStyle: text('decorationStyle'),
  createdAt: timestamp('createdAt').default(sql`NOW()`),
  updatedAt: timestamp('updatedAt').default(sql`NOW()`).onUpdateNow(),
});
