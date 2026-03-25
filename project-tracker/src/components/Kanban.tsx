import { useState } from "react";
import type { Status, Task } from "../store/useTaskStore";
import { useTaskStore } from "../store/useTaskStore";
import { useSearchParams } from "react-router-dom";

const statuses: Status[] = ["todo", "inprogress", "review", "done"];

let draggedTask: Task | null = null;
let draggingId: string | null = null;

function formatDueDate(date: string) {
  const due = new Date(date);
  const today = new Date();

  const diff = Math.floor(
    (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Due Today";
  if (diff > 7) return `${diff} days overdue`;
  if (diff > 0) return "Overdue";

  return due.toDateString();
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-400";
    case "medium":
      return "bg-yellow-400 text-black";
    default:
      return "bg-green-400";
  }
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div
      draggable
      onDragStart={() => {
        draggedTask = task;
        draggingId = task.id;
      }}
      onDragEnd={() => {
        draggingId = null;
      }}
      className="bg-white border rounded-xl p-4 shadow-md hover:shadow-xl transition cursor-grab"
    >
      <div className="font-semibold text-gray-800 text-sm">
        {task.title}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow">
          {task.assignee}
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full text-white font-semibold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <div
        className={`text-xs mt-3 font-medium ${
          new Date(task.dueDate) < new Date()
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {formatDueDate(task.dueDate)}
      </div>
    </div>
  );
}

function Column({ status }: { status: Status }) {
  const { tasks, updateTask } = useTaskStore();
  const [isOver, setIsOver] = useState(false);
  const [params] = useSearchParams();

 const filtered = tasks.filter((t) => {
  const statusParam = params.get("status");
  const priorityParam = params.get("priority");

  return (
    (!statusParam || t.status === statusParam) &&
    (!priorityParam || t.priority === priorityParam) &&
    t.status === status
  );
});

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={() => {
        setIsOver(false);
        if (draggedTask) {
          updateTask(draggedTask.id, { status });
        }
      }}
      className={`flex flex-col bg-white rounded-2xl shadow-lg border h-[520px] transition ${
        isOver ? "bg-blue-50 border-blue-400" : "border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-2xl">
        <h2 className="text-lg font-extrabold text-gray-800 capitalize">
          {status} ({filtered.length})
        </h2>
      </div>

      {/* TASK LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            No tasks here
          </div>
        ) : (
          filtered.map((t) =>
            t.id === draggingId ? (
              <div
                key={t.id}
                className="h-[90px] bg-gray-200 rounded-xl"
              />
            ) : (
              <TaskCard key={t.id} task={t} />
            )
          )
        )}
      </div>
    </div>
  );
}

export default function Kanban() {
  return (
    <div className="grid grid-cols-4 gap-8 mt-10">
      {statuses.map((s) => (
        <Column key={s} status={s} />
      ))}
    </div>
  );
}