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
    title: "A/B Test YouTube thumbnail explorer | thumbnails.yt",
    description: "Search and compare A/B test video thumbnails from any YouTube channel, gaining comprehensive visual insights to maximize your content strategy",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className="h-full">
        <body className={`thumbnails-yt h-full font-sans ${inter.variable} bg-cover bg-[url(/bg-thumbs.png)]`}>
        <TRPCReactProvider headers={headers()}>
            <Header/>
            {children}
            <Footer/>
        </TRPCReactProvider>
        </body>
        </html>
    );
}
