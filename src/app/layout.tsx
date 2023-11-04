import "~/styles/globals.css";

import {Inter} from "next/font/google";
import {headers} from "next/headers";

import {TRPCReactProvider} from "~/trpc/react";
import Header from "~/app/_components/header";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const runtime = 'edge';

export const metadata = {
    title: "Find all YouTube thumbnails for a channel or video | thumbnails.yt",
    description: "Easily find all full-size live & A/B test YouTube thumbnails for channel or video",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`thumbnails-yt font-sans ${inter.variable} bg-cover bg-[url(/bg-thumbs.png)]`}>
        <TRPCReactProvider headers={headers()}>
            <Header/>
            {children}
        </TRPCReactProvider>
        </body>
        </html>
    );
}
