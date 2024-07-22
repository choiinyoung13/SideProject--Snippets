"use client";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "app/_actions/todo-actions";
import { queryClient } from "app/config/ReactQueryClientProvider";
import { useState } from "react";

export default function Todo({ todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const updataTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        title,
        id: todo.id,
        completed: isCompleted,
      }),
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex items-center w-full gap-1 mt-2">
      <Checkbox
        onChange={async () => {
          await setIsCompleted((prev) => !prev);
          await updataTodoMutation.mutate();
        }}
        checked={isCompleted}
      />
      {isEditMode ? (
        <input
          className="flex-1 border-b-black border-b p-1"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        <p className={`flex-1 ${isCompleted && "line-through"}`}>{title}</p>
      )}

      {isEditMode ? (
        <IconButton
          onClick={async () => {
            await setIsEditMode((prev) => (prev = false));
            await updataTodoMutation.mutate();
          }}
        >
          {updataTodoMutation.isPending ? (
            <Spinner className="h-10 w-10" />
          ) : (
            <i className="fas fa-check" />
          )}
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setIsEditMode((prev) => (prev = true));
          }}
        >
          <i className="fas fa-pen" />
        </IconButton>
      )}

      <IconButton
        onClick={() => {
          deleteTodoMutation.mutate();
        }}
      >
        {deleteTodoMutation.isPending ? (
          <Spinner className="h-10 w-10" />
        ) : (
          <i className="fas fa-trash" />
        )}
      </IconButton>
    </div>
  );
}
