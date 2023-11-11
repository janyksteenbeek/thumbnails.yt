import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {parseYouTubeUrl} from "~/services/YouTube";

export const searchRoutes = createTRPCRouter({
    determinePath: publicProcedure
        .input(z.object({url: z.string()}))
        .query(({input}) => {
            return parseYouTubeUrl(input.url);
        }),
});
