import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Download,
  Edit3,
  FileText,
  Lock,
  Printer,
  Search,
  Settings,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  AnnouncementItem,
  AttendanceCorrectionRequest,
  AuditLogEntry,
  CollegeConfig,
  DepartmentInfo,
  EducationalVideo,
  FacultyMember,
  FeedbackSubmission,
  InfrastructureFacility,
  ScreenId,
  StudentRecord,
  StudyMaterial,
  UserRole,
} from '../types/campus';

interface AdminAndManagementProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  userRole: UserRole;
  students: StudentRecord[];
  facultyList: FacultyMember[];
  departments: DepartmentInfo[];
  studyMaterials: StudyMaterial[];
  videos: EducationalVideo[];
  announcements: AnnouncementItem[];
  facilities: InfrastructureFacility[];
  correctionRequests: AttendanceCorrectionRequest[];
  feedbackList: FeedbackSubmission[];
  auditLogs: AuditLogEntry[];
  onNavigate: (screen: ScreenId) => void;
  onUpdateCollegeConfig: (cfg: CollegeConfig) => void;
  onApproveStudent: (id: string) => void;
  onDeleteStudent: (id: string) => void;
  onDeleteFaculty: (id: string) => void;
  onDeleteMaterial: (id: string) => void;
  onDeleteVideo: (id: string) => void;
  onResolveFeedback: (id: string) => void;
  onLogout: () => void;
}

export const AdminAndManagementScreens: React.FC<AdminAndManagementProps> = ({
  screen,
  collegeConfig,
  userRole,
  students,
  facultyList,
  departments,
  studyMaterials,
  videos,
  announcements,
  facilities,
  correctionRequests,
  feedbackList,
  auditLogs,
  onNavigate,
  onUpdateCollegeConfig,
  onApproveStudent,
  onDeleteStudent,
  onDeleteFaculty,
  onDeleteMaterial,
  onDeleteVideo,
  onResolveFeedback,
  onLogout,
}) => {
  // Search filters for Admin tables
  const [stuMgmtSearch, setStuMgmtSearch] = useState('');
  const [stuDeptFilter, setStuDeptFilter] = useState('ALL');
  const [facMgmtSearch, setFacMgmtSearch] = useState('');

  // Role permission matrix state
  const [roleMatrix, setRoleMatrix] = useState([
    { permission: 'Mark & Modify Daily Classroom Attendance', student: false, faculty: true, principal: true, admin: true },
    { permission: 'Upload & Remove Course Study Materials (PDFs)', student: false, faculty: true, principal: true, admin: true },
    { permission: 'Publish & Edit Semester Examination Results', student: false, faculty: false, principal: true, admin: true },
    { permission: 'Approve Student & Faculty Portal Registrations', student: false, faculty: false, principal: true, admin: true },
    { permission: 'Broadcast Institution-Wide Priority Circulars', student: false, faculty: true, principal: true, admin: true },
    { permission: 'Configure Minimum Attendance Threshold Policy', student: false, faculty: false, principal: true, admin: true },
  ]);

  // Settings form state
  const [cfgName, setCfgName] = useState(collegeConfig.collegeName);
  const [cfgUni, setCfgUni] = useState(collegeConfig.affiliatedUniversity);
  const [cfgAddr, setCfgAddr] = useState(collegeConfig.collegeAddress);
  const [cfgPrincipal, setCfgPrincipal] = useState(collegeConfig.principalName);
  const [cfgThreshold, setCfgThreshold] = useState(String(collegeConfig.minAttendanceThreshold));
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // SCREEN 39: FACULTY DASHBOARD
  if (screen === 'faculty-dashboard') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0A192F] text-white rounded-xl p-6 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Screen #39 · Faculty Academic & Instructional Workspace
            </div>
            <h1 className="text-2xl font-bold mt-1">
              Welcome, Dr. Aravind Swaminathan (Professor & HOD — CSE)
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Cabin: Block A, Room 201 · Office Hours: Mon, Wed, Fri (02:30 PM – 04:30 PM)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('faculty-attendance-mgmt')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg cursor-pointer"
            >
              Mark Class Attendance
            </button>
            <button
              onClick={() => onNavigate('faculty-upload-notes')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer"
            >
              Upload Study Notes
            </button>
            <button
              onClick={() => onNavigate('faculty-video-mgmt')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer"
            >
              Manage Lecture Videos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Assigned Theory & Lab Courses</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">04</div>
            <div className="text-xs text-slate-500 mt-1">16 Instructional Hours / Week</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Pending OD Correction Requests</div>
            <div className="text-3xl font-bold text-amber-700 mt-1">
              {correctionRequests.filter((c) => c.status === 'Pending').length}
            </div>
            <div className="text-xs text-[#0284C7] mt-1">Awaiting Faculty Sign-off</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Notes & Manuals Uploaded</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">{studyMaterials.length}</div>
            <div className="text-xs text-emerald-700 mt-1">Active in LMS Repository</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Sponsored Research Outlay</div>
            <div className="text-3xl font-bold text-emerald-700 mt-1">₹ 36.2 L</div>
            <div className="text-xs text-slate-500 mt-1">DRDO eBPF Kernel Security Grant</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-base font-bold text-[#0A192F]">Today’s Assigned Lectures & Labs</h2>
              <button
                onClick={() => onNavigate('faculty-timetable')}
                className="text-xs font-semibold text-[#0284C7] cursor-pointer"
              >
                Full Weekly Roster →
              </button>
            </div>
            <div className="divide-y divide-slate-100 mt-2 text-xs">
              {[
                { time: '09:00 AM - 10:00 AM', course: 'CS501: Distributed Systems & Cloud', sec: 'CSE-3A (62 Students)', room: 'LH-201' },
                { time: '11:15 AM - 12:15 PM', course: 'CS302: Operating Systems Internals', sec: 'CSE-2B (60 Students)', room: 'LH-104' },
                { time: '02:15 PM - 04:15 PM', course: 'CS506L: Distributed Cloud Computing Lab', sec: 'CSE-3A Batch 1', room: 'Cloud Lab 204' },
              ].map((s, i) => (
                <div key={i} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-[#0A192F]">{s.course}</div>
                    <div className="text-slate-500 mt-0.5">{s.sec} · Room {s.room}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums font-semibold text-slate-600">{s.time}</span>
                    <button
                      onClick={() => onNavigate('faculty-attendance-mgmt')}
                      className="px-3 py-1.5 bg-[#0A192F] text-white font-semibold rounded-md cursor-pointer"
                    >
                      Roll Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">Quick Faculty Actions</h2>
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              {[
                { id: 'faculty-attendance-mgmt', label: 'Mark Classroom Attendance & Approve OD Petitions' },
                { id: 'faculty-upload-notes', label: 'Upload Lecture Notes, Syllabus & Question Banks' },
                { id: 'faculty-video-mgmt', label: 'Add Recorded Lecture Video Links & Topics' },
                { id: 'student-mgmt', label: 'Inspect Department Student Roll List & Attendance %' },
                { id: 'research-portal', label: 'Manage Sponsored Research Grants & Publications' },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => onNavigate(act.id as ScreenId)}
                  className="p-3.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-[#0A192F] cursor-pointer"
                >
                  <span>{act.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#0284C7]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 40: PRINCIPAL DASHBOARD
  if (screen === 'principal-dashboard') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0A192F] text-white rounded-xl p-6 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Screen #40 · Principal’s Executive Academic & Governance Console
            </div>
            <h1 className="text-2xl font-bold mt-1">
              {collegeConfig.principalName} — Office of the Principal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {collegeConfig.collegeName} · Affiliated to {collegeConfig.affiliatedUniversity} · {collegeConfig.naacGrade}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reports-analytics')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg cursor-pointer"
            >
              Institutional Analytics Report
            </button>
            <button
              onClick={() => onNavigate('principal-profile')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
            >
              View Public Principal Page
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Total Enrolled Students</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">3,420</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">Across 7 B.Tech / M.Tech Depts</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Total Faculty Strength</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">210</div>
            <div className="text-xs text-slate-500 mt-1">1:16.2 Faculty-Student Ratio</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Campus-Wide Mean Attendance</div>
            <div className="text-3xl font-bold text-[#0284C7] mt-1">87.6%</div>
            <div className="text-xs text-slate-500 mt-1">Min Policy Threshold: {collegeConfig.minAttendanceThreshold}%</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Pending Approvals & Petitions</div>
            <div className="text-3xl font-bold text-amber-700 mt-1">
              {students.filter((s) => s.status === 'Pending Approval').length +
                correctionRequests.filter((c) => c.status === 'Pending').length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Registrations & OD Requests</div>
          </div>
        </div>

        {/* DEPARTMENT WISE SUMMARY TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-[#0A192F]">
              7 Engineering Departments — Academic, Faculty, Research & Placement Performance
            </h2>
            <button
              onClick={() => onNavigate('department-mgmt')}
              className="text-xs font-semibold text-[#0284C7] cursor-pointer"
            >
              Manage Departments →
            </button>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-3 font-semibold">Department</th>
                  <th className="py-3 px-3 font-semibold">Head of Department</th>
                  <th className="py-3 px-3 font-semibold text-right">Students</th>
                  <th className="py-3 px-3 font-semibold text-right">Faculty</th>
                  <th className="py-3 px-3 font-semibold text-right">Labs</th>
                  <th className="py-3 px-3 font-semibold text-right">Publications</th>
                  <th className="py-3 px-3 font-semibold text-right">Placement %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 tabular-nums">
                {departments.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-[#0A192F] font-sans">{d.code} — {d.name}</td>
                    <td className="py-3 px-3 font-sans">{d.hodName}</td>
                    <td className="py-3 px-3 text-right">{d.studentCount}</td>
                    <td className="py-3 px-3 text-right">{d.facultyCount}</td>
                    <td className="py-3 px-3 text-right">{d.labsCount}</td>
                    <td className="py-3 px-3 text-right font-semibold text-[#0284C7]">{d.publicationsCount}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700">{d.placementRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 41: ADMINISTRATOR DASHBOARD (WITH ALL 15 REQUIRED ADMIN MODULES)
  if (screen === 'admin-dashboard') {
    const adminModules: { num: string; title: string; count: string; target: ScreenId }[] = [
      { num: '01', title: 'Student Management & Roll Registry', count: `${students.length} Records`, target: 'student-mgmt' },
      { num: '02', title: 'Faculty Directory & HR Management', count: `${facultyList.length} Faculty`, target: 'faculty-mgmt' },
      { num: '03', title: 'Department & Curriculum Management', count: '7 Departments', target: 'department-mgmt' },
      { num: '04', title: 'Attendance Registers & Policy Threshold', count: `Min ${collegeConfig.minAttendanceThreshold}%`, target: 'faculty-attendance-mgmt' },
      { num: '05', title: 'Notes & PDF Document Repository', count: `${studyMaterials.length} Files`, target: 'academic-resource-mgmt' },
      { num: '06', title: 'Video Lecture Resource Management', count: `${videos.length} Videos`, target: 'faculty-video-mgmt' },
      { num: '07', title: 'Master Timetable & Classroom Allocation', count: '5-Day Grid', target: 'student-timetable' },
      { num: '08', title: 'Examination & SGPA/CGPA Results Cell', count: 'Odd Sem 2026', target: 'student-results' },
      { num: '09', title: 'Circular & Announcement Broadcast', count: `${announcements.length} Active`, target: 'announcements-listing' },
      { num: '10', title: 'Infrastructure & 22 Facilities CMS', count: '22 Facilities', target: 'infrastructure-overview' },
      { num: '11', title: 'Pending Registration Approvals', count: `${students.filter((s) => s.status === 'Pending Approval').length} Pending`, target: 'student-mgmt' },
      { num: '12', title: 'User Roles & RBAC Permissions Matrix', count: '4 Roles', target: 'user-permissions-mgmt' },
      { num: '13', title: 'Institutional Reports & NAAC Analytics', count: 'Live KPIs', target: 'reports-analytics' },
      { num: '14', title: 'Stakeholder Feedback & Grievance Desk', count: `${feedbackList.length} Tickets`, target: 'contact-feedback' },
      { num: '15', title: 'System Security & Audit Log Console', count: `${auditLogs.length} Events`, target: 'user-permissions-mgmt' },
    ];

    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0A192F] text-white rounded-xl p-6 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Screen #41 · Central ERP Administrator Control Center
            </div>
            <h1 className="text-2xl font-bold mt-1">
              {collegeConfig.collegeName} — Complete 15-Module Administrative Suite
            </h1>
          </div>
          <button
            onClick={() => onNavigate('user-settings')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg shrink-0 cursor-pointer"
          >
            Edit Institutional Placeholders & Settings
          </button>
        </div>

        {/* 15 ADMIN MODULES LAUNCHPAD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminModules.map((mod) => (
            <button
              key={mod.num}
              onClick={() => onNavigate(mod.target)}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-[#0284C7] text-left transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                <span className="font-bold text-[#0284C7]">Module {mod.num}</span>
                <span className="font-semibold text-slate-700">{mod.count}</span>
              </div>
              <div className="text-sm font-bold text-[#0A192F] mt-2">{mod.title}</div>
              <div className="text-xs text-[#0284C7] font-semibold mt-3 flex items-center gap-1">
                <span>Open Management Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>

        {/* RECENT AUDIT LOGS & FEEDBACK DESK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-[#0A192F] mb-3">15. Real-Time ERP Security & Audit Log</h2>
            <div className="divide-y divide-slate-200">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-[#0A192F]">{log.action}</div>
                    <div className="text-slate-500">
                      Actor: {log.actor} ({log.role}) · Module: {log.module}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 shrink-0">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">14. Stakeholder Feedback & Grievances</h2>
            {feedbackList.map((fb) => (
              <div key={fb.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-bold text-[#0A192F]">
                  <span>{fb.name} ({fb.role})</span>
                  <span className={fb.status === 'Resolved' ? 'text-emerald-700' : 'text-[#0284C7]'}>{fb.status}</span>
                </div>
                <p className="text-slate-600">{fb.message}</p>
                {fb.status !== 'Resolved' && (
                  <button
                    onClick={() => onResolveFeedback(fb.id)}
                    className="px-2.5 py-1 bg-emerald-600 text-white font-semibold rounded cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 42: STUDENT MANAGEMENT PAGE
  if (screen === 'student-mgmt') {
    const filteredStudents = students.filter((s) => {
      const matchQ =
        s.name.toLowerCase().includes(stuMgmtSearch.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(stuMgmtSearch.toLowerCase());
      const matchD = stuDeptFilter === 'ALL' || s.department === stuDeptFilter;
      return matchQ && matchD;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #42 · Student Registry, Registration Approvals & Academic Standing
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Student Management Console ({students.length} Enrolled Records)
            </h1>
          </div>
          <button
            onClick={() => onNavigate('student-register')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
          >
            + Enroll New Student
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 text-xs">
          <input
            type="text"
            value={stuMgmtSearch}
            onChange={(e) => setStuMgmtSearch(e.target.value)}
            placeholder="Search by Student Name or Roll Number (e.g. 24CSE1018)..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={stuDeptFilter}
            onChange={(e) => setStuDeptFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All 7 Engineering Departments</option>
            <option value="CSE">CSE</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="CSE (Data Science)">CSE (Data Science)</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-3 font-semibold">Roll Number</th>
                <th className="py-3 px-3 font-semibold">Student Name</th>
                <th className="py-3 px-3 font-semibold">Department</th>
                <th className="py-3 px-3 font-semibold">Year & Sem</th>
                <th className="py-3 px-3 font-semibold text-right">Attendance %</th>
                <th className="py-3 px-3 font-semibold text-right">CGPA</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-[#0284C7]">{s.rollNumber}</td>
                  <td className="py-3 px-3 font-semibold text-[#0A192F] font-sans">{s.name}</td>
                  <td className="py-3 px-3 font-sans">{s.department}</td>
                  <td className="py-3 px-3 font-sans">{s.year} · {s.semester}</td>
                  <td className="py-3 px-3 text-right font-bold">
                    <span className={s.overallAttendance < collegeConfig.minAttendanceThreshold ? 'text-red-600' : 'text-emerald-700'}>
                      {s.overallAttendance}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold">{s.cgpa}</td>
                  <td className="py-3 px-3 font-sans font-semibold">
                    <span
                      className={
                        s.status === 'Active'
                          ? 'text-emerald-700'
                          : s.status === 'Pending Approval'
                          ? 'text-amber-700'
                          : 'text-red-600'
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {s.status === 'Pending Approval' && (
                      <button
                        onClick={() => onApproveStudent(s.id)}
                        className="px-2.5 py-1 bg-emerald-600 text-white font-semibold rounded cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteStudent(s.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded hover:bg-red-100 cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 43: FACULTY MANAGEMENT PAGE
  if (screen === 'faculty-mgmt') {
    const filteredFac = facultyList.filter(
      (f) =>
        f.name.toLowerCase().includes(facMgmtSearch.toLowerCase()) ||
        f.department.toLowerCase().includes(facMgmtSearch.toLowerCase())
    );

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #43 · Faculty HR & Academic Workload Administration
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Faculty Management Console ({facultyList.length} Professors)
            </h1>
          </div>
          <button
            onClick={() => onNavigate('faculty-register')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
          >
            + Onboard Faculty Member
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs">
          <input
            type="text"
            value={facMgmtSearch}
            onChange={(e) => setFacMgmtSearch(e.target.value)}
            placeholder="Filter faculty by name or department..."
            className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-3 font-semibold">Faculty Name</th>
                <th className="py-3 px-3 font-semibold">Designation</th>
                <th className="py-3 px-3 font-semibold">Department</th>
                <th className="py-3 px-3 font-semibold">Qualifications</th>
                <th className="py-3 px-3 font-semibold text-right">Experience</th>
                <th className="py-3 px-3 font-semibold">Cabin</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFac.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-[#0A192F]">{f.name}</td>
                  <td className="py-3 px-3 text-[#0284C7] font-semibold">{f.designation}</td>
                  <td className="py-3 px-3 font-semibold">{f.department}</td>
                  <td className="py-3 px-3 text-slate-600">{f.qualifications}</td>
                  <td className="py-3 px-3 text-right tabular-nums">{f.experienceYears} Yrs</td>
                  <td className="py-3 px-3 text-slate-600">{f.officeLocation}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onDeleteFaculty(f.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded hover:bg-red-100 cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 44: DEPARTMENT MANAGEMENT PAGE
  if (screen === 'department-mgmt') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #44 · Institutional Department & Intake Administration
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Manage 7 Accredited Engineering Departments
            </h1>
          </div>
          <button
            onClick={() => onNavigate('department-listing')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
          >
            View Public Department Pages →
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-3 font-semibold">Code</th>
                <th className="py-3 px-3 font-semibold">Full Department Title</th>
                <th className="py-3 px-3 font-semibold">Head of Department</th>
                <th className="py-3 px-3 font-semibold text-right">Sanctioned Students</th>
                <th className="py-3 px-3 font-semibold text-right">Faculty</th>
                <th className="py-3 px-3 font-semibold text-right">Labs</th>
                <th className="py-3 px-3 font-semibold">Contact Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-[#0284C7] font-sans">{d.code}</td>
                  <td className="py-3 px-3 font-semibold text-[#0A192F] font-sans">{d.name}</td>
                  <td className="py-3 px-3 font-sans">{d.hodName}</td>
                  <td className="py-3 px-3 text-right">{d.studentCount}</td>
                  <td className="py-3 px-3 text-right">{d.facultyCount}</td>
                  <td className="py-3 px-3 text-right">{d.labsCount}</td>
                  <td className="py-3 px-3 font-sans text-slate-600">{d.contactRoom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 45: ACADEMIC RESOURCE MANAGEMENT PAGE
  if (screen === 'academic-resource-mgmt') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #45 · Unified Academic Resource & LMS Content Governance
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Audit Study Materials ({studyMaterials.length}) & Recorded Videos ({videos.length})
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('faculty-upload-notes')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
            >
              + Upload Notes
            </button>
            <button
              onClick={() => onNavigate('faculty-video-mgmt')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg cursor-pointer"
            >
              + Add Video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">PDF Study Materials & Manuals</h2>
            {studyMaterials.map((m) => (
              <div key={m.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-[#0A192F]">{m.title}</div>
                  <div className="text-slate-500 mt-0.5 tabular-nums">
                    {m.subjectCode} · {m.department} · By {m.facultyName}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteMaterial(m.id)}
                  className="px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">Lecture Capture Videos</h2>
            {videos.map((v) => (
              <div key={v.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-[#0A192F]">{v.title}</div>
                  <div className="text-slate-500 mt-0.5 tabular-nums">
                    {v.subject} · {v.duration} · By {v.facultyName}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteVideo(v.id)}
                  className="px-2.5 py-1 bg-red-50 text-red-700 font-semibold rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 46: USER MANAGEMENT AND PERMISSIONS
  if (screen === 'user-permissions-mgmt') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            Screen #46 · Role-Based Access Control (RBAC) & Security Audit Matrix
          </div>
          <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
            Portal Roles, Module Permissions & Audit Trail
          </h1>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-4 font-semibold">System Capability / Security Policy</th>
                <th className="py-3 px-4 font-semibold text-center">Student</th>
                <th className="py-3 px-4 font-semibold text-center">Faculty</th>
                <th className="py-3 px-4 font-semibold text-center">Principal</th>
                <th className="py-3 px-4 font-semibold text-center">Administrator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {roleMatrix.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-semibold text-[#0A192F]">{row.permission}</td>
                  {(['student', 'faculty', 'principal', 'admin'] as const).map((r) => (
                    <td key={r} className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={row[r]}
                        onChange={() => {
                          const updated = [...roleMatrix];
                          updated[idx] = { ...updated[idx], [r]: !updated[idx][r] };
                          setRoleMatrix(updated);
                        }}
                        className="rounded border-slate-300 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 47: REPORTS AND ANALYTICS PAGE
  if (screen === 'reports-analytics') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #47 · Institutional Intelligence, NAAC/NBA Metrics & Placement Analytics
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              {collegeConfig.collegeName} — Annual Academic & Placement Report (2026)
            </h1>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg flex items-center gap-1.5 cursor-pointer no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Annual Report PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">Department-Wise Placement Ratio (2026 Graduating Batch)</h2>
            <div className="space-y-3 tabular-nums text-xs">
              {departments.map((d) => {
                const numericPct = parseFloat(d.placementRate) || 92;
                return (
                  <div key={d.id} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-800">{d.code} ({d.studentCount} Students)</span>
                      <span className="font-bold text-emerald-700">{d.placementRate} Placed</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0284C7] rounded-full" style={{ width: `${numericPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">Research Publications & Grant Outlay by Department</h2>
            <div className="space-y-3 tabular-nums text-xs">
              {departments.map((d) => (
                <div key={d.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-[#0A192F]">{d.code}</span>
                  <span className="text-slate-600">{d.facultyCount} Faculty · {d.labsCount} Labs</span>
                  <span className="font-bold text-[#0284C7]">{d.publicationsCount} Indexed Papers</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 48: USER SETTINGS & COLLEGE PLACEHOLDERS EDITOR PAGE
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCollegeConfig({
      ...collegeConfig,
      collegeName: cfgName,
      affiliatedUniversity: cfgUni,
      collegeAddress: cfgAddr,
      principalName: cfgPrincipal,
      minAttendanceThreshold: Number(cfgThreshold) || 75,
    });
    setSettingsSaved(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #48 · Account Preferences & Editable College Placeholders
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Institutional Placeholders, Security & Notification Settings
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg shrink-0 cursor-pointer"
          >
            Sign Out of Portal
          </button>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#0A192F]">
              1. Editable College Placeholders (Updates Header, Footer & All 48 Screens Live)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">College Name Placeholder</label>
                <input
                  type="text"
                  value={cfgName}
                  onChange={(e) => setCfgName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Affiliated University Placeholder</label>
                <input
                  type="text"
                  value={cfgUni}
                  onChange={(e) => setCfgUni(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Principal Name Placeholder</label>
                <input
                  type="text"
                  value={cfgPrincipal}
                  onChange={(e) => setCfgPrincipal(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Minimum Attendance Threshold (%)</label>
                <input
                  type="number"
                  value={cfgThreshold}
                  onChange={(e) => setCfgThreshold(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg tabular-nums font-bold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">College Address Placeholder</label>
                <input
                  type="text"
                  value={cfgAddr}
                  onChange={(e) => setCfgAddr(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h2 className="text-sm font-bold text-[#0A192F]">2. Portal Notification & Alert Preferences</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
              <span>Receive instant email alerts for Examination Timetables, Results, and Priority Circulars</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
              />
              <span>Receive SMS alerts if subject-wise attendance drops below {cfgThreshold}%</span>
            </label>
          </div>

          {settingsSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold">
              College placeholders and account settings saved and applied across all 48 screens!
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => onNavigate('reset-password')}
              className="px-4 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg cursor-pointer"
            >
              Change Portal Password
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Save Institutional & Account Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
