"use client";
import Image from "next/image";
import { useState } from "react";

import { Movie } from "@/types/types";
import { toBase64, shimmer } from "@/utils/utils";

type Props = {
    movie: Movie;
};

export default function MovieDetails({ movie }: Props) {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    return (
        <>
            <div className="relative flex max-w-[1200px] flex-col items-center justify-center gap-6 rounded-lg bg-slate-800 px-6 py-8 text-slate-100 md:flex-row">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    width={202}
                    height={135}
                    className="rounded-lg border-2 border-slate-800"
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(135, 90))}`}
                />
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl font-bold tracking-wider">
                        {movie.title}
                    </h3>
                    <p className="text-pretty text-lg first-letter:pl-2">
                        {movie.overview}
                    </p>
                    <p className="font-semibold">
                        Released: {movie.release_date}
                    </p>
                    <p className="font-semibold">
                        Rating: {movie.vote_average}
                    </p>
                </div>
            </div>
            <button
                className="rounded-lg bg-slate-100 px-4 py-2 text-slate-900 transition hover:scale-105 hover:bg-slate-200"
                onClick={() => setButtonClicked(true)}
            >
                {!buttonClicked
                    ? "Don't like the result? Click Me!"
                    : "Sucks to be you but you gotta watch it"}
            </button>
        </>
    );
}
