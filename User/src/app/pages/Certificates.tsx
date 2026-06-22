import { useState } from 'react';
import { Link } from 'react-router';
import { Award, Share2, Calendar, Trophy, Lock, Download, ExternalLink } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  date: string;
  instructor: string;
  gradient: string;
}

interface LockedCertificate {
  id: string;
  title: string;
  gradient: string;
}

export function Certificates() {
  const [certs] = useState<Certificate[]>([
    {
      id: 'cert-1',
      title: 'Python for Data Science',
      date: 'Completed Dec 2024',
      instructor: 'Issued by Dr. Sarah Chen',
      gradient: 'from-[#1A2540] to-[#2D1B69]',
    },
    {
      id: 'cert-2',
      title: 'AWS Cloud Practitioner',
      date: 'Completed Nov 2024',
      instructor: 'Issued by Devon Patel',
      gradient: 'from-[#1A2540] to-[#1E3A8A]',
    },
    {
      id: 'cert-3',
      title: 'RAG Projects',
      date: 'Completed Oct 2024',
      instructor: 'Issued by Alex Rivera',
      gradient: 'from-[#1A2540] to-[#055030]',
    },
    {
      id: 'cert-4',
      title: 'Generative AI Basics',
      date: 'Completed Sep 2024',
      instructor: 'Issued by Elena Rostova',
      gradient: 'from-[#1A2540] to-[#6B4E0B]',
    },
    {
      id: 'cert-5',
      title: 'LLMOps Advanced',
      date: 'Completed Aug 2024',
      instructor: 'Issued by Marcus Brody',
      gradient: 'from-[#1A2540] to-[#701A75]',
    },
  ]);

  const [lockedCerts] = useState<LockedCertificate[]>([
    { id: 'locked-1', title: 'Machine Learning Fundamentals', gradient: 'from-[#111827] to-[#1A2540]' },
    { id: 'locked-2', title: 'Full-Stack Web Development', gradient: 'from-[#111827] to-[#1A2540]' },
    { id: 'locked-3', title: 'Deep Learning Mastery', gradient: 'from-[#111827] to-[#1A2540]' },
  ]);

  const handleLinkedInShare = (title: string) => {
    const url = encodeURIComponent('https://learnify.com/verify/credential');
    const shareTitle = encodeURIComponent(`I successfully completed ${title} on Learnify!`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${shareTitle}`, '_blank');
  };

  const handleDownloadDemo = (title: string) => {
    const content = `LEARNIFY CERTIFICATE OF COMPLETION\n\nThis is to certify that the user has successfully completed the course\n\n"${title}"\n\nIssued by: Learnify Academy`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1280px] mx-auto font-sans text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#1E2D45] pb-6 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-white leading-none mb-2">My Certificates</h1>
          <p className="text-[14px] text-[#9CA3AF] font-medium">
            5 certificates earned. Keep learning to unlock more!
          </p>
        </div>
        <div className="inline-flex h-[34px] px-3.5 bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20 font-semibold text-[12px] rounded-full items-center select-none w-fit">
          5 of 12 courses completed
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-[#111827] border border-[#1E2D45] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#FF6B2B]/10 flex items-center justify-center text-[#FF6B2B]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-white leading-none mb-0.5">5</span>
            <span className="text-[13px] text-[#9CA3AF] font-semibold">Earned</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1E2D45] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#00C97B]/10 flex items-center justify-center text-[#00C97B]">
            <Share2 size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-white leading-none mb-0.5">3</span>
            <span className="text-[13px] text-[#9CA3AF] font-semibold">Shareable</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1E2D45] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center text-[#4F8EF7]">
            <Calendar size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-white leading-none mb-0.5">2</span>
            <span className="text-[13px] text-[#9CA3AF] font-semibold">This Year</span>
          </div>
        </div>
      </div>

      {/* Earned Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#111827] border border-[#1E2D45] rounded-[16px] overflow-hidden flex flex-col justify-between hover:border-[#FF6B2B]/40 hover:shadow-[0_8px_24px_rgba(255,107,43,0.06)] transition-all duration-300 shadow-sm active:scale-[0.97]"
          >
            {/* Top Preview */}
            <div className={`h-[160px] bg-gradient-to-br ${cert.gradient} p-5 relative flex flex-col items-center justify-center text-center border-b border-[#1E2D45]`}>
              <span className="text-[9px] uppercase tracking-widest text-[#9CA3AF] font-bold mb-1.5">
                Certificate of Completion
              </span>
              <h3 className="text-[16px] font-bold text-white mb-2 leading-snug line-clamp-2 px-3">
                {cert.title}
              </h3>
              <Trophy size={28} className="text-[#FF8C42] drop-shadow-sm mt-1" />

              <div className="absolute bottom-3 text-[10px] text-[#9CA3AF] font-bold flex items-center gap-1">
                <span>Learnify</span>
                <span className="w-1 h-1 rounded-full bg-[#FF6B2B]"></span>
              </div>
            </div>

            {/* Bottom details */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] font-medium mb-1">
                  <Calendar size={13} className="text-[#4F8EF7]" />
                  <span>{cert.date}</span>
                </div>
                <span className="block text-[13px] text-[#9CA3AF] font-bold mb-4">{cert.instructor}</span>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => handleDownloadDemo(cert.title)}
                  className="w-full h-[38px] bg-transparent border border-[#FF6B2B] text-[#FF6B2B] hover:bg-[#FF6B2B]/10 font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.97]"
                >
                  <Download size={14} /> Download PDF
                </button>
                <button
                  onClick={() => handleLinkedInShare(cert.title)}
                  className="w-full h-[38px] bg-[#4F8EF7] text-white hover:bg-[#4F8EF7]/80 font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 shadow-sm active:scale-[0.97]"
                >
                  <ExternalLink size={14} /> Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Locked Section */}
      <div className="mt-12 border-t border-[#1E2D45] pt-10">
        <h2 className="text-[20px] font-bold text-[#9CA3AF] mb-6 flex items-center gap-2">
          <span>🔒</span> Unlock more certificates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111827] border border-[#1E2D45] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-sm relative group select-none"
            >
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-[#0D1117]/85 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-[#1A2540] border border-[#1E2D45] flex items-center justify-center text-[#9CA3AF] mb-2.5 shadow-sm group-hover:scale-105 transition-all duration-200">
                  <Lock size={18} className="text-[#FF6B2B]" />
                </div>
                <Link
                  to="/courses"
                  className="text-[13px] font-bold text-[#FF6B2B] hover:text-[#FF8C42] hover:underline cursor-pointer transition-colors"
                >
                  Enroll to unlock →
                </Link>
              </div>

              {/* Blurred content replica */}
              <div className="h-[160px] bg-[#1A2540] p-5 flex flex-col items-center justify-center text-center opacity-40">
                <span className="text-[9px] uppercase tracking-widest text-[#9CA3AF] font-bold mb-1">
                  Certificate of Completion
                </span>
                <h3 className="text-[16px] font-bold text-white line-clamp-2 px-3">
                  {cert.title}
                </h3>
                <Trophy size={28} className="text-[#9CA3AF] mt-1" />
              </div>

              <div className="p-4 opacity-40">
                <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] font-medium mb-1">
                  <Calendar size={13} />
                  <span>Locked</span>
                </div>
                <span className="block text-[13px] text-[#9CA3AF] font-bold mb-4">Instructor pending</span>

                <div className="space-y-2">
                  <div className="w-full h-[38px] bg-transparent border border-[#1E2D45] rounded-[10px]" />
                  <div className="w-full h-[38px] bg-[#1A2540] rounded-[10px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Certificates;
