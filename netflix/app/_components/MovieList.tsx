"use client";
import { useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import { getMovies } from "app/_actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { searchState } from "app/_recoil/searchValue";

export default function MovieList() {
  const searchInput = useRecoilValue(searchState);

  const getMovieQuery = useQuery({
    queryKey: ["movie", searchInput],
    queryFn: () => getMovies({ searchInput: searchInput }),
    staleTime: Infinity,
    gcTime: 1000 * 300,
  });

  return (
    <div className="relative w-full grid grid-cols-3  md:grid-cols-4 gap-2">
      {getMovieQuery.isPending && (
        <Spinner width={100} height={100} className="absolute" />
      )}
      {getMovieQuery.data &&
        getMovieQuery.data.map((movie) => {
          return <Movie movie={movie} />;
        })}
    </div>
  );
}
