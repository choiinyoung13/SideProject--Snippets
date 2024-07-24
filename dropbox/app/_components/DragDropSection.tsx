"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "app/_actions/storageActions";
import { queryClient } from "app/_config/ReactQueryClientProvider";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

export default function DragDropSection() {
  const inputRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // inputRef.current.files  === acceptedFiles
    // 원래: const file = inputRef.current.files?.[0];
    const file = acceptedFiles?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImageMutation.mutate(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="w-full h-[200px] border-dotted border-indigo-700 border-4 flex flex-col items-center justify-center gap-3"
      {...getRootProps()}
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
