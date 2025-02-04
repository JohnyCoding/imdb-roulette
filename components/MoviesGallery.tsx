"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Movie } from "@/types/types";
import { toBase64, shimmer } from "@/utils/utils";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
    const [api, setApi] = useState<CarouselApi>();
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [posterPath, setPosterPath] = useState("");

    const handleMouseEnter = (e: React.MouseEvent, posterPath: string) => {
        setHovered(true);
        setPosition({
            x: e.clientX > screen.width / 2 ? e.clientX - 200 : e.clientX + 20,
            y: e.clientY - 120,
        });
        setPosterPath(posterPath);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    useEffect(() => {
        if (winningMovieIndex !== undefined) api?.scrollTo(winningMovieIndex);
    }, [api, winningMovieIndex]);

    return (
        <div className="h-[135px] w-[80%] xl:w-[100%] xl:max-w-[1200px]">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "center",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {movies.map((movie, index) => (
                        <CarouselItem
                            key={`${movie.id}${index}`}
                            className="flex basis-[98px] items-center justify-center pl-2"
                        >
                            <div
                                className="relative flex h-[135px] w-[90px] flex-col items-center justify-center rounded-lg bg-slate-900 text-slate-100"
                                onMouseEnter={(e) =>
                                    handleMouseEnter(
                                        e,
                                        `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                                    )
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt={`${movie.title} poster`}
                                    fill
                                    sizes=""
                                    className="hover:after:content rounded-lg"
                                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(135, 90))}`}
                                />
                                <p
                                    className={`z-10 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-700 text-2xl ${index === winningMovieIndex ? "animate-bounce" : ""}`}
                                    style={{
                                        backgroundColor:
                                            getBackgroundColor(index),
                                    }}
                                >
                                    {index}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            {hovered && (
                <div
                    className="pointer-events-none fixed z-50 origin-top-left"
                    style={{
                        left: screen.width < 720 ? "45vw" : `${position.x}px`,
                        top: screen.width < 720 ? "45vh" : `${position.y}px`,
                    }}
                >
                    <Image
                        src={posterPath}
                        height={270}
                        width={180}
                        alt="Preview"
                        className="h-[270px] w-[180px] rounded-lg border border-gray-300 object-cover shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}
