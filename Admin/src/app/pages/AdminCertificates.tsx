import { useState } from 'react';
import { Search, ShieldAlert, Check, X, Award, ExternalLink } from 'lucide-react';

interface IssuedCertificate {
  id: string;
  studentName: string;
  courseTitle: string;
  dateIssued: string;
  credentialUrl: string;
  status: 'Active' | 'Revoked';
}

export function AdminCertificates() {
  const [certs, setCerts] = useState<IssuedCertificate[]>([
    {
      id: 'cert-1',
      studentName: 'Sarah Johnson',
      courseTitle: 'Python for Data Science',
      dateIssued: 'Dec 15, 2024',
      credentialUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-1.pdf',
      status: 'Active'
    },
    {
      id: 'cert-2',
      studentName: 'Michael Chen',
      courseTitle: 'AWS Cloud Practitioner',
      dateIssued: 'Nov 22, 2024',
      credentialUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-2.pdf',
      status: 'Active'
    },
    {
      id: 'cert-3',
      studentName: 'Emma Davis',
      courseTitle: 'RAG Projects',
      dateIssued: 'Oct 05, 2024',
      credentialUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-3.pdf',
      status: 'Active'
    },
    {
      id: 'cert-4',
      studentName: 'James Wilson',
      courseTitle: 'Generative AI Basics',
      dateIssued: 'Sep 18, 2024',
      credentialUrl: 'https://learnify-certificates.s3.amazonaws.com/cert-4.pdf',
      status: 'Revoked'
    }
  ]);

  const [search, setSearch] = useState('');
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const [toast, setToast] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenRevoke = (id: string) => {
    setRevokingId(id);
    setRevokeModalOpen(true);
  };

  const handleConfirmRevoke = () => {
    if (revokingId) {
      setCerts(prev => prev.map(c => c.id === revokingId ? { ...c, status: 'Revoked' } : c));
      setRevokeModalOpen(false);
      setRevokingId(null);
      triggerToast('Certificate revoked successfully ✓');
    }
  };

  const handleReactivate = (id: string) => {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, status: 'Active' } : c));
    triggerToast('Certificate reactivated ✓');
  };

  const filteredCerts = certs.filter(c => 
    c.studentName.toLowerCase().includes(search.toLowerCase()) || 
    c.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = certs.filter(c => c.status === 'Active').length;
  const revokedCount = certs.filter(c => c.status === 'Revoked').length;

  const revokingCert = certs.find(c => c.id === revokingId);

  return (
    <div className="bg-[#0A0F1E] text-white p-[40px] min-h-[calc(100vh-64px)] font-sans relative overflow-x-hidden">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl z-50 bg-[#111827] border border-[#00C97B] text-[#00E88A] font-bold text-[14px]">
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Issued Certificates
          </h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">
            Verify issued credentials, review completion records, and revoke active certificates.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Total Issued
            </div>
            <div className="text-[28px] font-extrabold text-white mt-2">{certs.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FF6B2B]/10 text-[#FF6B2B] flex items-center justify-center">
            <Award size={18} />
          </div>
        </div>

        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Active Credentials
            </div>
            <div className="text-[28px] font-extrabold text-[#00E88A] mt-2">{activeCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#00C97B]/10 text-[#00E88A] flex items-center justify-center">
            <span>✓</span>
          </div>
        </div>

        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Revoked Credentials
            </div>
            <div className="text-[28px] font-extrabold text-[#EF4444] mt-2">{revokedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center">
            <span>🚫</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or course..."
            className="w-full h-[40px] pl-10 pr-4 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-medium rounded-lg outline-none focus:border-[#FF6B2B] transition-colors"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#1A2540]/30 border-b border-[#1E2D45] text-[12px] text-[#9CA3AF] font-bold uppercase tracking-wider h-[46px]">
                <th className="px-5 py-3.5">Student</th>
                <th className="px-5 py-3.5">Course</th>
                <th className="px-5 py-3.5">Issued Date</th>
                <th className="px-5 py-3.5">Credential URL</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D45] text-[14px]">
              {filteredCerts.length > 0 ? (
                filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-[#1A2540]/20 h-[64px] transition-colors">
                    <td className="px-5 py-3 font-semibold text-white">
                      {cert.studentName}
                    </td>
                    <td className="px-5 py-3 text-white">
                      {cert.courseTitle}
                    </td>
                    <td className="px-5 py-3 text-[#9CA3AF]">
                      {cert.dateIssued}
                    </td>
                    <td className="px-5 py-3">
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#4F8EF7] hover:text-[#6fa3f9] hover:underline flex items-center gap-1 font-semibold text-[13px]"
                      >
                        <ExternalLink size={13} /> View PDF
                      </a>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        cert.status === 'Active'
                          ? 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20'
                          : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right pr-6">
                      {cert.status === 'Active' ? (
                        <button
                          onClick={() => handleOpenRevoke(cert.id)}
                          className="h-8 px-3.5 bg-transparent border border-[#EF4444] hover:bg-[#EF4444]/10 text-[#EF4444] hover:text-white transition-all text-[12px] font-bold rounded-lg cursor-pointer focus:outline-none"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReactivate(cert.id)}
                          className="h-8 px-3.5 bg-transparent border border-[#00C97B] hover:bg-[#00C97B]/10 text-[#00E88A] hover:text-white transition-all text-[12px] font-bold rounded-lg cursor-pointer focus:outline-none"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#9CA3AF] font-medium bg-[#111827]">
                    No issued certificates match search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revoke Confirm Dialog Modal */}
      {revokeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          {/* Backdrop */}
          <div onClick={() => setRevokeModalOpen(false)} className="fixed inset-0 bg-[#0A0F1E]/80 backdrop-blur-sm z-45" />

          {/* Dialog Container */}
          <div className="relative w-full max-w-[400px] bg-[#111827] border border-[#1E2D45] rounded-[20px] shadow-2xl p-6 text-center text-white z-50 animate-[scaleUp_0.18s_ease-out_forwards]">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scaleUp {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}} />
            
            <div className="mx-auto w-[64px] h-[64px] rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4 text-[#EF4444]">
              <ShieldAlert size={32} />
            </div>

            <h3 className="text-[20px] font-bold text-white mb-2">Revoke Certificate?</h3>
            <p className="text-[14px] font-semibold text-[#FF8C42] px-3 truncate mb-3">
              "{revokingCert?.courseTitle}"
            </p>
            <p className="text-[13px] text-[#9CA3AF] mb-6 leading-relaxed">
              This will mark the certificate for student <strong>{revokingCert?.studentName}</strong> as invalid. The credential link will immediately reject verification.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRevokeModalOpen(false)}
                className="flex-1 h-11 bg-transparent border border-[#1E2D45] hover:bg-[#1A2540] text-white font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRevoke}
                className="flex-1 h-11 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-[14px] rounded-lg transition-colors cursor-pointer border-none active:scale-[0.97]"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCertificates;
