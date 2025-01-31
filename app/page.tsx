"use client";
import { useState } from "react";

import GenrePicker from "@/components/GenrePicker";
import MovieDetails from "@/components/MovieDetails";
import MoviesGallery from "@/components/MoviesGallery";
import RouletteWheel from "@/components/RouletteWheel";
import { getMovies } from "@/lib/data-service";
import { Movie } from "@/types/types";

export default function Home() {
    const [gameState, setGameState] = useState<string>("genrePick");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [winningMovieIndex, setWinningMovieIndex] = useState<
        number | undefined
    >(undefined);

    function onGoClick(genre: string) {
        getMovies(genre)
            .then((data) => {
                setMovies(data);
                setGameState("showRoulette");
            })
            .catch((err) => console.log(err));
    }

    function onWheelStopSpinning(index: number) {
        setTimeout(() => {
            setWinningMovieIndex(index);
        }, 1000);
        setTimeout(() => {
            setGameState("showWinningPick");
        }, 5000);
    }

    return (
        <main className="grow">
            <div className="flex h-full flex-col items-center justify-center gap-y-12 bg-gradient-to-b from-cyan-700 to-cyan-900 px-12 py-12">
                {gameState === "genrePick" && (
                    <GenrePicker onGoClick={onGoClick} />
                )}
                {gameState === "showRoulette" && (
                    <>
                        <RouletteWheel
                            onWheelStopSpinning={onWheelStopSpinning}
                        />
                        <MoviesGallery
                            movies={movies}
                            winningMovieIndex={winningMovieIndex}
                        />
                    </>
                )}
                {gameState === "showWinningPick" && (
                    <MovieDetails movie={movies[winningMovieIndex!]} />
                )}
            </div>
        </main>
    );
}
