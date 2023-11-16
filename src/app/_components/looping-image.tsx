"use client";

import React, {useEffect, useState} from "react";

type LoopingImageProps = {
    src: string[];
    label: string[];
}

const LoopingImage: React.FC<LoopingImageProps> = ({src, label}) => {
    const [currentImage, setCurrentImage] = useState(src[0]);
    const [currentLabel, setCurrentLabel] = useState('');
    const [imageIndex, setImageIndex] = useState(0);

    const loadNextImage = () => {
        const index = imageIndex;
        setCurrentImage(src[index] + "");
        setImageIndex((index + 1) % src.length);
        if (label.length > 0 && label[index])
            setCurrentLabel(label[index] + "");
    };


    useEffect(() => {
        const interval = setInterval(loadNextImage, 1000);

        return () => clearInterval(interval);
    }, [imageIndex]);

    return (
        <div>

            {currentImage && <img src={currentImage} alt="Video Thumbnail"/>}

            {currentLabel && <div
                className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-1 py-0.5 text-xxs rounded">
                {currentLabel}
            </div>}
        </div>
    );
}

export default LoopingImage;