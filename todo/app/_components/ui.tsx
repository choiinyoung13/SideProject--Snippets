"use client";

import { Input } from "@material-tailwind/react";
import Todo from "./Todo";

export default function UI() {
  return (
    <div className="w-2/3 mx-auto flex flex-col items-center">
      <h1 className="text-xl pt-10 mb-3">TODO LIST</h1>
      <Input label="Search TODO" icon={<i className="fas fa-search" />} />
      <Todo />
    </div>
  );
}
