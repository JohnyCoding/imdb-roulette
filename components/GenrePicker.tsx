"use client";
import { useEffect, useState } from "react";

import { getGenres } from "@/lib/data-service";
import { Genre } from "@/types/types";

type Props = {
    onGoClick: (genre: string) => void;
};

export default function GenrePicker({ onGoClick }: Props) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("unassigned");

    useEffect(() => {
        async function fetchGenres() {
            try {
                const fetchedGenres = await getGenres();
                setGenres(fetchedGenres);
                console.log(fetchedGenres);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGenres();
    }, []);

    function handleGoClick() {
        if (selectedGenre !== "unassigned") {
            onGoClick(selectedGenre);
        }
    }

    return (
        <>
            <h2 className="text-3xl font-bold capitalize tracking-wide text-slate-100">
                Choose your genre
            </h2>
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="rounded-lg px-2 py-1"
            >
                <option
                    disabled
                    value={"unassigned"}
                    className="rounded-lg text-slate-900"
                >
                    -- select a genre --
                </option>
                {genres &&
                    genres.map((genre) => (
                        <option key={genre.id} value={genre.id.toString()}>
                            {genre.name}
                        </option>
                    ))}
            </select>
            <button
                onClick={handleGoClick}
                className="rounded-lg bg-slate-800 px-10 py-2 text-slate-100 transition hover:scale-110 hover:bg-slate-900"
            >
                GO
            </button>
        </>
    );
}
