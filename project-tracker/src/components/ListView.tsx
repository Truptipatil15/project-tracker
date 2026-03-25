import { useTaskStore } from "../store/useTaskStore";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type SortField = "title" | "priority" | "dueDate";

export default function ListView() {
  const { tasks, updateTask } = useTaskStore();
  const [scrollTop, setScrollTop] = useState(0);
  const [sortField, setSortField] = useState<SortField>("title");
  const [asc, setAsc] = useState(true);
  const [params] = useSearchParams();
  const rowHeight = 60;
  const visibleCount = 10;
  const buffer = 5;

  const filteredTasks = tasks.filter((t) => {
  const status = params.get("status");
  const priority = params.get("priority");

  return (
    (!status || t.status === status) &&
    (!priority || t.priority === priority)
  );
});
  // SORTING
  const sorted = [...filteredTasks].sort((a, b) => {
    let valA: any = a[sortField];
    let valB: any = b[sortField];

    if (sortField === "dueDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });

  
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const end = start + visibleCount + buffer;

  const visible = sorted.slice(start, end);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-400">
        No tasks found
      </div>
    );
  }

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className="h-[500px] overflow-auto rounded-2xl shadow-lg bg-white border"
    >
      {/* HEADER */}
      <div className="flex font-bold text-gray-700 border-b bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0 z-10">
        <div
          className="flex-1 p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setSortField("title");
            setAsc(!asc);
          }}
        >
          Title
        </div>

        <div
          className="w-32 p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setSortField("priority");
            setAsc(!asc);
          }}
        >
          Priority
        </div>

        <div
          className="w-40 p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setSortField("dueDate");
            setAsc(!asc);
          }}
        >
          Due Date
        </div>

        <div className="w-40 p-4">Status</div>
      </div>

      {/* BODY */}
      <div style={{ height: filteredTasks.length * rowHeight }}>
        <div style={{ transform: `translateY(${start * rowHeight}px)` }}>
          {visible.map((t, i) => (
            <div
              key={t.id}
              className={`h-[60px] flex items-center px-4 ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <div className="flex-1 font-medium">{t.title}</div>

              <div className="w-32 capitalize">{t.priority}</div>

              <div className="w-40 text-sm text-gray-600">
                {new Date(t.dueDate).toDateString()}
              </div>

              <select
                className="w-40 border rounded-lg p-2 bg-white shadow-sm"
                value={t.status}
                onChange={(e) =>
                  updateTask(t.id, { status: e.target.value as any })
                }
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}