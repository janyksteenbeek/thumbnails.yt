import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import {type NextRequest} from "next/server";
import {appRouter} from "~/server/api/root";
import {createTRPCContext} from "~/server/api/trpc";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createTRPCContext({req}),
        onError:
            ({path, error}) => {
                console.error(
                    `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
                );
            }

    });

export {handler as GET, handler as POST};
