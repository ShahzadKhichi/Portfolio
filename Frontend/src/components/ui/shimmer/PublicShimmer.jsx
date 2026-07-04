import React from "react";
import ShimmerBox from "./ShimmerBox";

const PublicShimmer = () => (
  <div className="min-h-screen bg-bg w-full overflow-hidden">
    {/* Navbar (Matches real Navbar layout & sizes) */}
    <div className="fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 bg-transparent border-b border-border/30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo/Avatar */}
        <ShimmerBox className="w-11 h-11 lg:w-13 lg:h-13 rounded-full" />
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ShimmerBox key={i} className="w-20 h-10 rounded-xl mx-1" />
          ))}
        </div>

        {/* Hire Me Button */}
        <ShimmerBox className="hidden md:block w-28 h-11 rounded-full" />
      </div>
    </div>

    {/* Hero / About Section (Matches real AboutSection layout) */}
    <div className="max-w-7xl mx-auto px-4 xl:pr-50 py-32 sm:py-40 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Image */}
      <div className="flex justify-center lg:justify-end">
        <ShimmerBox className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl" />
      </div>
      
      {/* Content */}
      <div className="space-y-6 text-center lg:text-left">
        <ShimmerBox className="w-3/4 h-12 sm:h-16 mx-auto lg:mx-0 rounded-xl" />
        <ShimmerBox className="w-1/2 h-8 sm:h-10 mx-auto lg:mx-0 rounded-lg" />
        {/* Bio Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-surface/40 border border-border/30 space-y-3">
          <ShimmerBox className="w-full h-4 rounded" />
          <ShimmerBox className="w-5/6 h-4 rounded" />
          <ShimmerBox className="w-2/3 h-4 rounded" />
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
          <ShimmerBox className="w-44 h-12 rounded-full" />
          <ShimmerBox className="w-44 h-12 rounded-full" />
        </div>
      </div>
    </div>

    {/* Projects Section (Matches ProjectCard structure and size 1:1) */}
    <div className="w-full py-20 bg-bg-alt/40 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <ShimmerBox className="w-64 h-12 lg:h-16 mx-auto rounded-xl" />
          <ShimmerBox className="w-96 h-6 mx-auto rounded-lg" />
        </div>

        {/* Projects cards list */}
        <div className="space-y-20">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="bg-surface/50 border border-border/20 rounded-3xl overflow-hidden w-full max-w-5xl mx-auto flex flex-col lg:flex-row min-h-[420px]"
            >
              {/* Image Section */}
              <div className="lg:w-1/2 min-h-[250px] lg:min-h-full">
                <ShimmerBox className="w-full h-full rounded-none" />
              </div>
              
              {/* Content Section */}
              <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <ShimmerBox className="w-3/4 h-8 sm:h-10 rounded-lg" />
                  <div className="space-y-2">
                    <ShimmerBox className="w-full h-4 rounded" />
                    <ShimmerBox className="w-5/6 h-4 rounded" />
                    <ShimmerBox className="w-4/5 h-4 rounded" />
                  </div>
                </div>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[1, 2, 3, 4].map((j) => (
                    <ShimmerBox key={j} className="w-20 h-8 rounded-full" />
                  ))}
                </div>

                {/* Bottom Buttons */}
                <div className="flex gap-4">
                  <ShimmerBox className="flex-1 h-12 rounded-2xl" />
                  <ShimmerBox className="flex-1 h-12 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Skills Section (Matches SkillGroup and Skills layout 1:1) */}
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
      {/* Title */}
      <div className="text-center space-y-4 mb-16">
        <ShimmerBox className="w-48 h-12 mx-auto rounded-xl" />
        <ShimmerBox className="w-80 h-5 mx-auto rounded-lg" />
      </div>

      {/* Skill Group */}
      <div className="w-full max-w-6xl rounded-3xl p-8 lg:p-12 bg-surface/50 border border-border/20 space-y-8">
        <ShimmerBox className="w-40 h-8 rounded-lg mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-4 w-28">
              {/* Circular Skill Badge */}
              <ShimmerBox className="w-[100px] h-[100px] rounded-full" />
              {/* Label */}
              <ShimmerBox className="w-20 h-5 rounded" />
              {/* Level Percentage pill */}
              <ShimmerBox className="w-12 h-6 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PublicShimmer;
