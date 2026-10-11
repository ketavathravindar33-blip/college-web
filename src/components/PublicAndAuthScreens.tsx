import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserPlus,
  Users,
  Award,
  Briefcase,
} from 'lucide-react';
import {
  AnnouncementItem,
  CollegeConfig,
  DepartmentCode,
  DepartmentInfo,
  FacultyMember,
  InfrastructureFacility,
  ScreenId,
  StudentRecord,
  UserRole,
} from '../types/campus';
import { CAMPUS_IMAGES } from '../data/mockCampusData';

interface PublicAndAuthProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  departments: DepartmentInfo[];
  facilities: InfrastructureFacility[];
  announcements: AnnouncementItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectDepartment: (dept: DepartmentInfo) => void;
  onSelectFacility: (fac: InfrastructureFacility) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onLoginSuccess: (role: UserRole) => void;
  onRegisterStudent: (student: StudentRecord) => void;
  onRegisterFaculty: (faculty: FacultyMember) => void;
}

export const PublicAndAuthScreens: React.FC<PublicAndAuthProps> = ({
  screen,
  collegeConfig,
  departments,
  facilities,
  announcements,
  onNavigate,
  onSelectDepartment,
  onSelectFacility,
  onSelectAnnouncement,
  onLoginSuccess,
  onRegisterStudent,
  onRegisterFaculty,
}) => {
  // Login state
  const [loginId, setLoginId] = useState('24CSE1018');
  const [loginPassword, setLoginPassword] = useState('SmartCampus@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // Forgot & Reset Password state
  const [recoveryEmail, setRecoveryEmail] = useState('aarav.sharma24@smartcampus.edu.in');
  const [recoverySent, setRecoverySent] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [resetDone, setResetDone] = useState(false);

  // Student Registration state
  const [stuName, setStuName] = useState('');
  const [stuRoll, setStuRoll] = useState('');
  const [stuEmail, setStuEmail] = useState('');
  const [stuPhone, setStuPhone] = useState('');
  const [stuDob, setStuDob] = useState('2006-05-15');
  const [stuGender, setStuGender] = useState('Male');
  const [stuDept, setStuDept] = useState<DepartmentCode>('CSE');
  const [stuCourse, setStuCourse] = useState('B.Tech');
  const [stuYear, setStuYear] = useState('1st Year');
  const [stuSemester, setStuSemester] = useState('Semester I');
  const [stuSection, setStuSection] = useState('Section A');
  const [stuAdmYear, setStuAdmYear] = useState('2026');
  const [stuPass, setStuPass] = useState('');
  const [stuConfirmPass, setStuConfirmPass] = useState('');
  const [stuTerms, setStuTerms] = useState(false);
  const [stuRegError, setStuRegError] = useState('');

  // Faculty Registration state
  const [facName, setFacName] = useState('');
  const [facDesignation, setFacDesignation] = useState('Assistant Professor');
  const [facDept, setFacDept] = useState<DepartmentCode>('CSE (AI & ML)');
  const [facQual, setFacQual] = useState('Ph.D. in Computer Science');
  const [facSpec, setFacSpec] = useState('Machine Learning & Systems');
  const [facExp, setFacExp] = useState('6');
  const [facEmail, setFacEmail] = useState('');
  const [facOffice, setFacOffice] = useState('Innovation Block, Room 210');
  const [facRegError, setFacRegError] = useState('');

  // SCREEN 1: PUBLIC HOME PAGE
  if (screen === 'public-home') {
    return (
      <div className="space-y-16 pb-12">
        {/* HERO SECTION */}
        <section className="relative bg-[#0A192F] text-white overflow-hidden border-b border-slate-800">
          <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-medium">
                <span>Affiliated to {collegeConfig.affiliatedUniversity}</span>
                <span>·</span>
                <span>{collegeConfig.naacGrade}</span>
                <span>·</span>
                <span>Est. {collegeConfig.establishedYear}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                Engineering Excellence & Frontier Research at {collegeConfig.collegeName}
              </h1>

              <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
                Welcome to Smart Campus — an integrated academic, research, and digital learning ecosystem empowering 3,420+ undergraduate, postgraduate, and doctoral scholars across 7 premier engineering disciplines.
              </p>

              {/* 3 Required Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('student-register')}
                  className="px-5 py-3 text-sm font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Apply Now / Student Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('department-listing')}
                  className="px-5 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore 7 Departments
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-5 py-3 text-sm font-semibold text-sky-300 hover:text-white border border-sky-400/40 hover:border-sky-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Student & Faculty Login
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
                <div>
                  <div className="text-slate-400">Campus Location</div>
                  <div className="font-semibold text-white mt-0.5 truncate">{collegeConfig.collegeAddress}</div>
                </div>
                <div>
                  <div className="text-slate-400">Principal</div>
                  <div className="font-semibold text-white mt-0.5 truncate">{collegeConfig.principalName}</div>
                </div>
                <div>
                  <div className="text-slate-400">Admissions Helpline</div>
                  <div className="font-semibold text-white mt-0.5 tabular-nums">{collegeConfig.phone}</div>
                </div>
                <div>
                  <div className="text-slate-400">Attendance Standard</div>
                  <div className="font-semibold text-sky-300 mt-0.5 tabular-nums">Min. {collegeConfig.minAttendanceThreshold}% Required</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 h-full min-h-[320px]">
                <img
                  src={CAMPUS_IMAGES.campus}
                  alt="Smart Campus Main Building"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <div className="text-xs text-sky-300 font-medium">Main Academic Quadrangle · 65-Acre Eco Campus</div>
                  <div className="text-base font-bold text-white mt-1">
                    {collegeConfig.collegeName} — Central Innovation Complex
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-METRIC INSTITUTIONAL STATISTICS STRIP */}
          <div className="bg-slate-900/90 border-t border-slate-800">
            <div className="max-w-[1440px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">3,420+</div>
                <div className="text-xs text-slate-400 mt-1">Enrolled Student Strength</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">210+</div>
                <div className="text-xs text-slate-400 mt-1">Ph.D. Faculty Members</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">07</div>
                <div className="text-xs text-slate-400 mt-1">Engineering Departments</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">95.4%</div>
                <div className="text-xs text-slate-400 mt-1">Campus Placement Ratio (2026)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">818+</div>
                <div className="text-xs text-slate-400 mt-1">Scopus & IEEE Publications</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED 7 ENGINEERING DEPARTMENTS */}
        <section className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                01. Academic Schools & Programs
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] mt-1">
                Seven Accredited Engineering Departments
              </h2>
            </div>
            <button
              onClick={() => onNavigate('department-listing')}
              className="text-xs font-semibold text-[#0284C7] hover:text-[#0A192F] flex items-center gap-1 cursor-pointer"
            >
              <span>View Complete Department Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {departments.map((dept, idx) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0284C7] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                    <span>0{idx + 1}. {dept.code}</span>
                    <span>Placement: {dept.placementRate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A192F] mt-2">{dept.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dept.shortDesc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums mb-4">
                    <span>{dept.studentCount} Students</span>
                    <span>·</span>
                    <span>{dept.facultyCount} Faculty</span>
                    <span>·</span>
                    <span>{dept.labsCount} Labs</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectDepartment(dept);
                      onNavigate('department-detail');
                    }}
                    className="w-full py-2 px-4 text-xs font-semibold text-[#0A192F] bg-slate-100 hover:bg-[#0A192F] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore {dept.code} Curriculum & Labs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST ANNOUNCEMENTS + UPCOMING ACADEMIC EVENTS */}
        <section className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                  02. Official Circulars & Notices
                </div>
                <h2 className="text-xl font-bold text-[#0A192F] mt-0.5">
                  Latest Announcements & College News
                </h2>
              </div>
              <button
                onClick={() => onNavigate('announcements-listing')}
                className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
              >
                All Notices ({announcements.length})
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {announcements.slice(0, 5).map((ann) => (
                <div key={ann.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
                      <span className="font-semibold text-[#0284C7]">{ann.category}</span>
                      <span>·</span>
                      <span>{ann.department}</span>
                      <span>·</span>
                      <span>Published {ann.publishDate}</span>
                      {ann.important && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700 font-semibold">Priority Circular</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        onSelectAnnouncement(ann);
                        onNavigate('announcement-details');
                      }}
                      className="text-sm font-bold text-[#0A192F] hover:text-[#0284C7] text-left transition-colors cursor-pointer"
                    >
                      {ann.title}
                    </button>
                    <p className="text-xs text-slate-600 line-clamp-1">{ann.summary}</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectAnnouncement(ann);
                      onNavigate('announcement-details');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    Read Notice
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING EVENTS & STUDENT ACHIEVEMENTS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                    03. Academic Calendar & Activities
                  </div>
                  <h2 className="text-xl font-bold text-[#0A192F] mt-0.5">
                    Upcoming Campus Events
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('academic-calendar')}
                  className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
                >
                  Full Calendar
                </button>
              </div>

              <div className="space-y-4 mt-4">
                {[
                  { date: 'OCT 18', title: 'Cloud-Native Microservices & Service Mesh Symposium', venue: 'Seminar Hall 1 · CSE Dept' },
                  { date: 'OCT 24', title: 'Super-Dream Tier-1 Semiconductor & Cloud Placement Drive', venue: 'Central Computer Center' },
                  { date: 'OCT 25', title: 'PRAGYAN 2026 — 36-Hour National AI & Robotics Hackathon', venue: 'Innovation Block & Main Auditorium' },
                  { date: 'NOV 16', title: 'Commencement of Odd Semester End-Term Theory Examinations', venue: 'All Academic Blocks' },
                ].map((ev, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="px-3 py-2 bg-[#0A192F] text-white rounded-lg text-center shrink-0 tabular-nums">
                      <div className="text-xs font-bold">{ev.date}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A192F]">{ev.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{ev.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement & Achievement Highlight Box */}
            <div className="bg-[#0A192F] text-white rounded-xl p-6 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Student Achievements & Placements (2026 Batch)
              </div>
              <h3 className="text-lg font-bold mt-1">
                Highest Package ₹ 42.0 LPA · Median ₹ 9.4 LPA Across 145+ Recruiters
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Smart India Hackathon Grand Winners (CSE), SAE BAJA Overall Endurance Champions (Mechanical), and India Semiconductor Mission C2S Silicon Tape-Out Awardees (ECE).
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Training & Placement Directorate</span>
                <button
                  onClick={() => onNavigate('research-portal')}
                  className="text-sky-300 hover:text-white font-semibold cursor-pointer"
                >
                  View Research & Awards →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPAL'S MESSAGE SECTION */}
        <section className="max-w-[1440px] mx-auto px-6">
          <div className="bg-white rounded-xl border border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="w-48 h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img
                  src={CAMPUS_IMAGES.principal}
                  alt={collegeConfig.principalName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <div className="text-base font-bold text-[#0A192F]">{collegeConfig.principalName}</div>
                <div className="text-xs text-slate-600 mt-0.5">{collegeConfig.principalTitle}</div>
                <div className="text-xs text-[#0284C7] mt-1 font-medium">Office: Principal’s Secretariat, Main Block</div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                04. Message from the Principal’s Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">
                “Cultivating Engineers Who Build Resilient, Ethical, and Sovereign Technologies”
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                At {collegeConfig.collegeName}, affiliated to {collegeConfig.affiliatedUniversity}, our academic philosophy unites foundational engineering rigor with hands-on research in Artificial Intelligence, Semiconductor VLSI, Sustainable Energy, and Smart Civil Infrastructure. Through our Smart Campus digital learning portal, every student has transparent, real-time access to attendance records, peer-reviewed lecture notes, laboratory manuals, and faculty mentorship.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('principal-profile')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Read Full Principal’s Profile & Vision
                </button>
                <button
                  onClick={() => onNavigate('about-college')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  About the Institution
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE HIGHLIGHTS & CAMPUS GALLERY PREVIEW */}
        <section className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                05. World-Class Laboratories & Amenities
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] mt-1">
                22 Dedicated Campus Infrastructure Facilities
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('campus-gallery')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Open Campus Photo Gallery
              </button>
              <button
                onClick={() => onNavigate('infrastructure-overview')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg cursor-pointer"
              >
                Explore All 22 Facilities →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {facilities.slice(2, 6).map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={CAMPUS_IMAGES[fac.imageKey]}
                      alt={fac.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-[#0284C7] font-semibold">
                      Facility #{fac.number} · {fac.category}
                    </div>
                    <h3 className="text-base font-bold text-[#0A192F] mt-1">{fac.name}</h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3">{fac.shortDesc}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectFacility(fac);
                      onNavigate('infrastructure-detail');
                    }}
                    className="text-xs font-semibold text-[#0A192F] hover:text-[#0284C7] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Equipment & Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT & CAMPUS LOCATION STRIP */}
        <section className="max-w-[1440px] mx-auto px-6">
          <div className="bg-white rounded-xl border border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                06. Admissions & Campus Directorate
              </div>
              <h2 className="text-2xl font-bold text-[#0A192F]">
                Visit {collegeConfig.collegeName}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Address: {collegeConfig.collegeAddress} · Affiliated to {collegeConfig.affiliatedUniversity}.
                Direct enquiries to the Admissions Cell or submit feedback online.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Official Email</div>
                  <div className="font-semibold text-[#0A192F] mt-1">{collegeConfig.email}</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Central Reception</div>
                  <div className="font-semibold text-[#0A192F] mt-1 tabular-nums">{collegeConfig.phone}</div>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Working Hours</div>
                  <div className="font-semibold text-[#0A192F] mt-1">Mon–Sat · 08:30 AM – 05:30 PM</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start lg:items-end gap-3">
              <button
                onClick={() => onNavigate('contact-feedback')}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Open Interactive Contact & Feedback Portal
              </button>
              <button
                onClick={() => onNavigate('faculty-directory')}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Browse Department & Faculty Directory
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // SCREEN 2: ABOUT COLLEGE PAGE
  if (screen === 'about-college') {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-10 space-y-10">
        <div className="bg-[#0A192F] text-white rounded-xl p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs text-sky-300 font-semibold uppercase tracking-wider">
              Screen #2 · Institutional Heritage, Governance & Accreditation
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              About {collegeConfig.collegeName}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Established in {collegeConfig.establishedYear} and permanently affiliated to {collegeConfig.affiliatedUniversity}, {collegeConfig.collegeName} is an autonomous premier engineering institution situated at {collegeConfig.collegeAddress}.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-sky-200 pt-2">
              <span>{collegeConfig.naacGrade}</span>
              <span>·</span>
              <span>NBA Accredited Tier-1 Programs</span>
              <span>·</span>
              <span>AICTE & UGC 2(f) & 12(B) Recognized</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={CAMPUS_IMAGES.campus}
              alt="College Campus"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover rounded-lg border border-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">Institutional Vision</div>
            <h2 className="text-xl font-bold text-[#0A192F]">
              Global Leadership in Engineering Education & Societal Innovation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To emerge as a citadel of technical education, interdisciplinary scientific inquiry, and industrial entrepreneurship that empowers graduates to solve complex global challenges with integrity.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">Institutional Mission</div>
            <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
              <li>Deliver outcome-based engineering curricula aligned with global semiconductor, AI, and sustainable infrastructure demands.</li>
              <li>Sustain advanced research centers funded by DRDO, ISRO, ICMR, DST, and industry partners.</li>
              <li>Ensure inclusive, transparent governance through the Smart Campus ERP & LMS platform.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#0A192F] mb-4">Statutory Governance & Academic Leadership</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-4 font-semibold">Statutory Office</th>
                  <th className="py-3 px-4 font-semibold">Incumbent Officer</th>
                  <th className="py-3 px-4 font-semibold">Portfolio & Jurisdiction</th>
                  <th className="py-3 px-4 font-semibold">Official Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A192F]">Principal & Chief Academic Executive</td>
                  <td className="py-3 px-4">{collegeConfig.principalName}</td>
                  <td className="py-3 px-4">Academic Senate, Governance, AICTE/University Liaison</td>
                  <td className="py-3 px-4 tabular-nums">principal@smartcampus.edu.in</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A192F]">Dean — Academics & Curriculum</td>
                  <td className="py-3 px-4">Dr. Aravind Swaminathan</td>
                  <td className="py-3 px-4">R24 Regulations, BoS, Attendance & Timetable Audits</td>
                  <td className="py-3 px-4 tabular-nums">dean.academics@smartcampus.edu.in</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A192F]">Dean — Research & Consultancy</td>
                  <td className="py-3 px-4">Dr. Meenakshi Sundaram</td>
                  <td className="py-3 px-4">Sponsored Grants, IPR & Patents, Doctoral Supervision</td>
                  <td className="py-3 px-4 tabular-nums">dean.research@smartcampus.edu.in</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#0A192F]">Controller of Examinations</td>
                  <td className="py-3 px-4">Prof. K. Subba Rao</td>
                  <td className="py-3 px-4">End-Semester Assessments, SGPA/CGPA Transcripts</td>
                  <td className="py-3 px-4 tabular-nums">coe@smartcampus.edu.in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 3: LOGIN PAGE
  if (screen === 'login') {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!loginId.trim() || !loginPassword.trim()) {
        setLoginStatus('error');
        setLoginErrorMsg('Please enter both your institutional ID/Email and password.');
        return;
      }
      setLoginStatus('loading');
      setTimeout(() => {
        setLoginStatus('success');
        onLoginSuccess(selectedRole);
      }, 350);
    };

    return (
      <div className="max-w-[1440px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-6 bg-[#0A192F] text-white rounded-xl p-8 flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-5 h-5" />
              <span>Smart Campus Unified Authentication</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight">
              Sign In to {collegeConfig.collegeName} Digital Portal
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Affiliated to {collegeConfig.affiliatedUniversity}. Select your role below to access personalized attendance analytics, subject notes, lecture videos, examination results, and administrative controls.
            </p>
          </div>

          <div className="my-6 rounded-lg overflow-hidden border border-slate-700 h-56">
            <img
              src={CAMPUS_IMAGES.library}
              alt="Central Library"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-4 border-t border-slate-800">
            <div>
              <div className="font-semibold text-white">Demo Student Credentials</div>
              <div className="text-slate-400 tabular-nums mt-0.5">ID: 24CSE1018 · Role: Student</div>
            </div>
            <div>
              <div className="font-semibold text-white">Demo Faculty / Admin</div>
              <div className="text-slate-400 tabular-nums mt-0.5">Switch Role Pill & Click Login</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">Screen #3 · Role-Based Portal Login</div>
              <h2 className="text-2xl font-bold text-[#0A192F] mt-1">Institutional Sign In</h2>
            </div>

            {/* Role Selection (Student, Faculty, Principal, Administrator) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                1. Select Portal Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                {(
                  [
                    { id: 'student', label: 'Student' },
                    { id: 'faculty', label: 'Faculty' },
                    { id: 'principal', label: 'Principal' },
                    { id: 'admin', label: 'Administrator' },
                  ] as { id: UserRole; label: string }[]
                ).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.id);
                      if (r.id === 'student') setLoginId('24CSE1018');
                      if (r.id === 'faculty') setLoginId('aravind.s@smartcampus.edu.in');
                      if (r.id === 'principal') setLoginId('principal@smartcampus.edu.in');
                      if (r.id === 'admin') setLoginId('admin.erp@smartcampus.edu.in');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      selectedRole === r.id
                        ? 'bg-[#0A192F] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. Email Address, Username, or Roll / Employee ID
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="e.g. 24CSE1018 or email@smartcampus.edu.in"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3. Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your portal password"
                    className="w-full px-3.5 py-2.5 pr-10 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0284C7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span>Remember Me on this workstation</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="font-semibold text-[#0284C7] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {loginStatus === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {loginErrorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loginStatus === 'loading'}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {loginStatus === 'loading'
                  ? 'Authenticating Credentials...'
                  : `Sign In as ${selectedRole.toUpperCase()}`}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <span>New to {collegeConfig.collegeName}?</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('student-register')}
                  className="font-semibold text-[#0284C7] hover:underline cursor-pointer"
                >
                  Register as Student
                </button>
                <span>·</span>
                <button
                  onClick={() => onNavigate('faculty-register')}
                  className="font-semibold text-[#0A192F] hover:underline cursor-pointer"
                >
                  Faculty Onboarding
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 4: FORGOT PASSWORD PAGE
  if (screen === 'forgot-password') {
    return (
      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #4 · Account Recovery
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-1">
              Forgot Your Smart Campus Password?
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Enter your institutional email address or Student Roll Number to receive a verification OTP and password reset link.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Email or Roll Number
              </label>
              <input
                type="text"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            {recoverySent && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
                <div className="font-bold">Recovery Dispatch Successful</div>
                <p>
                  A 6-digit verification token has been sent to <span className="font-semibold">{recoveryEmail}</span>. Proceed to the Password Reset screen to set a new password.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setRecoverySent(true)}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Send Recovery Link
              </button>
              <button
                onClick={() => onNavigate('reset-password')}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg cursor-pointer"
              >
                Proceed to Reset Password →
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs">
            <button onClick={() => onNavigate('login')} className="text-slate-600 hover:text-slate-900 cursor-pointer">
              ← Return to Login Screen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 5: RESET PASSWORD PAGE
  if (screen === 'reset-password') {
    return (
      <div className="max-w-xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #5 · Credential Security Update
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-1">
              Create New Institutional Password
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Must contain at least 8 characters, one uppercase letter, and one numerical digit.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Verification Token (OTP)</label>
              <input
                type="text"
                defaultValue="849-204"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            {resetDone && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                Password updated! You can now sign in with your new credentials.
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setResetDone(true)}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Update Password
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 6: STUDENT REGISTRATION PAGE
  if (screen === 'student-register') {
    const handleStudentReg = (e: React.FormEvent) => {
      e.preventDefault();
      if (!stuName.trim() || !stuRoll.trim() || !stuEmail.trim()) {
        setStuRegError('Full Name, Roll Number, and Institutional Email are required.');
        return;
      }
      if (stuPass !== stuConfirmPass) {
        setStuRegError('Password and Confirm Password do not match.');
        return;
      }
      if (!stuTerms) {
        setStuRegError('Please accept the college academic regulations and terms.');
        return;
      }
      const newStudent: StudentRecord = {
        id: `stu-${Date.now()}`,
        rollNumber: stuRoll.toUpperCase(),
        name: stuName,
        email: stuEmail,
        phone: stuPhone || '+91 98450 00000',
        dob: stuDob,
        gender: stuGender,
        department: stuDept,
        course: stuCourse,
        year: stuYear,
        semester: stuSemester,
        section: stuSection,
        admissionYear: stuAdmYear,
        overallAttendance: 100,
        cgpa: 0,
        sgpa: 0,
        status: 'Pending Approval',
      };
      onRegisterStudent(newStudent);
      onNavigate('register-success');
    };

    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                Screen #6 · New Student Enrollment
              </div>
              <h1 className="text-2xl font-bold text-[#0A192F] mt-1">
                Student Portal Registration Form
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                {collegeConfig.collegeName} · Affiliated to {collegeConfig.affiliatedUniversity}
              </p>
            </div>
            <button
              onClick={() => onNavigate('faculty-register')}
              className="px-3.5 py-2 text-xs font-semibold text-[#0A192F] bg-slate-100 hover:bg-slate-200 rounded-lg shrink-0 cursor-pointer"
            >
              Switch to Faculty Registration →
            </button>
          </div>

          <form onSubmit={handleStudentReg} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">1. Full Name *</label>
                <input
                  type="text"
                  value={stuName}
                  onChange={(e) => setStuName(e.target.value)}
                  placeholder="e.g. Siddharth Nair"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">2. Student ID / Roll Number *</label>
                <input
                  type="text"
                  value={stuRoll}
                  onChange={(e) => setStuRoll(e.target.value)}
                  placeholder="e.g. 26CSE1095"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3. Institutional Email Address *</label>
                <input
                  type="email"
                  value={stuEmail}
                  onChange={(e) => setStuEmail(e.target.value)}
                  placeholder="name@smartcampus.edu.in"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">4. Mobile Number</label>
                <input
                  type="tel"
                  value={stuPhone}
                  onChange={(e) => setStuPhone(e.target.value)}
                  placeholder="+91 98450 12345"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">5. Date of Birth</label>
                <input
                  type="date"
                  value={stuDob}
                  onChange={(e) => setStuDob(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">6. Gender</label>
                <select
                  value={stuGender}
                  onChange={(e) => setStuGender(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary / Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">7. Engineering Department</label>
                <select
                  value={stuDept}
                  onChange={(e) => setStuDept(e.target.value as DepartmentCode)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="CSE">CSE</option>
                  <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                  <option value="CSE (Data Science)">CSE (Data Science)</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">8. Course & Degree</label>
                <select
                  value={stuCourse}
                  onChange={(e) => setStuCourse(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>B.Tech</option>
                  <option>M.Tech</option>
                  <option>Ph.D. Scholar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">9. Academic Year</label>
                <select
                  value={stuYear}
                  onChange={(e) => setStuYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">10. Current Semester</label>
                <select
                  value={stuSemester}
                  onChange={(e) => setStuSemester(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>Semester I</option>
                  <option>Semester III</option>
                  <option>Semester V</option>
                  <option>Semester VII</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">11. Section</label>
                <select
                  value={stuSection}
                  onChange={(e) => setStuSection(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>Section A</option>
                  <option>Section B</option>
                  <option>Section C</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">12. Admission Year</label>
                <input
                  type="text"
                  value={stuAdmYear}
                  onChange={(e) => setStuAdmYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">13. Portal Password</label>
                <input
                  type="password"
                  value={stuPass}
                  onChange={(e) => setStuPass(e.target.value)}
                  placeholder="Create password"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">14. Confirm Password</label>
                <input
                  type="password"
                  value={stuConfirmPass}
                  onChange={(e) => setStuConfirmPass(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">15. Upload Passport Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={stuTerms}
                onChange={(e) => setStuTerms(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>
                I solemnly affirm that the academic particulars provided above are true and I agree to abide by the minimum {collegeConfig.minAttendanceThreshold}% attendance regulation of {collegeConfig.collegeName}.
              </span>
            </label>

            {stuRegError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {stuRegError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Already Registered? Login
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Complete Student Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // SCREEN 7: FACULTY REGISTRATION PAGE
  if (screen === 'faculty-register') {
    const handleFacultyReg = (e: React.FormEvent) => {
      e.preventDefault();
      if (!facName.trim() || !facEmail.trim()) {
        setFacRegError('Full Name and Official Institutional Email are mandatory.');
        return;
      }
      const newFac: FacultyMember = {
        id: `fac-${Date.now()}`,
        name: facName,
        designation: facDesignation,
        department: facDept,
        qualifications: facQual,
        specialization: facSpec,
        experienceYears: Number(facExp) || 5,
        researchInterests: [facSpec, 'Outcome-Based Engineering Education'],
        publications: [{ title: 'Recent Advances in Engineering Systems', journal: 'IEEE Access', year: 2026 }],
        email: facEmail,
        officeLocation: facOffice,
        officeHours: 'Mon–Thu · 03:00 PM – 04:30 PM',
        coursesTaught: ['Core Departmental Subject'],
        avatarInitials: facName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        timetable: [],
      };
      onRegisterFaculty(newFac);
      onNavigate('register-success');
    };

    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                Screen #7 · Faculty Directorate Onboarding
              </div>
              <h1 className="text-2xl font-bold text-[#0A192F] mt-1">
                Faculty Registration & Profile Provisioning
              </h1>
            </div>
            <button
              onClick={() => onNavigate('student-register')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
            >
              ← Student Registration
            </button>
          </div>

          <form onSubmit={handleFacultyReg} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name with Salutation *</label>
                <input
                  type="text"
                  value={facName}
                  onChange={(e) => setFacName(e.target.value)}
                  placeholder="e.g. Dr. Raghavendra Kulkarni"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Designation</label>
                <select
                  value={facDesignation}
                  onChange={(e) => setFacDesignation(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>Professor & HOD</option>
                  <option>Professor</option>
                  <option>Associate Professor</option>
                  <option>Assistant Professor</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={facDept}
                  onChange={(e) => setFacDept(e.target.value as DepartmentCode)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="CSE">CSE</option>
                  <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                  <option value="CSE (Data Science)">CSE (Data Science)</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Highest Qualification & University</label>
                <input
                  type="text"
                  value={facQual}
                  onChange={(e) => setFacQual(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Area of Specialization</label>
                <input
                  type="text"
                  value={facSpec}
                  onChange={(e) => setFacSpec(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teaching & Research Experience (Years)</label>
                <input
                  type="number"
                  value={facExp}
                  onChange={(e) => setFacExp(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Institutional Email *</label>
                <input
                  type="email"
                  value={facEmail}
                  onChange={(e) => setFacEmail(e.target.value)}
                  placeholder="faculty.name@smartcampus.edu.in"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cabin / Office Location</label>
                <input
                  type="text"
                  value={facOffice}
                  onChange={(e) => setFacOffice(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {facRegError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {facRegError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Submit Faculty Onboarding Record
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // SCREEN 8: REGISTRATION SUCCESS PAGE
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
          Screen #8 · Enrollment Confirmed
        </div>
        <h1 className="text-2xl font-bold text-[#0A192F]">
          Registration Application Submitted Successfully
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your credentials have been recorded in the {collegeConfig.collegeName} ERP Registry and routed to the Administrator Dashboard for verification. You can immediately sign in or explore your role dashboard.
        </p>
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 tabular-nums">
          Application Reference ID: SC-REG-2026-8941 · Status: Active & Ready
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('login')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Proceed to Portal Login
          </button>
          <button
            onClick={() => onNavigate('student-dashboard')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg cursor-pointer"
          >
            Open Student Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
