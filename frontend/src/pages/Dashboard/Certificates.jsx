import { Award, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Certificates = () => {
  // Currently mock data, could be fetched from backend if certificates are implemented
  const certificates = [];

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
            <p className="text-xl font-bold text-white">{certificates.length}</p>
          </div>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="empty-state py-24 glass">
          <Award size={80} className="text-gray-700 mb-6 mx-auto" />
          <h2 className="text-3xl font-bold mb-4">No certificates yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
            Complete a course with 100% progress to unlock your verified certificate and showcase your skills to the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/my-learning" className="btn btn-primary px-8">Continue Learning</Link>
            <Link to="/student/explore" className="btn glass px-8">Explore New Courses</Link>
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
        <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping would go here if data existed */}
        </div>
      )}
    </div>
  );
};

export default Certificates;
