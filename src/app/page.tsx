import {api} from "~/trpc/server";
import {SearchIcon} from "lucide-react";
import Image from "next/image";
import image1 from '~/../public/thumbnails/mrbeast-1.jpeg'
import image2 from '~/../public/thumbnails/mrbeast-2.jpeg'
import image3 from '~/../public/thumbnails/joshua-1.jpeg'
import image4 from '~/../public/thumbnails/joshua-2.jpeg'
import image5 from '~/../public/thumbnails/ryan-1.jpeg'
import {clsx} from "clsx";

export const runtime = 'edge';

export default async function Home() {
    const hello = await api.post.hello.query({text: "from tRPC"});
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

    return (
        <main className="flex min-h-screen flex-col text-white">
            <div className="container flex flex-col w-3/5 text-center gap-12 px-4 py-16 mt-14">
                <h1 className="text-7xl font-bold ">Find <span
                    className="bg-transparent font-extrabold text-white shadow-[inset_0_-0.5em_0_0_rgb(253_22_20_/_70%)]">thumbnails</span> for
                    YouTube videos</h1>
                <h2 className="text-xl ">Explore a user-friendly platform to view full-size thumbnail alongside the
                    three A/B thumbnail options of your favorite YouTube videos. Ideal for content creators and
                    thumbnail designers to find inspiration and understand the competition.</h2>

                <div
                    className="flex mx-auto w-3/5 rounded-full bg-white/90 px-6 text-sm py-6 shadow-lg font-light gap-3 items-center text-zinc-800 shadow-lg shadow-zinc-300/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                    <SearchIcon className="w-5 h-5 text-white dark:text-zinc-200"/>
                    <input type="text" name="search" id="search"
                           placeholder="Find thumbnails by YouTube channel or video URL"
                           className="bg-transparent min-w-[900px] w-full text-zinc-400 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none"/>
                </div>

            </div>

            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-[9/6] w-64 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                            rotations[imageIndex % rotations.length],
                        )}
                    >
                        <Image alt="Thumbnail" src={image} sizes="(min-width: 640px) 1rem, 11rem"
                               className="absolute inset-0 h-full w-full object-cover"/>
                    </div>
                ))}
            </div>

        </main>
    );
}
