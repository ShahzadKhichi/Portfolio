import React from "react";
import ShimmerBox from "./ShimmerBox";

const ProfileShimmer = () => (
  <div className="space-y-6 max-w-4xl">
    <header>
      <ShimmerBox className="w-48 h-8 rounded-lg mb-2" />
      <ShimmerBox className="w-72 h-5 rounded" />
    </header>
    <div className="bg-surface border border-border/80 rounded-2xl p-6 md:p-8 space-y-8">
      {/* Image section */}
      <div>
        <ShimmerBox className="w-40 h-6 rounded mb-4" />
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ShimmerBox className="w-40 h-40 rounded-3xl" />
          <div className="w-full space-y-4">
            <ShimmerBox className="w-full h-16 rounded-xl" />
            <ShimmerBox className="w-48 h-4 rounded" />
          </div>
        </div>
      </div>
      {/* Bio section */}
      <div className="pt-6 border-t border-border/60">
        <ShimmerBox className="w-28 h-6 rounded mb-4" />
        <ShimmerBox className="w-full h-36 rounded-lg" />
      </div>
      {/* Social links */}
      <div className="pt-6 border-t border-border/60">
        <ShimmerBox className="w-28 h-6 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <ShimmerBox className="w-24 h-4 rounded" />
              <ShimmerBox className="w-full h-11 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      {/* Submit */}
      <div className="pt-6 border-t border-border/60 flex justify-end">
        <ShimmerBox className="w-36 h-12 rounded-lg" />
      </div>
    </div>
  </div>
);

export default ProfileShimmer;
