import { Checkbox, IconButton } from "@material-tailwind/react";

export default function Todo() {
  return (
    <div className="flex items-center w-full">
      <Checkbox />
      <p className="flex-1">NEW TODO</p>
      <IconButton>
        <i className="fas fa-pen" />
      </IconButton>
      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
