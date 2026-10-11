export type UserRole = 'guest' | 'student' | 'faculty' | 'principal' | 'admin';

export type ScreenId =
  | 'public-home'
  | 'about-college'
  | 'login'
  | 'forgot-password'
  | 'reset-password'
  | 'student-register'
  | 'faculty-register'
  | 'register-success'
  | 'student-dashboard'
  | 'student-profile'
  | 'student-attendance-overview'
  | 'subject-attendance-details'
  | 'attendance-calendar'
  | 'faculty-attendance-mgmt'
  | 'faculty-directory'
  | 'faculty-profile-details'
  | 'principal-profile'
  | 'department-listing'
  | 'department-detail'
  | 'research-portal'
  | 'research-project-details'
  | 'notes-listing'
  | 'notes-detail-preview'
  | 'faculty-upload-notes'
  | 'video-portal'
  | 'video-player'
  | 'faculty-video-mgmt'
  | 'student-timetable'
  | 'faculty-timetable'
  | 'academic-calendar'
  | 'exam-timetable'
  | 'student-results'
  | 'infrastructure-overview'
  | 'infrastructure-detail'
  | 'campus-gallery'
  | 'announcements-listing'
  | 'announcement-details'
  | 'contact-feedback'
  | 'faculty-dashboard'
  | 'principal-dashboard'
  | 'admin-dashboard'
  | 'student-mgmt'
  | 'faculty-mgmt'
  | 'department-mgmt'
  | 'academic-resource-mgmt'
  | 'user-permissions-mgmt'
  | 'reports-analytics'
  | 'user-settings';

export type DepartmentCode =
  | 'CSE'
  | 'CSE (AI & ML)'
  | 'CSE (Data Science)'
  | 'ECE'
  | 'EEE'
  | 'Mechanical Engineering'
  | 'Civil Engineering';

export interface CollegeConfig {
  collegeName: string;
  affiliatedUniversity: string;
  collegeAddress: string;
  principalName: string;
  principalTitle: string;
  establishedYear: string;
  naacGrade: string;
  email: string;
  phone: string;
  minAttendanceThreshold: number;
}

export interface DepartmentInfo {
  id: string;
  code: DepartmentCode;
  name: string;
  shortDesc: string;
  introduction: string;
  vision: string;
  mission: string[];
  hodName: string;
  hodDesignation: string;
  hodEmail: string;
  hodQualification: string;
  studentCount: number;
  facultyCount: number;
  labsCount: number;
  placementRate: string;
  programsOffered: { degree: string; duration: string; intake: number }[];
  curriculumHighlights: { semester: string; subjects: string[] }[];
  laboratories: { name: string; location: string; equipment: string }[];
  researchAreas: string[];
  projectsAchievements: { title: string; team: string; year: string; award: string }[];
  workshopsSeminars: { title: string; date: string; speaker: string }[];
  publicationsCount: number;
  studentClubs: { name: string; focus: string; members: number }[];
  documents: { title: string; size: string; updated: string }[];
  contactRoom: string;
  contactPhone: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: DepartmentCode;
  qualifications: string;
  specialization: string;
  experienceYears: number;
  researchInterests: string[];
  publications: { title: string; journal: string; year: number }[];
  email: string;
  officeLocation: string;
  officeHours: string;
  coursesTaught: string[];
  avatarInitials: string;
  timetable: { day: string; time: string; subject: string; room: string; section: string }[];
}

export interface StudentRecord {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: DepartmentCode;
  course: string;
  year: string;
  semester: string;
  section: string;
  admissionYear: string;
  overallAttendance: number;
  cgpa: number;
  sgpa: number;
  status: 'Active' | 'Probation' | 'Graduated' | 'Pending Approval';
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  conducted: number;
  attended: number;
  missed: number;
  percentage: number;
  semester: string;
}

export interface DailyAttendanceRecord {
  id: string;
  date: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  status: 'Present' | 'Absent' | 'On Duty / Leave';
  period: string;
}

export interface AttendanceCorrectionRequest {
  id: string;
  studentName: string;
  rollNumber: string;
  date: string;
  subjectName: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  department: DepartmentCode;
  year: string;
  semester: string;
  unit: string;
  category:
    | 'Subject Notes'
    | 'Unit Notes'
    | 'Lecture Slides'
    | 'Question Papers'
    | 'Syllabus'
    | 'Lab Manual'
    | 'Assignment Sheet'
    | 'Practical Record'
    | 'Reference Book';
  facultyName: string;
  uploadDate: string;
  fileSize: string;
  pages: number;
  summary: string;
  topicsCovered: string[];
  bookmarked?: boolean;
}

export interface EducationalVideo {
  id: string;
  title: string;
  subject: string;
  topic: string;
  department: DepartmentCode;
  semester: string;
  unit: string;
  facultyName: string;
  duration: string;
  uploadDate: string;
  youtubeEmbedUrl: string;
  description: string;
  progressPercent: number;
  bookmarked?: boolean;
  watched?: boolean;
}

export interface ResearchProject {
  id: string;
  title: string;
  department: DepartmentCode;
  researchArea: string;
  principalInvestigator: string;
  studentResearchers: string[];
  fundingAgency: string;
  grantAmount: string;
  publicationYear: number;
  status: 'Ongoing' | 'Completed' | 'Grant Approved' | 'Patent Filed';
  abstract: string;
  labCenter: string;
  patentNumber?: string;
  deliverables: string[];
}

export interface InfrastructureFacility {
  id: string;
  number: number;
  name: string;
  category: 'Academic' | 'Laboratories' | 'Library & Auditorium' | 'Campus Life & Support' | 'Research & Network';
  shortDesc: string;
  fullDescription: string;
  equipment: string[];
  capacity: string;
  operatingHours: string;
  location: string;
  inCharge: string;
  imageKey: 'campus' | 'lab' | 'library' | 'auditorium';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category:
    | 'College Notice'
    | 'Examination'
    | 'Department Notice'
    | 'Workshop'
    | 'Seminar'
    | 'Technical Event'
    | 'Cultural Festival'
    | 'Placement Drive'
    | 'Internship'
    | 'Scholarship'
    | 'Holiday';
  department: DepartmentCode | 'All Departments';
  publishDate: string;
  deadline?: string;
  important: boolean;
  summary: string;
  content: string;
  attachmentName?: string;
  registrationLink?: string;
  issuedBy: string;
}

export interface ExamResultSubject {
  code: string;
  name: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grade: string;
  gradePoints: number;
  status: 'Pass' | 'Distinction';
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  role: string;
  category: string;
  message: string;
  date: string;
  status: 'Open' | 'Reviewed' | 'Resolved';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  module: string;
}
