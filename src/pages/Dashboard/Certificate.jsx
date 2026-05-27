import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Award } from 'lucide-react';
import { getLocalEnrollments } from '../../utils/mockData';

const Certificate = () => {
  const { enrollmentId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const enrollments = getLocalEnrollments();
      const enrollment = enrollments.find(e => e.id === parseInt(enrollmentId));
      
      if (enrollment && enrollment.completed) {
        setCert({
          student_name: 'Student', // Mapped to mock user
          course_title: enrollment.title,
          issued_at: enrollment.issued_at || new Date().toISOString(),
          certificate_code: enrollment.certificate_code || `CERT-${enrollment.id}`
        });
      } else {
        setError('Certificate not found or not yet earned.');
      }
      setLoading(false);
    }, 400);
  }, [enrollmentId]);

  if (loading) return <div>Loading certificate...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
        <div className="mb-6 flex justify-center text-blue-600 dark:text-blue-400">
          <Award size={64} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Certificate Option
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Congratulations on completing <strong>{cert.course_title}</strong>!
          <br /><br />
          <em>(Placeholder for actual certificate generation)</em>
        </p>

        <button 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg opacity-50 cursor-not-allowed"
          disabled
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
