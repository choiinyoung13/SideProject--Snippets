'use client'

import { Spinner } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import { getMoviesById } from 'app/_actions/movieActions'

export default function Ui({ id }) {
  const movieId = parseInt(id)
  const getMovieByIdQuery = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMoviesById(movieId),
    staleTime: Infinity,
    gcTime: 1000 * 300,
  })

  return (
    <>
      {getMovieByIdQuery.isPending && (
        <div className="w-full h-[750px] flex items-center justify-center">
          <Spinner width={130} height={130} />
        </div>
      )}
      {getMovieByIdQuery.data && (
        <div className="w-full flex flex-col items-center justify-center px-10 gap-10 lg:flex-row lg:items-start">
          <div className="w-[550px]">
            <img
              className="w-full"
              src={getMovieByIdQuery.data[0].image_url}
              alt={getMovieByIdQuery.data[0].title}
            />
          </div>
          <div className="w-2/3 flex flex-col gap-6 items-center lg:items-start">
            <p className="font-bold text-5xl lg:text-7xl ">
              {getMovieByIdQuery.data[0].title}
            </p>
            <p className="text-xl">{getMovieByIdQuery.data[0].overview}</p>
            <p className="font-bold text-2xl flex items-center">
              <i className="fas fa-star mr-2 text-yellow-700" />
              <span className="mt-1">
                Vote Average: {getMovieByIdQuery.data[0].vote_average}
              </span>
            </p>
            <p className="font-bold text-2xl flex items-center">
              <i className="fas fa-heart mr-2 text-pink-500" />
              <span className="mt-1">
                Popularity: {getMovieByIdQuery.data[0].popularity}
              </span>
            </p>
            <p className="font-bold text-2xl flex items-center">
              <i className="fas fa-clock mr-2 text-gray-900" />
              <span className="mt-1">
                Release Date: {getMovieByIdQuery.data[0].release_date}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
