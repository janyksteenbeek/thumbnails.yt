import {searchRoutes} from "~/server/api/routers/search";
import {createTRPCRouter} from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
    search: searchRoutes,
});

export type AppRouter = typeof appRouter;
