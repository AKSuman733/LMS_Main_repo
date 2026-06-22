import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BookOpen, Clock, Award, Target, TrendingUp, Flame, AlertCircle, Share2, Download, X, Copy, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getEnrollments } from '../../utils/enrollmentStore';
import { mockCourses } from '../../utils/mockCourses';

export function Dashboard() {
  const { user: authUser } = useAuth();
  const [inProgressCourses, setInProgressCourses] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [shareCert, setShareCert] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState('');

  const user = {
    name: authUser?.name.split(' ')[0] || 'Alex',
    fullName: authUser?.name || 'Alex Johnson',
    streak: 12,
  };

  // Load dynamic courses and certificates
  useEffect(() => {
    if (authUser) {
      const enrollments = getEnrollments().filter((e: any) => e.studentId === authUser.id);
      
      // Calculate in progress courses
      const inProgress = enrollments
        .filter((e: any) => e.progress > 0 && e.progress < 100)
        .map((enr: any) => {
          const course = mockCourses.find(c => c.id === enr.courseId);
          // Handle deleted/unpublished courses gracefully
          if (!course || course.status !== 'published') {
            return {
              id: enr.courseId,
              title: enr.courseTitle || 'Course Unavailable',
              instructor: enr.instructorName || 'Removed Instructor',
              thumbnail: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=200',
              progress: enr.progress,
              unavailable: true,
            };
          }
          return {
            id: course.id,
            title: course.title,
            instructor: course.instructor,
            thumbnail: course.thumbnail,
            progress: enr.progress,
            unavailable: false,
          };
        });
      setInProgressCourses(inProgress);

      // Calculate completed certificates
      const completed = enrollments
        .filter((e: any) => e.progress === 100)
        .map((e: any) => ({
          id: e.id,
          title: e.courseTitle,
          date: new Date(e.enrolledAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          fileUrl: `https://learnify-certificates.s3.amazonaws.com/${e.id}.pdf`
        }));
      
      // Fallback certificates if none exist
      const finalCertificates = completed.length > 0 ? completed : [
        { id: 'cert-1', title: 'Python for Data Science', date: 'Dec 2024', fileUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-1.pdf' },
        { id: 'cert-2', title: 'AWS Cloud Practitioner', date: 'Nov 2024', fileUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-2.pdf' },
      ];
      setCertificates(finalCertificates);
    }
  }, [authUser]);

  // Calculate dynamic stats
  const enrollmentsCount = getEnrollments().filter((e: any) => e.studentId === authUser?.id).length;
  const completedCount = getEnrollments().filter((e: any) => e.studentId === authUser?.id && e.progress === 100).length;
  const hoursLearned = getEnrollments()
    .filter((e: any) => e.studentId === authUser?.id)
    .reduce((acc, e) => acc + Math.round(e.progress * 0.4), 0);

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: enrollmentsCount.toString(), trend: '+1 this month', trendUp: true },
    { icon: Clock, label: 'Hours Learned', value: (112 + hoursLearned).toString(), trend: '+8% this week', trendUp: true },
    { icon: Award, label: 'Certificates', value: (completedCount || 2).toString(), trend: '+1 this month', trendUp: true },
    { icon: Target, label: 'Avg. Score', value: '94%', trend: '+3% this week', trendUp: true },
  ];

  const handleDownload = (cert: any) => {
    if (!cert.fileUrl) {
      setToast('Certificate URL is invalid or null!');
      setTimeout(() => setToast(''), 3000);
      return;
    }
    // Generate a simple mock text file/PDF blob for demo download
    const content = `LEARNIFY CERTIFICATE OF COMPLETION\n\nThis is to certify that\n${user.fullName}\nhas successfully completed the course\n\n"${cert.title}"\n\nIssued on: ${cert.date}\nCertificate ID: ${cert.id}\nVerification URL: ${cert.fileUrl}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setToast(`Downloaded Certificate for ${cert.title}!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleShareClick = (cert: any) => {
    setShareCert(cert);
    setCopied(false);
  };

  const handleCopyLink = () => {
    if (shareCert) {
      navigator.clipboard.writeText(shareCert.fileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto relative">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-[999] bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl border border-amber-400 animate-bounce-in">
          ✓ {toast}
        </div>
      )}

      {/* Greeting Banner */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A2E] mb-1">
            Good morning, {user.name}.
          </h1>
          <p className="text-[16px] text-[#6B6B80]">
            You have {inProgressCourses.length} courses in progress.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-[12px] border border-[#E2E1F0] shadow-sm select-none">
          <Flame size={18} className="text-[#F59E0B]" />
          <span className="text-[13px] font-bold text-[#1A1A2E]">{user.streak} day streak</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[16px] border border-[#E2E1F0] p-5 shadow-[0_2px_16px_rgba(45,27,105,0.04)]"
          >
            <div className="w-10 h-10 rounded-full bg-[#2D1B69]/10 flex items-center justify-center mb-3">
              <stat.icon size={20} className="text-[#2D1B69]" />
            </div>
            <div className="text-[32px] font-bold text-[#1A1A2E] mb-1">{stat.value}</div>
            <div className="text-[13px] text-[#6B6B80] mb-2">{stat.label}</div>
            <div className={`text-[12px] flex items-center gap-1 ${stat.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              <TrendingUp size={12} />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Continue learning</h2>
        {inProgressCourses.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {inProgressCourses.map((course) => (
              course.unavailable ? (
                <div
                  key={course.id}
                  onClick={() => {
                    setToast("This course has been removed or unpublished by the platform.");
                    setTimeout(() => setToast(''), 3000);
                  }}
                  className="flex-shrink-0 w-[320px] bg-slate-50 rounded-[16px] border border-[#E2E1F0] p-4 opacity-70 cursor-not-allowed select-none relative"
                >
                  <div className="absolute top-3 right-3 bg-red-100 text-[#EF4444] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] flex items-center gap-1 z-10">
                    <AlertCircle size={10} />
                    Unavailable
                  </div>
                  <div className="flex gap-3 mb-3">
                    <div className="w-[90px] h-[64px] rounded-[10px] bg-[#E2E1F0] flex items-center justify-center border text-[#6B6B80] font-bold">
                      🚫
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-bold text-[#6B6B80] mb-1 line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[12px] text-[#9CA3AF] truncate">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="h-1 bg-[#E2E1F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-300 rounded-full relative"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#9CA3AF]">{course.progress}% complete</span>
                    <span className="text-[12px] font-bold text-red-500">Unavailable</span>
                  </div>
                </div>
              ) : (
                <Link
                  key={course.id}
                  to={`/course/${course.id}/learn`}
                  className="flex-shrink-0 w-[320px] bg-white rounded-[16px] border border-[#E2E1F0] p-4 hover:border-[#2D1B69] hover:shadow-[0_4px_16px_rgba(45,27,105,0.04)] transition-all cursor-pointer block"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-[90px] h-[64px] rounded-[10px] object-cover border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-1 line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-[12px] text-[#6B6B80] truncate">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="h-1 bg-[#E2E1F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#BBFF00] rounded-full relative"
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2D1B69]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6B6B80]">{course.progress}% complete</span>
                    <span className="text-[13px] font-bold text-[#2D1B69] hover:underline">Resume →</span>
                  </div>
                </Link>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-8 text-center shadow-sm">
            <p className="text-[#6B6B80] text-[14px] mb-4">No courses currently in progress.</p>
            <Link to="/courses" className="inline-block px-5 py-2.5 bg-[#2D1B69] text-white hover:bg-[#3D2B89] font-bold text-[13px] rounded-[8px]">
              Explore Catalog
            </Link>
          </div>
        )}
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Recent Certificates</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex-shrink-0 w-[320px] bg-gradient-to-br from-[#EDE9FF] to-[#F7F6F3] rounded-[16px] border border-[#E2E1F0] p-6 relative shadow-sm"
            >
              <div className="absolute top-6 right-6 text-[40px] text-[#2D1B69] opacity-20 select-none">
                🏆
              </div>
              <div className="text-[16px] font-bold text-[#2D1B69] mb-2 pr-12 leading-tight">{cert.title}</div>
              <div className="text-[13px] text-[#6B6B80] mb-4">Completed {cert.date}</div>
              <div className="flex gap-3 text-[13px] font-bold relative z-10">
                <button 
                  onClick={() => handleDownload(cert)}
                  className="text-[#2D1B69] hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 p-0"
                >
                  <Download size={14} /> Download
                </button>
                <span className="text-[#6B6B80]">•</span>
                <button 
                  onClick={() => handleShareClick(cert)}
                  className="text-[#2D1B69] hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 p-0"
                >
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Share Dialog Modal */}
      {shareCert && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setShareCert(null)}
            className="absolute inset-0 bg-[#1A1A2E]/50 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-[24px] border border-[#E2E1F0] p-6 w-full max-w-[460px] relative shadow-2xl animate-scale-in">
            <button
              onClick={() => setShareCert(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-[#F7F6F3] rounded-full transition-colors text-[#6B6B80] hover:text-[#1A1A2E] cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#EDE9FF] flex items-center justify-center text-[#2D1B69] mb-4">
                <Share2 size={24} />
              </div>
              
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-1">Share Certificate</h3>
              <p className="text-[13px] text-[#6B6B80] mb-5 max-w-[320px] leading-relaxed">
                Show off your achievement on LinkedIn, Twitter, or copy the direct link.
              </p>

              {/* Certificate Details Card */}
              <div className="w-full bg-[#F7F6F3] border border-[#E2E1F0] rounded-[16px] p-4 text-left mb-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[24px] opacity-20 select-none">🎓</span>
                <div className="text-[11px] font-bold uppercase text-[#2D1B69] tracking-wider mb-1">Verify Certificate</div>
                <div className="font-bold text-[#1A1A2E] text-[15px] pr-8 mb-1 leading-snug">{shareCert.title}</div>
                <div className="text-[12px] text-[#6B6B80]">Completed by {user.fullName}</div>
              </div>

              {/* Copy URL Input */}
              <div className="w-full mb-6">
                <label className="text-[11px] font-bold uppercase text-[#6B6B80] tracking-wider block text-left mb-2">
                  Credential Link
                </label>
                <div className="flex h-[46px] rounded-[10px] border border-[#E2E1F0] bg-[#F7F6F3] overflow-hidden focus-within:border-[#2D1B69] transition-all">
                  <input
                    type="text"
                    value={shareCert.fileUrl}
                    readOnly
                    className="flex-1 bg-transparent border-0 outline-none px-3.5 text-[12px] text-[#6B6B80] font-medium"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89] active:scale-[0.98] transition-all font-bold text-[13px] flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Social sharing choices */}
              <div className="w-full grid grid-cols-2 gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareCert.fileUrl)}`}
                  target="_blank"
                  rel="noopener"
                  className="h-[46px] border border-[#E2E1F0] rounded-[10px] font-bold text-[13px] text-[#1A1A2E] flex items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors"
                >
                  <span className="text-[16px]">🔗</span> LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just completed "${shareCert.title}" on Learnify! Check out my certificate here:`)}&url=${encodeURIComponent(shareCert.fileUrl)}`}
                  target="_blank"
                  rel="noopener"
                  className="h-[46px] border border-[#E2E1F0] rounded-[10px] font-bold text-[13px] text-[#1A1A2E] flex items-center justify-center gap-2 hover:bg-[#F7F6F3] transition-colors"
                >
                  <span className="text-[16px]">🐦</span> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
