"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Trash2, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  timeRemaining?: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  { id: "1", title: "Zatwierdzić propozycję klienta", priority: "high", timeRemaining: "30 min", completed: false },
  { id: "2", title: "Przygotować demo dla potencjalnego leadу", priority: "high", timeRemaining: "2 hrs", completed: false },
  { id: "3", title: "Code review PR #42", priority: "medium", timeRemaining: "1 hr", completed: false },
  { id: "4", title: "Zaktualizować documentation", priority: "medium", timeRemaining: "2 hrs", completed: false },
  { id: "5", title: "Meeting z zespołem n8n", priority: "high", timeRemaining: "15 min", completed: false },
  { id: "6", title: "Odpowiadać na maile", priority: "low", timeRemaining: "45 min", completed: false },
];

export default function TodayTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400/30 bg-red-50/30 dark:bg-red-950/20";
      case "medium":
        return "border-yellow-400/30 bg-yellow-50/30 dark:bg-yellow-950/20";
      case "low":
        return "border-blue-400/30 bg-blue-50/30 dark:bg-blue-950/20";
    }
  };

  const priorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "low":
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold font-display">Dzisiaj</h2>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {completedCount} / {tasks.length}
        </div>
      </div>

      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${priorityColor(
              task.priority
            )} ${task.completed ? "opacity-50" : ""}`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 text-neutral-600 dark:text-neutral-400 hover:text-green-500 transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>

            <div className="flex-grow min-w-0">
              <p className={`text-sm font-medium ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </p>
              {task.timeRemaining && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {task.timeRemaining}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {priorityBadge(task.priority)}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-500 dark:text-neutral-400">Brak zadań na dzisiaj 🎉</p>
        </div>
      )}
    </div>
  );
}
