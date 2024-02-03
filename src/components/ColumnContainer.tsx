import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCart from "./TaskCart";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (id: Column["id"]) => void;
  tasks: Task[];
  deleteTask: (id: Task["id"]) => void;
  updateTask: (id: Task["id"], content: string) => void;
}

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
  bg-columnBackgroundColor
  flex
  h-[500px]
  max-h-[500px]
  w-[350px]
  flex-col
  rounded-md
  border-2
  border-rose-500
  opacity-40
  "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-columnBackgroundColor
  flex
  h-[500px]
  max-h-[500px]
  w-[350px]
  flex-col
  rounded-md
  "
    >
      <div
        onClick={() => setEditMode(true)}
        {...listeners}
        {...attributes}
        className="
        bg-mainBackgroundColor
        text-md
        border-columnBackgroundColor
        flex
        h-[60px]
        cursor-grab
        items-center
        justify-between
        rounded-md
        rounded-b-none
        border-4
        p-3
        font-bold

        "
      >
        <div
          className="
        flex
        gap-2
        "
        >
          <div
            className="
        bg-columnBackgroundColor
        flex
        items-center
        justify-center
        rounded-full
        px-2
        py-1
        text-sm
        "
          >
            {tasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              className="border-rounded bg-black px-2 outline-none focus:border-rose-500"
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="
        hover:bg-columnBackgroundColor
        rounded
        stroke-gray-500
        px-1
        py-2
        hover:stroke-white
        "
        >
          <TrashIcon />{" "}
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCart
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="border-columnBackgroundColor border-x-columnBackgroundColor hover:bg-mainBackgroundColor flex  items-center
       gap-2 rounded-md border-2 p-4 hover:text-rose-500
       active:bg-black
       "
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
