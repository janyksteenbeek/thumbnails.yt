import {api} from "~/trpc/server";
import {redirect} from "next/navigation";

export default async function Search({searchParams}: {
    searchParams: Record<string, string | string[] | undefined>
}) {
    const {q} = searchParams;
    const query = Array.isArray(q) ? q[0] : q;
    if (!query) {
        return redirect('/');
    }

    const type = await api.search.determinePath.query({url: query});
    if (!type?.id) {
        return redirect(`/?e=invalid_url`);
    }

    switch (type.type) {
        case 'video':
            return redirect(`/video/${type.id}`);
        case 'channel_id':
            return redirect(`/channel/${type.id}`);
        case 'channel_username':
            const id = await api.channels.findIdByUsername.query({username: type.id});
            return redirect(`/channel/${id}`);
        default:
            return redirect(`/?e=invalid_url`);
    }
}