'use client';

import { useState } from 'react';
import { Check, Trash2, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  timeRemaining?: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Zatwierdzić propozycję klienta', priority: 'high', timeRemaining: '30 min', completed: false },
  { id: '2', title: 'Przygotować demo dla potencjalnego leada', priority: 'high', timeRemaining: '2 hrs', completed: false },
  { id: '3', title: 'Code review PR #42', priority: 'medium', timeRemaining: '1 hr', completed: false },
  { id: '4', title: 'Zaktualizować documentation', priority: 'medium', timeRemaining: '2 hrs', completed: false },
  { id: '5', title: 'Meeting z zespołem n8n', priority: 'high', timeRemaining: '15 min', completed: false },
  { id: '6', title: 'Odpowiadać na maile', priority: 'low', timeRemaining: '45 min', completed: false },
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

  const priorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="vx-badge vx-badge-red !text-[6px] !px-1.5 !py-[1px]">HIGH</span>;
      case 'medium':
        return <span className="vx-badge vx-badge-gold !text-[6px] !px-1.5 !py-[1px]">MED</span>;
      case 'low':
        return <span className="vx-badge vx-badge-dim !text-[6px] !px-1.5 !py-[1px]">LOW</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-gold/20 flex items-center justify-center">
            <Check size={8} className="text-gold/60" />
          </div>
          <span className="font-mono text-[9px] text-ivory/50 uppercase tracking-widest">Dzisiaj</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-[3px] bg-gold/10 overflow-hidden">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="font-mono text-[8px] text-gold/60">{completedCount}/{tasks.length}</span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-[1px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 px-3 py-2 border border-transparent hover:border-gold/10 hover:bg-gold/[0.02] transition-all group ${task.completed ? 'opacity-40' : ''}`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center border border-ivory/15 group-hover:border-gold/30 transition-colors"
            >
              {task.completed && <Check size={9} className="text-gold" />}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`font-mono text-[11px] ${task.completed ? 'text-ivory/15 line-through' : 'text-ivory/50'}`}>
                {task.title}
              </p>
              {task.timeRemaining && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={7} className="text-ivory/15" />
                  <span className="font-mono text-[8px] text-ivory/20">{task.timeRemaining}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {priorityBadge(task.priority)}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-ivory/10 hover:text-red transition-colors"
              >
                <Trash2 size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="font-mono text-[10px] text-ivory/20">Brak zadań na dzisiaj</p>
        </div>
      )}
    </div>
  );
}
