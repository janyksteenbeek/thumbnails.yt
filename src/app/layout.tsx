import "~/styles/globals.css";

import {Inter} from "next/font/google";
import {headers} from "next/headers";

import {TRPCReactProvider} from "~/trpc/react";
import Header from "~/app/_components/header";
import Footer from "~/app/_components/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Discover & view A/B test YouTube thumbnails | thumbnails.yt",

    description: "Search and compare A/B test video thumbnails from any YouTube channel, gaining comprehensive visual insights to maximize your content strategy",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className="h-full bg-red-900">
        <body className={`thumbnails-yt h-full font-sans ${inter.variable} bg-cover bg-[url(/static/bg-thumbs.png)]`}>
        <TRPCReactProvider headers={headers()}>
            <Header/>
            {children}
            <Footer/>
        </TRPCReactProvider>


        <script async defer src="https://trekker.thumbnails.yt/latest.js"></script>
        <noscript><img src="https://trekker.thumbnails.yt/noscript.gif" alt=""
                       referrerPolicy="no-referrer-when-downgrade"/></noscript>
        </body>
        </html>
    );
}
