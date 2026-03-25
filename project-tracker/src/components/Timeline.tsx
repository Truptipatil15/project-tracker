import { useTaskStore } from "../store/useTaskStore";

export default function Timeline() {
  const { tasks } = useTaskStore();

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      {tasks.slice(0, 20).map((t) => (
        <div key={t.id} className="mb-3">
          <div className="bg-blue-500 text-white px-2 py-1 rounded inline-block">
            {t.title}
          </div>
        </div>
      ))}
    </div>
  );
}