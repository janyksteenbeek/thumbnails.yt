import Link from "next/link";
import {api} from "~/trpc/server";

export const runtime = 'edge';

export default async function Page({params}: { params: { uc: string } }) {
    const channel = await api.channels.get.query({uc: params.uc});
    const videos = await api.channels.uploads.query({id: channel?.contentDetails?.relatedPlaylists?.uploads ?? ""});

    return (
        <div className="px-12 lg:px-24">
            <div className="flex gap-4 items-center my-20">
                <img src={channel?.snippet?.thumbnails?.high?.url ?? ""} width="180"
                     alt={channel?.snippet?.title ?? ""} className="border-red-700 border-4 rounded-full shadow-sm"/>
                <div>
                    <div
                        className="bg-transparent font-extrabold text-white text-8xl shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">{channel?.snippet?.title}</div>
                    <div className="mt-2 text-2xl font-bold text-white">{channel?.snippet?.customUrl}</div>
                </div>

            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-4">
                {videos.map(video => (
                    <div className="relative group overflow-hidden rounded-lg" key={video.id}>
                        <Link className="absolute inset-0 z-10" href={'/video/' + video.id}>
                            
                        </Link>
                        <img
                            alt={video.snippet?.title ?? ""}
                            className="object-cover w-full h-48 group-hover:opacity-75"
                            src={video.snippet?.thumbnails?.maxres?.url ?? video.snippet?.thumbnails?.high?.url ?? ""}
                            style={{
                                aspectRatio: "1280/720",
                                objectFit: "cover",
                            }}
                            height={400}
                        />
                        <div
                            className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xxs rounded">A
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg md:text-xl text-white line-clamp-3">{video.snippet?.title}</h3>
                            <p className="text-sm text-white mb-2">Published
                                at {(new Date(video.snippet?.publishedAt ?? "").toLocaleString())}</p>
                            {/*<p className="text-sm text-gray-500">Uploaded on Nov 10, 2023</p>*/}
                        </div>
                    </div>
                ))}
            </section>
        </div>

    );
}