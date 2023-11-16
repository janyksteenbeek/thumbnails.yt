import React, {Suspense} from 'react';
import {getThumbnailsAndLabels} from "~/services/YouTube";
import Link from "next/link";

type ABThumbnailProps = {
    videoId: string;
};

const VideoThumbnailsShelf: React.FC<ABThumbnailProps> = async ({videoId}) => {
    const {imageUrls, labels} = await getThumbnailsAndLabels(videoId)

    const renderImages = () => {
        return imageUrls.map(i => (
            <div className="relative group overflow-hidden rounded-lg" key={i}>
                <Link href={i} target="_blank">
                    <img src={i} alt="Video Thumbnail"/>
                </Link>
                <div
                    className="absolute bottom-2 group-hover:opacity-0 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-lg rounded">
                    {labels[imageUrls.indexOf(i)]}
                </div>
            </div>
        ));
    };

    return (
        <div className={"grid gap-4 md:grid-cols-" + (labels.length + 1)}>
            <Suspense fallback={<img alt="Video Thumbnail"
                                     src={"https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg"}/>}>
                {renderImages()}
            </Suspense>
            <div className="relative group">
                <iframe src={"https://www.youtube-noco®okie.com/embed/" + videoId}
                        className="h-full w-full border-red-700 border-8"
                        allow="encrypted-media; picture-in-picture"
                        allowFullScreen/>
                <div
                    className="absolute bottom-4 right-4 group-hover:hidden bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
                    Original video
                </div>
            </div>
        </div>
    );
};

export default VideoThumbnailsShelf;