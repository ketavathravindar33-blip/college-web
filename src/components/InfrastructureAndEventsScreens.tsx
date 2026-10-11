import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
} from 'lucide-react';
import {
  AnnouncementItem,
  CollegeConfig,
  DepartmentCode,
  DepartmentInfo,
  FeedbackSubmission,
  InfrastructureFacility,
  ScreenId,
} from '../types/campus';
import { CAMPUS_IMAGES } from '../data/mockCampusData';

interface InfrastructureAndEventsProps {
  screen: ScreenId;
  collegeConfig: CollegeConfig;
  facilities: InfrastructureFacility[];
  selectedFacility: InfrastructureFacility;
  announcements: AnnouncementItem[];
  selectedAnnouncement: AnnouncementItem;
  departments: DepartmentInfo[];
  onNavigate: (screen: ScreenId) => void;
  onSelectFacility: (fac: InfrastructureFacility) => void;
  onSelectAnnouncement: (ann: AnnouncementItem) => void;
  onPublishAnnouncement: (ann: AnnouncementItem) => void;
  onSubmitFeedback: (fb: FeedbackSubmission) => void;
}

export const InfrastructureAndEventsScreens: React.FC<InfrastructureAndEventsProps> = ({
  screen,
  collegeConfig,
  facilities,
  selectedFacility,
  announcements,
  selectedAnnouncement,
  departments,
  onNavigate,
  onSelectFacility,
  onSelectAnnouncement,
  onPublishAnnouncement,
  onSubmitFeedback,
}) => {
  // Infrastructure category filter
  const [infCatFilter, setInfCatFilter] = useState('ALL');
  const [infSearch, setInfSearch] = useState('');

  // Announcements filter & publish form state
  const [annSearch, setAnnSearch] = useState('');
  const [annCatFilter, setAnnCatFilter] = useState('ALL');
  const [annDeptFilter, setAnnDeptFilter] = useState('ALL');
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCat, setNewAnnCat] = useState<AnnouncementItem['category']>('College Notice');
  const [newAnnDept, setNewAnnDept] = useState<AnnouncementItem['department']>('All Departments');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnImportant, setNewAnnImportant] = useState(false);
  const [annPublishedMsg, setAnnPublishedMsg] = useState(false);

  // Contact & Feedback form state
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbRole, setFbRole] = useState('Student');
  const [fbCategory, setFbCategory] = useState('Academic & Curriculum');
  const [fbMessage, setFbMessage] = useState('');
  const [fbSuccess, setFbSuccess] = useState(false);

  // SCREEN 33: COLLEGE INFRASTRUCTURE OVERVIEW (ALL 22 FACILITIES)
  if (screen === 'infrastructure-overview') {
    const filteredFacilities = facilities.filter((f) => {
      const matchCat = infCatFilter === 'ALL' || f.category === infCatFilter;
      const matchSearch =
        f.name.toLowerCase().includes(infSearch.toLowerCase()) ||
        f.shortDesc.toLowerCase().includes(infSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="bg-[#0A192F] text-white rounded-xl p-8 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Screen #33 · Complete 22-Facility Campus Infrastructure Directory
            </div>
            <h1 className="text-3xl font-bold">
              World-Class Engineering Laboratories, Libraries & Residential Amenities
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Inspect all 22 dedicated campus facilities at {collegeConfig.collegeName} — from the NVIDIA DGX AI Supercomputing Cluster and 5-Axis CNC Workshop to the 45,000 sq.ft Central Library, Hostels, and 24x7 Medical Center.
            </p>
          </div>
          <button
            onClick={() => onNavigate('campus-gallery')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0284C7] hover:bg-sky-500 rounded-lg shrink-0 cursor-pointer"
          >
            Open Campus Photo Gallery →
          </button>
        </div>

        {/* FILTER CONTROLS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'Academic', 'Laboratories', 'Library & Auditorium', 'Campus Life & Support', 'Research & Network'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setInfCatFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    infCatFilter === cat
                      ? 'bg-[#0A192F] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All 22 Facilities' : cat}
                </button>
              )
            )}
          </div>
          <input
            type="text"
            value={infSearch}
            onChange={(e) => setInfSearch(e.target.value)}
            placeholder="Filter 22 facilities by name or equipment..."
            className="w-full md:w-72 px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>

        {/* 22 FACILITIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#0284C7] transition-colors"
            >
              <div>
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={CAMPUS_IMAGES[fac.imageKey]}
                    alt={fac.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A192F]/90 text-white text-[11px] font-bold rounded tabular-nums">
                    Facility #{fac.number} of 22
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-xs text-[#0284C7] font-semibold">
                    {fac.category} · {fac.location}
                  </div>
                  <h2 className="text-base font-bold text-[#0A192F]">{fac.name}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{fac.shortDesc}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-500 tabular-nums">
                  <span>Capacity: {fac.capacity}</span>
                </div>
                <button
                  onClick={() => {
                    onSelectFacility(fac);
                    onNavigate('infrastructure-detail');
                  }}
                  className="w-full py-2 px-3 bg-[#0A192F] hover:bg-slate-800 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Facility #{fac.number} Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 34: INDIVIDUAL INFRASTRUCTURE DETAILS
  if (screen === 'infrastructure-detail') {
    return (
      <div className="p-6 space-y-6">
        {/* QUICK JUMP SELECTOR FOR ALL 22 FACILITIES */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 px-2 shrink-0">Switch Facility (1–22):</span>
          {facilities.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFacility(f)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                selectedFacility.id === f.id
                  ? 'bg-[#0A192F] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f.number}. {f.name.split(' ')[0]} {f.name.split(' ')[1]}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 h-80 lg:h-auto bg-slate-100">
              <img
                src={CAMPUS_IMAGES[selectedFacility.imageKey]}
                alt={selectedFacility.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] tabular-nums">
                  Screen #34 · Facility #{selectedFacility.number} of 22 · {selectedFacility.category}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">{selectedFacility.name}</h1>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedFacility.fullDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 block">Seating / Operational Capacity</span>
                  <span className="font-bold text-[#0A192F] tabular-nums">{selectedFacility.capacity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Operating Hours</span>
                  <span className="font-bold text-[#0A192F]">{selectedFacility.operatingHours}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Campus Location</span>
                  <span className="font-bold text-[#0284C7]">{selectedFacility.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Faculty / Officer In-Charge</span>
                  <span className="font-bold text-[#0A192F]">{selectedFacility.inCharge}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-200 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-bold text-[#0A192F] mb-3">Installed Hardware, Instruments & Specifications</h2>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedFacility.equipment.map((eq, i) => (
                  <li key={i} className="p-2.5 bg-white rounded-lg border border-slate-200 font-semibold">
                    • {eq}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0A192F] mb-3">Related Campus Infrastructure</h2>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {facilities.slice(0, 4).map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectFacility(rel)}
                      className="p-3 bg-white rounded-lg border border-slate-200 hover:border-[#0284C7] text-left font-semibold text-[#0A192F] cursor-pointer"
                    >
                      #{rel.number}. {rel.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => onNavigate('infrastructure-overview')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
                >
                  ← Return to All 22 Facilities Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 35: CAMPUS GALLERY
  if (screen === 'campus-gallery') {
    const galleryItems = [
      { title: 'Main Academic Quadrangle & Sandstone Facade', category: 'Architecture', img: CAMPUS_IMAGES.campus, date: 'Oct 2026' },
      { title: 'NVIDIA DGX A100 & Autonomous Robotics Arena', category: 'Laboratories', img: CAMPUS_IMAGES.lab, date: 'Sep 2026' },
      { title: '45,000 sq.ft Double-Height Central Library Reading Hall', category: 'Knowledge Center', img: CAMPUS_IMAGES.library, date: 'Oct 2026' },
      { title: '1,200-Seat Grand Convocation & Cultural Auditorium', category: 'Auditorium & Events', img: CAMPUS_IMAGES.auditorium, date: 'Aug 2026' },
      { title: 'Principal’s Academic Senate & Conference Chamber', category: 'Leadership', img: CAMPUS_IMAGES.principal, date: 'Oct 2026' },
      { title: 'Smart India Hackathon & PRAGYAN Robotics Finale', category: 'Student Innovation', img: CAMPUS_IMAGES.lab, date: 'Sep 2026' },
    ];

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #35 · Visual Archive & Campus Life Showcase
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              {collegeConfig.collegeName} — Campus Life, Labs & Convocation Gallery
            </h1>
          </div>
          <button
            onClick={() => onNavigate('infrastructure-overview')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] rounded-lg cursor-pointer"
          >
            Explore All 22 Facilities →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-56 bg-slate-100 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-[#0284C7] font-semibold tabular-nums">
                  {item.category} · {item.date}
                </div>
                <h2 className="text-base font-bold text-[#0A192F] mt-1">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SCREEN 36: ANNOUNCEMENTS LISTING
  if (screen === 'announcements-listing') {
    const filteredAnnouncements = announcements.filter((a) => {
      const matchQuery =
        a.title.toLowerCase().includes(annSearch.toLowerCase()) ||
        a.summary.toLowerCase().includes(annSearch.toLowerCase());
      const matchCat = annCatFilter === 'ALL' || a.category === annCatFilter;
      const matchDept = annDeptFilter === 'ALL' || a.department === annDeptFilter;
      return matchQuery && matchCat && matchDept;
    });

    const handlePublish = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newAnnTitle.trim()) return;
      onPublishAnnouncement({
        id: `ann-${Date.now()}`,
        title: newAnnTitle,
        category: newAnnCat,
        department: newAnnDept,
        publishDate: '2026-10-11',
        deadline: '2026-11-05',
        important: newAnnImportant,
        summary: newAnnSummary || 'Official circular published via Smart Campus Notice Board.',
        content: newAnnSummary || 'Full circular text verified by the Registrar and Principal Office.',
        issuedBy: 'Office of the Principal & Registrar',
      });
      setNewAnnTitle('');
      setNewAnnSummary('');
      setAnnPublishedMsg(true);
    };

    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Screen #36 · Official Circulars, Placements, Hackathons & Exam Notices
            </div>
            <h1 className="text-2xl font-bold text-[#0A192F] mt-0.5">
              Campus Announcements & Events Bulletin ({announcements.length})
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <input
            type="text"
            value={annSearch}
            onChange={(e) => setAnnSearch(e.target.value)}
            placeholder="Search circulars by title or keyword..."
            className="px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={annCatFilter}
            onChange={(e) => setAnnCatFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Notice Categories</option>
            <option value="Examination">Examination</option>
            <option value="Placement Drive">Placement Drive</option>
            <option value="Technical Event">Technical Event</option>
            <option value="Workshop">Workshop</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Cultural Festival">Cultural Festival</option>
            <option value="Internship">Internship</option>
            <option value="Holiday">Holiday</option>
          </select>
          <select
            value={annDeptFilter}
            onChange={(e) => setAnnDeptFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">All Departments</option>
            <option value="All Departments">Institution-Wide</option>
            <option value="CSE">CSE</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="ECE">ECE</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {filteredAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white rounded-xl border border-slate-200 p-6 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 tabular-nums">
                  <span>
                    <strong className="text-[#0284C7]">{ann.category}</strong> · {ann.department} · Published {ann.publishDate}
                  </span>
                  {ann.important && (
                    <span className="font-bold text-amber-700">★ Priority Notice</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-[#0A192F]">{ann.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.summary}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Issued by: {ann.issuedBy}</span>
                  <button
                    onClick={() => {
                      onSelectAnnouncement(ann);
                      onNavigate('announcement-details');
                    }}
                    className="px-3.5 py-1.5 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
                  >
                    Open Full Circular →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6 space-y-4 h-fit">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
              Authorized Circular Broadcast
            </div>
            <h3 className="text-base font-bold text-[#0A192F]">Publish New Announcement</h3>
            <form onSubmit={handlePublish} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Circular Title *</label>
                <input
                  type="text"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="Enter circular headline"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newAnnCat}
                  onChange={(e) => setNewAnnCat(e.target.value as AnnouncementItem['category'])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="College Notice">College Notice</option>
                  <option value="Examination">Examination</option>
                  <option value="Placement Drive">Placement Drive</option>
                  <option value="Technical Event">Technical Event</option>
                  <option value="Scholarship">Scholarship</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary & Details</label>
                <textarea
                  rows={3}
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAnnImportant}
                  onChange={(e) => setNewAnnImportant(e.target.checked)}
                />
                <span>Mark as Priority Institutional Notice</span>
              </label>
              {annPublishedMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold">
                  Circular published to Campus Bulletin!
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg cursor-pointer"
              >
                Broadcast Announcement
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 37: ANNOUNCEMENT DETAILS
  if (screen === 'announcement-details') {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
                Screen #37 · Official Circular & Attachment View
              </div>
              <h1 className="text-2xl font-bold text-[#0A192F] mt-1">{selectedAnnouncement.title}</h1>
              <div className="text-xs text-slate-500 mt-1 tabular-nums">
                Category: {selectedAnnouncement.category} · Department: {selectedAnnouncement.department} · Published: {selectedAnnouncement.publishDate}
              </div>
            </div>
            <button
              onClick={() => onNavigate('announcements-listing')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg shrink-0 cursor-pointer"
            >
              ← All Announcements
            </button>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-4">
            <p className="font-semibold text-[#0A192F]">{selectedAnnouncement.summary}</p>
            <p>{selectedAnnouncement.content}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Authenticated Signatory:</span>{' '}
              <strong className="text-[#0A192F]">{selectedAnnouncement.issuedBy}</strong>
            </div>
            {selectedAnnouncement.attachmentName && (
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#0284C7] text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedAnnouncement.attachmentName}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 38: CONTACT AND FEEDBACK PAGE
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbName.trim() || !fbMessage.trim()) return;
    onSubmitFeedback({
      id: `fb-${Date.now()}`,
      name: fbName,
      email: fbEmail || 'visitor@smartcampus.edu.in',
      role: fbRole,
      category: fbCategory,
      message: fbMessage,
      date: '2026-10-11',
      status: 'Open',
    });
    setFbName('');
    setFbMessage('');
    setFbSuccess(true);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white rounded-xl border border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0284C7]">
            Screen #38 · Institutional Contact Directory, Map & Grievance Feedback
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">
            Connect with {collegeConfig.collegeName}
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Affiliated to {collegeConfig.affiliatedUniversity}. Reach out to our Admissions Cell, Examination Controller, or Departmental HODs.
          </p>

          <div className="space-y-3 text-xs pt-2">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#0A192F]">Campus Postal Address</div>
              <div className="text-slate-600 mt-0.5">{collegeConfig.collegeAddress}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 tabular-nums">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0A192F]">Central Switchboard</div>
                <div className="text-slate-600 mt-0.5">{collegeConfig.phone}</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0A192F]">Official Helpdesk Email</div>
                <div className="text-slate-600 mt-0.5">{collegeConfig.email}</div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CAMPUS MAP PLACEHOLDER */}
          <div className="p-6 rounded-xl bg-[#0A192F] text-white border border-slate-800 space-y-2">
            <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Campus GIS & Wayfinding Coordinates
            </div>
            <div className="text-sm font-bold">
              {collegeConfig.collegeName} — 65-Acre Main Highway Corridor
            </div>
            <p className="text-xs text-slate-300">
              17.4452° N, 78.3489° E · Nearest Metro Station: University Tech Park (1.2 km) · College Bus Bay: Gate #2.
            </p>
          </div>
        </div>

        {/* CONTACT & FEEDBACK SUBMISSION FORM */}
        <div className="lg:col-span-6 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0A192F]">Submit Enquiry or Institutional Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={fbName}
                  onChange={(e) => setFbName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={fbEmail}
                  onChange={(e) => setFbEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Stakeholder Role</label>
                <select
                  value={fbRole}
                  onChange={(e) => setFbRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option>Student</option>
                  <option>Parent / Guardian</option>
                  <option>Faculty Member</option>
                  <option>Industry Recruiter</option>
                  <option>Alumni / Visitor</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Category</label>
                <select
                  value={fbCategory}
                  onChange={(e) => setFbCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option>Admissions Enquiry</option>
                  <option>Academic & Curriculum</option>
                  <option>Infrastructure & Laboratories</option>
                  <option>Hostel & Transport</option>
                  <option>Examinations & Transcripts</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message / Feedback Details *</label>
              <textarea
                rows={4}
                value={fbMessage}
                onChange={(e) => setFbMessage(e.target.value)}
                placeholder="Write your query or suggestion..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
              />
            </div>
            {fbSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-semibold">
                Thank you! Your feedback has been logged and routed to the Administrator Dashboard.
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#0A192F] text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Submit Official Enquiry / Feedback
            </button>
          </form>
        </div>
      </div>

      {/* DEPARTMENT CONTACT DIRECTORY & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-bold text-[#0A192F] mb-4">7 Engineering Departments Contact Directory</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Department</th>
                <th className="py-2.5 px-3 font-semibold">Head of Department</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold">Extension</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {departments.map((d) => (
                <tr key={d.id}>
                  <td className="py-2.5 px-3 font-bold text-[#0284C7]">{d.code}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold">{d.hodName}</td>
                  <td className="py-2.5 px-3 font-sans">{d.contactRoom}</td>
                  <td className="py-2.5 px-3">{d.contactPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-3">
          <h2 className="text-base font-bold text-[#0A192F]">Frequently Asked Questions (FAQ)</h2>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0A192F]">1. What is the minimum attendance required for university exams?</div>
            <p className="text-slate-600">Students must maintain at least {collegeConfig.minAttendanceThreshold}% aggregate attendance across theory and laboratory courses.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0A192F]">2. How can students apply for On-Duty (OD) attendance correction?</div>
            <p className="text-slate-600">Navigate to Student Attendance → Subject-Wise Attendance Details (Screen #12) and submit an OD petition with event proof.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-[#0A192F]">3. Are lecture notes and recorded videos accessible off-campus?</div>
            <p className="text-slate-600">Yes, all PDFs and lecture captures in the Smart Campus LMS are accessible 24x7 with student portal credentials.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
