import React from "react";
import ShimmerBox from "./ShimmerBox";

const DashboardShimmer = () => (
  <div className="space-y-6">
    <header>
      <ShimmerBox className="w-60 h-8 rounded-lg mb-2" />
      <ShimmerBox className="w-96 h-5 rounded" />
    </header>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-2xl bg-surface border border-border/85">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <ShimmerBox className="w-24 h-4" />
              <ShimmerBox className="w-16 h-9" />
            </div>
            <ShimmerBox className="w-12 h-12 rounded-xl" />
          </div>
          <ShimmerBox className="w-28 h-3 rounded" />
        </div>
      ))}
    </div>

    {/* Bottom sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <div className="lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/80 min-h-[300px]">
        <ShimmerBox className="w-full h-full rounded-xl" />
      </div>
      <div className="p-8 rounded-2xl bg-surface border border-border/80 space-y-4">
        <ShimmerBox className="w-32 h-6 rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerBox key={i} className="w-full h-14 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardShimmer;
