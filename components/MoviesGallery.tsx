import Image from "next/image";

import { Movie } from "@/types/types";
import { toBase64, shimmer } from "@/utils/utils";

function getBackgroundColor(index: number) {
    if (index === 0) return "green";

    const firstRange =
        (index >= 1 && index <= 10) || (index >= 19 && index <= 28);
    const secondRange =
        (index >= 11 && index <= 18) || (index >= 29 && index <= 36);

    if (firstRange) {
        return index % 2 === 0 ? "black" : "red";
    }
    if (secondRange) {
        return index % 2 === 0 ? "red" : "black";
    }

    return "transparent";
}

type Props = {
    movies: Movie[];
    winningMovieIndex: number | undefined;
};

export default function MoviesGallery({ movies, winningMovieIndex }: Props) {
    return (
        <div className="flex max-w-[1200px] flex-wrap justify-center gap-2">
            {movies.map((movie, index) => (
                <div
                    key={`${movie.id}${index}`}
                    className={`relative flex h-[135px] w-[90px] flex-col items-center justify-center rounded-lg bg-slate-900 text-slate-100 ${index === winningMovieIndex ? "animate-bounce" : ""}`}
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        fill
                        className="rounded-lg"
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(135, 90))}`}
                    />
                    <p
                        className="z-10 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-700 text-2xl"
                        style={{
                            backgroundColor: getBackgroundColor(index),
                        }}
                    >
                        {index}
                    </p>
                </div>
            ))}
        </div>
    );
}
