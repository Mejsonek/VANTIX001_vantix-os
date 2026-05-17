"use client";

import TodayTasks from "@/components/cockpit/TodayTasks";
import WeekCalendar from "@/components/cockpit/WeekCalendar";
import PriorityList from "@/components/cockpit/PriorityList";
import AIRecommendations from "@/components/cockpit/AIRecommendations";

export default function CockpitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Personal Cockpit</h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
              {new Date().toLocaleDateString("pl-PL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Today's Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
              <TodayTasks />
            </div>
          </div>

          {/* Right Column - Calendar, Priorities, AI */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Calendar */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
              <WeekCalendar />
            </div>

            {/* Priorities */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
              <PriorityList />
            </div>

            {/* AI Recommendations */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg">
              <AIRecommendations />
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Stats (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Produktywność</p>
            <p className="text-2xl font-bold font-display text-green-600">72%</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Taski dzisiaj</p>
            <p className="text-2xl font-bold font-display">6</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Eventy</p>
            <p className="text-2xl font-bold font-display">3</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Do zrobienia</p>
            <p className="text-2xl font-bold font-display text-blue-600">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
