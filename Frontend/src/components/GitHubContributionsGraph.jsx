import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function GitHubContributionsGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = "ShahzadKhichi";

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.post(
          "https://api.github.com/graphql",
          {
            query: `
              query {
                user(login: "${username}") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${import.meta.env.VITE_GIT_TOKEN}`,
            },
          }
        );

        const calendar =
          response.data?.data?.user?.contributionsCollection
            ?.contributionCalendar;

        if (calendar) {
          setData({
            total: calendar.totalContributions,
            weeks: calendar.weeks,
          });
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getLevel = (count) => {
    if (!count) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const getColor = (level) => {
    const colors = ["#0f172a", "#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa"];
    return colors[level] || colors[0];
  };

  if (loading)
    return (
      <section
        id="github"
        className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-blue-400 mb-4"
          >
            GitHub Contributions
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
          />
        </div>
      </section>
    );

  if (error || !data)
    return (
      <section
        id="github"
        className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-blue-400 mb-4"
          >
            GitHub Contributions
          </motion.h2>
          <motion.a
            href={`https://github.com/${username}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-400 underline"
          >
            View on GitHub
          </motion.a>
        </div>
      </section>
    );

  const weeks = data.weeks.map((w) => w.contributionDays);
  const monthLabels = weeks.map((week, idx) => {
    const firstDay = week[0];
    if (!firstDay) return "";
    const d = new Date(firstDay.date);
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    if (idx === 0) return `${month} ${year}`;
    const prevFirst = weeks[idx - 1][0];
    const pd = new Date(prevFirst.date);
    return pd.getMonth() !== d.getMonth() ||
      pd.getFullYear() !== d.getFullYear()
      ? `${month} ${year}`
      : "";
  });

  return (
    <section
      id="github"
      className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-4xl lg:text-5xl font-extrabold text-center text-blue-400 mb-6"
        >
          GitHub Contributions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-400 mb-8"
        >
          Total last year: {data.total} contributions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-blue-800/30 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-x-auto"
        >
          <div className="flex gap-1 min-w-max mb-2 px-8">
            {monthLabels.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01 }}
                className="w-3 lg:w-4"
              >
                {label && (
                  <span className="text-xs text-gray-400 whitespace-nowrap -translate-x-2">
                    {label}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-1 min-w-max pb-4">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((day, j) => {
                  const level = getLevel(day.contributionCount);
                  return (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 7 + j) * 0.005 }}
                      className="w-3 h-3 lg:w-4 lg:h-4 rounded-sm cursor-pointer transition-transform hover:scale-150"
                      style={{ backgroundColor: getColor(level) }}
                      title={`${day.date}: ${
                        day.contributionCount
                      } contribution${day.contributionCount !== 1 ? "s" : ""}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-400"
          >
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  className="w-3 h-3 lg:w-4 lg:h-4 rounded-sm"
                  style={{ backgroundColor: getColor(l) }}
                />
              ))}
            </div>
            <span>More</span>
          </motion.div>
        </motion.div>

        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="block w-full max-w-xs mx-auto mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-center rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          View GitHub
        </motion.a>
      </div>
    </section>
  );
}
