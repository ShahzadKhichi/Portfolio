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
    {/* Navbar */}
    <div className="w-full h-20 px-6 md:px-12 flex items-center justify-between border-b border-border/30">
      <ShimmerBox className="w-32 h-8 rounded-lg" />
      <div className="hidden md:flex items-center space-x-8">
        {[1, 2, 3, 4].map((i) => (
          <ShimmerBox key={i} className="w-16 h-5" />
        ))}
      </div>
    </div>

    {/* Hero / About */}
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="flex justify-center lg:justify-end">
        <ShimmerBox className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-3xl" />
      </div>
      <div className="space-y-6 text-center lg:text-left">
        <ShimmerBox className="w-3/4 h-12 mx-auto lg:mx-0 rounded-lg" />
        <ShimmerBox className="w-1/2 h-8 mx-auto lg:mx-0 rounded-lg" />
        <ShimmerBox className="w-full h-32 rounded-2xl" />
        <div className="flex justify-center lg:justify-start space-x-4">
          <ShimmerBox className="w-36 h-12 rounded-full" />
          <ShimmerBox className="w-36 h-12 rounded-full" />
        </div>
      </div>
    </div>

    {/* Projects */}
    <div className="w-full py-20 bg-bg-alt/40 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <ShimmerBox className="w-64 h-12 mx-auto rounded-lg" />
          <ShimmerBox className="w-96 h-6 mx-auto rounded-lg" />
        </div>
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 rounded-3xl border border-border/20">
              <ShimmerBox className="h-64 rounded-2xl" />
              <div className="space-y-4">
                <ShimmerBox className="w-3/4 h-8" />
                <ShimmerBox className="w-full h-24" />
                <div className="flex space-x-2">
                  {[1, 2, 3].map((j) => (
                    <ShimmerBox key={j} className="w-16 h-6 rounded-full" />
                  ))}
                </div>
              </div>
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
        <div key={i} className="p-6 rounded-2xl bg-surface border border-border/60">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <ShimmerBox className="w-24 h-4" />
              <ShimmerBox className="w-16 h-9" />
            </div>
            <ShimmerBox className="w-12 h-12 rounded-xl" />
          </div>
          <ShimmerBox className="w-32 h-3" />
        </div>
      ))}
    </div>

    {/* Bottom sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <div className="lg:col-span-2 p-8 rounded-2xl bg-surface border border-border/60 min-h-[300px]">
        <ShimmerBox className="w-full h-full rounded-xl" />
      </div>
      <div className="p-8 rounded-2xl bg-surface border border-border/60">
        <ShimmerBox className="w-32 h-6 rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerBox key={i} className="w-full h-12 rounded-xl" />
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
      <div className="flex items-center gap-3">
        <ShimmerBox className="w-64 h-10 rounded-xl" />
        <ShimmerBox className="w-28 h-10 rounded-lg" />
      </div>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-surface border border-border/60 rounded-2xl overflow-hidden">
          <ShimmerBox className="w-full aspect-video rounded-none" />
          <div className="p-5 space-y-3">
            <ShimmerBox className="w-3/4 h-6" />
            <ShimmerBox className="w-full h-10" />
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <ShimmerBox key={j} className="w-14 h-5 rounded-full" />
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-border/30">
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
      <ShimmerBox className="w-64 h-10 rounded-xl" />
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form placeholder */}
      <div className="lg:col-span-1">
        <div className="bg-surface border border-border/60 rounded-2xl p-6 space-y-4">
          <ShimmerBox className="w-32 h-6 rounded" />
          <ShimmerBox className="w-20 h-20 rounded-xl mx-auto" />
          <ShimmerBox className="w-full h-11 rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <ShimmerBox className="h-11 rounded-lg" />
            <ShimmerBox className="h-11 rounded-lg" />
          </div>
          <ShimmerBox className="w-full h-11 rounded-lg" />
        </div>
      </div>
      {/* List placeholder */}
      <div className="lg:col-span-2">
        <div className="bg-surface border border-border/60 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <ShimmerBox className="w-32 h-6 rounded" />
            <ShimmerBox className="w-24 h-4 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/30">
                <div className="flex items-center space-x-4">
                  <ShimmerBox className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <ShimmerBox className="w-24 h-5" />
                    <ShimmerBox className="w-32 h-2" />
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
    <div className="bg-surface border border-border/60 rounded-2xl overflow-hidden">
      {/* Table header */}
      <div className="flex items-center p-5 border-b border-border/40 bg-bg-alt/30">
        <ShimmerBox className="w-1/4 h-4" />
        <ShimmerBox className="w-1/3 h-4 ml-8" />
        <ShimmerBox className="w-1/6 h-4 ml-8" />
        <ShimmerBox className="w-1/6 h-4 ml-auto" />
      </div>
      {/* Table rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center p-6 border-b border-border/20">
          <div className="flex items-center space-x-3 w-1/4">
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
    <div className="bg-surface border border-border/60 rounded-2xl p-6 md:p-8 space-y-8">
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
      <div className="pt-6 border-t border-border/40">
        <ShimmerBox className="w-28 h-6 rounded mb-4" />
        <ShimmerBox className="w-full h-36 rounded-lg" />
      </div>
      {/* Social links */}
      <div className="pt-6 border-t border-border/40">
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
      <div className="pt-6 border-t border-border/40 flex justify-end">
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
      <ShimmerBox className="w-64 h-10 rounded-xl" />
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-surface border border-border/60 rounded-2xl p-6 space-y-4">
          <ShimmerBox className="w-32 h-6 rounded" />
          <ShimmerBox className="w-full h-11 rounded-lg" />
          <ShimmerBox className="w-full h-11 rounded-lg" />
        </div>
      </div>
      {/* List */}
      <div className="lg:col-span-2">
        <div className="bg-surface border border-border/60 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <ShimmerBox className="w-32 h-6 rounded" />
            <ShimmerBox className="w-24 h-4 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/30">
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
    <div className="bg-surface border border-border/60 rounded-2xl p-8 space-y-6">
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
    <div className="bg-surface border border-border/60 rounded-2xl p-8 flex items-start gap-4">
      <ShimmerBox className="w-12 h-12 rounded-lg" />
      <div className="space-y-2 flex-1">
        <ShimmerBox className="w-32 h-6 rounded" />
        <ShimmerBox className="w-full h-10 rounded" />
      </div>
    </div>
  </div>
);

