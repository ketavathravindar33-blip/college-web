import React from 'react';
import {
  GraduationCap,
  ChevronRight,
  Compass,
  Settings,
  UserCheck,
  Shield,
  BookOpen,
  Building2,
  LogOut,
  Menu,
  X,
  Edit3,
  Layers,
} from 'lucide-react';
import {
  CollegeConfig,
  ScreenId,
  UserRole,
} from '../types/campus';

export const ALL_48_SCREENS: { number: number; id: ScreenId; label: string; group: string }[] = [
  { number: 1, id: 'public-home', label: 'Public Home Page', group: 'Public & Admissions' },
  { number: 2, id: 'about-college', label: 'About College Page', group: 'Public & Admissions' },
  { number: 3, id: 'login', label: 'Login Page', group: 'Auth & Onboarding' },
  { number: 4, id: 'forgot-password', label: 'Forgot Password Page', group: 'Auth & Onboarding' },
  { number: 5, id: 'reset-password', label: 'Reset Password Page', group: 'Auth & Onboarding' },
  { number: 6, id: 'student-register', label: 'Student Registration Page', group: 'Auth & Onboarding' },
  { number: 7, id: 'faculty-register', label: 'Faculty Registration Page', group: 'Auth & Onboarding' },
  { number: 8, id: 'register-success', label: 'Registration Success Page', group: 'Auth & Onboarding' },
  { number: 9, id: 'student-dashboard', label: 'Student Dashboard', group: 'Student Portal' },
  { number: 10, id: 'student-profile', label: 'Student Profile Page', group: 'Student Portal' },
  { number: 11, id: 'student-attendance-overview', label: 'Student Attendance Overview', group: 'Attendance Module' },
  { number: 12, id: 'subject-attendance-details', label: 'Subject-wise Attendance Details', group: 'Attendance Module' },
  { number: 13, id: 'attendance-calendar', label: 'Attendance Calendar', group: 'Attendance Module' },
  { number: 14, id: 'faculty-attendance-mgmt', label: 'Faculty Attendance Management', group: 'Attendance Module' },
  { number: 15, id: 'faculty-directory', label: 'Faculty Directory', group: 'Faculty & Leadership' },
  { number: 16, id: 'faculty-profile-details', label: 'Faculty Profile Details', group: 'Faculty & Leadership' },
  { number: 17, id: 'principal-profile', label: 'Principal Profile Page', group: 'Faculty & Leadership' },
  { number: 18, id: 'department-listing', label: 'Department Listing (7 Depts)', group: 'Departments & Research' },
  { number: 19, id: 'department-detail', label: 'Individual Department Page', group: 'Departments & Research' },
  { number: 20, id: 'research-portal', label: 'Research Portal', group: 'Departments & Research' },
  { number: 21, id: 'research-project-details', label: 'Research Project Details', group: 'Departments & Research' },
  { number: 22, id: 'notes-listing', label: 'Notes Listing Page', group: 'Notes & Videos LMS' },
  { number: 23, id: 'notes-detail-preview', label: 'Notes Details & PDF Preview', group: 'Notes & Videos LMS' },
  { number: 24, id: 'faculty-upload-notes', label: 'Faculty Upload Notes Page', group: 'Notes & Videos LMS' },
  { number: 25, id: 'video-portal', label: 'Video Learning Portal', group: 'Notes & Videos LMS' },
  { number: 26, id: 'video-player', label: 'Video Player Page', group: 'Notes & Videos LMS' },
  { number: 27, id: 'faculty-video-mgmt', label: 'Faculty Video Management Page', group: 'Notes & Videos LMS' },
  { number: 28, id: 'student-timetable', label: 'Student Timetable', group: 'Timetable & Exams' },
  { number: 29, id: 'faculty-timetable', label: 'Faculty Timetable', group: 'Timetable & Exams' },
  { number: 30, id: 'academic-calendar', label: 'Academic Calendar', group: 'Timetable & Exams' },
  { number: 31, id: 'exam-timetable', label: 'Examination Timetable', group: 'Timetable & Exams' },
  { number: 32, id: 'student-results', label: 'Student Results Page', group: 'Timetable & Exams' },
  { number: 33, id: 'infrastructure-overview', label: 'College Infrastructure Overview (22)', group: 'Infrastructure & Events' },
  { number: 34, id: 'infrastructure-detail', label: 'Individual Infrastructure Details', group: 'Infrastructure & Events' },
  { number: 35, id: 'campus-gallery', label: 'Campus Gallery', group: 'Infrastructure & Events' },
  { number: 36, id: 'announcements-listing', label: 'Announcements Listing', group: 'Infrastructure & Events' },
  { number: 37, id: 'announcement-details', label: 'Announcement Details', group: 'Infrastructure & Events' },
  { number: 38, id: 'contact-feedback', label: 'Contact & Feedback Page', group: 'Infrastructure & Events' },
  { number: 39, id: 'faculty-dashboard', label: 'Faculty Dashboard', group: 'Role Dashboards & Admin' },
  { number: 40, id: 'principal-dashboard', label: 'Principal Dashboard', group: 'Role Dashboards & Admin' },
  { number: 41, id: 'admin-dashboard', label: 'Administrator Dashboard', group: 'Role Dashboards & Admin' },
  { number: 42, id: 'student-mgmt', label: 'Student Management Page', group: 'Role Dashboards & Admin' },
  { number: 43, id: 'faculty-mgmt', label: 'Faculty Management Page', group: 'Role Dashboards & Admin' },
  { number: 44, id: 'department-mgmt', label: 'Department Management Page', group: 'Role Dashboards & Admin' },
  { number: 45, id: 'academic-resource-mgmt', label: 'Academic Resource Management Page', group: 'Role Dashboards & Admin' },
  { number: 46, id: 'user-permissions-mgmt', label: 'User Management & Permissions', group: 'Role Dashboards & Admin' },
  { number: 47, id: 'reports-analytics', label: 'Reports & Analytics Page', group: 'Role Dashboards & Admin' },
  { number: 48, id: 'user-settings', label: 'User Settings Page', group: 'Role Dashboards & Admin' },
];

interface NavigationShellProps {
  collegeConfig: CollegeConfig;
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenConfigModal: () => void;
  children: React.ReactNode;
}

export const NavigationShell: React.FC<NavigationShellProps> = ({
  collegeConfig,
  activeScreen,
  onNavigate,
  userRole,
  onChangeRole,
  onOpenConfigModal,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [screenDirectoryOpen, setScreenDirectoryOpen] = React.useState(false);
  const [directorySearch, setDirectorySearch] = React.useState('');

  const currentScreenMeta = ALL_48_SCREENS.find((s) => s.id === activeScreen) || ALL_48_SCREENS[0];

  const studentSidebarLinks: { id: ScreenId; label: string }[] = [
    { id: 'student-dashboard', label: 'Dashboard' },
    { id: 'student-attendance-overview', label: 'Attendance' },
    { id: 'subject-attendance-details', label: 'Subject Attendance' },
    { id: 'attendance-calendar', label: 'Attendance Calendar' },
    { id: 'notes-listing', label: 'Notes & Materials' },
    { id: 'video-portal', label: 'Video Portal' },
    { id: 'student-timetable', label: 'Timetable' },
    { id: 'academic-calendar', label: 'Academic Calendar' },
    { id: 'student-results', label: 'Results & Marks' },
    { id: 'exam-timetable', label: 'Exam Schedule' },
    { id: 'announcements-listing', label: 'Announcements' },
    { id: 'faculty-directory', label: 'Faculty Directory' },
    { id: 'student-profile', label: 'My Profile' },
    { id: 'user-settings', label: 'Account Settings' },
  ];

  const facultySidebarLinks: { id: ScreenId; label: string }[] = [
    { id: 'faculty-dashboard', label: 'Dashboard' },
    { id: 'faculty-profile-details', label: 'My Profile' },
    { id: 'faculty-timetable', label: 'My Classes & Schedule' },
    { id: 'faculty-attendance-mgmt', label: 'Mark Attendance' },
    { id: 'faculty-upload-notes', label: 'Upload Notes' },
    { id: 'faculty-video-mgmt', label: 'Manage Videos' },
    { id: 'student-mgmt', label: 'Student Lists' },
    { id: 'research-portal', label: 'Research Projects' },
    { id: 'announcements-listing', label: 'Announcements' },
    { id: 'user-settings', label: 'Settings' },
  ];

  const principalAdminSidebarLinks: { id: ScreenId; label: string }[] = [
    { id: userRole === 'principal' ? 'principal-dashboard' : 'admin-dashboard', label: 'Executive Dashboard' },
    { id: 'principal-profile', label: 'Principal Profile' },
    { id: 'student-mgmt', label: 'Students Directory' },
    { id: 'faculty-mgmt', label: 'Faculty Directory' },
    { id: 'department-mgmt', label: 'Departments (7)' },
    { id: 'faculty-attendance-mgmt', label: 'Attendance Reports' },
    { id: 'academic-calendar', label: 'Academics & Calendar' },
    { id: 'student-results', label: 'Examination Results' },
    { id: 'research-portal', label: 'Research & Grants' },
    { id: 'announcements-listing', label: 'Announcements' },
    { id: 'academic-resource-mgmt', label: 'Academic Resources' },
    { id: 'infrastructure-overview', label: 'Infrastructure (22)' },
    { id: 'user-permissions-mgmt', label: 'Roles & Permissions' },
    { id: 'reports-analytics', label: 'Reports & Analytics' },
    { id: 'user-settings', label: 'Institutional Settings' },
  ];

  const publicSecondaryLinks: { id: ScreenId; label: string }[] = [
    { id: 'public-home', label: 'Home' },
    { id: 'about-college', label: 'About Us' },
    { id: 'department-listing', label: 'Departments (7)' },
    { id: 'academic-calendar', label: 'Academics' },
    { id: 'faculty-directory', label: 'Faculty' },
    { id: 'principal-profile', label: 'Principal' },
    { id: 'research-portal', label: 'Research' },
    { id: 'infrastructure-overview', label: 'Infrastructure (22)' },
    { id: 'campus-gallery', label: 'Gallery' },
    { id: 'announcements-listing', label: 'Announcements & Events' },
    { id: 'contact-feedback', label: 'Contact' },
    { id: 'student-register', label: 'Student Registration' },
    { id: 'faculty-register', label: 'Faculty Registration' },
  ];

  const activeSidebarLinks =
    userRole === 'student'
      ? studentSidebarLinks
      : userRole === 'faculty'
      ? facultySidebarLinks
      : userRole === 'principal' || userRole === 'admin'
      ? principalAdminSidebarLinks
      : [];

  const filteredScreens = ALL_48_SCREENS.filter(
    (s) =>
      s.label.toLowerCase().includes(directorySearch.toLowerCase()) ||
      s.group.toLowerCase().includes(directorySearch.toLowerCase()) ||
      String(s.number).includes(directorySearch)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-8 no-print">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('public-home')}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 text-left hover:text-sky-300 transition-colors cursor-pointer"
        >
          {collegeConfig.collegeName}
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
          <button
            onClick={() => onNavigate('public-home')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === 'public-home' ? 'text-white underline underline-offset-8 decoration-sky-400 decoration-2' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('department-listing')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === 'department-listing' || activeScreen === 'department-detail'
                ? 'text-white underline underline-offset-8 decoration-sky-400 decoration-2'
                : ''
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => onNavigate('research-portal')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === 'research-portal' || activeScreen === 'research-project-details'
                ? 'text-white underline underline-offset-8 decoration-sky-400 decoration-2'
                : ''
            }`}
          >
            Research
          </button>
          <button
            onClick={() => onNavigate('infrastructure-overview')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === 'infrastructure-overview' || activeScreen === 'infrastructure-detail'
                ? 'text-white underline underline-offset-8 decoration-sky-400 decoration-2'
                : ''
            }`}
          >
            Infrastructure
          </button>
          <button
            onClick={() => onNavigate('contact-feedback')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === 'contact-feedback' ? 'text-white underline underline-offset-8 decoration-sky-400 decoration-2' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() =>
              userRole === 'guest'
                ? onNavigate('login')
                : userRole === 'student'
                ? onNavigate('student-dashboard')
                : userRole === 'faculty'
                ? onNavigate('faculty-dashboard')
                : userRole === 'principal'
                ? onNavigate('principal-dashboard')
                : onNavigate('admin-dashboard')
            }
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {userRole === 'guest' ? 'Student & Staff Portal' : `${userRole.toUpperCase()} WORKSPACE`}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white rounded-lg"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* WORKSPACE & MODULE COMMAND RIBBON BELOW THE TOP BAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 no-print">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb & Active Screen Indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-[#0A192F]">{collegeConfig.affiliatedUniversity}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">{currentScreenMeta.group}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#0284C7] tabular-nums">
              Screen #{currentScreenMeta.number}: {currentScreenMeta.label}
            </span>
          </div>

          {/* Interactive Role Switcher + 48-Screen Explorer + Placeholders Editor */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Role Mode Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(
                [
                  { role: 'guest', label: 'Public Visitor' },
                  { role: 'student', label: 'Student' },
                  { role: 'faculty', label: 'Faculty' },
                  { role: 'principal', label: 'Principal' },
                  { role: 'admin', label: 'Admin' },
                ] as { role: UserRole; label: string }[]
              ).map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    onChangeRole(item.role);
                    if (item.role === 'student') onNavigate('student-dashboard');
                    else if (item.role === 'faculty') onNavigate('faculty-dashboard');
                    else if (item.role === 'principal') onNavigate('principal-dashboard');
                    else if (item.role === 'admin') onNavigate('admin-dashboard');
                    else onNavigate('public-home');
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    userRole === item.role
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenConfigModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Edit College Placeholders</span>
            </button>

            <button
              onClick={() => setScreenDirectoryOpen(!screenDirectoryOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>All 48 Screens Directory</span>
            </button>
          </div>
        </div>

        {/* Public Secondary Navigation Bar when in Guest mode or viewing public pages */}
        <div className="max-w-[1440px] mx-auto mt-2 pt-2 border-t border-slate-100 flex items-center gap-5 overflow-x-auto pb-1">
          {publicSecondaryLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeScreen === link.id
                  ? 'text-[#0284C7] font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* 48-SCREEN INTERACTIVE DRAWER / MODAL */}
      {screenDirectoryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl border border-slate-200 max-w-5xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-[#0A192F] text-white rounded-t-xl">
              <div>
                <h2 className="text-lg font-bold">Complete 48-Screen Smart Campus Navigator</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Jump directly to any of the 48 required screens across Public, Student, Faculty, Principal, and Administrator modules.
                </p>
              </div>
              <button
                onClick={() => setScreenDirectoryOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <input
                type="text"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder="Filter 48 screens by screen number, title, or module name..."
                className="w-full max-w-md px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0284C7]"
              />
              <span className="text-xs text-slate-500 tabular-nums">
                Showing {filteredScreens.length} of 48 Screens
              </span>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredScreens.map((scr) => (
                <button
                  key={scr.id}
                  onClick={() => {
                    onNavigate(scr.id);
                    setScreenDirectoryOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    activeScreen === scr.id
                      ? 'bg-[#0A192F] text-white border-[#0A192F]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-[11px] opacity-75 tabular-nums">{scr.group}</div>
                    <div className="text-xs font-semibold truncate">
                      {scr.number}. {scr.label}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] text-white px-6 py-4 border-b border-slate-800 space-y-2 no-print">
          {publicSecondaryLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 text-sm text-slate-200 hover:text-sky-400"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN WORKSPACE BODY (WITH ROLE SIDEBAR WHEN LOGGED IN AS STUDENT/FACULTY/PRINCIPAL/ADMIN) */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {userRole !== 'guest' && (
          <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200 p-4 justify-between no-print">
            <div>
              <div className="pb-4 mb-4 border-b border-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                  {userRole} Portal Navigation
                </div>
                <div className="text-sm font-bold text-[#0A192F] mt-1 truncate">
                  {userRole === 'student'
                    ? 'Aarav Sharma (24CSE1018)'
                    : userRole === 'faculty'
                    ? 'Dr. Aravind Swaminathan'
                    : userRole === 'principal'
                    ? collegeConfig.principalName
                    : 'Chief Campus Administrator'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {userRole === 'student'
                    ? 'B.Tech CSE · Sem V · Sec A'
                    : userRole === 'faculty'
                    ? 'Professor & HOD · CSE'
                    : userRole === 'principal'
                    ? 'Office of the Principal'
                    : 'ERP & Academic Directorate'}
                </div>
              </div>

              <nav className="space-y-1">
                {activeSidebarLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeScreen === item.id
                        ? 'bg-[#0A192F] text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  onChangeRole('guest');
                  onNavigate('public-home');
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Portal</span>
              </button>
            </div>
          </aside>
        )}

        {/* PRIMARY SCREEN VIEWPORT */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800 mt-16 no-print">
        <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <GraduationCap className="w-6 h-6 text-sky-400 shrink-0" />
              <span>{collegeConfig.collegeName}</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Affiliated to {collegeConfig.affiliatedUniversity} · {collegeConfig.naacGrade}.
              Address: {collegeConfig.collegeAddress}.
            </p>
            <div className="text-xs text-slate-400 mt-3 space-y-1 tabular-nums">
              <div>Principal: {collegeConfig.principalName}</div>
              <div>Phone: {collegeConfig.phone}</div>
              <div>Email: {collegeConfig.email}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Engineering Departments
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                'Computer Science & Engineering (CSE)',
                'CSE (Artificial Intelligence & ML)',
                'CSE (Data Science)',
                'Electronics & Communication (ECE)',
                'Electrical & Electronics (EEE)',
                'Mechanical Engineering',
                'Civil Engineering',
              ].map((dept) => (
                <li key={dept}>
                  <button
                    onClick={() => onNavigate('department-listing')}
                    className="text-slate-400 hover:text-sky-300 transition-colors text-left cursor-pointer"
                  >
                    {dept}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Academic & LMS Portals
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Student Dashboard & Attendance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('notes-listing')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Subject & Unit Notes Repository
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('video-portal')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Video Learning & Lecture Captures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-results')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Examinations, SGPA/CGPA & Marksheets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research-portal')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Research Centers, Patents & Incubation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('infrastructure-overview')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  22 Campus Facilities & Laboratories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Administration & Quick Access
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('principal-profile')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Principal’s Desk & Vision
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty-directory')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Faculty Directory & Office Hours
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Administrator ERP Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('announcements-listing')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Circulars, Placements & Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact-feedback')} className="text-slate-400 hover:text-sky-300 cursor-pointer">
                  Contact Directory, Map & Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 px-6 py-4 text-xs text-slate-400">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              © {new Date().getFullYear()} {collegeConfig.collegeName} · Affiliated to {collegeConfig.affiliatedUniversity}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('about-college')} className="hover:text-white cursor-pointer">
                Mandatory Disclosure
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('academic-calendar')} className="hover:text-white cursor-pointer">
                Academic Regulations
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('contact-feedback')} className="hover:text-white cursor-pointer">
                Grievance Redressal
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
