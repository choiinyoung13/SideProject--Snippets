import { IconButton, Spinner } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { deleteFiles } from 'app/_actions/storageActions'
import { queryClient } from 'app/_config/ReactQueryClientProvider'
import { getImageUrl } from 'app/_util/supabase/storage'

export default function ImageCard({ image }) {
  const imageDeleteMutation = useMutation({
    mutationFn: deleteFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
  })

  return (
    <div className="relative flex flex-col gap-2 p-6 shadow-lg rounded-3xl border border-gray-200">
      <img
        src={getImageUrl(image.name)}
        alt="sample image"
        className="w-full aspect-square rounded-md"
      />
      <p className="font-bold">{image.name}</p>

      <div className="absolute top-6 right-6">
        <IconButton
          color="red"
          onClick={() => {
            imageDeleteMutation.mutate(image.name)
          }}
        >
          {imageDeleteMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash" />
          )}
        </IconButton>
      </div>
    </div>
  )
}
