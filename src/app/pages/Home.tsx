import { Link } from 'react-router';
import { ArrowRight, BookOpen, Award, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F7F6F3] to-white py-20 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-[56px] font-bold text-[#1A1A2E] mb-6 leading-tight">
            Learn without limits.
          </h1>
          <p className="text-[20px] text-[#6B6B80] mb-8 max-w-2xl mx-auto">
            Join 1.3M+ learners mastering new skills with expert-led courses.
            Start your journey today — completely free.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link to="/courses">
              <Button className="h-[56px] text-[16px] px-8 cursor-pointer">
                Explore courses
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/register" onClick={() => { if (user) logout(); }}>
              <Button variant="secondary" className="h-[56px] text-[16px] px-8 cursor-pointer">
                Get started free
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 text-center">
            <div>
              <div className="text-[32px] font-bold text-[#2D1B69] mb-1">1.3M+</div>
              <div className="text-[14px] text-[#6B6B80]">Active Learners</div>
            </div>
            <div className="w-[1px] h-12 bg-[#E2E1F0]"></div>
            <div>
              <div className="text-[32px] font-bold text-[#2D1B69] mb-1">120+</div>
              <div className="text-[14px] text-[#6B6B80]">Free Courses</div>
            </div>
            <div className="w-[1px] h-12 bg-[#E2E1F0]"></div>
            <div>
              <div className="text-[32px] font-bold text-[#2D1B69] mb-1">4.5★</div>
              <div className="text-[14px] text-[#6B6B80]">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2D1B69]/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-[#2D1B69]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-2">
                Expert-Led Courses
              </h3>
              <p className="text-[15px] text-[#6B6B80]">
                Learn from industry professionals with real-world experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2D1B69]/10 flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-[#2D1B69]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-2">
                Earn Certificates
              </h3>
              <p className="text-[15px] text-[#6B6B80]">
                Get recognized for your achievements with verified certificates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2D1B69]/10 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-[#2D1B69]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-2">
                Join the Community
              </h3>
              <p className="text-[15px] text-[#6B6B80]">
                Connect with millions of learners around the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2D1B69] py-20 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">
            Ready to start learning?
          </h2>
          <p className="text-[18px] text-white/80 mb-8">
            Join millions of learners and advance your career today.
          </p>
          <Link to="/register" onClick={() => { if (user) logout(); }}>
            <Button className="h-[56px] text-[16px] px-8 cursor-pointer">
              Get started free
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
