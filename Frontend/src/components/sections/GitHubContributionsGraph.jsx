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
    const colors = ["#152040", "#0d4a4a", "#0e8c6b", "#00c4a7", "#00f5d4"];
    return colors[level] || colors[0];
  };

  if (loading)
    return (
      <section
        id="github"
        className="w-full py-20 bg-transparent relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-teal-accent mb-4"
          >
            GitHub Contributions
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-1 w-32 mx-auto bg-teal-accent rounded-full"
          />
        </div>
      </section>
    );

  if (error || !data)
    return (
      <section
        id="github"
        className="w-full py-20 bg-transparent relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
          >
            GitHub <span className="text-teal-accent">Contributions</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-navy-800/60 backdrop-blur-lg border border-teal-accent/10 rounded-2xl p-10 lg:p-14 shadow-2xl max-w-3xl mx-auto"
          >
            {/* GitHub Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <svg className="w-16 h-16 mx-auto text-teal-accent/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.div>

            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Check out my open-source contributions and projects on GitHub.
            </p>

            <motion.a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-teal-accent text-navy-950 font-bold rounded-full shadow-lg hover:shadow-teal-accent/30 hover:bg-teal-dark transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View GitHub Profile
            </motion.a>
          </motion.div>
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
      className="w-full py-20 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-4xl lg:text-5xl font-extrabold text-center text-white mb-6"
        >
          GitHub <span className="text-gradient-primary">Contributions</span>
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
          className="bg-white/[0.02] border border-white/10 hover:border-teal-accent/30 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-[3px] transition-all duration-500 overflow-x-auto"
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
                  <span className="text-xs text-gray-200 whitespace-nowrap -translate-x-2">
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
            className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-200"
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
          className="block w-full max-w-xs mx-auto mt-10 px-8 py-3 bg-teal-accent text-navy-950 font-bold text-center rounded-full shadow-lg hover:shadow-teal-accent/30 hover:bg-teal-dark transition-all"
        >
          View GitHub
        </motion.a>
      </div>
    </section>
  );
}
