import {searchRoutes} from "~/server/api/routers/search";
import {createTRPCRouter} from "~/server/api/trpc";
import {channelRoutes} from "~/server/api/routers/channel";
import {videoRoutes} from "~/server/api/routers/video";

export const appRouter = createTRPCRouter({
    search: searchRoutes,
    channels: channelRoutes,
    videos: videoRoutes,
});

export type AppRouter = typeof appRouter;
