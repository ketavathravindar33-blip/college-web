import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  AnnouncementItem,
  CollegeConfig,
  DepartmentCode,
  DepartmentInfo,
  FacultyMember,
  ResearchProject,
  ScreenId,
  StudyMaterial,
} from '../types/campus';
import { CAMPUS_IMAGES } from '../data/mockCampusData';

interface AcademicsAndResearchProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  facultyList: FacultyMember[];
  selectedFaculty: FacultyMember;
  departments: DepartmentInfo[];
  selectedDepartment: DepartmentInfo;
  researchProjects: ResearchProject[];
  selectedProject: ResearchProject;
  studyMaterials: StudyMaterial[];
  announcements: AnnouncementItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectFaculty: (fac: FacultyMember) => void;
  onSelectDepartment: (dept: DepartmentInfo) => void;
  onSelectProject: (proj: ResearchProject) => void;
  onSelectMaterial: (mat: StudyMaterial) => void;
  onAddResearchProject: (proj: ResearchProject) => void;
}

export const AcademicsAndResearchScreens: React.FC<AcademicsAndResearchProps> = ({
  screen,
  collegeConfig,
  facultyList,
  selectedFaculty,
  departments,
  selectedDepartment,
  researchProjects,
  selectedProject,
  studyMaterials,
  announcements,
  onNavigate,
  onSelectFaculty,
  onSelectDepartment,
  onSelectProject,
  onSelectMaterial,
  onAddResearchProject,
}) => {
  // Faculty Directory filters
  const [facSearch, setFacSearch] = useState('');
  const [facDeptFilter, setFacDeptFilter] = useState('ALL');
  const [facDesigFilter, setFacDesigFilter] = useState('ALL');

  // Research Portal filters & project submission state
  const [resSearch, setResSearch] = useState('');
  const [resDeptFilter, setResDeptFilter] = useState('ALL');
  const [resStatusFilter, setResStatusFilter] = useState('ALL');
  const [resYearFilter, setResYearFilter] = useState('ALL');
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDept, setNewProjDept] = useState<DepartmentCode>('CSE (AI & ML)');
  const [newProjArea, setNewProjArea] = useState('Edge AI & Robotics');
  const [newProjPI, setNewProjPI] = useState('Dr. Meenakshi Sundaram');
  const [newProjGrant, setNewProjGrant] = useState('₹ 25.00 Lakhs');
  const [newProjAbstract, setNewProjAbstract] = useState('');
  const [projSubmittedMsg, setProjSubmittedMsg] = useState(false);

  // SCREEN 15: FACULTY DIRECTORY
  if (screen === 'faculty-directory') {
    const filteredFaculty = facultyList.filter((f) => {
      const matchName =
        f.name.toLowerCase().includes(facSearch.toLowerCase()) ||
        f.specialization.toLowerCase().includes(facSearch.toLowerCase());
      const matchDept = facDeptFilter === 'ALL' || f.department === facDeptFilter;
      const matchDesig = facDesigFilter === 'ALL' || f.designation.includes(facDesigFilter);
      return matchName && matchDept && matchDesig;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #15 · Academic Faculty Directory
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Distinguished Professors & Department Heads ({facultyList.length})
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Search by faculty name, research specialization, department, or academic designation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('faculty-register')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg shrink-0 cursor-pointer"
          >
            + Add / Register New Faculty
          </button>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={facSearch}
              onChange={(e) => setFacSearch(e.target.value)}
              placeholder="Search by faculty name or specialization..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <select
            value={facDeptFilter}
            onChange={(e) => setFacDeptFilter(e.target.value)}
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
          <select
            value={facDesigFilter}
            onChange={(e) => setFacDesigFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Academic Designations</option>
            <option value="HOD">Professor & HOD</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
          </select>
        </div>

        {/* FACULTY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0284C7] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#0A192F] text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {fac.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#0284C7] font-semibold">
                      {fac.department} · {fac.experienceYears} Yrs Exp.
                    </div>
                    <h3 className="text-base font-bold text-[#0A192F] truncate mt-0.5">{fac.name}</h3>
                    <div className="text-xs text-slate-600">{fac.designation}</div>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100 text-slate-600">
                  <div><span className="font-semibold text-slate-800">Qualifications:</span> {fac.qualifications}</div>
                  <div><span className="font-semibold text-slate-800">Specialization:</span> {fac.specialization}</div>
                  <div><span className="font-semibold text-slate-800">Office Location:</span> {fac.officeLocation}</div>
                  <div><span className="font-semibold text-slate-800">Office Hours:</span> {fac.officeHours}</div>
                  <div className="tabular-nums"><span className="font-semibold text-slate-800">Email:</span> {fac.email}</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500 tabular-nums">
                  {fac.publications.length} Featured Papers
                </span>
                <button
                  onClick={() => {
                    onSelectFaculty(fac);
                    onNavigate('faculty-profile-details');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <span>Profile & Timetable</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 16: FACULTY PROFILE DETAILS
  if (screen === 'faculty-profile-details') {
    const facMaterials = studyMaterials.filter((m) => m.facultyName === selectedFaculty.name);

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0A192F] text-white font-bold text-2xl flex items-center justify-center shrink-0">
                {selectedFaculty.avatarInitials}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                  Screen #16 · Faculty Portfolio, Timetable & Uploaded Resources
                </div>
                <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">{selectedFaculty.name}</h1>
                <div className="text-xs text-slate-600 mt-1">
                  {selectedFaculty.designation} · Department of {selectedFaculty.department} · {selectedFaculty.qualifications}
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('faculty-directory')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg shrink-0 cursor-pointer"
            >
              ← Back to Faculty Directory
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-sm text-[#0A192F]">Office & Consultation</div>
              <div><span className="text-slate-500">Cabin:</span> <span className="font-semibold">{selectedFaculty.officeLocation}</span></div>
              <div><span className="text-slate-500">Student Hours:</span> <span className="font-semibold">{selectedFaculty.officeHours}</span></div>
              <div><span className="text-slate-500">Email:</span> <span className="font-semibold">{selectedFaculty.email}</span></div>
              <div><span className="text-slate-500">Experience:</span> <span className="font-semibold tabular-nums">{selectedFaculty.experienceYears} Years</span></div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-sm text-[#0A192F]">Courses Taught (Current Odd Sem)</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                {selectedFaculty.coursesTaught.map((c) => (
                  <li key={c} className="font-semibold">{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-sm text-[#0A192F]">Research Specialization & Domains</div>
              <p className="text-slate-600">{selectedFaculty.specialization}</p>
              <div className="pt-1 text-slate-500">
                Interests: {selectedFaculty.researchInterests.join(' · ')}
              </div>
            </div>
          </div>

          {/* FACULTY TEACHING TIMETABLE */}
          <div>
            <h2 className="text-base font-bold text-[#0A192F] mb-3">Weekly Faculty Teaching Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-2.5 px-3 font-semibold">Day</th>
                    <th className="py-2.5 px-3 font-semibold">Time Slot</th>
                    <th className="py-2.5 px-3 font-semibold">Course / Laboratory</th>
                    <th className="py-2.5 px-3 font-semibold">Lecture Hall / Lab</th>
                    <th className="py-2.5 px-3 font-semibold">Section</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedFaculty.timetable.map((slot, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-semibold">{slot.day}</td>
                      <td className="py-2.5 px-3 tabular-nums">{slot.time}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#0A192F]">{slot.subject}</td>
                      <td className="py-2.5 px-3">{slot.room}</td>
                      <td className="py-2.5 px-3">{slot.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* UPLOADED NOTES & PUBLICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-sm font-bold text-[#0A192F] mb-3">Peer-Reviewed Publications</h3>
              <div className="space-y-2.5 text-xs">
                {selectedFaculty.publications.map((pub, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-bold text-[#0A192F]">{pub.title}</div>
                    <div className="text-slate-500 mt-1 tabular-nums">{pub.journal} · {pub.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0A192F] mb-3">
                Study Materials Uploaded by {selectedFaculty.name} ({facMaterials.length})
              </h3>
              <div className="space-y-2.5 text-xs">
                {facMaterials.map((mat) => (
                  <div key={mat.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#0A192F]">{mat.title}</div>
                      <div className="text-slate-500 mt-0.5 tabular-nums">{mat.subjectCode} · {mat.category} · {mat.fileSize}</div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectMaterial(mat);
                        onNavigate('notes-detail-preview');
                      }}
                      className="px-3 py-1.5 bg-[#0A192F] text-white font-semibold rounded-md shrink-0 cursor-pointer"
                    >
                      Open PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 17: PRINCIPAL PROFILE PAGE
  if (screen === 'principal-profile') {
    return (
      <div className="p-6 space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square">
              <img
                src={CAMPUS_IMAGES.principal}
                alt={collegeConfig.principalName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 rounded-xl bg-[#0A192F] text-white space-y-2 text-xs">
              <div className="text-sky-400 font-semibold uppercase tracking-wider">Official Secretariat Contact</div>
              <div className="text-base font-bold">{collegeConfig.principalName}</div>
              <div className="text-slate-300">{collegeConfig.principalTitle}</div>
              <div className="pt-2 border-t border-slate-800 space-y-1 tabular-nums text-slate-300">
                <div>Chamber: Administrative Quadrangle, Suite 001</div>
                <div>Email: principal@smartcampus.edu.in</div>
                <div>Direct Phone: {collegeConfig.phone} (Ext. 1001)</div>
                <div>Visiting Hours: Mon–Fri · 03:00 PM – 04:30 PM</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                Screen #17 · Office of the Principal & Institutional Administration
              </div>
              <h1 className="text-3xl font-bold text-[#0A192F] mt-1">
                {collegeConfig.principalName} — Executive Academic Profile
              </h1>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                With over 26 years of distinguished academic leadership, doctoral supervision, and national curriculum stewardship at {collegeConfig.collegeName} (affiliated to {collegeConfig.affiliatedUniversity}), the Principal spearheads outcome-based education, interdisciplinary semiconductor and AI research centers, and global university collaborations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-[#0A192F] text-sm">Academic Qualifications</div>
                <div>• Ph.D. in Computer & Systems Engineering — IIT Madras</div>
                <div>• M.Tech in High-Performance Computing — IISc Bangalore</div>
                <div>• B.E. (Distinction & University Gold Medalist)</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-[#0A192F] text-sm">Awards & National Recognitions</div>
                <div>• AICTE Visvesvaraya Best Teacher & Administrator Award</div>
                <div>• Fellow of the Institution of Engineers (FIE) & Senior Member IEEE</div>
                <div>• Principal Investigator for ₹ 6.4 Cr Sponsored R&D Grants</div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h2 className="text-lg font-bold text-[#0A192F]">Principal’s Vision & Mission Charter for 2026–2030</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                “Our primary commitment at {collegeConfig.collegeName} is to ensure that every undergraduate and postgraduate engineer graduates not merely with a degree transcript, but with verifiable mastery over real-world systems, peer-reviewed research publications, and ethical engineering leadership.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('principal-dashboard')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Open Principal’s Executive Dashboard →
                </button>
                <button
                  onClick={() => onNavigate('announcements-listing')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg cursor-pointer"
                >
                  View Principal’s Circulars
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 18: DEPARTMENT LISTING PAGE (ALL 7 DEPARTMENTS)
  if (screen === 'department-listing') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #18 · Schools of Engineering & Technology
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              All 7 Accredited Engineering Departments at {collegeConfig.collegeName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any department to inspect its Vision, Mission, HOD, Faculty, Curriculum, Laboratories, Research, Clubs, and Syllabus PDFs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0284C7] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                  <span className="font-bold text-[#0284C7]">0{index + 1}. Department of {dept.code}</span>
                  <span>Placement Rate: {dept.placementRate}</span>
                </div>
                <h2 className="text-xl font-bold text-[#0A192F]">{dept.name}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{dept.introduction}</p>

                <div className="grid grid-cols-3 gap-3 pt-3 text-xs tabular-nums">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-slate-500">Enrolled Students</div>
                    <div className="font-bold text-[#0A192F] text-sm mt-0.5">{dept.studentCount}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-slate-500">Faculty Strength</div>
                    <div className="font-bold text-[#0A192F] text-sm mt-0.5">{dept.facultyCount}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-slate-500">Specialized Labs</div>
                    <div className="font-bold text-[#0A192F] text-sm mt-0.5">{dept.labsCount}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  HOD: <span className="font-semibold text-[#0A192F]">{dept.hodName}</span>
                </div>
                <button
                  onClick={() => {
                    onSelectDepartment(dept);
                    onNavigate('department-detail');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open {dept.code} Department Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 19: INDIVIDUAL DEPARTMENT PAGE (WITH ALL 14 REQUIRED SECTIONS)
  if (screen === 'department-detail') {
    const deptFaculty = facultyList.filter((f) => f.department === selectedDepartment.code);

    return (
      <div className="p-6 space-y-6">
        {/* DEPARTMENT SWITCHER PILLS */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 px-2 shrink-0">Switch Department:</span>
          {departments.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDepartment(d)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedDepartment.id === d.id
                  ? 'bg-[#0A192F] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {d.code}
            </button>
          ))}
        </div>

        {/* 1. DEPARTMENT INTRODUCTION & HERO */}
        <div className="bg-[#0A192F] text-white rounded-xl p-8 border border-slate-800 space-y-4">
          <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
            Screen #19 · Department of {selectedDepartment.code} · {collegeConfig.collegeName}
          </div>
          <h1 className="text-3xl font-bold">{selectedDepartment.name}</h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">{selectedDepartment.introduction}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs tabular-nums">
            <div><span className="text-slate-400">Student Strength:</span> <span className="font-bold text-white">{selectedDepartment.studentCount}</span></div>
            <div><span className="text-slate-400">Faculty Members:</span> <span className="font-bold text-white">{selectedDepartment.facultyCount}</span></div>
            <div><span className="text-slate-400">Research Publications:</span> <span className="font-bold text-sky-300">{selectedDepartment.publicationsCount}+</span></div>
            <div><span className="text-slate-400">Placement Record:</span> <span className="font-bold text-emerald-400">{selectedDepartment.placementRate}</span></div>
          </div>
        </div>

        {/* 2. VISION & MISSION + 3. HEAD OF DEPARTMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">2. Department Vision & Mission</h2>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-[#0284C7]">Vision Statement</div>
              <p className="text-slate-700 leading-relaxed">{selectedDepartment.vision}</p>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-[#0A192F]">Mission Objectives</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                {selectedDepartment.mission.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-3 text-xs">
            <h2 className="text-base font-bold text-[#0A192F]">3. Head of Department (HOD)</h2>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-base font-bold text-[#0A192F]">{selectedDepartment.hodName}</div>
              <div className="text-[#0284C7] font-semibold">{selectedDepartment.hodDesignation}</div>
              <div className="text-slate-600">{selectedDepartment.hodQualification}</div>
              <div className="pt-2 border-t border-slate-200 space-y-1 tabular-nums text-slate-600">
                <div>Email: {selectedDepartment.hodEmail}</div>
                <div>Location: {selectedDepartment.contactRoom}</div>
                <div>Phone: {selectedDepartment.contactPhone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. PROGRAMS OFFERED + 6. CURRICULUM & SYLLABUS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">5. Academic Programs Offered</h2>
            <div className="space-y-3 text-xs">
              {selectedDepartment.programsOffered.map((prog, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#0A192F]">{prog.degree}</div>
                    <div className="text-slate-500 mt-0.5">{prog.duration}</div>
                  </div>
                  <div className="font-bold text-[#0284C7] tabular-nums">Intake: {prog.intake}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">6. R24 Curriculum & Core Subjects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedDepartment.curriculumHighlights.map((sem, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-[#0284C7]">{sem.semester}</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700">
                    {sem.subjects.map((sub) => (
                      <li key={sub}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. LABORATORIES + 8. RESEARCH AREAS + 9. PROJECTS & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">7. Departmental Laboratories</h2>
            {selectedDepartment.laboratories.map((lab, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-[#0A192F]">{lab.name}</div>
                <div className="text-[#0284C7]">{lab.location}</div>
                <div className="text-slate-600">{lab.equipment}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">8. Thrust Research Areas & 11. Publications</h2>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#0284C7] tabular-nums">
                {selectedDepartment.publicationsCount}+ Indexed Journal Papers
              </div>
              <p className="text-slate-600 mt-1">Published in IEEE, ACM, Elsevier & Springer venues.</p>
            </div>
            <div className="space-y-1.5">
              {selectedDepartment.researchAreas.map((area) => (
                <div key={area} className="p-2.5 rounded bg-slate-50 border border-slate-200 font-semibold text-slate-800">
                  • {area}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">9. Student Projects & 10. Seminars</h2>
            {selectedDepartment.projectsAchievements.map((p, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-[#0A192F]">{p.title}</div>
                <div className="text-emerald-700 font-semibold">{p.award} ({p.year})</div>
              </div>
            ))}
            {selectedDepartment.workshopsSeminars.map((w, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-[#0284C7]">Workshop: {w.title}</div>
                <div className="text-slate-600 tabular-nums">{w.date} · {w.speaker}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. DEPARTMENT FACULTY + 12. CLUBS + 13. DOWNLOADABLE SYLLABUS DOCUMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">4. Department Faculty Members</h2>
            {deptFaculty.map((f) => (
              <div key={f.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0A192F]">{f.name}</div>
                  <div className="text-slate-500">{f.designation} · {f.specialization}</div>
                </div>
                <button
                  onClick={() => {
                    onSelectFaculty(f);
                    onNavigate('faculty-profile-details');
                  }}
                  className="px-3 py-1.5 bg-[#0A192F] text-white font-semibold rounded-md cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">12. Student Clubs & 13. Academic Documents</h2>
            {selectedDepartment.studentClubs.map((c, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0A192F]">{c.name} ({c.members} Members)</div>
                <div className="text-slate-600 mt-0.5">{c.focus}</div>
              </div>
            ))}
            {selectedDepartment.documents.map((doc, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0A192F]">{doc.title}</div>
                  <div className="text-slate-500 tabular-nums">Size: {doc.size} · Updated {doc.updated}</div>
                </div>
                <button
                  onClick={() => onNavigate('notes-listing')}
                  className="px-3 py-1.5 bg-[#0284C7] text-white font-semibold rounded-md cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 20: RESEARCH PORTAL
  if (screen === 'research-portal') {
    const filteredProjects = researchProjects.filter((p) => {
      const matchQuery =
        p.title.toLowerCase().includes(resSearch.toLowerCase()) ||
        p.researchArea.toLowerCase().includes(resSearch.toLowerCase()) ||
        p.principalInvestigator.toLowerCase().includes(resSearch.toLowerCase());
      const matchDept = resDeptFilter === 'ALL' || p.department === resDeptFilter;
      const matchStatus = resStatusFilter === 'ALL' || p.status === resStatusFilter;
      const matchYear = resYearFilter === 'ALL' || String(p.publicationYear) === resYearFilter;
      return matchQuery && matchDept && matchStatus && matchYear;
    });

    const handleAddProject = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProjTitle.trim()) return;
      onAddResearchProject({
        id: `res-${Date.now()}`,
        title: newProjTitle,
        department: newProjDept,
        researchArea: newProjArea,
        principalInvestigator: newProjPI,
        studentResearchers: ['Aarav Sharma (24CSE1018)'],
        fundingAgency: 'Institutional Seed Research Grant',
        grantAmount: newProjGrant,
        publicationYear: 2026,
        status: 'Ongoing',
        abstract: newProjAbstract || 'Interdisciplinary faculty-student engineering research initiative.',
        labCenter: 'Central Research & Innovation Tower',
        deliverables: ['Working Prototype', 'Scopus/IEEE Journal Submission'],
      });
      setNewProjTitle('');
      setNewProjAbstract('');
      setProjSubmittedMsg(true);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0A192F] text-white rounded-xl p-8 border border-slate-800 space-y-4">
          <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
            Screen #20 · Directorate of Research, Patents & Technology Incubation
          </div>
          <h1 className="text-3xl font-bold">
            Sponsored Research, Patents & Innovation Portal
          </h1>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Explore funded projects from ICMR, MeitY, DRDO, MNRE, ARDB, and DST, alongside granted patents and student-led deep-tech startups at the Technology Business Incubator (TBI).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs tabular-nums">
            <div><span className="text-slate-400">Active Extramural Grants:</span> <span className="font-bold text-emerald-400">₹ 14.85 Crores</span></div>
            <div><span className="text-slate-400">Patents Filed / Granted:</span> <span className="font-bold text-white">64 Patents</span></div>
            <div><span className="text-slate-400">Incubated Startups:</span> <span className="font-bold text-sky-400">28 Ventures</span></div>
            <div><span className="text-slate-400">Scopus / IEEE Papers:</span> <span className="font-bold text-white">818+ Publications</span></div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <input
            type="text"
            value={resSearch}
            onChange={(e) => setResSearch(e.target.value)}
            placeholder="Search by project title, PI, or research area..."
            className="px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={resDeptFilter}
            onChange={(e) => setResDeptFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="CSE (Data Science)">CSE (Data Science)</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          <select
            value={resStatusFilter}
            onChange={(e) => setResStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Project Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Grant Approved">Grant Approved</option>
            <option value="Patent Filed">Patent Filed</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={resYearFilter}
            onChange={(e) => setResYearFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white tabular-nums"
          >
            <option value="ALL">All Years (2025–2026)</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PROJECTS LIST */}
          <div className="lg:col-span-8 space-y-4">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 tabular-nums">
                  <span>
                    <strong className="text-[#0284C7]">{proj.department}</strong> · {proj.researchArea} · {proj.publicationYear}
                  </span>
                  <span className="font-bold text-emerald-700">{proj.status} · Grant: {proj.grantAmount}</span>
                </div>
                <h2 className="text-lg font-bold text-[#0A192F]">{proj.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.abstract}</p>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-600">
                    PI: <span className="font-semibold text-[#0A192F]">{proj.principalInvestigator}</span> · Agency: {proj.fundingAgency}
                  </div>
                  <button
                    onClick={() => {
                      onSelectProject(proj);
                      onNavigate('research-project-details');
                    }}
                    className="px-3.5 py-1.5 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
                  >
                    Inspect Project Dossier →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PROJECT SUBMISSION INTERFACE */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4 h-fit">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              12. Research Proposal Submission
            </div>
            <h3 className="text-base font-bold text-[#0A192F]">
              Submit New Student / Faculty Research Project
            </h3>
            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proposal Title *</label>
                <input
                  type="text"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="Enter research project title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={newProjDept}
                  onChange={(e) => setNewProjDept(e.target.value as DepartmentCode)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
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
                <label className="block font-semibold text-slate-700 mb-1">Research Thrust Area</label>
                <input
                  type="text"
                  value={newProjArea}
                  onChange={(e) => setNewProjArea(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Principal Investigator / Mentor</label>
                <input
                  type="text"
                  value={newProjPI}
                  onChange={(e) => setNewProjPI(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Abstract & Objectives</label>
                <textarea
                  rows={3}
                  value={newProjAbstract}
                  onChange={(e) => setNewProjAbstract(e.target.value)}
                  placeholder="Summarize methodology and expected deliverables..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              {projSubmittedMsg && (
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  Proposal added to Research Portal list!
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Submit Research Proposal
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 21: RESEARCH PROJECT DETAILS
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #21 · Sponsored Research & Patent Dossier
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-1">{selectedProject.title}</h1>
            <div className="text-xs text-slate-500 mt-1 tabular-nums">
              Department of {selectedProject.department} · {selectedProject.researchArea} · Year: {selectedProject.publicationYear}
            </div>
          </div>
          <button
            onClick={() => onNavigate('research-portal')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg shrink-0 cursor-pointer"
          >
            ← Back to Research Portal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-sm text-[#0A192F]">Grant & Funding Particulars</div>
            <div><span className="text-slate-500">Sponsoring Agency:</span> <span className="font-semibold">{selectedProject.fundingAgency}</span></div>
            <div><span className="text-slate-500">Sanctioned Outlay:</span> <span className="font-bold text-emerald-700 tabular-nums">{selectedProject.grantAmount}</span></div>
            <div><span className="text-slate-500">Current Status:</span> <span className="font-semibold text-[#0284C7]">{selectedProject.status}</span></div>
            {selectedProject.patentNumber && (
              <div><span className="text-slate-500">Patent Filing ID:</span> <span className="font-mono font-semibold">{selectedProject.patentNumber}</span></div>
            )}
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-sm text-[#0A192F]">Investigators & Research Team</div>
            <div><span className="text-slate-500">Principal Investigator:</span> <span className="font-semibold">{selectedProject.principalInvestigator}</span></div>
            <div><span className="text-slate-500">Host Research Lab:</span> <span className="font-semibold">{selectedProject.labCenter}</span></div>
            <div className="pt-1">
              <span className="text-slate-500 block">Student Co-Researchers:</span>
              <span className="font-semibold">{selectedProject.studentResearchers.join(', ')}</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-sm text-[#0A192F]">Key Deliverables & Milestones</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              {selectedProject.deliverables.map((d, i) => (
                <li key={i} className="font-medium">{d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <h2 className="text-sm font-bold text-[#0A192F]">Technical Abstract & Architecture Summary</h2>
          <p className="text-xs text-slate-700 leading-relaxed">{selectedProject.abstract}</p>
        </div>
      </div>
    </div>
  );
};
