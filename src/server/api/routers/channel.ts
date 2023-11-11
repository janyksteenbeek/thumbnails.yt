import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {getChannel, getChannelIdByUsername, getPublicUploadVideoIds} from "~/services/YouTube";

export const channelRoutes = createTRPCRouter({
    get: publicProcedure
        .input(z.object({uc: z.string()}))
        .query(({input}) => {
            return getChannel(input.uc);
        }),
    findIdByUsername: publicProcedure
        .input(z.object({username: z.string()}))
        .query(({input}) => {
            return getChannelIdByUsername(input.username);
        }),
    uploads: publicProcedure
        .input(z.object({id: z.string()}))
        .query(({input}) => {
            return getPublicUploadVideoIds(input.id);

        }),
});
