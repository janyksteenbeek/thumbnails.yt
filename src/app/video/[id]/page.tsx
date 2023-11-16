import {api} from "~/trpc/server";
import {Suspense} from "react";
import Spinner from "~/app/_components/spinner";
import VideoThumbnailsShelf from "~/app/_components/video-thumbnails-shelf";
import Link from "next/link";

export default async function Video({params}: { params: { id: string } }) {
    const video = await api.videos.get.query({id: params.id});

    return (
        <div className="px-4 lg:px-24">
            <div className="flex flex-col sm:flex-row lg:gap-8 gap-2 items-center my-8 lg:my-16">
                <div>
                    <div
                        className="bg-transparent font-extrabold text-white text-4xl sm:text-6xl lg:text-8xl shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">
                        {video?.snippet?.title}
                    </div>
                    <div
                        className="mt-2 text-xl sm:text-2xl font-bold text-white flex gap-2 md:gap-8 items-center flex-col md:flex-row">
                        <Link href={"/channel/" + video?.snippet?.channelId}>{video?.snippet?.channelTitle}</Link>
                        <span
                            className="bg-red-600/30 text-white px-2 py-1 rounded">{(new Intl.NumberFormat()).format(parseInt(video?.statistics?.viewCount ?? "") ?? 0)} views</span>
                    </div>
                </div>
            </div>

            <div className="">
                <Suspense fallback={<Spinner/>}>
                    <VideoThumbnailsShelf videoId={params.id}/>
                </Suspense>
            </div>
        </div>


    );
}