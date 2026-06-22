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
      gradient: 'from-[#2D1B69] to-[#7C3AED]',
    },
    {
      id: 'cert-2',
      title: 'AWS Cloud Practitioner',
      date: 'Completed Nov 2024',
      instructor: 'Issued by Devon Patel',
      gradient: 'from-[#1E3A8A] to-[#3B82F6]',
    },
    {
      id: 'cert-3',
      title: 'RAG Projects',
      date: 'Completed Oct 2024',
      instructor: 'Issued by Alex Rivera',
      gradient: 'from-[#065F46] to-[#10B981]',
    },
    {
      id: 'cert-4',
      title: 'Generative AI Basics',
      date: 'Completed Sep 2024',
      instructor: 'Issued by Elena Rostova',
      gradient: 'from-[#854D0E] to-[#EAB308]',
    },
    {
      id: 'cert-5',
      title: 'LLMOps Advanced',
      date: 'Completed Aug 2024',
      instructor: 'Issued by Marcus Brody',
      gradient: 'from-[#701A75] to-[#D946EF]',
    },
  ]);

  const [lockedCerts] = useState<LockedCertificate[]>([
    { id: 'locked-1', title: 'Machine Learning Fundamentals', gradient: 'from-[#374151] to-[#4B5563]' },
    { id: 'locked-2', title: 'Full-Stack Web Development', gradient: 'from-[#374151] to-[#4B5563]' },
    { id: 'locked-3', title: 'Deep Learning Mastery', gradient: 'from-[#374151] to-[#4B5563]' },
  ]);

  const handleLinkedInShare = (title: string) => {
    const url = encodeURIComponent('https://learnify.com/verify/credential');
    const shareTitle = encodeURIComponent(`I successfully completed ${title} on Learnify!`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${shareTitle}`, '_blank');
  };

  return (
    <div className="max-w-[1280px] mx-auto bg-white rounded-[16px] border border-[#E2E1F0] p-6 md:p-10 shadow-[0_4px_24px_rgba(45,27,105,0.02)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#E2E1F0] pb-6 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A2E] leading-none mb-2">My Certificates</h1>
          <p className="text-[14px] text-[#6B6B80] font-medium">
            5 certificates earned. Keep learning to unlock more!
          </p>
        </div>
        <div className="inline-flex h-[34px] px-3.5 bg-[#EDE9FF] text-[#2D1B69] font-bold text-[12px] rounded-full items-center select-none w-fit">
          5 of 12 courses completed
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-[#E2E1F0] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EDE9FF] flex items-center justify-center text-[#2D1B69]">
            <Award size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-[#1A1A2E] leading-none mb-0.5">5</span>
            <span className="text-[13px] text-[#6B6B80] font-semibold">Earned</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E1F0] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#065F46]">
            <Share2 size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-[#1A1A2E] leading-none mb-0.5">3</span>
            <span className="text-[13px] text-[#6B6B80] font-semibold">Shareable</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E1F0] rounded-[10px] p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#92400E]">
            <Calendar size={20} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-[#1A1A2E] leading-none mb-0.5">2</span>
            <span className="text-[13px] text-[#6B6B80] font-semibold">This Year</span>
          </div>
        </div>
      </div>

      {/* Earned Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-[#E2E1F0] rounded-[16px] overflow-hidden flex flex-col justify-between hover:border-[#2D1B69] hover:shadow-[0_8px_24px_rgba(45,27,105,0.06)] transition-all duration-300 shadow-sm"
          >
            {/* Top Preview */}
            <div className={`h-[160px] bg-gradient-to-br ${cert.gradient} p-5 relative flex flex-col items-center justify-center text-center`}>
              <span className="text-[9px] uppercase tracking-widest text-white/70 font-extrabold mb-1.5">
                Certificate of Completion
              </span>
              <h3 className="text-[16px] font-bold text-white mb-2 leading-snug line-clamp-2 px-3">
                {cert.title}
              </h3>
              <Trophy size={28} className="text-[#BBFF00] drop-shadow-sm mt-1" />

              <div className="absolute bottom-3 text-[10px] text-white/60 font-bold flex items-center gap-0.5">
                <span>Learnify</span>
                <span className="w-1 h-1 rounded-full bg-[#BBFF00]"></span>
              </div>
            </div>

            {/* Bottom details */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#6B6B80] font-medium mb-1">
                  <Calendar size={13} />
                  <span>{cert.date}</span>
                </div>
                <span className="block text-[13px] text-[#6B6B80] font-bold mb-4">{cert.instructor}</span>
              </div>

              <div className="space-y-2">
                <button className="w-full h-[38px] bg-white border border-[#2D1B69] text-[#2D1B69] hover:bg-[#EDE9FF] font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                  <Download size={14} /> Download PDF
                </button>
                <button
                  onClick={() => handleLinkedInShare(cert.title)}
                  className="w-full h-[38px] bg-[#2D1B69] text-white hover:bg-[#3D2B89] font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <ExternalLink size={14} /> Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Locked Section */}
      <div className="mt-12 border-t border-[#E2E1F0] pt-10">
        <h2 className="text-[20px] font-bold text-[#6B6B80] mb-6 flex items-center gap-2">
          <span>🔒</span> Unlock more certificates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-[#E2E1F0] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-sm relative group select-none"
            >
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-[#F7F6F3] border border-[#E2E1F0] flex items-center justify-center text-[#6B6B80] mb-2.5 shadow-sm group-hover:scale-105 transition-transform">
                  <Lock size={18} />
                </div>
                <Link
                  to="/courses"
                  className="text-[13px] font-bold text-[#2D1B69] hover:underline cursor-pointer"
                >
                  Enroll to unlock →
                </Link>
              </div>

              {/* Blurred content replica */}
              <div className="h-[160px] bg-slate-300 p-5 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold mb-1">
                  Certificate of Completion
                </span>
                <h3 className="text-[16px] font-bold text-slate-600 line-clamp-2 px-3">
                  {cert.title}
                </h3>
                <Trophy size={28} className="text-slate-400 mt-1" />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium mb-1">
                  <Calendar size={13} />
                  <span>Locked</span>
                </div>
                <span className="block text-[13px] text-slate-400 font-bold mb-4">Instructor pending</span>

                <div className="space-y-2 opacity-50">
                  <div className="w-full h-[38px] bg-white border border-slate-300 rounded-[10px]" />
                  <div className="w-full h-[38px] bg-slate-300 rounded-[10px]" />
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
