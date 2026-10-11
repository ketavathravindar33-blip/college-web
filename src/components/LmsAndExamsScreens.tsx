import React, { useState } from 'react';
import {
  Bookmark,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  PlayCircle,
  Printer,
  Search,
  Trash2,
  Upload,
  Video,
} from 'lucide-react';
import {
  CollegeConfig,
  DepartmentCode,
  EducationalVideo,
  ExamResultSubject,
  ScreenId,
  StudentRecord,
  StudyMaterial,
} from '../types/campus';
import {
  EXAM_RESULTS_SEM5,
  SEMESTER_HISTORY,
  WEEKLY_TIMETABLE_DATA,
} from '../data/mockCampusData';

interface LmsAndExamsProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  currentStudent: StudentRecord;
  studyMaterials: StudyMaterial[];
  selectedMaterial: StudyMaterial;
  videos: EducationalVideo[];
  selectedVideo: EducationalVideo;
  onNavigate: (screen: ScreenId) => void;
  onSelectMaterial: (mat: StudyMaterial) => void;
  onToggleBookmarkMaterial: (id: string) => void;
  onUploadMaterial: (mat: StudyMaterial) => void;
  onDeleteMaterial: (id: string) => void;
  onSelectVideo: (vid: EducationalVideo) => void;
  onToggleBookmarkVideo: (id: string) => void;
  onAddVideo: (vid: EducationalVideo) => void;
  onDeleteVideo: (id: string) => void;
}

export const LmsAndExamsScreens: React.FC<LmsAndExamsProps> = ({
  screen,
  collegeConfig,
  currentStudent,
  studyMaterials,
  selectedMaterial,
  videos,
  selectedVideo,
  onNavigate,
  onSelectMaterial,
  onToggleBookmarkMaterial,
  onUploadMaterial,
  onDeleteMaterial,
  onSelectVideo,
  onToggleBookmarkVideo,
  onAddVideo,
  onDeleteVideo,
}) => {
  // Notes filter state
  const [notesSearch, setNotesSearch] = useState('');
  const [notesDept, setNotesDept] = useState('ALL');
  const [notesSem, setNotesSem] = useState('ALL');
  const [notesCategory, setNotesCategory] = useState('ALL');
  const [onlyBookmarkedNotes, setOnlyBookmarkedNotes] = useState(false);

  // Faculty Upload Notes form state
  const [upTitle, setUpTitle] = useState('');
  const [upSubject, setUpSubject] = useState('Distributed Systems & Cloud Computing');
  const [upCode, setUpCode] = useState('CS501');
  const [upDept, setUpDept] = useState<DepartmentCode>('CSE');
  const [upSem, setUpSem] = useState('Semester V');
  const [upUnit, setUpUnit] = useState('Unit IV');
  const [upCat, setUpCat] = useState<StudyMaterial['category']>('Unit Notes');
  const [upSummary, setUpSummary] = useState('');
  const [upSuccess, setUpSuccess] = useState(false);

  // Video filter state
  const [vidSearch, setVidSearch] = useState('');
  const [vidDept, setVidDept] = useState('ALL');
  const [vidTopic, setVidTopic] = useState('ALL');
  const [onlySavedVideos, setOnlySavedVideos] = useState(false);

  // Faculty Add Video state
  const [newVidTitle, setNewVidTitle] = useState('');
  const [newVidSub, setNewVidSub] = useState('CS501: Distributed Systems');
  const [newVidTopic, setNewVidTopic] = useState('Cloud Virtualization & Containers');
  const [newVidDept, setNewVidDept] = useState<DepartmentCode>('CSE');
  const [newVidUrl, setNewVidUrl] = useState('https://www.youtube.com/embed/IujMVjKvWP4');
  const [newVidDuration, setNewVidDuration] = useState('42:10');
  const [newVidDesc, setNewVidDesc] = useState('');
  const [vidAddedSuccess, setVidAddedSuccess] = useState(false);

  // Timetable filters
  const [ttDeptFilter, setTtDeptFilter] = useState('CSE');
  const [ttSecFilter, setTtSecFilter] = useState('Section A');

  // SCREEN 22: NOTES LISTING PAGE
  if (screen === 'notes-listing') {
    const filteredNotes = studyMaterials.filter((m) => {
      const matchQuery =
        m.title.toLowerCase().includes(notesSearch.toLowerCase()) ||
        m.subject.toLowerCase().includes(notesSearch.toLowerCase()) ||
        m.subjectCode.toLowerCase().includes(notesSearch.toLowerCase());
      const matchDept = notesDept === 'ALL' || m.department === notesDept;
      const matchSem = notesSem === 'ALL' || m.semester === notesSem;
      const matchCat = notesCategory === 'ALL' || m.category === notesCategory;
      const matchBook = !onlyBookmarkedNotes || Boolean(m.bookmarked);
      return matchQuery && matchDept && matchSem && matchCat && matchBook;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #22 · Digital Study Materials & Academic Repository
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Subject Notes, Lecture Slides, Question Papers & Lab Manuals
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter by department, semester, document category, or bookmarked items.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyBookmarkedNotes(!onlyBookmarkedNotes)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                onlyBookmarkedNotes
                  ? 'bg-[#0284C7] text-white border-[#0284C7]'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Saved Bookmarks Only
            </button>
            <button
              onClick={() => onNavigate('faculty-upload-notes')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              + Faculty Upload Interface
            </button>
          </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <input
            type="text"
            value={notesSearch}
            onChange={(e) => setNotesSearch(e.target.value)}
            placeholder="Search by document title or subject code..."
            className="px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={notesDept}
            onChange={(e) => setNotesDept(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All 7 Departments</option>
            <option value="CSE">CSE</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="CSE (Data Science)">CSE (Data Science)</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          <select
            value={notesSem}
            onChange={(e) => setNotesSem(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Semesters</option>
            <option value="Semester V">Semester V</option>
            <option value="Semester VI">Semester VI</option>
          </select>
          <select
            value={notesCategory}
            onChange={(e) => setNotesCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Document Categories</option>
            <option value="Unit Notes">Unit Notes</option>
            <option value="Subject Notes">Subject Notes</option>
            <option value="Lecture Slides">Lecture Slides</option>
            <option value="Question Papers">Question Papers</option>
            <option value="Lab Manual">Lab Manual</option>
            <option value="Syllabus">Syllabus</option>
            <option value="Assignment Sheet">Assignment Sheet</option>
            <option value="Reference Book">Reference Book</option>
          </select>
        </div>

        {/* MATERIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0284C7] transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                  <span>
                    <strong className="text-[#0284C7]">{mat.subjectCode}</strong> · {mat.department} · {mat.unit} · {mat.category}
                  </span>
                  <span>{mat.fileSize} · {mat.pages} Pages</span>
                </div>
                <h2 className="text-base font-bold text-[#0A192F]">{mat.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{mat.summary}</p>
                <div className="text-xs text-slate-500 pt-1">
                  Topics: {mat.topicsCovered.join(' · ')}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-slate-600 tabular-nums">
                  By <span className="font-semibold text-[#0A192F]">{mat.facultyName}</span> · {mat.uploadDate}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleBookmarkMaterial(mat.id)}
                    className={`px-2.5 py-1.5 rounded-lg border font-semibold cursor-pointer ${
                      mat.bookmarked
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {mat.bookmarked ? '★ Saved' : '☆ Save'}
                  </button>
                  <button
                    onClick={() => {
                      onSelectMaterial(mat);
                      onNavigate('notes-detail-preview');
                    }}
                    className="px-3.5 py-1.5 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
                  >
                    PDF Preview & Download →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 23: NOTES DETAILS AND PDF PREVIEW
  if (screen === 'notes-detail-preview') {
    const handleSimulatedDownload = () => {
      const blob = new Blob(
        [
          `${collegeConfig.collegeName}\nAffiliated to ${collegeConfig.affiliatedUniversity}\n\nDocument: ${selectedMaterial.title}\nSubject: ${selectedMaterial.subjectCode} - ${selectedMaterial.subject}\nAuthor: ${selectedMaterial.facultyName}\nSummary:\n${selectedMaterial.summary}\n\nTopics Covered:\n- ${selectedMaterial.topicsCovered.join('\n- ')}`,
        ],
        { type: 'text/plain;charset=utf-8' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedMaterial.subjectCode}_${selectedMaterial.unit.replace(/\s+/g, '_')}_Notes.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #23 · Interactive Document Reader & PDF Preview
            </div>
            <h1 className="text-xl font-bold text-[#0A192F] mt-0.5">{selectedMaterial.title}</h1>
            <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {selectedMaterial.subjectCode} · {selectedMaterial.department} · Uploaded by {selectedMaterial.facultyName} on {selectedMaterial.uploadDate}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulatedDownload}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Document ({selectedMaterial.fileSize})</span>
            </button>
            <button
              onClick={() => onNavigate('notes-listing')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
            >
              ← All Notes
            </button>
          </div>
        </div>

        {/* SIMULATED HIGH-CONTRAST ACADEMIC PDF VIEWER */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="bg-white max-w-4xl mx-auto rounded-lg p-8 sm:p-12 shadow-lg space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between text-xs text-slate-500 tabular-nums">
              <span>{collegeConfig.collegeName} · Department of {selectedMaterial.department}</span>
              <span>Page 1 of {selectedMaterial.pages}</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                {selectedMaterial.subjectCode}: {selectedMaterial.subject} — {selectedMaterial.unit} ({selectedMaterial.category})
              </div>
              <h2 className="text-2xl font-bold text-[#0A192F]">{selectedMaterial.title}</h2>
              <div className="text-xs text-slate-600">
                Prepared & Verified by <strong>{selectedMaterial.facultyName}</strong>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-[#0A192F]">1. Executive Synopsis & Learning Objectives</div>
              <p className="text-slate-700 leading-relaxed">{selectedMaterial.summary}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#0A192F]">2. Core Syllabus Topics & Mathematical Formulations Covered</div>
              <ul className="list-decimal pl-5 space-y-1.5 text-slate-700">
                {selectedMaterial.topicsCovered.map((t, i) => (
                  <li key={i}>
                    <strong>{t}:</strong> Formal definition, system model invariants, complexity bounds, and worked university examination problems.
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs space-y-1">
              <div className="text-sky-400">Algorithm / Architectural Reference Snippet ({selectedMaterial.subjectCode})</div>
              <div>Require: Quorum intersection Q1 ∩ Q2 ≠ ∅ across N = 2f + 1 nodes</div>
              <div>Ensure: ∀ committed log entries (index, term), StateMachine[index] is deterministic.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 24: FACULTY UPLOAD NOTES PAGE
  if (screen === 'faculty-upload-notes') {
    const handleUpload = (e: React.FormEvent) => {
      e.preventDefault();
      if (!upTitle.trim()) return;
      onUploadMaterial({
        id: `mat-${Date.now()}`,
        title: upTitle,
        subject: upSubject,
        subjectCode: upCode,
        department: upDept,
        year: '3rd Year',
        semester: upSem,
        unit: upUnit,
        category: upCat,
        facultyName: 'Dr. Aravind Swaminathan',
        uploadDate: '2026-10-11',
        fileSize: '4.1 MB',
        pages: 45,
        summary: upSummary || 'Authorized lecture resource uploaded via Faculty LMS Console.',
        topicsCovered: ['Core Concepts', 'Worked Numerical Examples', 'University Exam Questions'],
        bookmarked: false,
      });
      setUpTitle('');
      setUpSummary('');
      setUpSuccess(true);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #24 · Authorized Faculty Study Material Management
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Upload, Categorize & Manage Educational Documents
            </h1>
          </div>
          <button
            onClick={() => onNavigate('notes-listing')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
          >
            ← Back to Student Notes Portal
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">Upload New Study Material</h2>
            <form onSubmit={handleUpload} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  value={upTitle}
                  onChange={(e) => setUpTitle(e.target.value)}
                  placeholder="e.g. Byzantine Fault Tolerance & PBFT Lecture Notes"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject Code</label>
                  <input
                    type="text"
                    value={upCode}
                    onChange={(e) => setUpCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={upCat}
                    onChange={(e) => setUpCat(e.target.value as StudyMaterial['category'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Unit Notes">Unit Notes</option>
                    <option value="Subject Notes">Subject Notes</option>
                    <option value="Lecture Slides">Lecture Slides</option>
                    <option value="Question Papers">Question Papers</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Assignment Sheet">Assignment Sheet</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={upDept}
                    onChange={(e) => setUpDept(e.target.value as DepartmentCode)}
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
                  <label className="block font-semibold text-slate-700 mb-1">Unit / Module</label>
                  <input
                    type="text"
                    value={upUnit}
                    onChange={(e) => setUpUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Synopsis / Description</label>
                <textarea
                  rows={3}
                  value={upSummary}
                  onChange={(e) => setUpSummary(e.target.value)}
                  placeholder="Describe syllabus coverage..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              {upSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold">
                  Document published to the Student Notes Repository!
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Publish PDF to Repository
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-[#0A192F] mb-4">
              Active Repository Files ({studyMaterials.length})
            </h2>
            <div className="space-y-3 text-xs">
              {studyMaterials.map((m) => (
                <div key={m.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-[#0A192F]">{m.title}</div>
                    <div className="text-slate-500 mt-0.5 tabular-nums">
                      {m.subjectCode} · {m.department} · {m.category} · {m.uploadDate}
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMaterial(m.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Remove Resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 25: VIDEO LEARNING PORTAL
  if (screen === 'video-portal') {
    const filteredVideos = videos.filter((v) => {
      const matchSearch =
        v.title.toLowerCase().includes(vidSearch.toLowerCase()) ||
        v.subject.toLowerCase().includes(vidSearch.toLowerCase()) ||
        v.topic.toLowerCase().includes(vidSearch.toLowerCase());
      const matchDept = vidDept === 'ALL' || v.department === vidDept;
      const matchSaved = !onlySavedVideos || Boolean(v.bookmarked);
      return matchSearch && matchDept && matchSaved;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #25 · Smart Campus Video Learning & Lecture Capture Portal
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Recorded Classroom Lectures & Laboratory Demonstrations ({videos.length})
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlySavedVideos(!onlySavedVideos)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer ${
                onlySavedVideos
                  ? 'bg-[#0284C7] text-white border-[#0284C7]'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Saved Videos Only
            </button>
            <button
              onClick={() => onNavigate('faculty-video-mgmt')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              + Faculty Video Studio
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <input
            type="text"
            value={vidSearch}
            onChange={(e) => setVidSearch(e.target.value)}
            placeholder="Search lecture videos by title, subject, or topic..."
            className="px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={vidDept}
            onChange={(e) => setVidDept(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All 7 Engineering Departments</option>
            <option value="CSE">CSE</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="CSE (Data Science)">CSE (Data Science)</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <div className="flex items-center justify-end text-slate-500 tabular-nums px-2">
            Watch History Tracked · {filteredVideos.filter((v) => v.watched).length} Watched
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#0284C7] transition-colors"
            >
              <div>
                <div className="bg-[#0A192F] p-5 text-white relative h-40 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-sky-300 tabular-nums">
                    <span>{vid.department} · {vid.unit}</span>
                    <span className="px-2 py-0.5 bg-slate-900/90 rounded">{vid.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-10 h-10 text-sky-400 shrink-0" />
                    <div className="text-sm font-bold line-clamp-2">{vid.title}</div>
                  </div>
                  <div className="text-[11px] text-slate-300">{vid.subject}</div>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="text-slate-500">
                    Topic: <strong className="text-slate-800">{vid.topic}</strong> · By {vid.facultyName}
                  </div>
                  <p className="text-slate-600 line-clamp-2">{vid.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                      <span>Learning Progress</span>
                      <span>{vid.progressPercent}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: `${vid.progressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onToggleBookmarkVideo(vid.id)}
                  className="font-semibold text-slate-600 hover:text-[#0A192F] cursor-pointer"
                >
                  {vid.bookmarked ? '★ Saved in Watchlist' : '☆ Save Lecture'}
                </button>
                <button
                  onClick={() => {
                    onSelectVideo(vid);
                    onNavigate('video-player');
                  }}
                  className="px-3.5 py-1.5 bg-[#0284C7] text-white font-semibold rounded-lg cursor-pointer"
                >
                  Watch Lecture →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 26: VIDEO PLAYER PAGE
  if (screen === 'video-player') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #26 · Lecture Video Classroom Player
            </div>
            <h1 className="text-xl font-bold text-[#0A192F] mt-0.5">{selectedVideo.title}</h1>
            <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {selectedVideo.subject} · {selectedVideo.unit} · Instructor: {selectedVideo.facultyName} · Duration: {selectedVideo.duration}
            </div>
          </div>
          <button
            onClick={() => onNavigate('video-portal')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
          >
            ← Back to Video Portal
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-video">
              <iframe
                src={selectedVideo.youtubeEmbedUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A192F]">Lecture Synopsis & Key Takeaways</h2>
                <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                  Progress: {selectedVideo.progressPercent}% Completed
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedVideo.description}</p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0A192F]">Related Course Videos</h3>
            <div className="space-y-3 text-xs">
              {videos.map((v) => (
                <button
                  key={v.id}
                  onClick={() => onSelectVideo(v)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                    v.id === selectedVideo.id
                      ? 'bg-[#0A192F] text-white border-[#0A192F]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="font-bold line-clamp-1">{v.title}</div>
                  <div className="text-[11px] opacity-75 mt-1 tabular-nums">
                    {v.subject} · {v.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 27: FACULTY VIDEO MANAGEMENT PAGE
  if (screen === 'faculty-video-mgmt') {
    const handleCreateVideo = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newVidTitle.trim()) return;
      onAddVideo({
        id: `vid-${Date.now()}`,
        title: newVidTitle,
        subject: newVidSub,
        topic: newVidTopic,
        department: newVidDept,
        semester: 'Semester V',
        unit: 'Unit IV',
        facultyName: 'Dr. Aravind Swaminathan',
        duration: newVidDuration,
        uploadDate: '2026-10-11',
        youtubeEmbedUrl: newVidUrl,
        description: newVidDesc || 'Recorded smart-classroom lecture session.',
        progressPercent: 0,
        bookmarked: false,
        watched: false,
      });
      setNewVidTitle('');
      setNewVidDesc('');
      setVidAddedSuccess(true);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #27 · Faculty Lecture Capture & Video Management Studio
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Publish & Manage Embedded Lecture Videos
            </h1>
          </div>
          <button
            onClick={() => onNavigate('video-portal')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
          >
            ← Back to Video Portal
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-[#0A192F]">Add Authorized Lecture Video</h2>
            <form onSubmit={handleCreateVideo} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Video Lecture Title *</label>
                <input
                  type="text"
                  value={newVidTitle}
                  onChange={(e) => setNewVidTitle(e.target.value)}
                  placeholder="e.g. Kubernetes Scheduler & Pod Affinity Internals"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject & Code</label>
                <input
                  type="text"
                  value={newVidSub}
                  onChange={(e) => setNewVidSub(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic</label>
                  <input
                    type="text"
                    value={newVidTopic}
                    onChange={(e) => setNewVidTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (MM:SS)</label>
                  <input
                    type="text"
                    value={newVidDuration}
                    onChange={(e) => setNewVidDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Authorized Embed URL (YouTube / Campus Media)</label>
                <input
                  type="url"
                  value={newVidUrl}
                  onChange={(e) => setNewVidUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lecture Description</label>
                <textarea
                  rows={3}
                  value={newVidDesc}
                  onChange={(e) => setNewVidDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              {vidAddedSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold">
                  Video lecture published to the Student Video Portal!
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
              >
                Publish Video Lecture
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="text-base font-bold text-[#0A192F]">Published Video Catalog ({videos.length})</h2>
            {videos.map((v) => (
              <div key={v.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[#0A192F]">{v.title}</div>
                  <div className="text-slate-500 mt-0.5 tabular-nums">
                    {v.subject} · {v.duration} · {v.uploadDate}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteVideo(v.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 28: STUDENT TIMETABLE
  if (screen === 'student-timetable') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #28 · Weekly Class & Laboratory Timetable (Student View)
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              B.Tech {ttDeptFilter} — Semester V ({ttSecFilter}) Master Schedule
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 no-print">
            <select
              value={ttDeptFilter}
              onChange={(e) => setTtDeptFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option value="CSE">CSE</option>
              <option value="CSE (AI & ML)">CSE (AI & ML)</option>
              <option value="ECE">ECE</option>
            </select>
            <select
              value={ttSecFilter}
              onChange={(e) => setTtSecFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option>Section A</option>
              <option>Section B</option>
            </select>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download / Print Timetable</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          {WEEKLY_TIMETABLE_DATA.map((dayRow) => (
            <div key={dayRow.day} className="border-b border-slate-100 last:border-b-0 pb-4 last:pb-0">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2">
                {dayRow.day}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {dayRow.slots.map((slot, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-mono text-[11px] text-slate-500">{slot.time}</div>
                    <div className="font-bold text-[#0A192F]">{slot.subject}</div>
                    <div className="text-slate-600">{slot.faculty} · {slot.room}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 29: FACULTY TIMETABLE
  if (screen === 'faculty-timetable') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #29 · Individual Faculty Teaching & Lab Load Schedule
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Dr. Aravind Swaminathan — Weekly Instructional Roster
            </h1>
          </div>
          <button
            onClick={() => onNavigate('faculty-attendance-mgmt')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
          >
            Mark Attendance for Active Slot →
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-4 font-semibold">Day of Week</th>
                <th className="py-3 px-4 font-semibold">Time Slot</th>
                <th className="py-3 px-4 font-semibold">Assigned Subject / Laboratory</th>
                <th className="py-3 px-4 font-semibold">Section</th>
                <th className="py-3 px-4 font-semibold">Room / Lab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-4 font-bold">Monday</td>
                <td className="py-3 px-4 tabular-nums">09:00 AM – 10:00 AM</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">CS501: Distributed Systems & Cloud</td>
                <td className="py-3 px-4">CSE-3A</td>
                <td className="py-3 px-4">LH-201</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">Monday</td>
                <td className="py-3 px-4 tabular-nums">02:15 PM – 04:15 PM</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">CS506L: Distributed Cloud Computing Lab</td>
                <td className="py-3 px-4">CSE-3A</td>
                <td className="py-3 px-4">Cloud Lab 204</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">Tuesday</td>
                <td className="py-3 px-4 tabular-nums">11:15 AM – 12:15 PM</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">CS302: Operating Systems Internals</td>
                <td className="py-3 px-4">CSE-2B</td>
                <td className="py-3 px-4">LH-104</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">Wednesday</td>
                <td className="py-3 px-4 tabular-nums">09:00 AM – 10:00 AM</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">CS501: Distributed Systems & Cloud</td>
                <td className="py-3 px-4">CSE-3A</td>
                <td className="py-3 px-4">LH-201</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">Friday</td>
                <td className="py-3 px-4 tabular-nums">10:00 AM – 11:00 AM</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">CS604: Cloud Computing Architecture</td>
                <td className="py-3 px-4">CSE-3B</td>
                <td className="py-3 px-4">LH-202</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 30: ACADEMIC CALENDAR
  if (screen === 'academic-calendar') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #30 · Institutional Academic Calendar (AY 2026–2027)
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Semester Dates, Internal Assessments, Holidays & Convocation Schedule
            </h1>
          </div>
          <button
            onClick={() => onNavigate('exam-timetable')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg cursor-pointer"
          >
            View Examination Timetable →
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-4 font-semibold">Academic Milestone / Event</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Start Date</th>
                <th className="py-3 px-4 font-semibold">End Date</th>
                <th className="py-3 px-4 font-semibold">Applicable Batches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Commencement of Odd Semester Classes</td>
                <td className="py-3 px-4 text-[#0284C7] font-semibold">Academic Term</td>
                <td className="py-3 px-4">2026-07-15</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">Sem III, V, VII</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Continuous Internal Assessment Test I (CIA-I)</td>
                <td className="py-3 px-4 text-amber-700 font-semibold">Internal Exam</td>
                <td className="py-3 px-4">2026-09-07</td>
                <td className="py-3 px-4">2026-09-12</td>
                <td className="py-3 px-4">All B.Tech & M.Tech</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">PRAGYAN 2026 National Technical Symposium & Hackathon</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">College Event</td>
                <td className="py-3 px-4">2026-10-25</td>
                <td className="py-3 px-4">2026-10-26</td>
                <td className="py-3 px-4">All 7 Departments</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Continuous Internal Assessment Test II (CIA-II)</td>
                <td className="py-3 px-4 text-amber-700 font-semibold">Internal Exam</td>
                <td className="py-3 px-4">2026-11-02</td>
                <td className="py-3 px-4">2026-11-07</td>
                <td className="py-3 px-4">All B.Tech & M.Tech</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Deepavali Festival Recess</td>
                <td className="py-3 px-4 text-slate-500 font-semibold">Gazetted Holiday</td>
                <td className="py-3 px-4">2026-11-08</td>
                <td className="py-3 px-4">2026-11-10</td>
                <td className="py-3 px-4">Entire Institution</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Last Instruction Day & Attendance Freezing</td>
                <td className="py-3 px-4 text-[#0284C7] font-semibold">Academic Term</td>
                <td className="py-3 px-4">2026-11-12</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">Sem III, V, VII</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">End-Semester Theory Examinations (Odd Sem)</td>
                <td className="py-3 px-4 text-red-600 font-semibold">University Exam</td>
                <td className="py-3 px-4">2026-11-16</td>
                <td className="py-3 px-4">2026-11-30</td>
                <td className="py-3 px-4">All Departments</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-[#0A192F]">Re-Opening for Even Semester (Spring 2027)</td>
                <td className="py-3 px-4 text-[#0284C7] font-semibold">Academic Term</td>
                <td className="py-3 px-4">2027-01-04</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">Sem II, IV, VI, VIII</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 31: EXAMINATION TIMETABLE
  if (screen === 'exam-timetable') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #31 · Office of the Controller of Examinations
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              End-Semester Theory & Practical Examination Schedule (Nov 2026)
            </h1>
          </div>
          <button
            onClick={() => onNavigate('student-results')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
          >
            View Marks & SGPA/CGPA Results →
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-4 font-semibold">Exam Date</th>
                <th className="py-3 px-4 font-semibold">Session & Timing</th>
                <th className="py-3 px-4 font-semibold">Subject Code</th>
                <th className="py-3 px-4 font-semibold">Subject Title</th>
                <th className="py-3 px-4 font-semibold">Exam Hall Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              <tr>
                <td className="py-3 px-4 font-bold">2026-11-16 (Mon)</td>
                <td className="py-3 px-4">FN · 09:30 AM – 12:30 PM</td>
                <td className="py-3 px-4 font-bold text-[#0284C7]">CS501</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">Distributed Systems & Cloud Computing</td>
                <td className="py-3 px-4">Block A · Hall 201</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">2026-11-18 (Wed)</td>
                <td className="py-3 px-4">FN · 09:30 AM – 12:30 PM</td>
                <td className="py-3 px-4 font-bold text-[#0284C7]">CS502</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">Compiler Design & Formal Languages</td>
                <td className="py-3 px-4">Block A · Hall 201</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">2026-11-20 (Fri)</td>
                <td className="py-3 px-4">FN · 09:30 AM – 12:30 PM</td>
                <td className="py-3 px-4 font-bold text-[#0284C7]">CS503</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">Computer Networks & TCP/IP Internals</td>
                <td className="py-3 px-4">Block A · Hall 202</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">2026-11-23 (Mon)</td>
                <td className="py-3 px-4">FN · 09:30 AM – 12:30 PM</td>
                <td className="py-3 px-4 font-bold text-[#0284C7]">AI504</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">Machine Learning Foundations (Elective-I)</td>
                <td className="py-3 px-4">Innovation Block · Hall 103</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">2026-11-25 (Wed)</td>
                <td className="py-3 px-4">FN · 09:30 AM – 12:30 PM</td>
                <td className="py-3 px-4 font-bold text-[#0284C7]">CS505</td>
                <td className="py-3 px-4 font-semibold text-[#0A192F]">Software Engineering & DevOps Studio</td>
                <td className="py-3 px-4">Block A · Hall 201</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SCREEN 32: STUDENT RESULTS PAGE
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            Screen #32 · Official University Examination Results & Grade Transcript
          </div>
          <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
            {currentStudent.name} ({currentStudent.rollNumber}) — SGPA & CGPA Statement
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {collegeConfig.collegeName} · Affiliated to {collegeConfig.affiliatedUniversity}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg flex items-center gap-1.5 shrink-0 cursor-pointer no-print"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Download / Print Official Marksheet</span>
        </button>
      </div>

      {/* SUMMARY KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">Semester Grade Point Average (SGPA)</div>
          <div className="text-3xl font-bold text-[#0284C7] mt-1">{currentStudent.sgpa} / 10.0</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">First Class with Distinction</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">Cumulative GPA (CGPA)</div>
          <div className="text-3xl font-bold text-[#0A192F] mt-1">{currentStudent.cgpa} / 10.0</div>
          <div className="text-xs text-slate-500 mt-1">83 Credits Earned</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">Internal Assessment Average</div>
          <div className="text-3xl font-bold text-[#0A192F] mt-1">93.4%</div>
          <div className="text-xs text-slate-500 mt-1">CIA-I + CIA-II + Assignments</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500">Result Status</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">ALL PASS</div>
          <div className="text-xs text-slate-500 mt-1">Zero Arrears / Backlogs</div>
        </div>
      </div>

      {/* SUBJECT-WISE MARKS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-[#0A192F] mb-4">
          Subject-Wise Internal & End-Semester Examination Marks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-3 px-3 font-semibold">Subject Code</th>
                <th className="py-3 px-3 font-semibold">Subject Title</th>
                <th className="py-3 px-3 font-semibold text-right">Credits</th>
                <th className="py-3 px-3 font-semibold text-right">Internal (30)</th>
                <th className="py-3 px-3 font-semibold text-right">External (70)</th>
                <th className="py-3 px-3 font-semibold text-right">Total (100)</th>
                <th className="py-3 px-3 font-semibold text-center">Letter Grade</th>
                <th className="py-3 px-3 font-semibold text-right">Grade Points</th>
                <th className="py-3 px-3 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {EXAM_RESULTS_SEM5.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-[#0284C7]">{sub.code}</td>
                  <td className="py-3 px-3 font-semibold text-[#0A192F] font-sans">{sub.name}</td>
                  <td className="py-3 px-3 text-right">{sub.credits}</td>
                  <td className="py-3 px-3 text-right">{sub.internalMarks}</td>
                  <td className="py-3 px-3 text-right">{sub.externalMarks}</td>
                  <td className="py-3 px-3 text-right font-bold text-[#0A192F]">{sub.totalMarks}</td>
                  <td className="py-3 px-3 text-center font-bold text-[#0284C7]">{sub.grade}</td>
                  <td className="py-3 px-3 text-right font-bold">{sub.gradePoints}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700 font-sans">{sub.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEMESTER HISTORY BY TERM */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-bold text-[#0A192F] mb-4">Cumulative Result History by Semester</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs tabular-nums">
          {SEMESTER_HISTORY.map((h) => (
            <div key={h.semester} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-[#0A192F] font-sans">{h.semester}</div>
              <div>Credits Registered: <strong>{h.credits}</strong></div>
              <div>SGPA: <strong className="text-[#0284C7]">{h.sgpa}</strong> · CGPA: <strong>{h.cgpa}</strong></div>
              <div className="text-emerald-700 font-semibold font-sans">{h.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
