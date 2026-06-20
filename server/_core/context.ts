import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export interface UserSession {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: 'admin' | 'user';
}

export interface Context {
  user: UserSession | null;
  res: CreateExpressContextOptions['res'] | null;
  req: CreateExpressContextOptions['req'] | null;
}

export function createContext(opts?: CreateExpressContextOptions): Context {
  return {
    user: null,
    res: opts?.res || null,
    req: opts?.req || null,
  };
}
