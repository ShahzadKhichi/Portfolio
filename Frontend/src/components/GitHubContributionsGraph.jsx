import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GitHubContributionsGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/ShahzadKhichi?y=all")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const getColor = (level) => {
    const colors = ["#0f172a", "#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa"];
    return colors[level] || colors[0];
  };

  if (loading) {
    return (
      <section id="github" className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">GitHub Contributions</h2>
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="github" className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">GitHub Contributions</h2>
          <p className="text-gray-400">
            <a href="https://github.com/ShahzadKhichi" className="text-blue-400 underline">View on GitHub</a>
          </p>
        </div>
      </section>
    );
  }

  const lastYear = data.total.lastYear;
  const contributions = data.contributions
    .filter(c => {
      const date = new Date(c.date);
      const now = new Date();
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      return date > yearAgo;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section id="github" className="w-full py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-extrabold text-center text-blue-400 mb-12"
        >
          GitHub Contributions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-400 mb-8"
        >
          Total last year: {lastYear} contributions
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-blue-800/30 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-x-auto"
        >
          <div className="flex justify-between text-xs text-gray-400 mb-2 px-8">
            {weeks.filter((_, i) => i % 4 === 0).map((_, i) => (
              <span key={i}>
                {new Date(contributions[i * 28]?.date || Date.now()).toLocaleString('default', { month: 'short' })}
              </span>
            ))}
          </div>

          <div className="flex gap-1 min-w-max pb-4">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((day, j) => {
                  const level = getLevel(day.count);
                  return (
                    <motion.div
                      key={`${i}-${j}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: (i * 7 + j) * 0.005 }}
                      className="w-3 h-3 lg:w-4 lg:h-4 rounded-sm cursor-pointer transition-transform hover:scale-150"
                      style={{ backgroundColor: getColor(level) }}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                    />
                  );
                })}
                {Array.from({ length: 7 - week.length }).map((_, j) => (
                  <div
                    key={`empty-${j}`}
                    className="w-3 h-3 lg:w-4 lg:h-4 rounded-sm"
                    style={{ backgroundColor: getColor(0) }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0,1,2,3,4].map(l => (
                <div key={l} className="w-3 h-3 lg:w-4 lg:h-4 rounded-sm" style={{ backgroundColor: getColor(l) }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </motion.div>

        <motion.a
          href="https://github.com/ShahzadKhichi"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="block w-full max-w-xs mx-auto mt-10 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-center rounded-full shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          View GitHub
        </motion.a>
      </div>
    </section>
  );
}
