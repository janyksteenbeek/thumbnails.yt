import Link from "next/link";
import {api} from "~/trpc/server";
import {Suspense} from "react";
import AbThumbnail from "~/app/_components/ab-thumbnail";
import {track} from "@vercel/analytics/server";

export const runtime = 'edge';

export default async function Channel({params}: { params: { uc: string } }) {
    await track('Channel visit', {channelId: params.uc});

    const channel = await api.channels.get.query({uc: params.uc});
    const videos = await api.channels.uploads.query({id: channel?.contentDetails?.relatedPlaylists?.uploads ?? ""});

    return (
        <div className="px-4 lg:px-24">
            <div className="flex flex-col sm:flex-row lg:gap-8 gap-2 items-center my-8 lg:my-16">
                <Link target="_blank" href={`https://www.youtube.com/channel/${channel?.id}`}>

                    <img
                        src={channel?.snippet?.thumbnails?.maxres?.url ?? channel?.snippet?.thumbnails?.high?.url ?? ""}
                        width="180"
                        height="180"
                        alt={channel?.snippet?.title ?? ""}
                        className="border-red-700 border-4 rounded-full shadow-sm w-36 sm:w-44 md:w-56"
                    />
                </Link>
                <div>
                    <div
                        className="bg-transparent font-extrabold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">
                        {channel?.snippet?.title}
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold text-white">
                        {channel?.snippet?.customUrl}
                    </div>
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-6 p-4">
                {videos.map(video => (
                    <div className="relative group overflow-hidden rounded-lg" key={video.id}>
                        <Link className="absolute inset-0 z-10" href={'/video/' + video.contentDetails?.videoId}>
                        </Link>
                        <div className="relative">
                            <Suspense fallback={<img
                                alt={video.snippet?.title ?? ""}
                                src={video.snippet?.thumbnails?.maxres?.url ?? video.snippet?.thumbnails?.high?.url ?? ""}

                            />}>
                                <AbThumbnail videoId={video.contentDetails?.videoId ?? ""}/>
                            </Suspense>
                            <div
                                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
                                {video.contentDetails?.endAt}
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg md:text-xl text-white line-clamp-3">{video.snippet?.title}</h3>
                            <p className="text-sm text-white mb-2">Published
                                at {(new Date(video.snippet?.publishedAt ?? "").toLocaleString())}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>

    );
}