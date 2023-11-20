import Image from "next/image";
import Link from "next/link";
import {SearchIcon} from "lucide-react";

export default function Header() {
    return <>
        <nav className="flex items-center lg:justify-between justify-center gap-6 p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">thumbnails.yt</span>
                    <Image src="/static/logo.svg" alt="thumbnails.yt" width="42" height="42" className="text-white"
                           color="white"/>
                </Link>
            </div>
            <form action={"/search"} method="get"
                  className="flex lg:flex-1 flex-grow group rounded-full bg-white/30 hover:bg-white transition px-3 text-sm py-3 font-light gap-3 items-center text-zinc-800 shadow-lg shadow-zinc-300/5 ring-1 ring-zinc-900/5 backdrop-blur ">
                <button type="submit">
                    <SearchIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-200"/>
                </button>
                <input type="text" name="q" id="search"
                       placeholder="YouTube channel URL / video URL"
                       className="bg-transparent min-w-full inline-block lg:min-w-[500px] w-full text-white placeholder-zinc-300 group-hover:placeholder-zinc-600 group-hover:text-zinc-500 focus:outline-none"/>
            </form>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link href="https://twitter.com/janyksteenbeek" className="text-lg font-semibold leading-6 text-white">
                    𝕏
                </Link>
            </div>
        </nav>
    </>
}