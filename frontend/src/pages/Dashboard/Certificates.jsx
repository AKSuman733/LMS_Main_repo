<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Award, Download, ExternalLink, ShieldCheck, Loader2, Share2, CheckCircle, Eye, X } from 'lucide-react';
import html2canvas from 'html2canvas';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [viewingCert, setViewingCert] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/courses/my-enrollments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const completed = res.data.filter(c => c.progress === 100);
        setCertificates(completed);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleDownload = async (cert, dateStr) => {
    setDownloadingId(cert.id);
    try {
      const element = document.getElementById(`cert-${cert.id}`);
      if (!element) return;

      // Clone the element to render it at a high, fixed resolution for Image
      const clone = element.cloneNode(true);
      document.body.appendChild(clone);
      
      // Force a fixed high-resolution size for the download
      // 1em = 14px gives us a 1120x792px certificate, which is very crisp
      clone.style.fontSize = '14px'; 
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.transform = 'none';

      const canvas = await html2canvas(clone, { 
        scale: 2, // 2x pixel density for retina-like sharpness
        backgroundColor: '#fffdf8',
        logging: false
      });
      
      document.body.removeChild(clone);

      const link = document.createElement('a');
      link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading certificate:', err);
      alert("There was an error downloading the certificate.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (cert) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My UptoSkills Certificate',
          text: `I just earned my certificate in "${cert.title}" on UptoSkills! 🏆`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      alert("Sharing is not supported natively on this browser. You can download the certificate and share the image!");
    }
  };
=======
import { Award, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Certificates = () => {
  // Currently mock data, could be fetched from backend if certificates are implemented
  const certificates = [];
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe

  return (
    <div className="certificates-page container pb-20">
      <div className="course-list-header mb-12">
        <div className="header-text">
          <h1>My Certificates</h1>
          <p>Verified proof of your technical expertise and dedication</p>
        </div>
        <div className="header-badge bg-primary-color/10 p-4 rounded-2xl border border-primary-color/20 flex items-center gap-4">
          <div className="bg-primary-color p-3 rounded-xl text-white">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Earned</p>
<<<<<<< HEAD
            <p className="text-xl font-bold text-white">{loading ? '-' : certificates.length}</p>
=======
            <p className="text-xl font-bold text-white">{certificates.length}</p>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {loading ? (
        <div className="py-24 flex justify-center items-center">
          <Loader2 className="animate-spin text-primary-color" size={48} />
        </div>
      ) : certificates.length === 0 ? (
=======
      {certificates.length === 0 ? (
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
        <div className="empty-state py-24 glass">
          <Award size={80} className="text-gray-700 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold mb-4">No certificates yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
            Complete a course with 100% progress to unlock your verified certificate and showcase your skills to the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/my-learning" className="btn btn-primary px-8">Continue Learning</Link>
<<<<<<< HEAD
            <Link to="/courses" className="btn glass px-8">Explore New Courses</Link>
=======
            <Link to="/student/explore" className="btn glass px-8">Explore New Courses</Link>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
          </div>
          
          <div className="mt-16 pt-12 border-t border-white/5 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-8 text-center">Why UptoSkills Certificates?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-item text-center">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-color">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-bold mb-2">Verified</h4>
                <p className="text-sm text-gray-500">Blockchain-verified authenticity</p>
              </div>
              <div className="feature-item text-center">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-color">
                  <Download size={24} />
                </div>
                <h4 className="font-bold mb-2">Shareable</h4>
                <p className="text-sm text-gray-500">One-click LinkedIn sharing</p>
              </div>
              <div className="feature-item text-center">
                <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-color">
                  <ExternalLink size={24} />
                </div>
                <h4 className="font-bold mb-2">Professional</h4>
                <p className="text-sm text-gray-500">Industry-recognized standards</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="admin-table-container card glass overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course Details</th>
                <th>Completion Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => {
                const dateStr = cert.completed_at 
                  ? new Date(cert.completed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
                  : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                
                return (
                  <tr key={cert.id}>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="table-img-wrapper">
                          <img 
                            src={cert.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100'} 
                            alt="" 
                            className="course-table-img"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white">{cert.title}</div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <span>Student:</span> <span className="text-gray-200 font-medium">{user?.name}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-white">{dateStr}</div>
                    </td>
                    <td>
                      <span className="level-tag beginner flex items-center gap-1 w-max" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                        <ShieldCheck size={14} /> Verified
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button 
                          onClick={() => setViewingCert(cert)} 
                          className="btn-icon" 
                          title="View Certificate"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDownload(cert, dateStr)} 
                          disabled={downloadingId === cert.id} 
                          className="btn-icon" 
                          title="Download Certificate"
                        >
                          {downloadingId === cert.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        </button>
                        <button 
                          onClick={() => handleShare(cert)} 
                          className="btn-icon" 
                          title="Share Certificate"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>

                      {/* OFF-SCREEN DOM for html2canvas to capture */}
                      <div style={{ position: 'absolute', left: '-9999px', top: '0', overflow: 'hidden' }}>
                        {/* The actual certificate using em units */}
                        <div 
                          id={`cert-${cert.id}`}
                          style={{
                            fontSize: '2px', /* fallback before cloning */
                            width: '80em',
                            height: '56.6em',
                            backgroundColor: '#fffdf8',
                            border: '1.5em solid #2d1b4e',
                            padding: '0.2em',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Georgia, serif'
                          }}
                        >
                          {/* Inner Gold Border */}
                          <div style={{
                            position: 'absolute',
                            top: '1em', bottom: '1em', left: '1em', right: '1em',
                            border: '0.3em solid #c29b62',
                            pointerEvents: 'none'
                          }}></div>
                          
                          {/* Inner Thin Purple Border */}
                          <div style={{
                            position: 'absolute',
                            top: '1.6em', bottom: '1.6em', left: '1.6em', right: '1.6em',
                            border: '0.1em solid #2d1b4e',
                            pointerEvents: 'none'
                          }}></div>

                          {/* Top Text */}
                          <div style={{ textAlign: 'center', marginTop: '3em', zIndex: 10 }}>
                            <h2 style={{ 
                              fontSize: '4.2em', 
                              color: '#2d1b4e', 
                              margin: 0, 
                              letterSpacing: '0.1em',
                              fontFamily: 'Georgia, serif' 
                            }}>
                              CERTIFICATE
                            </h2>
                            <p style={{ 
                              fontSize: '1.6em', 
                              color: '#2d1b4e', 
                              letterSpacing: '0.4em', 
                              margin: '0.5em 0 0 0',
                              fontFamily: 'sans-serif'
                            }}>
                              OF COMPLETION
                            </p>
                          </div>

                          {/* Awarded To */}
                          <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: '1em', zIndex: 10 }}>
                            <p style={{ 
                              fontSize: '1.2em', 
                              color: '#c29b62', 
                              letterSpacing: '0.2em', 
                              margin: '0 0 1em 0',
                              fontFamily: 'sans-serif',
                              fontWeight: 'bold'
                            }}>
                              AWARDED TO
                            </p>
                            <h3 style={{ 
                              fontSize: '3.6em', 
                              color: '#2d1b4e', 
                              margin: '0', 
                              paddingBottom: '0.2em',
                              borderBottom: '0.08em solid #c29b62',
                              display: 'inline-block',
                              minWidth: '15em',
                              fontFamily: 'Georgia, serif',
                              textTransform: 'uppercase'
                            }}>
                              {user?.name || 'Student Name'}
                            </h3>
                          </div>

                          {/* Course Details */}
                          <div style={{ textAlign: 'center', marginTop: '1em', marginBottom: 'auto', zIndex: 10 }}>
                            <p style={{ 
                              fontSize: '1.2em', 
                              color: '#2d1b4e', 
                              fontFamily: 'sans-serif',
                              fontWeight: 'bold',
                              margin: '0',
                              letterSpacing: '0.1em'
                            }}>
                              COURSE: <span style={{ textTransform: 'uppercase' }}>{cert.title}</span>
                            </p>
                            <p style={{ 
                              fontSize: '1.8em', 
                              color: '#2d1b4e', 
                              fontFamily: 'sans-serif',
                              fontWeight: '900',
                              margin: '0.8em 0 0 0'
                            }}>
                              UptoSkills
                            </p>
                          </div>

                          {/* Bottom Section */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-end',
                            width: '80%', 
                            marginBottom: '4em',
                            zIndex: 10
                          }}>
                            {/* Date */}
                            <div style={{ textAlign: 'center', width: '25%' }}>
                              <div style={{ borderBottom: '0.1em solid #2d1b4e', paddingBottom: '0.5em', marginBottom: '0.5em', fontSize: '1.2em', color: '#2d1b4e' }}>
                                {dateStr}
                              </div>
                              <p style={{ fontSize: '1em', color: '#2d1b4e', letterSpacing: '0.1em', margin: 0, fontFamily: 'sans-serif' }}>DATE</p>
                            </div>

                            {/* Seal */}
                            <div style={{ 
                              width: '8em', 
                              height: '8em', 
                              background: 'radial-gradient(circle, #2d1b4e 50%, #c29b62 100%)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '0.4em solid #c29b62',
                              boxShadow: '0 0.4em 1em rgba(0,0,0,0.2)',
                              position: 'relative'
                            }}>
                              {/* Ribbon tails */}
                              <div style={{ position: 'absolute', bottom: '-2.5em', left: '1em', width: '2em', height: '4em', background: '#2d1b4e', zIndex: -1, transform: 'skewY(-30deg)' }}></div>
                              <div style={{ position: 'absolute', bottom: '-2.5em', right: '1em', width: '2em', height: '4em', background: '#2d1b4e', zIndex: -1, transform: 'skewY(30deg)' }}></div>
                              
                              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '3em', fontFamily: 'sans-serif' }}>U</span>
                            </div>

                            {/* Signature / Completed */}
                            <div style={{ textAlign: 'center', width: '25%' }}>
                              <div style={{ borderBottom: '0.1em solid #2d1b4e', paddingBottom: '0.5em', marginBottom: '0.5em', fontSize: '1.4em', color: '#2d1b4e', fontFamily: 'cursive' }}>
                                UptoSkills
                              </div>
                              <p style={{ fontSize: '1em', color: '#2d1b4e', letterSpacing: '0.1em', margin: 0, fontFamily: 'sans-serif' }}>COMPLETED</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* View Certificate Modal */}
      {viewingCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setViewingCert(null)}>
          <div className="relative w-full max-w-5xl glass rounded-2xl p-4 md:p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setViewingCert(null)} 
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 bg-surface-color text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all z-50 shadow-2xl"
            >
              <X size={24} />
            </button>
            
            <div className="w-full flex items-center justify-center rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]" style={{ containerType: 'inline-size', aspectRatio: '1.414 / 1', position: 'relative' }}>
              {/* The scalable visual certificate container */}
              <div 
                style={{
                  fontSize: 'max(min(1.25cqw, 1.25cqi), 2px)', /* 100cqw / 80em = 1.25 */
                  width: '80em',
                  height: '56.6em',
                  backgroundColor: '#fffdf8',
                  border: '1.5em solid #2d1b4e',
                  padding: '0.2em',
                  position: 'absolute',
                  top: 0, left: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {/* Inner Gold Border */}
                <div style={{
                  position: 'absolute',
                  top: '1em', bottom: '1em', left: '1em', right: '1em',
                  border: '0.3em solid #c29b62',
                  pointerEvents: 'none'
                }}></div>
                
                {/* Inner Thin Purple Border */}
                <div style={{
                  position: 'absolute',
                  top: '1.6em', bottom: '1.6em', left: '1.6em', right: '1.6em',
                  border: '0.1em solid #2d1b4e',
                  pointerEvents: 'none'
                }}></div>

                {/* Top Text */}
                <div style={{ textAlign: 'center', marginTop: '3em', zIndex: 10 }}>
                  <h2 style={{ 
                    fontSize: '4.2em', 
                    color: '#2d1b4e', 
                    margin: 0, 
                    letterSpacing: '0.1em',
                    fontFamily: 'Georgia, serif' 
                  }}>
                    CERTIFICATE
                  </h2>
                  <p style={{ 
                    fontSize: '1.6em', 
                    color: '#2d1b4e', 
                    letterSpacing: '0.4em', 
                    margin: '0.5em 0 0 0',
                    fontFamily: 'sans-serif'
                  }}>
                    OF COMPLETION
                  </p>
                </div>

                {/* Awarded To */}
                <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: '1em', zIndex: 10 }}>
                  <p style={{ 
                    fontSize: '1.2em', 
                    color: '#c29b62', 
                    letterSpacing: '0.2em', 
                    margin: '0 0 1em 0',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold'
                  }}>
                    AWARDED TO
                  </p>
                  <h3 style={{ 
                    fontSize: '3.6em', 
                    color: '#2d1b4e', 
                    margin: '0', 
                    paddingBottom: '0.2em',
                    borderBottom: '0.08em solid #c29b62',
                    display: 'inline-block',
                    minWidth: '15em',
                    fontFamily: 'Georgia, serif',
                    textTransform: 'uppercase'
                  }}>
                    {user?.name || 'Student Name'}
                  </h3>
                </div>

                {/* Course Details */}
                <div style={{ textAlign: 'center', marginTop: '1em', marginBottom: 'auto', zIndex: 10 }}>
                  <p style={{ 
                    fontSize: '1.2em', 
                    color: '#2d1b4e', 
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    margin: '0',
                    letterSpacing: '0.1em'
                  }}>
                    COURSE: <span style={{ textTransform: 'uppercase' }}>{viewingCert.title}</span>
                  </p>
                  <p style={{ 
                    fontSize: '1.8em', 
                    color: '#2d1b4e', 
                    fontFamily: 'sans-serif',
                    fontWeight: '900',
                    margin: '0.8em 0 0 0'
                  }}>
                    UptoSkills
                  </p>
                </div>

                {/* Bottom Section */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-end',
                  width: '80%', 
                  marginBottom: '4em',
                  zIndex: 10
                }}>
                  {/* Date */}
                  <div style={{ textAlign: 'center', width: '25%' }}>
                    <div style={{ borderBottom: '0.1em solid #2d1b4e', paddingBottom: '0.5em', marginBottom: '0.5em', fontSize: '1.2em', color: '#2d1b4e' }}>
                      {viewingCert.completed_at ? new Date(viewingCert.completed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <p style={{ fontSize: '1em', color: '#2d1b4e', letterSpacing: '0.1em', margin: 0, fontFamily: 'sans-serif' }}>DATE</p>
                  </div>

                  {/* Seal */}
                  <div style={{ 
                    width: '8em', 
                    height: '8em', 
                    background: 'radial-gradient(circle, #2d1b4e 50%, #c29b62 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '0.4em solid #c29b62',
                    boxShadow: '0 0.4em 1em rgba(0,0,0,0.2)',
                    position: 'relative'
                  }}>
                    {/* Ribbon tails */}
                    <div style={{ position: 'absolute', bottom: '-2.5em', left: '1em', width: '2em', height: '4em', background: '#2d1b4e', zIndex: -1, transform: 'skewY(-30deg)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-2.5em', right: '1em', width: '2em', height: '4em', background: '#2d1b4e', zIndex: -1, transform: 'skewY(30deg)' }}></div>
                    
                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '3em', fontFamily: 'sans-serif' }}>U</span>
                  </div>

                  {/* Signature / Completed */}
                  <div style={{ textAlign: 'center', width: '25%' }}>
                    <div style={{ borderBottom: '0.1em solid #2d1b4e', paddingBottom: '0.5em', marginBottom: '0.5em', fontSize: '1.4em', color: '#2d1b4e', fontFamily: 'cursive' }}>
                      UptoSkills
                    </div>
                    <p style={{ fontSize: '1em', color: '#2d1b4e', letterSpacing: '0.1em', margin: 0, fontFamily: 'sans-serif' }}>COMPLETED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
=======
        <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping would go here if data existed */}
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
        </div>
      )}
    </div>
  );
};

export default Certificates;
