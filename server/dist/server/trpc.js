import { initTRPC } from '@trpc/server';
import { db } from './db.js';
// Create context
export const createContext = ({ req, res, }) => {
    return {
        req,
        res,
        db,
    };
};
// Initialize tRPC
const t = initTRPC.context().create();
export const router = t.router;
export const publicProcedure = t.procedure;
