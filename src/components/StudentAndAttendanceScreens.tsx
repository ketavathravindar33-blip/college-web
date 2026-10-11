import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  PlayCircle,
  Printer,
  Send,
  UserCheck,
  Video,
} from 'lucide-react';
import {
  AnnouncementItem,
  AttendanceCorrectionRequest,
  CollegeConfig,
  DailyAttendanceRecord,
  EducationalVideo,
  ScreenId,
  StudentRecord,
  StudyMaterial,
  SubjectAttendance,
} from '../types/campus';

interface StudentAndAttendanceProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  currentStudent: StudentRecord;
  students: StudentRecord[];
  subjectAttendance: SubjectAttendance[];
  dailyAttendance: DailyAttendanceRecord[];
  correctionRequests: AttendanceCorrectionRequest[];
  studyMaterials: StudyMaterial[];
  videos: EducationalVideo[];
  announcements: AnnouncementItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectMaterial: (mat: StudyMaterial) => void;
  onSelectVideo: (vid: EducationalVideo) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onSubmitCorrection: (req: AttendanceCorrectionRequest) => void;
  onResolveCorrection: (id: string, status: 'Approved' | 'Rejected') => void;
  onUpdateThreshold: (newMin: number) => void;
}

export const StudentAndAttendanceScreens: React.FC<StudentAndAttendanceProps> = ({
  screen,
  collegeConfig,
  currentStudent,
  students,
  subjectAttendance,
  dailyAttendance,
  correctionRequests,
  studyMaterials,
  videos,
  announcements,
  onNavigate,
  onSelectMaterial,
  onSelectVideo,
  onSelectAnnouncement,
  onSubmitCorrection,
  onResolveCorrection,
  onUpdateThreshold,
}) => {
  // Attendance filters & correction form state
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('Semester V');
  const [corrDate, setCorrDate] = useState('2026-10-11');
  const [corrSubject, setCorrSubject] = useState('AI504: Machine Learning Foundations');
  const [corrReason, setCorrReason] = useState('');
  const [corrSubmitted, setCorrSubmitted] = useState(false);

  // Faculty Mark Attendance state
  const [markingSubject, setMarkingSubject] = useState('CS501: Distributed Systems & Cloud Computing');
  const [markingDate, setMarkingDate] = useState('2026-10-11');
  const [rollCallStatus, setRollCallStatus] = useState<Record<string, 'Present' | 'Absent' | 'On Duty'>>({
    'stu-01': 'Present',
    'stu-02': 'Present',
    'stu-03': 'Absent',
    'stu-04': 'Present',
    'stu-05': 'Present',
    'stu-06': 'On Duty',
    'stu-07': 'Present',
  });
  const [attendanceSavedMsg, setAttendanceSavedMsg] = useState(false);

  // Student Profile editable contact state
  const [profilePhone, setProfilePhone] = useState(currentStudent.phone);
  const [profileSaved, setProfileSaved] = useState(false);

  // SCREEN 9: STUDENT DASHBOARD
  if (screen === 'student-dashboard') {
    const lowAttendanceSubjects = subjectAttendance.filter(
      (s) => s.percentage < collegeConfig.minAttendanceThreshold
    );

    return (
      <div className="p-6 space-y-8">
        {/* STUDENT PROFILE BANNER CARD */}
        <div className="bg-[#0A192F] text-white rounded-xl p-6 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#0284C7] text-white font-bold text-xl flex items-center justify-center shrink-0">
              AS
            </div>
            <div>
              <div className="text-xs text-sky-300 font-medium">
                Screen #9 · Personalized Student Learning & ERP Dashboard
              </div>
              <h1 className="text-2xl font-bold mt-0.5">{currentStudent.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1 tabular-nums">
                <span>Roll No: {currentStudent.rollNumber}</span>
                <span>·</span>
                <span>{currentStudent.course} {currentStudent.department}</span>
                <span>·</span>
                <span>{currentStudent.year} ({currentStudent.semester})</span>
                <span>·</span>
                <span>{currentStudent.section}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800 text-right tabular-nums">
            <div className="bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Overall Attendance</div>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">{currentStudent.overallAttendance}%</div>
            </div>
            <div className="bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Current CGPA</div>
              <div className="text-xl font-bold text-sky-400 mt-0.5">{currentStudent.cgpa}</div>
            </div>
            <div className="bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Last Sem SGPA</div>
              <div className="text-xl font-bold text-white mt-0.5">{currentStudent.sgpa}</div>
            </div>
          </div>
        </div>

        {/* LOW ATTENDANCE WARNING ALERT IF ANY SUBJECT < THRESHOLD */}
        {lowAttendanceSubjects.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Attendance Threshold Alert: </span>
                You are currently below the mandatory {collegeConfig.minAttendanceThreshold}% threshold in{' '}
                {lowAttendanceSubjects.map((s) => `${s.subjectCode} (${s.percentage}%)`).join(', ')}. Attend upcoming sessions or submit an on-duty correction request.
              </div>
            </div>
            <button
              onClick={() => onNavigate('subject-attendance-details')}
              className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 rounded-lg shrink-0 cursor-pointer"
            >
              Submit Correction Request
            </button>
          </div>
        )}

        {/* QUICK LINKS BAR (Attendance, Notes, Videos, Timetable, Results, Faculty, Profile) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { id: 'student-attendance-overview', label: 'Attendance' },
            { id: 'notes-listing', label: 'Study Notes' },
            { id: 'video-portal', label: 'Video Lectures' },
            { id: 'student-timetable', label: 'Timetable' },
            { id: 'student-results', label: 'Exam Results' },
            { id: 'faculty-directory', label: 'Faculty Directory' },
            { id: 'student-profile', label: 'My Profile' },
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => onNavigate(q.id as ScreenId)}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-[#0284C7] text-left transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-bold text-[#0A192F]">{q.label}</span>
              <ChevronRight className="w-4 h-4 text-[#0284C7]" />
            </button>
          ))}
        </div>

        {/* SUBJECT-WISE ATTENDANCE SUMMARY + TODAY'S TIMETABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-[#0A192F]">Subject-Wise Attendance Summary</h2>
                <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                  Minimum Mandatory Requirement: {collegeConfig.minAttendanceThreshold}%
                </p>
              </div>
              <button
                onClick={() => onNavigate('student-attendance-overview')}
                className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
              >
                Full Attendance Analytics →
              </button>
            </div>

            <div className="space-y-4 mt-4">
              {subjectAttendance.map((sub) => {
                const isLow = sub.percentage < collegeConfig.minAttendanceThreshold;
                return (
                  <div key={sub.subjectCode} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {sub.subjectCode}: {sub.subjectName}
                      </span>
                      <span className={`font-bold tabular-nums ${isLow ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {sub.attended}/{sub.conducted} Classes · {sub.percentage}% {isLow ? '(Low Warning)' : '(Eligible)'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-[#0284C7]'}`}
                        style={{ width: `${Math.min(100, sub.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TODAY'S TIMETABLE SCHEDULE */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-[#0A192F]">Today’s Class Schedule</h2>
                <p className="text-xs text-slate-500 mt-0.5">B.Tech CSE · Sem V · Section A</p>
              </div>
              <button
                onClick={() => onNavigate('student-timetable')}
                className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
              >
                Weekly Timetable
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {[
                { time: '09:00 - 10:00', code: 'CS501', title: 'Distributed Systems & Cloud', room: 'LH-201', prof: 'Dr. Aravind S.' },
                { time: '10:00 - 11:00', code: 'CS502', title: 'Compiler Design', room: 'LH-201', prof: 'Prof. Siddharth C.' },
                { time: '11:15 - 12:15', code: 'CS503', title: 'Computer Networks', room: 'LH-201', prof: 'Prof. Raghavendra K.' },
                { time: '01:15 - 02:15', code: 'AI504', title: 'Machine Learning Foundations', room: 'IB-103', prof: 'Dr. Meenakshi S.' },
                { time: '02:15 - 04:15', code: 'CS506L', title: 'Distributed Cloud Lab', room: 'Lab 204', prof: 'Dr. Aravind S.' },
              ].map((slot, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#0A192F]">{slot.code}: {slot.title}</div>
                    <div className="text-slate-500 mt-0.5">{slot.prof} · Room {slot.room}</div>
                  </div>
                  <div className="text-slate-600 font-medium tabular-nums shrink-0">{slot.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ASSIGNMENTS, UPCOMING EXAMS, RECENT NOTES & RECOMMENDED VIDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assignment Deadlines & Upcoming Exams */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#0A192F]">Upcoming Exams & Deadlines</h3>
              <button
                onClick={() => onNavigate('exam-timetable')}
                className="text-xs font-semibold text-[#0284C7] cursor-pointer"
              >
                Exam Schedule
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[#0284C7] font-semibold tabular-nums">Due Oct 16, 2026 · Assignment #2</div>
                <div className="font-bold text-[#0A192F] mt-0.5">CS501: Raft Leader Election Implementation in Go</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[#0284C7] font-semibold tabular-nums">Due Oct 19, 2026 · Lab Record</div>
                <div className="font-bold text-[#0A192F] mt-0.5">CS502: YACC/Bison LALR Parser Specification</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-amber-700 font-semibold tabular-nums">Starts Nov 16, 2026 · End-Sem Exams</div>
                <div className="font-bold text-[#0A192F] mt-0.5">Odd Semester Theory Examinations (Sem V)</div>
              </div>
            </div>
          </div>

          {/* Recently Uploaded Notes & Downloadable Materials */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#0A192F]">Recently Uploaded Notes</h3>
              <button
                onClick={() => onNavigate('notes-listing')}
                className="text-xs font-semibold text-[#0284C7] cursor-pointer"
              >
                All Notes
              </button>
            </div>
            <div className="space-y-3 text-xs">
              {studyMaterials.slice(0, 3).map((mat) => (
                <div key={mat.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-slate-500 tabular-nums">{mat.subjectCode} · {mat.unit} · {mat.fileSize}</div>
                    <button
                      onClick={() => {
                        onSelectMaterial(mat);
                        onNavigate('notes-detail-preview');
                      }}
                      className="font-bold text-[#0A192F] hover:text-[#0284C7] text-left mt-0.5 cursor-pointer"
                    >
                      {mat.title}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      onSelectMaterial(mat);
                      onNavigate('notes-detail-preview');
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-[#0284C7] bg-white border border-slate-200 rounded-md shrink-0 cursor-pointer"
                  >
                    PDF
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Educational Videos */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#0A192F]">Recommended Video Lectures</h3>
              <button
                onClick={() => onNavigate('video-portal')}
                className="text-xs font-semibold text-[#0284C7] cursor-pointer"
              >
                Video Portal
              </button>
            </div>
            <div className="space-y-3 text-xs">
              {videos.slice(0, 3).map((vid) => (
                <div key={vid.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 tabular-nums">
                    <span>{vid.subject}</span>
                    <span>{vid.duration}</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectVideo(vid);
                      onNavigate('video-player');
                    }}
                    className="font-bold text-[#0A192F] hover:text-[#0284C7] text-left block cursor-pointer"
                  >
                    {vid.title}
                  </button>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600" style={{ width: `${vid.progressPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 10: STUDENT PROFILE PAGE
  if (screen === 'student-profile') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0A192F] text-white font-bold text-2xl flex items-center justify-center">
                AS
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                  Screen #10 · Official Student Academic Dossier
                </div>
                <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">{currentStudent.name}</h1>
                <div className="text-xs text-slate-500 mt-1 tabular-nums">
                  Roll Number: {currentStudent.rollNumber} · Status: {currentStudent.status}
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('user-settings')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Password & Notification Settings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="font-bold text-[#0A192F] text-sm">Academic Registration (Read-Only)</div>
              <div className="flex justify-between"><span className="text-slate-500">Department:</span><span className="font-semibold">{currentStudent.department}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Degree Program:</span><span className="font-semibold">{currentStudent.course}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Current Year:</span><span className="font-semibold">{currentStudent.year}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Current Semester:</span><span className="font-semibold">{currentStudent.semester}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Section:</span><span className="font-semibold">{currentStudent.section}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Admission Batch:</span><span className="font-semibold tabular-nums">{currentStudent.admissionYear}–2028</span></div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="font-bold text-[#0A192F] text-sm">Standing & Cumulative Performance</div>
              <div className="flex justify-between"><span className="text-slate-500">Overall Attendance:</span><span className="font-bold text-emerald-700 tabular-nums">{currentStudent.overallAttendance}%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Cumulative GPA (CGPA):</span><span className="font-bold text-[#0284C7] tabular-nums">{currentStudent.cgpa} / 10.0</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Last Semester SGPA:</span><span className="font-bold tabular-nums">{currentStudent.sgpa} / 10.0</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Active Backlogs:</span><span className="font-semibold text-emerald-700">0 (Clear Standing)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Faculty Advisor:</span><span className="font-semibold">Dr. Aravind Swaminathan</span></div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="font-bold text-[#0A192F] text-sm">Permitted Contact Fields</div>
              <div>
                <label className="block text-slate-500 mb-1">Institutional Email</label>
                <input
                  type="text"
                  disabled
                  value={currentStudent.email}
                  className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-slate-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Student Mobile Number (Editable)</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md tabular-nums"
                />
              </div>
              {profileSaved && (
                <div className="text-emerald-700 font-semibold">Contact number updated in ERP record.</div>
              )}
              <button
                onClick={() => setProfileSaved(true)}
                className="w-full py-2 px-3 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Update Permitted Contact Info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 11: STUDENT ATTENDANCE OVERVIEW
  if (screen === 'student-attendance-overview') {
    const totalConducted = subjectAttendance.reduce((acc, s) => acc + s.conducted, 0);
    const totalAttended = subjectAttendance.reduce((acc, s) => acc + s.attended, 0);
    const totalMissed = subjectAttendance.reduce((acc, s) => acc + s.missed, 0);

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #11 · Student Attendance Management Overview
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Aggregate & Monthly Attendance Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {currentStudent.name} ({currentStudent.rollNumber}) · {currentStudent.semester} · Minimum Threshold: {collegeConfig.minAttendanceThreshold}%
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 no-print">
            <button
              onClick={() => onNavigate('subject-attendance-details')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              Subject-Wise Logs & Correction
            </button>
            <button
              onClick={() => onNavigate('attendance-calendar')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              Attendance Calendar
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* 4 KEY ATTENDANCE METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Overall Semester Attendance</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">{currentStudent.overallAttendance}%</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              Above {collegeConfig.minAttendanceThreshold}% University Requirement
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Total Classes Conducted</div>
            <div className="text-3xl font-bold text-[#0A192F] mt-1">{totalConducted}</div>
            <div className="text-xs text-slate-500 mt-1">Across 6 Registered Subjects</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Classes Attended (Present)</div>
            <div className="text-3xl font-bold text-emerald-700 mt-1">{totalAttended}</div>
            <div className="text-xs text-slate-500 mt-1">Includes Approved On-Duty</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500">Classes Missed / Leave</div>
            <div className="text-3xl font-bold text-amber-700 mt-1">{totalMissed}</div>
            <div className="text-xs text-slate-500 mt-1">4 Medical · 21 Personal Leave</div>
          </div>
        </div>

        {/* MONTHLY ATTENDANCE CHART + SUBJECT BREAKDOWN TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0A192F]">Monthly Attendance Trend (Odd Sem 2026)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Month-by-month attendance consistency</p>
              <div className="space-y-4 mt-6 tabular-nums">
                {[
                  { month: 'July 2026 (Commencement)', pct: 94.5, classes: '42 / 44' },
                  { month: 'August 2026', pct: 89.2, classes: '58 / 65' },
                  { month: 'September 2026', pct: 86.0, classes: '55 / 64' },
                  { month: 'October 2026 (Current)', pct: 85.4, classes: '34 / 41' },
                ].map((m) => (
                  <div key={m.month} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{m.month}</span>
                      <span className="font-bold text-[#0A192F]">{m.classes} ({m.pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0284C7] rounded-full" style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Official Hall-Ticket Eligibility Status: <span className="font-bold text-emerald-700">PROVISIONALLY ELIGIBLE</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-[#0A192F] mb-4">Subject-Wise Attendance Summary Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-3 px-3 font-semibold">Subject</th>
                    <th className="py-3 px-3 font-semibold">Faculty</th>
                    <th className="py-3 px-3 font-semibold text-right">Conducted</th>
                    <th className="py-3 px-3 font-semibold text-right">Attended</th>
                    <th className="py-3 px-3 font-semibold text-right">Missed</th>
                    <th className="py-3 px-3 font-semibold text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 tabular-nums">
                  {subjectAttendance.map((s) => (
                    <tr key={s.subjectCode} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-[#0A192F]">
                        {s.subjectCode}: {s.subjectName}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-sans">{s.facultyName}</td>
                      <td className="py-3 px-3 text-right">{s.conducted}</td>
                      <td className="py-3 px-3 text-right text-emerald-700 font-semibold">{s.attended}</td>
                      <td className="py-3 px-3 text-right text-amber-700">{s.missed}</td>
                      <td className="py-3 px-3 text-right font-bold">
                        <span className={s.percentage < collegeConfig.minAttendanceThreshold ? 'text-red-600' : 'text-emerald-700'}>
                          {s.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 12: SUBJECT-WISE ATTENDANCE DETAILS & CORRECTION WORKFLOW
  if (screen === 'subject-attendance-details') {
    const filteredDaily = dailyAttendance.filter(
      (r) => selectedSubjectFilter === 'ALL' || r.subjectCode === selectedSubjectFilter
    );

    const handleCorrectionSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!corrReason.trim()) return;
      onSubmitCorrection({
        id: `corr-${Date.now()}`,
        studentName: currentStudent.name,
        rollNumber: currentStudent.rollNumber,
        date: corrDate,
        subjectName: corrSubject,
        reason: corrReason,
        status: 'Pending',
      });
      setCorrReason('');
      setCorrSubmitted(true);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #12 · Granular Attendance Register & Correction Requests
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Subject-Wise Daily Attendance Ledger
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedSemesterFilter}
              onChange={(e) => setSelectedSemesterFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option>Semester V</option>
              <option>Semester IV</option>
              <option>Semester III</option>
            </select>
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="ALL">All Subjects (6)</option>
              {subjectAttendance.map((s) => (
                <option key={s.subjectCode} value={s.subjectCode}>
                  {s.subjectCode}: {s.subjectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* DAILY PERIOD LOG TABLE */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-[#0A192F] mb-4">
              Daily Period-by-Period Attendance Log ({selectedSemesterFilter})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-3 px-3 font-semibold">Date</th>
                    <th className="py-3 px-3 font-semibold">Period Slot</th>
                    <th className="py-3 px-3 font-semibold">Subject</th>
                    <th className="py-3 px-3 font-semibold">Faculty Member</th>
                    <th className="py-3 px-3 font-semibold">Recorded Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDaily.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 tabular-nums font-medium">{rec.date}</td>
                      <td className="py-3 px-3 tabular-nums text-slate-500">{rec.period}</td>
                      <td className="py-3 px-3 font-semibold text-[#0A192F]">
                        {rec.subjectCode}: {rec.subjectName}
                      </td>
                      <td className="py-3 px-3 text-slate-600">{rec.facultyName}</td>
                      <td className="py-3 px-3 font-bold">
                        <span
                          className={
                            rec.status === 'Present'
                              ? 'text-emerald-700'
                              : rec.status === 'Absent'
                              ? 'text-red-600'
                              : 'text-[#0284C7]'
                          }
                        >
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ATTENDANCE CORRECTION REQUEST WORKFLOW */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              On-Duty / Medical Correction Workflow
            </div>
            <h3 className="text-base font-bold text-[#0A192F]">
              Submit Attendance Correction Request
            </h3>
            <form onSubmit={handleCorrectionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Absence</label>
                <input
                  type="date"
                  value={corrDate}
                  onChange={(e) => setCorrDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={corrSubject}
                  onChange={(e) => setCorrSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {subjectAttendance.map((s) => (
                    <option key={s.subjectCode} value={`${s.subjectCode}: ${s.subjectName}`}>
                      {s.subjectCode}: {s.subjectName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Justification / On-Duty Proof</label>
                <textarea
                  rows={3}
                  value={corrReason}
                  onChange={(e) => setCorrReason(e.target.value)}
                  placeholder="State hackathon participation, medical certificate ID, or lab conflict..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              {corrSubmitted && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-medium">
                  Correction request routed to Subject Faculty & HOD.
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Submit Correction Petition
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold text-[#0A192F]">Recent Correction Requests</div>
              {correctionRequests.map((req) => (
                <div key={req.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>{req.subjectName}</span>
                    <span
                      className={
                        req.status === 'Approved'
                          ? 'text-emerald-700'
                          : req.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-amber-700'
                      }
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="text-slate-500 tabular-nums">Date: {req.date}</div>
                  <div className="text-slate-600">{req.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 13: ATTENDANCE CALENDAR
  if (screen === 'attendance-calendar') {
    const octoberDays = Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const dow = (day + 3) % 7; // Sunday = 0
      let status: 'Present' | 'Absent' | 'Holiday' | 'On-Duty' | 'Upcoming' = 'Present';
      if (dow === 0) status = 'Holiday';
      else if (day > 11) status = 'Upcoming';
      else if (day === 6) status = 'Absent';
      else if (day === 10) status = 'On-Duty';
      return { day, status };
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #13 · Monthly Visual Attendance Calendar
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              October 2026 — Daily Attendance Matrix
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-semibold text-emerald-700">■ Present (8 Days)</span>
            <span className="font-semibold text-[#0284C7]">■ On-Duty (1 Day)</span>
            <span className="font-semibold text-red-600">■ Absent (1 Day)</span>
            <span className="font-semibold text-slate-400">■ Holiday / Sunday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-slate-500 pb-3 border-b border-slate-200">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>
          <div className="grid grid-cols-7 gap-3 mt-4 tabular-nums">
            {/* Offset for Oct 1 starting on Thursday */}
            <div className="h-24 rounded-lg bg-slate-50/50" />
            <div className="h-24 rounded-lg bg-slate-50/50" />
            <div className="h-24 rounded-lg bg-slate-50/50" />
            <div className="h-24 rounded-lg bg-slate-50/50" />
            {octoberDays.map((d) => (
              <div
                key={d.day}
                className={`h-24 rounded-lg border p-3 flex flex-col justify-between text-left ${
                  d.status === 'Present'
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : d.status === 'Absent'
                    ? 'bg-red-50 border-red-200'
                    : d.status === 'On-Duty'
                    ? 'bg-sky-50 border-sky-200'
                    : d.status === 'Holiday'
                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <div className="text-sm font-bold text-[#0A192F]">Oct {d.day}</div>
                <div className="text-[11px] font-semibold">
                  {d.status === 'Present' && <span className="text-emerald-800">5/5 Periods Present</span>}
                  {d.status === 'Absent' && <span className="text-red-700">Absent (Medical)</span>}
                  {d.status === 'On-Duty' && <span className="text-[#0284C7]">ACM ICPC On-Duty</span>}
                  {d.status === 'Holiday' && <span>Weekly Holiday</span>}
                  {d.status === 'Upcoming' && <span>Scheduled</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 14: FACULTY ATTENDANCE MANAGEMENT
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            Screen #14 · Authorized Faculty Attendance Marking & Threshold Control
          </div>
          <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
            Faculty Classroom Roll-Call & Correction Approvals
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">Min Attendance Threshold (%):</span>
            <input
              type="number"
              min={50}
              max={95}
              value={collegeConfig.minAttendanceThreshold}
              onChange={(e) => onUpdateThreshold(Number(e.target.value) || 75)}
              className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center font-bold tabular-nums"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b border-slate-200 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Course & Section</label>
              <select
                value={markingSubject}
                onChange={(e) => setMarkingSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
              >
                <option>CS501: Distributed Systems (CSE-3A)</option>
                <option>CS302: Operating Systems (CSE-2B)</option>
                <option>AI501: Deep Learning (AIML-3A)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Session Date</label>
              <input
                type="date"
                value={markingDate}
                onChange={(e) => setMarkingDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  const allPresent: Record<string, 'Present' | 'Absent' | 'On Duty'> = {};
                  students.forEach((s) => (allPresent[s.id] = 'Present'));
                  setRollCallStatus(allPresent);
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg cursor-pointer"
              >
                Mark All Present
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-3 font-semibold">Roll Number</th>
                  <th className="py-3 px-3 font-semibold">Student Name</th>
                  <th className="py-3 px-3 font-semibold">Current %</th>
                  <th className="py-3 px-3 font-semibold">Mark Session Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((stu) => {
                  const status = rollCallStatus[stu.id] || 'Present';
                  return (
                    <tr key={stu.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-semibold">{stu.rollNumber}</td>
                      <td className="py-3 px-3 font-semibold text-[#0A192F]">{stu.name}</td>
                      <td className="py-3 px-3 tabular-nums">
                        <span
                          className={`font-bold ${
                            stu.overallAttendance < collegeConfig.minAttendanceThreshold
                              ? 'text-red-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {stu.overallAttendance}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          {(['Present', 'Absent', 'On Duty'] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setRollCallStatus((prev) => ({
                                  ...prev,
                                  [stu.id]: opt,
                                }))
                              }
                              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                                status === opt
                                  ? opt === 'Present'
                                    ? 'bg-emerald-600 text-white'
                                    : opt === 'Absent'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-[#0284C7] text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {attendanceSavedMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
              Roll-call for {markingSubject} on {markingDate} committed to the University ERP Register.
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setAttendanceSavedMsg(true)}
              className="px-5 py-2.5 bg-[#0A192F] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Commit & Publish Class Attendance
            </button>
          </div>
        </div>

        {/* PENDING STUDENT ATTENDANCE CORRECTION REQUESTS */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-bold text-[#0A192F]">
            Student Correction Petitions ({correctionRequests.length})
          </h2>
          <div className="space-y-3">
            {correctionRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0A192F]">
                    {req.studentName} ({req.rollNumber})
                  </span>
                  <span className="font-semibold text-[#0284C7]">{req.status}</span>
                </div>
                <div className="text-slate-500 tabular-nums">
                  {req.subjectName} · Date: {req.date}
                </div>
                <p className="text-slate-700">{req.reason}</p>
                {req.status === 'Pending' && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onResolveCorrection(req.id, 'Approved')}
                      className="flex-1 py-1.5 bg-emerald-600 text-white font-semibold rounded cursor-pointer"
                    >
                      Approve On-Duty
                    </button>
                    <button
                      onClick={() => onResolveCorrection(req.id, 'Rejected')}
                      className="flex-1 py-1.5 bg-red-600 text-white font-semibold rounded cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
