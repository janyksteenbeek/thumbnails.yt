import React, {Suspense} from 'react';
import LoopingImage from "~/app/_components/looping-image";
import {getThumbnailsAndLabels} from "~/services/YouTube";

type ABThumbnailProps = {
    videoId: string;
};

const ABThumbnail: React.FC<ABThumbnailProps> = async ({videoId}) => {
    const {imageUrls, labels} = await getThumbnailsAndLabels(videoId)

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
