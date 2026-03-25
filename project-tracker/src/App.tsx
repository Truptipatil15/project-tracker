import { useEffect, useState } from "react";
import { useTaskStore } from "./store/useTaskStore";
import { generateTasks } from "./data/generator";
import Kanban from "./components/Kanban";
import ListView from "./components/ListView";
import Timeline from "./components/Timeline";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const setTasks = useTaskStore((s) => s.setTasks);
  const [view, setView] = useState("kanban");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setTasks(generateTasks(500));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-7xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Project Tracker Dashboard
        </h1>

        {/* 🔥 Buttons */}
        <div className="flex gap-6 mb-6">
          {["kanban", "list", "timeline"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-6 py-2 rounded-lg font-semibold ${
                view === v
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* 🔥 FILTER BAR */}
        <div className="flex gap-4 mb-4">
          <select
  onChange={(e) => {
    const newParams = new URLSearchParams(params);

    if (e.target.value) {
      newParams.set("status", e.target.value);
    } else {
      newParams.delete("status");
    }

    setParams(newParams);
  }}
  className="border p-2 rounded"
>
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          <select
  onChange={(e) => {
    const newParams = new URLSearchParams(params);

    if (e.target.value) {
      newParams.set("priority", e.target.value);
    } else {
      newParams.delete("priority");
    }

    setParams(newParams);
  }}
  className="border p-2 rounded"
>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <button
            onClick={() => setParams({})}
            className="bg-red-500 text-white px-4 rounded"
          >
            Clear
          </button>
        </div>

        

        <div className="mt-6 p-4 bg-white rounded-xl shadow">
          {view === "kanban" && <Kanban />}
          {view === "list" && <ListView />}
          {view === "timeline" && <Timeline />}
        </div>
      </div>
    </div>
  );
}
