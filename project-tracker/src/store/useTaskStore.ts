import { create } from "zustand"; 
export type Status = "todo" | "inprogress" | "review" | "done"; 
export type Priority = "low" | "medium" | "high" | "critical"; 
export type Task = 
{ 
    id: string; title: string; status: Status; priority: Priority; assignee: string; startDate?: string; dueDate: string;   
 }; 
type Store = 
{ 
    tasks: Task[]; setTasks: (tasks: Task[]) => void; updateTask: (id: string, updates: Partial<Task>) => void; 
}; 
export const useTaskStore = 
create<Store>((set) => 
    ({ tasks: [], setTasks: (tasks) => set({ tasks }), updateTask: (id, updates) => set((state) => 
        ({ tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t ), 
})), 
}));