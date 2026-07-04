import React from "react";
import ShimmerBox from "./ShimmerBox";

const SettingsShimmer = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <header>
      <ShimmerBox className="w-56 h-8 rounded-lg mb-2" />
      <ShimmerBox className="w-80 h-5 rounded" />
    </header>
    <div className="bg-surface border border-border/80 rounded-2xl p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <ShimmerBox className="w-24 h-4 rounded" />
          <ShimmerBox className="w-full h-12 rounded-xl" />
        </div>
        <div className="space-y-2">
          <ShimmerBox className="w-24 h-4 rounded" />
          <ShimmerBox className="w-full h-12 rounded-xl" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <ShimmerBox className="w-32 h-4 rounded" />
          <ShimmerBox className="w-full h-12 rounded-xl" />
        </div>
      </div>
      <ShimmerBox className="w-full h-14 rounded-xl" />
    </div>
    <div className="bg-surface border border-border/80 rounded-2xl p-8 flex items-start gap-4">
      <ShimmerBox className="w-12 h-12 rounded-lg" />
      <div className="space-y-2 flex-1">
        <ShimmerBox className="w-32 h-6 rounded" />
        <ShimmerBox className="w-full h-10 rounded" />
      </div>
    </div>
  </div>
);

export default SettingsShimmer;
