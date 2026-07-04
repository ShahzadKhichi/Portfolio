import React from "react";
import ShimmerBox from "./ShimmerBox";

const MessagesShimmer = () => (
  <div className="space-y-6">
    <header>
      <ShimmerBox className="w-52 h-8 rounded-lg mb-2" />
      <ShimmerBox className="w-80 h-5 rounded" />
    </header>
    <div className="bg-surface border border-border/80 rounded-2xl overflow-hidden">
      {/* Table header */}
      <div className="flex items-center p-5 border-b border-border/80 bg-bg-alt/30">
        <ShimmerBox className="w-1/4 h-4" />
        <ShimmerBox className="w-1/3 h-4 ml-8" />
        <ShimmerBox className="w-1/6 h-4 ml-8" />
        <ShimmerBox className="w-1/6 h-4 ml-auto" />
      </div>
      {/* Table rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center p-6 border-b border-border/40">
          <div className="flex items-start space-x-3 w-1/4">
            <ShimmerBox className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <ShimmerBox className="w-24 h-4" />
              <ShimmerBox className="w-32 h-3" />
            </div>
          </div>
          <ShimmerBox className="w-1/3 h-12 ml-8" />
          <ShimmerBox className="w-1/6 h-4 ml-8" />
          <div className="flex gap-2 ml-auto">
            <ShimmerBox className="w-9 h-9 rounded-lg" />
            <ShimmerBox className="w-9 h-9 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MessagesShimmer;
