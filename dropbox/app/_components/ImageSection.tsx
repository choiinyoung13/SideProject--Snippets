import { useQuery } from '@tanstack/react-query'
import ImageCard from './ImageCard'
import { searchFiles } from 'app/_actions/storageActions'
import { Spinner } from '@material-tailwind/react'

export default function ImageSection({ searchValue }) {
  const searchImageQuery = useQuery({
    queryKey: ['images', searchValue],
    queryFn: () => searchFiles(searchValue),
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {searchImageQuery.isPending && (
        <Spinner className="absolute top-1/2 left-1/2 w-20 h-20" />
      )}
      {searchImageQuery.data &&
        searchImageQuery.data.map(image => {
          return <ImageCard key={image.id} image={image} />
        })}
    </div>
  )
}
