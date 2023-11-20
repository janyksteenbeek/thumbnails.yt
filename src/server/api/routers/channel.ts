import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {getChannel, getChannelIdByUsername, getChannelIdFromHandle, getPublicUploadVideoIds} from "~/services/YouTube";

export const channelRoutes = createTRPCRouter({
    get: publicProcedure
        .input(z.object({uc: z.string().regex(/^UC/)}))
        .query(({input}) => {
            return getChannel(input.uc);
        }),
    findIdByUsername: publicProcedure
        .input(z.object({username: z.string()}))
        .query(({input}) => {
            return getChannelIdByUsername(input.username);
        }),
    findIdByHandle: publicProcedure
        .input(z.object({handle: z.string()}))
        .query(({input}) => {
            return getChannelIdFromHandle(input.handle);
        }),
    uploads: publicProcedure
        .input(z.object({uc: z.string().regex(/^UC/)}))
        .query(({input}) => {
            return getPublicUploadVideoIds(input.uc);
        }),
});
