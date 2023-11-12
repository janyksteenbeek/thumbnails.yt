import {SearchIcon} from "lucide-react";
import Image from "next/image";
import image1 from '~/../public/thumbnails/mrbeast-1.jpeg'
import image2 from '~/../public/thumbnails/mrbeast-2.jpeg'
import image3 from '~/../public/thumbnails/joshua-1.jpeg'
import image4 from '~/../public/thumbnails/joshua-2.jpeg'
import image5 from '~/../public/thumbnails/ryan-1.jpeg'
import image6 from '~/../public/thumbnails/ryan-2.jpeg'
import {clsx} from "clsx";

export const runtime = 'edge';

export default function Home() {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2', "rotate-2"]

    return (
        <main className="flex  flex-col text-white ">
            <div className="container mx-auto flex flex-col w-full lg:w-3/5 text-center gap-12 px-4 py-24 mt-14">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold balance">Find and compare A/B test <span
                    className="bg-transparent font-extrabold text-white shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">thumbnails</span> for
                    YouTube videos</h1>
                <h2 className="text-md md:text-lg lg:text-xl lg:w-3/4 lg:m-auto">Explore every angle get direct insight
                    in what leading content strategies are used by comparing A/B YouTube thumbnails of all YouTube
                    creators. Perfect for YouTube
                    strategists,
                    video marketers, and content creators aiming to stand out in a competitive digital landscape.</h2>

                <div
                    className="flex mx-auto w-full md:w-4/5 lg:w-3/4 rounded-full bg-white/90  border-4 shadow-sm border-red-700 px-6 text-sm py-6 shadow-lg font-light gap-3 items-center text-zinc-800 shadow-lg shadow-zinc-300/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                    <SearchIcon className="w-5 h-5 text-white text-red-500"/>
                    <input type="text" name="search" id="search"
                           placeholder="Find thumbnails by YouTube channel or video URL"
                           className="bg-transparent w-full text-zinc-600 text-sm placeholder-zinc-400 focus:outline-none"/>
                </div>

            </div>

            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5, image6].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-[9/6] w-64 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                            rotations[imageIndex % rotations.length],
                        )}
                    >
                        <Image alt="Thumbnail" src={image} placeholder="blur"
                               width={740} height={760}

                               className="absolute inset-0 object-cover w-full h-full"/>
                    </div>
                ))}
            </div>

        </main>
    );
}
