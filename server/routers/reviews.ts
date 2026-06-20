import { router, publicProcedure } from '../trpc.js';
import { reviews } from '../../drizzle/schema.js';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const reviewRouter = router({
  create: publicProcedure
    .input(z.object({
      clientName: z.string(),
      clientEmail: z.string().email(),
      rating: z.number().min(1).max(5),
      reviewText: z.string(),
      eventType: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db.insert(reviews).values({
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        rating: input.rating,
        reviewText: input.reviewText,
        eventType: input.eventType || null,
        isApproved: false,
      });
      return { id: result.insertId };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(reviews);
  }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      isApproved: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(reviews)
        .set({ 
          isApproved: input.isApproved,
          approvedAt: input.isApproved ? new Date() : null
        })
        .where(eq(reviews.id, input.id));
      return { success: true };
    }),
});
