import {api} from "~/trpc/server";
import {redirect} from "next/navigation";
import {track} from "@vercel/analytics";

// export const runtime = 'edge'; @todo werkt niet?

export default async function Search({searchParams}: {
    searchParams: Record<string, string | string[] | undefined>
}) {
    const {q} = searchParams;
    const query = Array.isArray(q) ? q[0] : q;
    if (!query) {
        return redirect('/');
    }

    track('Search', {q: query});


    const type = await api.search.determinePath.query({url: query});
    if (!type) {
        return redirect(`/?e=invalid_url`);
    }

    switch (type.type) {
        case 'video':
            return redirect(`/video/${type.id}`);
        case 'channel_id':
            return redirect(`/channel/${type.id}`);
        case 'channel_username':
        default:
            const id = await api.channels.findIdByUsername.query({username: type.id ?? query ?? ""});
            if (!id) {
                return redirect(`/?e=invalid_url`);
            }
            return redirect(`/channel/${id}`);

    }
}