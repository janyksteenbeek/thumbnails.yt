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
    title: {
        template: '%s | thumbnails.yt',
        default: 'thumbnails.yt'
    },
    description: "Search and compare A/B test video thumbnails from any YouTube channel, gaining comprehensive visual insights to maximize your content strategy",
}

export default function RootLayout({children,}: { children: React.ReactNode; }) {

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
