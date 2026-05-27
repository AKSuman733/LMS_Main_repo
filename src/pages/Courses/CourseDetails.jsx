import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BarChart, UserCircle, CheckCircle } from 'lucide-react';
import { MOCK_COURSES, saveLocalEnrollment, HERO_AVATARS } from '../../utils/mockData';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const found = MOCK_COURSES.find(c => c.id === parseInt(id));
      setCourse(found);
      setLoading(false);
    }, 400);
  }, [id]);

  const handleEnroll = () => {
    if (!selectedStyle) {
      setError('Please select an instructor style to continue');
      return;
    }
    
    setEnrolling(true);
    setError('');
    
    setTimeout(() => {
      saveLocalEnrollment(id, selectedStyle);
      navigate('/student/enrolled');
    }, 600);
  };

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex flex-col justify-end">
          <span className="text-blue-100 font-semibold mb-2">{course.category}</span>
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        </div>
        
        <div className="p-8">
          <div className="flex space-x-6 text-gray-600 dark:text-gray-300 mb-8 border-b dark:border-gray-700 pb-6">
            <div className="flex items-center"><BarChart className="mr-2" /> {course.level}</div>
            <div className="flex items-center"><Clock className="mr-2" /> {course.duration}</div>
            <div className="flex items-center"><BookOpenIcon /> {course.lessons?.length || 0} Lessons</div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About this course</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {course.description}
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <UserCircle className="mr-2" /> Select Instructor Style
            </h3>
            <p className="text-sm text-gray-500 mb-4">Choose how you want the instructor to present the material.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {HERO_AVATARS.map(avatar => (
                <button
                  key={avatar.name}
                  onClick={() => setSelectedStyle(avatar.name)}
                  className={`p-4 rounded-lg border-2 text-left transition-all flex flex-col items-center sm:items-start sm:flex-row gap-4 ${
                    selectedStyle === avatar.name 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500 ring-opacity-50' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <img src={avatar.image} alt={avatar.name} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md" />
                  <div className="flex flex-col flex-1 justify-center w-full">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold">{avatar.name.split(' (')[0]}</span>
                      {selectedStyle === avatar.name && <CheckCircle size={20} className="text-blue-500 shrink-0" />}
                    </div>
                    <span className="text-xs opacity-75">{avatar.name.match(/\((.*?)\)/)[1]}</span>
                  </div>
                </button>
              ))}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              onClick={handleEnroll}
              disabled={enrolling || !selectedStyle}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

export default CourseDetails;
