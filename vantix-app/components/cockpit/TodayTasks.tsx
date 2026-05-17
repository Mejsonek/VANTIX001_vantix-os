"'use client';

import { useState } from 'react';
import { Check, Trash2, Clock } from 'lucide-react';

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

function getPriorityBorder(priority: string) {
  switch (priority) {
    case 'high':   return 'border-l-vred';
    case 'medium': return 'border-l-gold';
    case 'low':    return 'border-l-ivory/15';
    default:       return 'border-l-transparent';
  }
}

function parseMinutes(time: string): number {
  const parts = time.split(' ');
  if (parts.length !== 2) return 120;
  const value = parseInt(parts[0], 10);
  const unit = parts[1].toLowerCase();
  if (unit.startsWith('min')) return value;
  if (unit.startsWith('hr') || unit.startsWith('godz')) return value * 60;
  return 120;
}

function getTimeColor(time: string): string {
  const mins = parseMinutes(time);
  if (mins <= 30) return 'text-vred';
  if (mins <= 120) return 'text-gold';
  return 'text-ivory/30';
}

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case 'high':
      return (
        <span className="inline-flex items-center gap-1 text-vred font-mono text-[8px]! font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-vred flex-shrink-0" />
          HIGH
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1 text-gold font-mono text-[8px]! font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          MED
        </span>
      );
    case 'low':
      return (
        <span className="inline-flex items-center gap-1 text-ivory/25 font-mono text-[8px]! font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-ivory/15 flex-shrink-0" />
          LOW
        </span>
      );
    default:
      return null;
  }
}

export default function TodayTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Check size={12} className="text-gold/50" />
          <span className="font-mono text-[10px] text-ivory/50 uppercase tracking-widest">
            DZISIAJ — {completedCount}/{tasks.length} ZADAŃ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-[4px] bg-gold/8 overflow-hidden">
            <div
              className="h-full bg-gold bar-animate"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-gold/60 tabular-nums">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-[1px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 px-4 py-3.5 border-l-2 ${getPriorityBorder(task.priority)} border border-l-2 border-r-0 border-t-0 border-b-0 border-transparent hover:bg-gold/[0.02] hover:border-gold/[0.08] transition-all group ${task.completed ? 'opacity-50' : ''}`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center border border-ivory/20 group-hover:border-gold/40 transition-colors cursor-pointer"
            >
              {task.completed && <Check size={11} className="text-gold" />}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`font-mono text-[13px] ${
                  task.completed
                    ? 'text-ivory/20 line-through'
                    : 'text-ivory/75'
                }`}
              >
                {task.title}
              </p>
              {task.timeRemaining && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={9} className={task.completed ? 'text-ivory/10' : getTimeColor(task.timeRemaining)} />
                  <span className={`font-mono text-[10px] ${task.completed ? 'text-ivory/10' : getTimeColor(task.timeRemaining)}`}>
                    {task.timeRemaining}
                  </span>
                </div>
              )}
            </div>

            {/* Priority + Delete */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <PriorityBadge priority={task.priority} />
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-60 text-ivory/40 hover:text-vred transition-all cursor-pointer"
              >
                <Trash2 size={12} />
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
