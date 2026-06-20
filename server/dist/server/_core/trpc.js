import { initTRPC, TRPCError } from '@trpc/server';
const t = initTRPC.context().create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(async (opts) => {
    const { ctx } = opts;
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});
export const adminProcedure = publicProcedure.use(async (opts) => {
    const { ctx } = opts;
    if (!ctx.user || ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Admin access required' });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});
