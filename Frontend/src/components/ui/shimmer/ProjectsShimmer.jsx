import React from "react";
import ShimmerBox from "./ShimmerBox";

const ProjectsShimmer = () => (
  <div className="space-y-6">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <ShimmerBox className="w-52 h-8 rounded-lg mb-2" />
        <ShimmerBox className="w-80 h-5 rounded" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <ShimmerBox className="w-full md:w-64 h-10 rounded-xl" />
        <ShimmerBox className="w-full sm:w-28 h-10 rounded-lg" />
      </div>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-surface border border-border/80 rounded-2xl overflow-hidden flex flex-col min-h-[400px]">
          <ShimmerBox className="w-full aspect-video rounded-none" />
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <ShimmerBox className="w-3/4 h-6" />
              <ShimmerBox className="w-full h-10" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <ShimmerBox key={j} className="w-14 h-6 rounded" />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-border/40">
              <ShimmerBox className="w-16 h-8 rounded-lg" />
              <ShimmerBox className="w-16 h-8 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsShimmer;
