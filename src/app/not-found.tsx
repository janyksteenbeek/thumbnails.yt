'use client';

import Link from "next/link";

export const runtime = 'edge';

export default function NotFound() {
    return <>
        <main className="grid h-screen place-items-center  px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-white">404</p>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Page not
                    found</h1>
                <p className="mt-6 text-base leading-7 text-gray-300">Sorry, we couldn’t find the page you’re looking
                    for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/"
                          className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Go
                        back home</Link>
                </div>
            </div>
        </main>

    </>
}