import { router, publicProcedure } from '../trpc.js';
import { bookingRouter } from './bookings.js';
import { reviewRouter } from './reviews.js';
export const appRouter = router({
    healthcheck: publicProcedure.query(() => {
        return { status: 'ok' };
    }),
    bookings: bookingRouter,
    reviews: reviewRouter,
});
