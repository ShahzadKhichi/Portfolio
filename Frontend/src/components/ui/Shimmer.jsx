import React from "react";

/* ─── Shared building blocks ─── */
const ShimmerBox = ({ className = "" }) => (
  <div className={`shimmer-placeholder rounded ${className}`} />
);

/* ════════════════════════════════════════════
   PUBLIC / HOME PAGE SHIMMER
   ════════════════════════════════════════════ */
export const PublicShimmer = () => (
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

/* ════════════════════════════════════════════
   ADMIN DASHBOARD SHIMMER
   ════════════════════════════════════════════ */
export const DashboardShimmer = () => (
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

/* ════════════════════════════════════════════
   MANAGE PROJECTS SHIMMER
   ════════════════════════════════════════════ */
export const ProjectsShimmer = () => (
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

/* ════════════════════════════════════════════
   MANAGE SKILLS SHIMMER
   ════════════════════════════════════════════ */
export const SkillsShimmer = () => (
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

/* ════════════════════════════════════════════
   MESSAGES SHIMMER
   ════════════════════════════════════════════ */
export const MessagesShimmer = () => (
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

/* ════════════════════════════════════════════
   MANAGE PROFILE SHIMMER
   ════════════════════════════════════════════ */
export const ProfileShimmer = () => (
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

/* ════════════════════════════════════════════
   MANAGE TYPEWRITER SHIMMER
   ════════════════════════════════════════════ */
export const TypewriterShimmer = () => (
  <div className="space-y-6">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <ShimmerBox className="w-52 h-8 rounded-lg mb-2" />
        <ShimmerBox className="w-72 h-5 rounded" />
      </div>
      <ShimmerBox className="w-full md:w-64 h-10 rounded-xl" />
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-surface border border-border/80 rounded-2xl p-6 space-y-4">
          <ShimmerBox className="w-32 h-6 rounded" />
          <ShimmerBox className="w-full h-11 rounded-lg" />
          <ShimmerBox className="w-full h-12 rounded-lg mt-4" />
        </div>
      </div>
      {/* List */}
      <div className="lg:col-span-2">
        <div className="bg-surface border border-border/80 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <ShimmerBox className="w-32 h-6 rounded" />
            <ShimmerBox className="w-24 h-4 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/40">
                <div className="flex items-center space-x-4">
                  <ShimmerBox className="w-10 h-10 rounded-lg" />
                  <ShimmerBox className="w-40 h-5" />
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

/* ════════════════════════════════════════════
   ACCOUNT SETTINGS SHIMMER
   ════════════════════════════════════════════ */
export const SettingsShimmer = () => (
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
