import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {getVideo} from "~/services/YouTube";

export const videoRoutes = createTRPCRouter({
    get: publicProcedure
        .input(z.object({id: z.string()}))
        .query(({input}) => {
            return getVideo(input.id);
        }),
});
