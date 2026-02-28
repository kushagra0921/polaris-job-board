"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import GlassCard from "@/components/GlassCard";
import JobsChart from "@/components/JobsChart";
import { jobs as staticJobs } from "@/data/jobs";

/* ---------- DEADLINE ---------- */
function getDaysLeft(deadline: string) {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

export default function JobsPage() {
  const [active, setActive] = useState("dashboard");
  const [jobs] = useState(staticJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] =
    useState<"all" | "junior" | "senior">("all");

  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [sortByDeadline, setSortByDeadline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const foundationProgress = 65;
  const placementProgress = 40;

  /* ---------- LOCAL STORAGE ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");
    const applied = localStorage.getItem("appliedJobs");

    if (saved) setSavedJobs(JSON.parse(saved));
    if (applied) setAppliedJobs(JSON.parse(applied));

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    }
  }, [savedJobs, appliedJobs, isMounted]);

  if (!isMounted) return null;

  /* ================================
     FILTER PIPELINE
  ================================= */

  let filteredJobs = jobs;

  /* SIDEBAR FILTER */
  switch (active) {
    case "internships":
      filteredJobs = filteredJobs.filter(
        j => j.category === "Internship"
      );
      break;

    case "jobs":
      filteredJobs = filteredJobs.filter(
        j => j.category === "Full-time"
      );
      break;

    case "hackathons":
      filteredJobs = filteredJobs.filter(
        j => j.category === "Hackathon"
      );
      break;

    case "research":
      filteredJobs = filteredJobs.filter(
        j => j.category === "Research"
      );
      break;

    case "campus":
      filteredJobs = filteredJobs.filter(
        j => j.category === "Campus Drive"
      );
      break;

    case "saved":
      filteredJobs = filteredJobs.filter(j =>
        savedJobs.includes(j.id)
      );
      break;

    case "applied":
      filteredJobs = filteredJobs.filter(j =>
        appliedJobs.includes(j.id)
      );
      break;
  }

  /* SEARCH */
  filteredJobs = filteredJobs.filter(
    job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* YEAR FILTER */
  if (yearFilter === "junior") {
    filteredJobs = filteredJobs.filter(
      j =>
        j.category === "Internship" ||
        j.category === "Hackathon"
    );
  }

  if (yearFilter === "senior") {
    filteredJobs = filteredJobs.filter(
      j =>
        j.category === "Full-time" ||
        j.category === "Campus Drive"
    );
  }

  /* SORT */
  if (sortByDeadline) {
    filteredJobs = [...filteredJobs].sort(
      (a, b) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
    );
  }

  /* ================================
     ACTIONS
  ================================= */

  const handleSave = (id: string) => {
    if (!savedJobs.includes(id)) {
      setSavedJobs(prev => [...prev, id]);
    }
  };

  const handleApply = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs(prev => [...prev, id]);
    }
  };

  /* ================================
     UI
  ================================= */

  return (
    <div className="relative flex min-h-screen bg-[#041e14] text-[#f5f1e6]">
      <DashboardSidebar active={active} setActive={setActive} />

      <main className="flex-1 p-10 space-y-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#c9d6c4] hover:text-yellow-400"
        >
          ← Back to Home
        </Link>

        {/* SEARCH + FILTERS */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 w-full md:w-1/3 focus:outline-none"
          />

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setYearFilter("junior")}
              className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/40"
            >
              1st & 2nd Year
            </button>

            <button
              onClick={() => setYearFilter("senior")}
              className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/40"
            >
              3rd & 4th Year
            </button>

            <button
              onClick={() => setYearFilter("all")}
              className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20"
            >
              Reset
            </button>
          </div>

          <button
            onClick={() => setSortByDeadline(!sortByDeadline)}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20"
          >
            Sort by Nearest Deadline
          </button>
        </div>

        {/* DASHBOARD */}
        {active === "dashboard" && (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard>
                <p>Total Listings</p>
                <h3 className="text-3xl text-yellow-400">
                  {jobs.length}
                </h3>
              </GlassCard>

              <GlassCard>
                <p>Saved Jobs</p>
                <h3 className="text-3xl text-yellow-400">
                  {savedJobs.length}
                </h3>
              </GlassCard>

              <GlassCard>
                <p>Applied Jobs</p>
                <h3 className="text-3xl text-yellow-400">
                  {appliedJobs.length}
                </h3>
              </GlassCard>
            </div>

            <GlassCard>
              <h3 className="mb-6 font-bold">
                Opportunity Distribution
              </h3>
              <JobsChart />
            </GlassCard>
          </>
        )}

        {/* JOB LISTINGS */}
        {active !== "dashboard" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map(job => {
              const daysLeft = getDaysLeft(job.deadline);
              const isSaved = savedJobs.includes(job.id);
              const isApplied = appliedJobs.includes(job.id);

              return (
                <GlassCard key={job.id}>
                  <h3 className="font-bold">{job.title}</h3>

                  <p className="text-yellow-400 mt-1">
                    {job.company}
                  </p>

                  <p className="text-sm text-[#c9d6c4]">
                    {job.location} • {job.work_mode}
                  </p>

                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-emerald-400">
                      {job.stipend}
                    </span>

                    <span className="text-yellow-400 font-semibold">
                      {daysLeft} days left
                    </span>
                  </div>

                  {/* SAVE BUTTON */}
                  <button
                    disabled={isSaved}
                    onClick={() => handleSave(job.id)}
                    className={`mt-4 w-full py-2 rounded-xl transition ${
                      isSaved
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save Job"}
                  </button>

                  {/* APPLY BUTTON */}
                  <button
                    disabled={isApplied}
                    onClick={() => handleApply(job.id)}
                    className={`mt-3 w-full py-2 rounded-xl transition ${
                      isApplied
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-emerald-500 hover:bg-emerald-600"
                    }`}
                  >
                    {isApplied ? "Applied" : "Apply Now"}
                  </button>
                </GlassCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}