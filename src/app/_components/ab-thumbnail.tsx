import React, {Suspense} from 'react';
import LoopingImage from "~/app/_components/looping-image";

type ABThumbnailProps = {
    videoId: string;
};

const ABThumbnail: React.FC<ABThumbnailProps> = async ({videoId}) => {
    const thumbnailUrls = [
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_1.jpg",
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_2.jpg",
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_3.jpg",
    ];

    let imageUrls: string[] = [];
    let labels: string[] = [];
    const thumbnailTitles = [
        "A", "B", "C"
    ];

    let count = 0;

    for (const url of thumbnailUrls) {
        const index = thumbnailUrls.indexOf(url);
        const response = await fetch(url, {method: 'HEAD'});
        if (response.status === 200) {
            count++;
            imageUrls.push(url);
            labels.push(thumbnailTitles[index] + "");
        }
    }

    if (count === 0 || count === 1) {
        console.log("No custom thumbnails found for video " + videoId + ", using default thumbnail")
        labels = [];
        imageUrls = ["https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg"];
    }

    return (
        <div>
            <Suspense fallback={<img alt="Video Thumbnail" className="object-cover w-full h-48"
                                     src={"https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg"}/>}>
                <LoopingImage src={imageUrls} label={labels}/>
            </Suspense>
        </div>
    );
};

export default ABThumbnail;
