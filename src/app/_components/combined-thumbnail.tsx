import React, {useEffect, useState} from 'react';

type ImageSwitcherProps = {
    image1: string;
    image2: string;
};

const CombinedThumbnail: React.FC<ImageSwitcherProps> = ({image1, image2}) => {
    const [currentImage, setCurrentImage] = useState<string>(image1);

    // Preload images
    useEffect(() => {
        const img1 = new Image();
        img1.src = image1;
        const img2 = new Image();
        img2.src = image2;
    }, [image1, image2]);

    // Switch images every 2 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(prevImage => (prevImage === image1 ? image2 : image1));
        }, 2000);

        return () => clearInterval(intervalId);
    }, [image1, image2]);

    return <img src={currentImage} alt="Switching Image"/>;
};

export default CombinedThumbnail;
