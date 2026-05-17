"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CalendarDay {
  date: number;
  dayName: string;
  events: number;
  isToday: boolean;
  isPast: boolean;
}

function getWeekDays(): CalendarDay[] {
  const today = new Date();
  const days: CalendarDay[] = [];

  // Start from Monday
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isPast = date < today && !isToday;

    days.push({
      date: date.getDate(),
      dayName: date.toLocaleDateString("pl-PL", { weekday: "short" }),
      events: Math.floor(Math.random() * 4),
      isToday,
      isPast,
    });
  }

  return days;
}

export default function WeekCalendar() {
  const [week, setWeek] = useState(0);
  const days = getWeekDays();

  const dayNames = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold font-display">Tydzień</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border-2 text-center cursor-pointer transition-all ${
              day.isToday
                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                : day.isPast
                ? "border-neutral-300 dark:border-neutral-600 opacity-50"
                : "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500"
            }`}
          >
            <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
              {dayNames[idx]}
            </div>
            <div className="text-lg font-bold font-display mb-1">{day.date}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {day.events} event{day.events !== 1 ? "ów" : ""}
            </div>
            {day.events > 0 && (
              <div className="flex gap-1 justify-center mt-2">
                {Array.from({ length: Math.min(day.events, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
