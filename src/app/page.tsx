import {SearchIcon} from "lucide-react";
import Image from "next/image";
import image1 from '../../public/static/thumbnails/mrbeast-1.jpeg'
import image2 from '../../public/static/thumbnails/mrbeast-2.jpeg'
import image3 from '../../public/static/thumbnails/joshua-1.jpeg'
import image4 from '../../public/static/thumbnails/joshua-2.jpeg'
import image5 from '../../public/static/thumbnails/ryan-1.jpeg'
import image6 from '../../public/static/thumbnails/ryan-2.jpeg'
import {clsx} from "clsx";

export const runtime = 'edge';

export default function Home() {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2', "rotate-2"]

    return (
        <main className="flex flex-col text-white">
            <div
                className="container mx-auto flex flex-col w-full lg:w-3/5 text-center gap-12 px-4 py-4 xl:py-24 lg:py-16 mt-14">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold balance">Find and compare A/B test <span
                    className="bg-transparent font-extrabold text-white shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">thumbnails</span> for
                    YouTube videos</h1>
                <h2 className="text-md md:text-lg lg:text-xl lg:w-3/4 lg:m-auto">Explore every angle get direct insight
                    in what leading content strategies are used by comparing A/B YouTube thumbnails of all YouTube
                    creators. Perfect for YouTube
                    strategists,
                    video marketers, and content creators aiming to stand out in a competitive digital landscape.</h2>

                <form action="/search"
                      className="flex mx-auto w-full md:w-4/5 lg:w-3/4 rounded-full bg-white/90  border-4 shadow-sm border-red-700 px-6 text-sm py-6 shadow-lg font-light gap-3 items-center text-zinc-800 shadow-lg shadow-zinc-300/5 ring-1 ring-zinc-900/5 backdrop-blur">
                    <button type="submit"><SearchIcon className="w-5 h-5  text-red-500"/></button>
                    <input type="text" name="q" id="search"
                           placeholder="Discover thumbnails by YouTube channel URL or video URL"
                           className="bg-transparent w-full text-zinc-600 text-sm placeholder-zinc-500 focus:outline-none"/>
                </form>

            </div>

            <div className="-my-4 flex justify-center gap-0.5 overflow-hidden py-16 lg:py-2 sm:gap-8">
                {[image1, image2, image3, image4, image5, image6].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-[9/6] w-32 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                            rotations[imageIndex % rotations.length],
                        )}
                    >
                        <Image alt="Thumbnail" src={image} placeholder="blur"
                               width={540} height={760}
                               className="absolute inset-0 object-cover w-full h-full"/>
                    </div>
                ))}
            </div>

        </main>
    );
}
