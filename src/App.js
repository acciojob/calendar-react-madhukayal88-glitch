import { Calendar } from "@/components/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, GraduationCap, Home, Layers, List, Gauge, Users, Code, Network, Box, Briefcase, Bookmark, Circle } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex items-center gap-2 ml-4">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="px-3 py-1 bg-white rounded-t-lg border border-b-0 border-slate-200 text-slate-700 font-medium">
                AccioJob
              </span>
              <span className="px-3 py-1 text-slate-400">calendar-react-madhukayal88…</span>
              <span className="px-3 py-1 text-slate-400">DeepSeek - Into the Unknown</span>
              <span className="px-3 py-1 text-slate-400">madhukayal88-glitch/calendar…</span>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-[10px] font-medium">
                ✨ Ask Gemini
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 pb-2">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-400">
            <span className="text-slate-500">🔒</span>
            course.acciojob.com/journey
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Icon Sidebar */}
        <div className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
            <div className="w-4 h-4 bg-white transform rotate-45" />
          </div>
          <SidebarIcon icon={<Home className="w-5 h-5" />} />
          <SidebarIcon icon={<GraduationCap className="w-5 h-5" />} active />
          <SidebarIcon icon={<List className="w-5 h-5" />} />
          <SidebarIcon icon={<Layers className="w-5 h-5" />} />
          <SidebarIcon icon={<Gauge className="w-5 h-5" />} activeBlue />
          <SidebarIcon icon={<Users className="w-5 h-5" />} />
          <SidebarIcon icon={<Code className="w-5 h-5" />} />
          <SidebarIcon icon={<Network className="w-5 h-5" />} />
          <SidebarIcon icon={<Box className="w-5 h-5" />} />
          <SidebarIcon icon={<Briefcase className="w-5 h-5" />} />
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mt-auto">
            <span className="text-white text-xs font-bold">$</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Dotted drag handle */}
          <div className="w-4 border-r border-dotted border-slate-300 flex items-center justify-center cursor-col-resize">
            <div className="w-1 h-8 bg-slate-300 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-blue-600 text-xs font-semibold tracking-wider mb-1">
                  COURSE
                </div>
                <h1 className="text-3xl font-bold text-slate-900">MERN Stack</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                  <ChevronLeft className="w-4 h-4 text-blue-600" />
                </Button>
                <div className="flex items-center gap-1 px-3 py-1.5 border border-blue-200 rounded-full text-sm text-slate-700">
                  Course Overview
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-blue-300">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200 mb-6">
              <div className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
                QUESTION
              </div>
              <div className="pb-2 text-slate-500 font-medium text-sm">
                SUBMISSION
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-slate-800 mb-1">
                  Additional Notes
                </div>
                <div className="text-sm text-slate-600">
                  Focus on functionality rather than styling. Ensure proper ID binding for automated testing compatibility.
                </div>
              </div>

              <div className="text-sm text-slate-700">
                The following image is a BluePrint of the App.
              </div>

              {/* Calendar Blueprint */}
              <div className="border border-slate-200 rounded-lg p-6 max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl text-blue-600 font-semibold">
                    Calendar
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border border-slate-300 rounded px-2 py-1 text-sm">
                      February
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 border border-slate-300 rounded px-2 py-1 text-sm">
                      2023
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="font-medium">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm text-slate-700">
                    {[1, 2, 3, 4].map((d) => (
                      <div key={d} className="py-1">{d}</div>
                    ))}
                    {Array.from({ length: 24 }, (_, i) => i + 5).map((d) => (
                      <div key={d} className="py-1">{d}</div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {["<<", "<", ">", ">>"].map((arrow, i) => (
                    <button
                      key={arrow}
                      className="w-8 h-8 border border-slate-300 rounded flex items-center justify-center text-slate-400 hover:bg-slate-50"
                    >
                      {i === 0 && <ChevronsLeft className="w-4 h-4 text-blue-600" />}
                      {i === 1 && <ChevronLeft className="w-4 h-4 text-blue-600" />}
                      {i === 2 && <ChevronRight className="w-4 h-4 text-blue-600" />}
                      {i === 3 && <ChevronsRight className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollbar */}
          <div className="w-2 bg-slate-100 border-l border-slate-200">
            <div className="w-1.5 bg-slate-300 rounded-full mx-auto mt-8 h-24" />
          </div>

          {/* Floating Bookmark */}
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
            <Bookmark className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ icon, active, activeBlue }: { icon: React.ReactNode; active?: boolean; activeBlue?: boolean }) {
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : activeBlue
          ? "bg-blue-100 text-blue-600"
          : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      }`}
    >
      {icon}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
