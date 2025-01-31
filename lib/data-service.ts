"use server";
import { Genre, Movie } from "@/types/types";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.BEARER}`,
    },
};
const baseURL = "https://api.themoviedb.org/3/";

export async function getMovies(genre: string): Promise<Movie[]> {
    // 500 is the max allowed when making the requests even if there are more pages available
    // But I will use only 100 pages
    const MAX_PAGES = 100;
    const randomPage1 = Math.max(1, Math.floor(Math.random() * MAX_PAGES));

    let randomPage2 = Math.max(1, Math.floor(Math.random() * MAX_PAGES));
    while (randomPage2 == randomPage1) {
        randomPage2 = Math.max(1, Math.floor(Math.random() * MAX_PAGES));
    }

    const data1 = await fetch(
        `${baseURL}discover/movie?with_genres=${genre}&page=${randomPage1}&api_key=${process.env.API_KEY}`,
        options,
    );
    const jsonData1 = await data1.json();

    const data2 = await fetch(
        `${baseURL}discover/movie?with_genres=${genre}&page=${randomPage2}&api_key=${process.env.API_KEY}`,
        options,
    );
    const jsonData2 = await data2.json();

    console.log(jsonData1);
    console.log(jsonData2);

    const movies: Movie[] = [...jsonData1.results, ...jsonData2.results].slice(
        0,
        37,
    );

    return movies;
}

export async function getGenres(): Promise<Genre[]> {
    const data = await fetch(
        `${baseURL}genre/movie/list?api_key=${process.env.API_KEY}`,
        options,
    );
    const genres = await data.json();
    return genres.genres;
}
