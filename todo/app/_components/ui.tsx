'use client'

import { Button, Input } from '@material-tailwind/react'
import Todo from './Todo'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTodo, getTodos } from 'app/_actions/todo-actions'
import { useState } from 'react'
import { Spinner } from '@material-tailwind/react'

export default function UI() {
  const [searchInput, setSearchInput] = useState('')

  const todoQeury = useQuery({
    queryKey: ['todo'],
    queryFn: () => getTodos({ searchInput }),
  })

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: 'Write your plan',
        completed: false,
      }),
    onSuccess: () => {
      todoQeury.refetch()
    },
    onError: err => {
      console.error(err)
    },
  })

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center">
      <h1 className="text-xl pt-10 mb-3">TODO LIST</h1>
      <Input
        label="Search TODO"
        icon={<i className="fas fa-search" />}
        onChange={async e => {
          await setSearchInput(e.target.value)
          await todoQeury.refetch()
        }}
      />
      {todoQeury.isLoading && <Spinner className="h-10 w-10 my-8" />}
      {todoQeury.data &&
        todoQeury.data.map(todo => {
          return <Todo key={todo.id} todo={todo} />
        })}
      <Button
        onClick={() => {
          createTodoMutation.mutate()
        }}
        className="mt-4"
        loading={createTodoMutation.isPending}
      >
        <i className="fas fa-add mr-5" />
        ADD TODO
      </Button>
    </div>
  )
}
