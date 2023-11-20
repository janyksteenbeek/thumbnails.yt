import "~/styles/globals.css";
import {Analytics} from '@vercel/analytics/react';

import {Inter} from "next/font/google";
import {headers} from "next/headers";

import {TRPCReactProvider} from "~/trpc/react";
import Header from "~/app/_components/header";
import Footer from "~/app/_components/footer";
import {Suspense} from "react";
import Spinner from "~/app/_components/spinner";
import {Metadata} from "next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const runtime = 'edge';

export const metadata: Metadata = {
    metadataBase: new URL('https://thumbnails.yt'),
    title: {
        template: '%s | thumbnails.yt',
        default: 'Explore A/B test YouTube video thumbnails | thumbnails.yt'
    },
    description: "Search and compare A/B YouTube video thumbnails from any YouTube channel, gaining comprehensive visual insights to maximize your content strategy",
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://thumbnails.yt',
        siteName: 'thumbnails.yt',
        images: [
            {
                url: '/static/social.jpg',
                width: 1920,
                height: 1080,
                alt: 'thumbnails.yt',
            }
        ],
        description: "Search and compare A/B test YouTube  video thumbnails from any YouTube channel, gaining comprehensive visual insights to maximize your content strategy",
    },
    twitter: {
        creator: '@janyksteenbeek',
        site: '@janyksteenbeek',
        card: 'summary_large_image',
        description: "Search and compare A/B test YouTube video thumbnails from any YouTube channel",
        images: [
            {
                url: '/static/social.jpg',
                width: 1920,
                height: 1080,
                alt: 'thumbnails.yt',
            }
        ],
    },
    icons: [
        {
            href: '/static/favicon.png',
            url: '/static/favicon.png',
            type: 'image/png',
        },
    ],
}


export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en" className="thumbnails-yt h-full bg-red-900 bg-cover bg-[url(/static/bg-thumbs.png)]">
        <body className={`h-full font-sans ${inter.variable} `}>
        <TRPCReactProvider headers={headers()}>
            <Header/>
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-2">
                    <Spinner/>
                </div>}>
                {children}
            </Suspense>
            <Footer/>
            <Analytics/>
        </TRPCReactProvider>


        <script async defer src="https://trekker.thumbnails.yt/latest.js"></script>
        <noscript><img src="https://trekker.thumbnails.yt/noscript.gif" alt=""
                       referrerPolicy="no-referrer-when-downgrade"/></noscript>
        </body>
        </html>
    );
}
