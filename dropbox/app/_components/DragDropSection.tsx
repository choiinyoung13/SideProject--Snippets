'use client'

import { Button } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { uploadFile } from 'app/_actions/storageActions'
import { queryClient } from 'app/_config/ReactQueryClientProvider'
import { useRef } from 'react'

export default function DragDropSection() {
  const inputRef = useRef(null)
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
  })

  const onSubmit = e => {
    e.preventDefault()
    const file = inputRef.current.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      uploadImageMutation.mutate(formData)
    }
  }

  return (
    <form
      className="w-full h-[200px] border-dotted border-indigo-700 border-4 flex flex-col items-center justify-center gap-3"
      onSubmit={onSubmit}
    >
      <input ref={inputRef} type="file" />
      <p className="font-bold">
        파일을 여기다 끌어다 놓거나 클릭하여 업로드하세요.
      </p>
      <Button type="submit" loading={uploadImageMutation.isPending}>
        파일 업로드
      </Button>
    </form>
  )
}
