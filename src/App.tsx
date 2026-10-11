/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
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
  ResearchProject,
  ScreenId,
  StudentRecord,
  StudyMaterial,
  UserRole,
} from './types/campus';
import {
  DEPARTMENTS_DATA,
  FACULTY_DATA,
  INFRASTRUCTURE_FACILITIES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COLLEGE_CONFIG,
  INITIAL_CORRECTION_REQUESTS,
  INITIAL_DAILY_ATTENDANCE,
  INITIAL_FEEDBACK,
  INITIAL_RESEARCH_PROJECTS,
  INITIAL_STUDENTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_SUBJECT_ATTENDANCE,
  INITIAL_VIDEOS,
} from './data/mockCampusData';
import { NavigationShell } from './components/NavigationShell';
import { PublicAndAuthScreens } from './components/PublicAndAuthScreens';
import { StudentAndAttendanceScreens } from './components/StudentAndAttendanceScreens';
import { AcademicsAndResearchScreens } from './components/AcademicsAndResearchScreens';
import { LmsAndExamsScreens } from './components/LmsAndExamsScreens';
import { InfrastructureAndEventsScreens } from './components/InfrastructureAndEventsScreens';
import { AdminAndManagementScreens } from './components/AdminAndManagementScreens';

export default function App() {
  const [collegeConfig, setCollegeConfig] = useState<CollegeConfig>(INITIAL_COLLEGE_CONFIG);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('public-home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [configModalOpen, setConfigModalOpen] = useState(false);

  // Editable placeholders modal state
  const [modalCollegeName, setModalCollegeName] = useState(collegeConfig.collegeName);
  const [modalUniversity, setModalUniversity] = useState(collegeConfig.affiliatedUniversity);
  const [modalAddress, setModalAddress] = useState(collegeConfig.collegeAddress);
  const [modalPrincipal, setModalPrincipal] = useState(collegeConfig.principalName);

  // Mutable application states across all 48 screens
  const [departments] = useState<DepartmentInfo[]>(DEPARTMENTS_DATA);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentInfo>(DEPARTMENTS_DATA[0]);

  const [facultyList, setFacultyList] = useState<FacultyMember[]>(FACULTY_DATA);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember>(FACULTY_DATA[0]);

  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [subjectAttendance] = useState(INITIAL_SUBJECT_ATTENDANCE);
  const [dailyAttendance] = useState(INITIAL_DAILY_ATTENDANCE);
  const [correctionRequests, setCorrectionRequests] = useState<AttendanceCorrectionRequest[]>(
    INITIAL_CORRECTION_REQUESTS
  );

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial>(INITIAL_STUDY_MATERIALS[0]);

  const [videos, setVideos] = useState<EducationalVideo[]>(INITIAL_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo>(INITIAL_VIDEOS[0]);

  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(INITIAL_RESEARCH_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ResearchProject>(INITIAL_RESEARCH_PROJECTS[0]);

  const [facilities] = useState<InfrastructureFacility[]>(INFRASTRUCTURE_FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState<InfrastructureFacility>(
    INFRASTRUCTURE_FACILITIES[0]
  );

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem>(
    INITIAL_ANNOUNCEMENTS[0]
  );

  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(INITIAL_FEEDBACK);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const appendAudit = (action: string, module: string) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      actor:
        userRole === 'student'
          ? 'Aarav Sharma'
          : userRole === 'faculty'
          ? 'Dr. Aravind Swaminathan'
          : userRole === 'principal'
          ? collegeConfig.principalName
          : 'Campus Admin',
      role: userRole.toUpperCase(),
      action,
      module,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const publicAndAuthIds: ScreenId[] = [
    'public-home',
    'about-college',
    'login',
    'forgot-password',
    'reset-password',
    'student-register',
    'faculty-register',
    'register-success',
  ];

  const studentAndAttendanceIds: ScreenId[] = [
    'student-dashboard',
    'student-profile',
    'student-attendance-overview',
    'subject-attendance-details',
    'attendance-calendar',
    'faculty-attendance-mgmt',
  ];

  const academicsAndResearchIds: ScreenId[] = [
    'faculty-directory',
    'faculty-profile-details',
    'principal-profile',
    'department-listing',
    'department-detail',
    'research-portal',
    'research-project-details',
  ];

  const lmsAndExamsIds: ScreenId[] = [
    'notes-listing',
    'notes-detail-preview',
    'faculty-upload-notes',
    'video-portal',
    'video-player',
    'faculty-video-mgmt',
    'student-timetable',
    'faculty-timetable',
    'academic-calendar',
    'exam-timetable',
    'student-results',
  ];

  const infrastructureAndEventsIds: ScreenId[] = [
    'infrastructure-overview',
    'infrastructure-detail',
    'campus-gallery',
    'announcements-listing',
    'announcement-details',
    'contact-feedback',
  ];

  return (
    <NavigationShell
      collegeConfig={collegeConfig}
      activeScreen={activeScreen}
      onNavigate={handleNavigate}
      userRole={userRole}
      onChangeRole={setUserRole}
      onOpenConfigModal={() => {
        setModalCollegeName(collegeConfig.collegeName);
        setModalUniversity(collegeConfig.affiliatedUniversity);
        setModalAddress(collegeConfig.collegeAddress);
        setModalPrincipal(collegeConfig.principalName);
        setConfigModalOpen(true);
      }}
    >
      {/* EDITABLE PLACEHOLDERS MODAL */}
      {configModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-[#0A192F]">
                  Edit College Details Placeholders
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize the institution name, university affiliation, address, and principal name across all 48 screens.
                </p>
              </div>
              <button
                onClick={() => setConfigModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">College Name</label>
                <input
                  type="text"
                  value={modalCollegeName}
                  onChange={(e) => setModalCollegeName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Affiliated University</label>
                <input
                  type="text"
                  value={modalUniversity}
                  onChange={(e) => setModalUniversity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">College Address</label>
                <input
                  type="text"
                  value={modalAddress}
                  onChange={(e) => setModalAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Principal Name</label>
                <input
                  type="text"
                  value={modalPrincipal}
                  onChange={(e) => setModalPrincipal(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => {
                  setModalCollegeName('Visvesvaraya Institute of Engineering & Technology');
                  setModalUniversity('Jawaharlal Nehru Technological University (JNTU)');
                  setModalAddress('Knowledge Park Corridor, Hi-Tech City Road, Hyderabad - 500081');
                  setModalPrincipal('Dr. S. Radhakrishnan Murthy');
                }}
                className="text-[#0284C7] font-semibold hover:underline cursor-pointer"
              >
                Fill Sample Engineering College Data
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfigModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCollegeConfig((prev) => ({
                      ...prev,
                      collegeName: modalCollegeName || '[Your College Name]',
                      affiliatedUniversity: modalUniversity || '[University Name]',
                      collegeAddress: modalAddress || '[College Address]',
                      principalName: modalPrincipal || '[Principal Name]',
                    }));
                    setConfigModalOpen(false);
                  }}
                  className="px-5 py-2 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
                >
                  Apply Placeholders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROUTE TO MATCHING SCREEN MODULE (SCREENS 1–48) */}
      {publicAndAuthIds.includes(activeScreen) && (
        <PublicAndAuthScreens
          screen={activeScreen}
          collegeConfig={collegeConfig}
          departments={departments}
          facilities={facilities}
          announcements={announcements}
          onNavigate={handleNavigate}
          onSelectDepartment={setSelectedDepartment}
          onSelectFacility={setSelectedFacility}
          onSelectAnnouncement={setSelectedAnnouncement}
          onLoginSuccess={(role) => {
            setUserRole(role);
            appendAudit(`Authenticated session started as ${role}`, 'Authentication');
            if (role === 'student') handleNavigate('student-dashboard');
            else if (role === 'faculty') handleNavigate('faculty-dashboard');
            else if (role === 'principal') handleNavigate('principal-dashboard');
            else handleNavigate('admin-dashboard');
          }}
          onRegisterStudent={(stu) => {
            setStudents((prev) => [stu, ...prev]);
            appendAudit(`New student registration submitted: ${stu.name} (${stu.rollNumber})`, 'Admissions');
          }}
          onRegisterFaculty={(fac) => {
            setFacultyList((prev) => [fac, ...prev]);
            appendAudit(`New faculty onboarding submitted: ${fac.name}`, 'HR & Faculty');
          }}
        />
      )}

      {studentAndAttendanceIds.includes(activeScreen) && (
        <StudentAndAttendanceScreens
          screen={activeScreen}
          collegeConfig={collegeConfig}
          currentStudent={students[0]}
          students={students}
          subjectAttendance={subjectAttendance}
          dailyAttendance={dailyAttendance}
          correctionRequests={correctionRequests}
          studyMaterials={studyMaterials}
          videos={videos}
          announcements={announcements}
          onNavigate={handleNavigate}
          onSelectMaterial={setSelectedMaterial}
          onSelectVideo={setSelectedVideo}
          onSelectAnnouncement={setSelectedAnnouncement}
          onSubmitCorrection={(req) => {
            setCorrectionRequests((prev) => [req, ...prev]);
            appendAudit(`Attendance OD correction petition filed for ${req.subjectName}`, 'Attendance');
          }}
          onResolveCorrection={(id, status) => {
            setCorrectionRequests((prev) =>
              prev.map((c) => (c.id === id ? { ...c, status } : c))
            );
            appendAudit(`Attendance correction ${id} marked ${status}`, 'Attendance');
          }}
          onUpdateThreshold={(newMin) =>
            setCollegeConfig((prev) => ({ ...prev, minAttendanceThreshold: newMin }))
          }
        />
      )}

      {academicsAndResearchIds.includes(activeScreen) && (
        <AcademicsAndResearchScreens
          screen={activeScreen}
          collegeConfig={collegeConfig}
          facultyList={facultyList}
          selectedFaculty={selectedFaculty}
          departments={departments}
          selectedDepartment={selectedDepartment}
          researchProjects={researchProjects}
          selectedProject={selectedProject}
          studyMaterials={studyMaterials}
          announcements={announcements}
          onNavigate={handleNavigate}
          onSelectFaculty={setSelectedFaculty}
          onSelectDepartment={setSelectedDepartment}
          onSelectProject={setSelectedProject}
          onSelectMaterial={setSelectedMaterial}
          onAddResearchProject={(proj) => {
            setResearchProjects((prev) => [proj, ...prev]);
            appendAudit(`Submitted new research grant proposal: ${proj.title}`, 'Research');
          }}
        />
      )}

      {lmsAndExamsIds.includes(activeScreen) && (
        <LmsAndExamsScreens
          screen={activeScreen}
          collegeConfig={collegeConfig}
          currentStudent={students[0]}
          studyMaterials={studyMaterials}
          selectedMaterial={selectedMaterial}
          videos={videos}
          selectedVideo={selectedVideo}
          onNavigate={handleNavigate}
          onSelectMaterial={setSelectedMaterial}
          onToggleBookmarkMaterial={(id) =>
            setStudyMaterials((prev) =>
              prev.map((m) => (m.id === id ? { ...m, bookmarked: !m.bookmarked } : m))
            )
          }
          onUploadMaterial={(mat) => {
            setStudyMaterials((prev) => [mat, ...prev]);
            appendAudit(`Uploaded study material: ${mat.title}`, 'LMS Notes');
          }}
          onDeleteMaterial={(id) => {
            setStudyMaterials((prev) => prev.filter((m) => m.id !== id));
            appendAudit(`Removed study material ${id}`, 'LMS Notes');
          }}
          onSelectVideo={setSelectedVideo}
          onToggleBookmarkVideo={(id) =>
            setVideos((prev) =>
              prev.map((v) => (v.id === id ? { ...v, bookmarked: !v.bookmarked } : v))
            )
          }
          onAddVideo={(vid) => {
            setVideos((prev) => [vid, ...prev]);
            appendAudit(`Published video lecture: ${vid.title}`, 'Video Portal');
          }}
          onDeleteVideo={(id) => {
            setVideos((prev) => prev.filter((v) => v.id !== id));
            appendAudit(`Deleted video lecture ${id}`, 'Video Portal');
          }}
        />
      )}

      {infrastructureAndEventsIds.includes(activeScreen) && (
        <InfrastructureAndEventsScreens
          screen={activeScreen}
          collegeConfig={collegeConfig}
          facilities={facilities}
          selectedFacility={selectedFacility}
          announcements={announcements}
          selectedAnnouncement={selectedAnnouncement}
          departments={departments}
          onNavigate={handleNavigate}
          onSelectFacility={setSelectedFacility}
          onSelectAnnouncement={setSelectedAnnouncement}
          onPublishAnnouncement={(ann) => {
            setAnnouncements((prev) => [ann, ...prev]);
            appendAudit(`Published campus circular: ${ann.title}`, 'Announcements');
          }}
          onSubmitFeedback={(fb) => {
            setFeedbackList((prev) => [fb, ...prev]);
            appendAudit(`Feedback submitted by ${fb.name} (${fb.category})`, 'Feedback');
          }}
        />
      )}

      {!publicAndAuthIds.includes(activeScreen) &&
        !studentAndAttendanceIds.includes(activeScreen) &&
        !academicsAndResearchIds.includes(activeScreen) &&
        !lmsAndExamsIds.includes(activeScreen) &&
        !infrastructureAndEventsIds.includes(activeScreen) && (
          <AdminAndManagementScreens
            screen={activeScreen}
            collegeConfig={collegeConfig}
            userRole={userRole}
            students={students}
            facultyList={facultyList}
            departments={departments}
            studyMaterials={studyMaterials}
            videos={videos}
            announcements={announcements}
            facilities={facilities}
            correctionRequests={correctionRequests}
            feedbackList={feedbackList}
            auditLogs={auditLogs}
            onNavigate={handleNavigate}
            onUpdateCollegeConfig={(cfg) => {
              setCollegeConfig(cfg);
              appendAudit('Updated institutional placeholders & attendance threshold', 'Settings');
            }}
            onApproveStudent={(id) => {
              setStudents((prev) =>
                prev.map((s) => (s.id === id ? { ...s, status: 'Active' } : s))
              );
              appendAudit(`Approved pending student enrollment ${id}`, 'Administration');
            }}
            onDeleteStudent={(id) => {
              setStudents((prev) => prev.filter((s) => s.id !== id));
              appendAudit(`Removed student record ${id}`, 'Administration');
            }}
            onDeleteFaculty={(id) => {
              setFacultyList((prev) => prev.filter((f) => f.id !== id));
              appendAudit(`Removed faculty record ${id}`, 'Administration');
            }}
            onDeleteMaterial={(id) =>
              setStudyMaterials((prev) => prev.filter((m) => m.id !== id))
            }
            onDeleteVideo={(id) => setVideos((prev) => prev.filter((v) => v.id !== id))}
            onResolveFeedback={(id) =>
              setFeedbackList((prev) =>
                prev.map((f) => (f.id === id ? { ...f, status: 'Resolved' } : f))
              )
            }
            onLogout={() => {
              setUserRole('guest');
              handleNavigate('public-home');
            }}
          />
        )}
    </NavigationShell>
  );
}
