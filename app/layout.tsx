import Image from "next/image";
import { Fredoka } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Movie Roulette | IMDB Roulette",
    description:
        "Take a gamble and watch a random movie from a genre of your choosing",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${fredoka.className} flex h-screen flex-col antialiased`}
            >
                <header className="bg-cyan-700 px-12 py-12">
                    <h1 className="text-2xl font-bold tracking-widest text-slate-100">
                        Movie Roulette | Be Fun At Movie Parties
                    </h1>
                </header>
                {children}
                <footer className="flex flex-row items-center justify-between gap-x-5 bg-cyan-900 px-12 py-6">
                    <Image
                        src={"/TMDB.svg"}
                        alt="TMDB logo"
                        width={256}
                        height={128}
                        className="h-auto w-40"
                    />
                    <p className="text-end text-slate-100 sm:text-lg">
                        This product uses the TMDB API but is not endorsed or
                        certified by TMDB.
                    </p>
                </footer>
            </body>
        </html>
    );
}
