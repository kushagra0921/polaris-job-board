"use client";

import { motion } from "framer-motion";
import { jobs } from "@/data/jobs";

export default function JobsChart() {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(now.getDate() - 14);

  /* ---------- USE ALL JOBS (No adminApproved) ---------- */
  const approvedJobs = jobs;

  /* ---------- DYNAMIC CATEGORY LIST ---------- */
  const categories = Array.from(
    new Set(approvedJobs.map(job => job.category))
  );

  /* ---------- CATEGORY COUNTS ---------- */
  const categoryCounts = categories.map(category => ({
    label: category,
    count: approvedJobs.filter(job => job.category === category).length,
  }));

  const maxCategoryCount = Math.max(
    ...categoryCounts.map(c => c.count),
    1
  );

  /* ---------- WEEKLY DATA BASED ON DEADLINE ---------- */
  const weeklyData = categories.map(category => {
    const week2 = approvedJobs.filter(
      job =>
        job.category === category &&
        new Date(job.deadline) >= oneWeekAgo
    ).length;

    const week1 = approvedJobs.filter(
      job =>
        job.category === category &&
        new Date(job.deadline) < oneWeekAgo &&
        new Date(job.deadline) >= twoWeeksAgo
    ).length;

    return { category, week1, week2 };
  });

  const maxWeekly = Math.max(
    ...weeklyData.flatMap(w => [w.week1, w.week2]),
    1
  );

  return (
    <div className="space-y-14">

      {/* CATEGORY DISTRIBUTION */}
      <div>
        <h4 className="mb-6 font-semibold text-yellow-400">
          Category Distribution
        </h4>

        <div className="h-64 flex items-end gap-6">
          {categoryCounts.map((item, index) => {
            const heightPercent =
              (item.count / maxCategoryCount) * 100;

            return (
              <motion.div
                key={item.label}
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group flex-1 flex flex-col justify-end items-center"
              >
                <div
                  className="
                    w-full rounded-t-2xl
                    bg-gradient-to-t from-yellow-400 to-yellow-200
                    transition-all duration-300
                    group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                  "
                  style={{ height: `${heightPercent}%` }}
                />

                <span className="mt-2 text-sm font-medium">
                  {item.count}
                </span>

                <span className="mt-1 text-xs text-[#c9d6c4] text-center">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* WEEKLY COMPARISON */}
      <div>
        <h4 className="mb-6 font-semibold text-yellow-400">
          Weekly Comparison (Based on Deadlines)
        </h4>

        <div className="grid md:grid-cols-2 gap-10">
          {weeklyData.map(item => {
            const week1Percent =
              (item.week1 / maxWeekly) * 100;

            const week2Percent =
              (item.week2 / maxWeekly) * 100;

            const growth =
              item.week2 - item.week1;

            return (
              <div key={item.category} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">
                    {item.category}
                  </h5>

                  <span
                    className={`text-sm font-semibold ${
                      growth >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}
                  </span>
                </div>

                {/* Week 1 */}
                <div>
                  <div className="flex justify-between text-sm text-[#c9d6c4] mb-1">
                    <span>Week 1</span>
                    <span>{item.week1}</span>
                  </div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${week1Percent}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-3 bg-white/20 rounded-full"
                  />
                </div>

                {/* Week 2 */}
                <div>
                  <div className="flex justify-between text-sm text-[#c9d6c4] mb-1">
                    <span>Week 2</span>
                    <span>{item.week2}</span>
                  </div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${week2Percent}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}