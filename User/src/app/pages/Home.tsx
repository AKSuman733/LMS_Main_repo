import { Link } from 'react-router';
import { ArrowRight, BookOpen, Award, Users, Sparkles, Trophy, Gamepad2, GraduationCap, Play, ShieldAlert } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[#0A0F1E] text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:py-32 px-6 border-b border-[#1A2540]">
        {/* Subtle background glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#FF6B2B]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#00C97B]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Heading & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6 z-10">
            {/* Small Label Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#FF6B2B]/20 shadow-sm">
              <Sparkles size={14} className="text-[#FF6B2B]" />
              <span className="text-[12px] font-bold text-[#E5E7EB] uppercase tracking-wider">Transform Your Profile</span>
            </div>

            {/* Impactful Hero Heading (Sentence case, color mix) */}
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-black tracking-tight leading-[1.08] select-none">
              <span className="block text-[#FF6B2B]">Learn new industry skills.</span>
              <span className="block text-[#00C97B]">Grow your profile fast.</span>
              <span className="block bg-gradient-to-r from-[#4F8EF7] to-[#00E88A] bg-clip-text text-transparent">Get certified today.</span>
            </h1>

            {/* Subtitle text */}
            <p className="text-[17px] sm:text-[19px] text-[#9CA3AF] max-w-xl leading-relaxed">
              Join over 1.3 million learners worldwide. Master in-demand programming, design, and business skills with bite-sized video courses — entirely free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/courses">
                <Button variant="primary" className="h-[52px] text-[15px] px-8 rounded-full font-bold shadow-lg shadow-[#FF6B2B]/20">
                  Explore courses
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/register" onClick={() => { if (user) logout(); }}>
                <Button variant="secondary" className="h-[52px] text-[15px] px-8 rounded-full font-bold">
                  Get started free
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 pt-6 border-t border-[#1A2540] max-w-md">
              <div>
                <div className="text-[26px] font-extrabold text-white mb-0.5">1.3M+</div>
                <div className="text-[12px] text-[#9CA3AF] uppercase tracking-wide font-medium">Active Learners</div>
              </div>
              <div className="w-[1px] h-10 bg-[#1A2540]"></div>
              <div>
                <div className="text-[26px] font-extrabold text-[#00C97B] mb-0.5">120+</div>
                <div className="text-[12px] text-[#9CA3AF] uppercase tracking-wide font-medium">Free Courses</div>
              </div>
              <div className="w-[1px] h-10 bg-[#1A2540]"></div>
              <div>
                <div className="text-[26px] font-extrabold text-[#FF6B2B] mb-0.5">4.8★</div>
                <div className="text-[12px] text-[#9CA3AF] uppercase tracking-wide font-medium">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Right: Floating Mockup cards & elements */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] flex items-center justify-center z-10">
            {/* Base grid mockup background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1A2540_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            {/* Mockup Card 1 (Trophy & Glassmorphism) */}
            <div className="absolute top-[10%] left-[5%] w-[210px] bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2B]/20 flex items-center justify-center text-[#FF6B2B]">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white leading-tight">Certificate Earned</h4>
                  <p className="text-[11px] text-[#9CA3AF]">React Specialist</p>
                </div>
              </div>
              <div className="mt-3 w-full bg-[#1A2540] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00C97B] h-full w-[100%]"></div>
              </div>
            </div>

            {/* Mockup Card 2 (User Progress Circle) */}
            <div className="absolute bottom-[15%] right-[5%] w-[230px] bg-[#1A2540]/90 backdrop-blur-md border border-[#FF6B2B]/20 rounded-2xl p-4 shadow-2xl animate-float-delayed z-20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-bold text-white">Daily Learning Goal</span>
                <span className="text-[11px] text-[#00C97B] font-bold">80% done</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-[#00C97B] border-t-[#111827] flex items-center justify-center text-[11px] font-black text-white">
                  4/5
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white">Python Basics</h4>
                  <p className="text-[11px] text-[#9CA3AF]">Lesson 4: Conditions</p>
                </div>
              </div>
            </div>

            {/* Mockup Card 3 (Featured Course Thumbnail Mock) */}
            <div className="absolute top-[35%] left-[25%] w-[190px] bg-[#111827] border border-white/5 rounded-xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="h-24 bg-gradient-to-br from-[#1A2540] to-[#0D1B2A] relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm text-white">
                  <Play size={14} fill="white" />
                </div>
                <span className="absolute bottom-2 left-2 text-[9px] bg-black/60 px-2 py-0.5 rounded text-[#00C97B] font-bold uppercase">UI/UX Design</span>
              </div>
              <div className="p-2.5">
                <h5 className="text-[11px] font-bold text-white truncate">Intro to Figma v4</h5>
                <p className="text-[9px] text-[#9CA3AF] mt-0.5">12 lessons</p>
              </div>
            </div>

            {/* Decorative Floating Icon 1: Game Controller */}
            <div className="absolute top-[15%] right-[20%] w-10 h-10 rounded-full bg-[#111827] border border-[#FF8C42]/20 flex items-center justify-center text-[#FF8C42] shadow-lg animate-bounce-gentle z-30">
              <Gamepad2 size={16} />
            </div>

            {/* Decorative Floating Icon 2: Trophy Gold */}
            <div className="absolute bottom-[15%] left-[15%] w-10 h-10 rounded-full bg-[#111827] border border-[#00C97B]/20 flex items-center justify-center text-[#00C97B] shadow-lg animate-bounce-gentle-delayed z-30">
              <Trophy size={16} />
            </div>

            {/* Decorative Floating Icon 3: Owl Mascot */}
            <div className="absolute top-[65%] right-[30%] w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white shadow-xl animate-float z-30">
              <GraduationCap size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0D1B2A] border-b border-[#1A2540]">
        <div className="max-w-[1280px] mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <div className="flex justify-center items-center gap-2 text-[#FF6B2B]">
              <Sparkles size={18} />
              <span className="text-[12px] font-bold uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-black text-white">Learn the smart way.</h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto text-[15px]">
              Our learning model is built to help you acquire skills step-by-step with zero barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-[#1A2540] border border-[#111827] rounded-2xl p-8 hover:border-[#FF6B2B] hover:shadow-[0_0_20px_rgba(255,107,43,0.15)] transition-all duration-300 text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B2B]/10 flex items-center justify-center mx-auto mb-6 text-[#FF6B2B] group-hover:bg-[#FF6B2B] group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <h3 className="text-[20px] font-extrabold text-white mb-3">Expert-Led Courses</h3>
              <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                Learn from industry professionals with real-world project experience. Easy, guided instructions for beginners.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-[#1A2540] border border-[#111827] rounded-2xl p-8 hover:border-[#00C97B] hover:shadow-[0_0_20px_rgba(0,201,123,0.15)] transition-all duration-300 text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#00C97B]/10 flex items-center justify-center mx-auto mb-6 text-[#00C97B] group-hover:bg-[#00C97B] group-hover:text-[#0A0F1E] transition-colors">
                <Award size={24} />
              </div>
              <h3 className="text-[20px] font-extrabold text-white mb-3">Earn Achievements</h3>
              <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                Unlock verify-ready certificates and custom badges upon course completions to boost your job applications.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-[#1A2540] border border-[#111827] rounded-2xl p-8 hover:border-[#FF6B2B] hover:shadow-[0_0_20px_rgba(255,107,43,0.15)] transition-all duration-300 text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B2B]/10 flex items-center justify-center mx-auto mb-6 text-[#FF6B2B] group-hover:bg-[#FF6B2B] group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-[20px] font-extrabold text-white mb-3">Join global peers</h3>
              <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                Collaborate with over 1.3M+ peers. Ask questions, seek project feedback, and land job opportunities.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0A0F1E] relative">
        <div className="max-w-[1000px] mx-auto bg-[#1A2540] rounded-3xl p-10 md:p-16 border border-[#FF6B2B]/10 text-center relative overflow-hidden space-y-6">
          {/* Subtle glow blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#FF6B2B]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <h2 className="text-[32px] sm:text-[44px] font-black text-white leading-tight">
            Ready to learn and grow?
          </h2>
          <p className="text-[#9CA3AF] text-[16px] max-w-lg mx-auto">
            Take courses on programming, tools, and UI/UX design. Start learning completely free.
          </p>
          
          <div className="pt-4">
            <Link to="/register" onClick={() => { if (user) logout(); }}>
              <Button variant="primary" className="h-[52px] text-[15px] px-8 rounded-full font-bold shadow-lg shadow-[#FF6B2B]/20">
                Get started free
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Self-contained float animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4.5s ease-in-out infinite 0.7s;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        .animate-bounce-gentle-delayed {
          animation: bounce-gentle 3.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
}
