import type { Task, Status, Priority } from "../store/useTaskStore";

const statuses: Status[] = ["todo", "inprogress", "review", "done"];
const priorities: Priority[] = ["low", "medium", "high", "critical"];
const users = ["TP", "AK", "RS", "MK", "NJ", "VR"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTasks(count = 500): Task[] {
  return Array.from({ length: count }).map((_, i) => {
    const start = new Date();
    start.setDate(start.getDate() - Math.floor(Math.random() * 10));

    const due = new Date(start);
    due.setDate(start.getDate() + Math.floor(Math.random() * 15));

    return {
      id: i.toString(),
      title: `Task ${i}`,
      status: randomItem(statuses),
      priority: randomItem(priorities),
      assignee: randomItem(users),
      startDate: Math.random() > 0.3 ? start.toISOString() : undefined,
      dueDate: due.toISOString(),
    };
  });
}