import {searchRoutes} from "~/server/api/routers/search";
import {createTRPCRouter} from "~/server/api/trpc";
import {channelRoutes} from "~/server/api/routers/channel";

export const appRouter = createTRPCRouter({
    search: searchRoutes,
    channels: channelRoutes
});

export type AppRouter = typeof appRouter;
