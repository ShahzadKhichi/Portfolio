import React from "react";
import ShimmerBox from "./ShimmerBox";

const SkillsShimmer = () => (
  <div className="space-y-6">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <ShimmerBox className="w-44 h-8 rounded-lg mb-2" />
        <ShimmerBox className="w-72 h-5 rounded" />
      </div>
      <ShimmerBox className="w-full md:w-64 h-10 rounded-xl" />
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form placeholder */}
      <div className="lg:col-span-1">
        <div className="bg-surface border border-border/80 rounded-2xl p-6 space-y-4">
          <ShimmerBox className="w-32 h-6 rounded mb-4" />
          <ShimmerBox className="w-20 h-20 rounded-xl mx-auto" />
          <div className="space-y-2">
            <ShimmerBox className="w-24 h-4 rounded" />
            <ShimmerBox className="w-full h-11 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <ShimmerBox className="w-16 h-4 rounded" />
              <ShimmerBox className="h-11 rounded-lg" />
            </div>
            <div className="space-y-2">
              <ShimmerBox className="w-16 h-4 rounded" />
              <ShimmerBox className="h-11 rounded-lg" />
            </div>
          </div>
          <ShimmerBox className="w-full h-12 rounded-lg mt-4" />
        </div>
      </div>
      {/* List placeholder */}
      <div className="lg:col-span-2">
        <div className="bg-surface border border-border/80 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <ShimmerBox className="w-32 h-6 rounded" />
            <ShimmerBox className="w-24 h-4 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/40">
                <div className="flex items-center space-x-4">
                  <ShimmerBox className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <ShimmerBox className="w-24 h-5" />
                    <ShimmerBox className="w-32 h-2.5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <ShimmerBox className="w-8 h-8 rounded-lg" />
                  <ShimmerBox className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SkillsShimmer;
