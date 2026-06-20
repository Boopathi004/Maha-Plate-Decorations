export function createContext(opts) {
    return {
        user: null,
        res: opts?.res || null,
        req: opts?.req || null,
    };
}
