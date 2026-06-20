import { router, publicProcedure } from '../trpc.js';
import { bookings } from '../../drizzle/schema.js';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
export const bookingRouter = router({
    create: publicProcedure
        .input(z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
        eventType: z.string(),
        eventDate: z.string(),
        plateCount: z.string().or(z.number()),
        packageType: z.enum(['basic', 'premium', 'elite']),
        specialRequests: z.string().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        const [result] = await ctx.db.insert(bookings).values({
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            eventType: input.eventType,
            eventDate: new Date(input.eventDate),
            plateCount: Number(input.plateCount),
            packageType: input.packageType,
            specialRequests: input.specialRequests,
        });
        return { id: result.insertId };
    }),
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(bookings);
    }),
    updateStatus: publicProcedure
        .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
    }))
        .mutation(async ({ ctx, input }) => {
        await ctx.db.update(bookings).set({ status: input.status }).where(eq(bookings.id, input.id));
        return { success: true };
    }),
});
