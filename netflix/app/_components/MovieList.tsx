'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import Movie from './Movie'
import { getMovies } from 'app/_actions/movieActions'
import { Spinner } from '@material-tailwind/react'
import { useRecoilValue } from 'recoil'
import { searchState } from 'app/_recoil/searchValue'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function MovieList() {
  const searchInput = useRecoilValue(searchState)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['movie', searchInput],
      queryFn: ({ pageParam }) =>
        getMovies({ searchInput: searchInput, page: pageParam, pageSize: 12 }),
      initialPageParam: 1,
      getNextPageParam: lastPage => (lastPage.page ? lastPage.page + 1 : null),
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="relative w-full grid grid-cols-3  md:grid-cols-4 gap-2">
      {(isFetching || isFetchingNextPage) && (
        <Spinner
          width={100}
          height={100}
          className="absolute top-[320px] left-[900px]"
        />
      )}
      {data && (
        <>
          {data.pages.map(page => {
            return page.data.map(movie => {
              return <Movie key={movie.id} movie={movie} />
            })
          })}
        </>
      )}
      <div ref={ref}></div>
    </div>
  )
}
