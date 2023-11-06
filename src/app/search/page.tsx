import {api} from "~/trpc/server";
import {redirect} from "next/navigation";

export default async function Search({
                                         params,
                                         searchParams,
                                     }: {
    params: {
        slug: string
    }
    searchParams: Record<string, string | string[] | undefined>
}) {
    const {q} = searchParams;
    if (!q) {
        // Redirect to homepage
        return redirect('/');
    }

    const type = await api.search.determinePath.query({url: q as string});

    switch (type.type) {
        case 'video':
            return redirect(`/video/${type.id}`);
            break;
        case 'channel':
            return redirect(`/channel/${type.id}`);
            break;
        default:
            return redirect(`/?e=invalid_url`);
            break;
    }
}