"use client";
import Image from "next/image";
import { useState } from "react";

import { Movie } from "@/types/types";
import { toBase64, shimmer } from "@/utils/utils";

type Props = {
    movie: Movie;
};

export default function MovieDetails({ movie }: Props) {
    const [likeButtonClicked, setLikeButtonClicked] = useState<boolean>(false);
    const [watchedButtonClicked, setWatchedButtonClicked] =
        useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <>
            <div className="relative flex w-full max-w-[1200px] flex-col items-center justify-start gap-6 rounded-lg bg-slate-800 px-6 py-8 text-slate-100 md:flex-row md:items-start">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    width={202}
                    height={135}
                    className="rounded-lg border-2 border-slate-800"
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(135, 90))}`}
                />
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-2xl font-bold tracking-wider">
                        {movie.title}
                    </h3>
                    <h3 className="text-sm italic">{movie.original_title}</h3>
                    <p className="text-pretty text-sm first-letter:pl-2 md:text-lg">
                        {showMore
                            ? movie.overview
                            : movie.overview.substring(0, 80) + "..."}
                        <button
                            onClick={() => setShowMore((curr) => !curr)}
                            className="ml-1 rounded-lg bg-slate-600 px-1 transition-colors hover:bg-slate-700"
                        >
                            {!showMore ? "Show more" : "Show less"}
                        </button>
                    </p>
                    <p className="font-semibold">
                        Language: {movie.original_language}
                    </p>
                    <p className="font-semibold">
                        Released: {movie.release_date}
                    </p>
                    <p className="font-semibold">
                        Rating: {movie.vote_average} ({movie.vote_count} votes)
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-x-6">
                <button
                    className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-900 transition hover:scale-105 hover:bg-slate-200 md:text-base"
                    onClick={() => setLikeButtonClicked(true)}
                >
                    {!likeButtonClicked
                        ? "Don't like the result? Click Me!"
                        : "Sucks to be you but you gotta watch it"}
                </button>
                <button
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:scale-105 hover:bg-slate-900 md:text-base"
                    onClick={() => setWatchedButtonClicked(true)}
                >
                    {!watchedButtonClicked
                        ? "I have already watched this"
                        : "So what? Watch it again"}
                </button>
            </div>
        </>
    );
}
