"use client";

import { Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "app/_actions/storageActions";
import { queryClient } from "app/_config/ReactQueryClientProvider";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragDropSection() {
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // inputRef.current.files  === acceptedFiles
    // 원래: const file = inputRef.current.files?.[0];

    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });

      uploadImageMutation.mutate(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full h-[200px] border-dotted border-indigo-700 border-4 flex flex-col items-center justify-center gap-3 cursor-pointer"
    >
      <input {...getInputProps()} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요.</p>
      ) : (
        <p>파일을 여기다 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}
    </div>
  );
}
