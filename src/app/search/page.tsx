import {api} from "~/trpc/server";
import {redirect} from "next/navigation";
import {track} from "@vercel/analytics/server";

export default async function Search({searchParams}: {
    searchParams: Record<string, string | string[] | undefined>
}) {
    const {q} = searchParams;
    const query = Array.isArray(q) ? q[0] : q;
    if (!query) {
        return redirect('/');
    }

    await track('Search', {q: query});

    const type = await api.search.determinePath.query({url: query});
    if (!type) {
        return redirect(`/?e=invalid_url`);
    }

    switch (type.type) {
        case 'video':
            return redirect(`/video/${type.id}`);
        case 'channel_id':
            return redirect(`/channel/${type.id}`);
        case 'channel_handle':
            const handleChannelId = await api.channels.findIdByHandle.query({handle: type.id ?? query ?? ""});
            if (!handleChannelId) {
                return redirect(`/?e=invalid_url`);
            }

            return redirect(`/channel/${handleChannelId}`);
        case 'channel_username':
        default:
            const usernameChannelId = await api.channels.findIdByUsername.query({username: type.id ?? query ?? ""});
            if (!usernameChannelId) {
                return redirect(`/?e=invalid_url`);
            }
            return redirect(`/channel/${usernameChannelId}`);

    }
}