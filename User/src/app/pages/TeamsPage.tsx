import { useState, useEffect, useRef } from 'react';
import { BarChart, Route, Award, TrendingUp, Shield, Headphones, Check, Lock } from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function TeamsPage() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    role: ''
  });

  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    document.body.style.overflow = showDemoModal ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDemoModal]);

  const handleModalClose = () => {
    setShowDemoModal(false);
    setSubmitted(false);
    setFormData({ name: '', email: '', company: '', teamSize: '', role: '' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company && formData.teamSize && formData.role) {
      setSubmitted(true);
    }
  };

  const logos = ['Google', 'Meta', 'Stripe', 'Vercel', 'Microsoft'];

  const stats = [
    { value: '500+', label: 'Companies' },
    { value: '50K+', label: 'Team Members' },
    { value: '92%', label: 'Completion Rate' },
    { value: '4.8★', label: 'Team Rating' }
  ];

  const features: FeatureCard[] = [
    {
      icon: <BarChart size={24} className="text-[#FF6B2B]" />,
      title: 'Team Dashboard',
      desc: "Track every learner's progress, completions, and time spent in real time."
    },
    {
      icon: <Route size={24} className="text-[#FF6B2B]" />,
      title: 'Custom Learning Paths',
      desc: 'Assign role-specific courses and paths to different team members.'
    },
    {
      icon: <Award size={24} className="text-[#FF6B2B]" />,
      title: 'Verified Certificates',
      desc: 'Team members earn shareable certificates on course completion.'
    },
    {
      icon: <TrendingUp size={24} className="text-[#FF6B2B]" />,
      title: 'Deep Analytics',
      desc: 'Get insights on engagement, skill gaps, and ROI across your organization.'
    },
    {
      icon: <Shield size={24} className="text-[#FF6B2B]" />,
      title: 'SSO & Security',
      desc: 'Enterprise-grade security with Single Sign-On and role-based access.'
    },
    {
      icon: <Headphones size={24} className="text-[#FF6B2B]" />,
      title: 'Dedicated Support',
      desc: 'A dedicated customer success manager for teams of 50+.'
    }
  ];

  const teamFeatures = [
    'Up to 100 team members',
    'All 120+ free courses',
    'Custom learning paths',
    'Progress tracking dashboard',
    'Team certificates',
    'Email support'
  ];

  const enterpriseFeatures = [
    'Unlimited team members',
    'All Teams features',
    'SSO & advanced security',
    'Dedicated success manager',
    'Custom integrations',
    'Priority support (24/7)',
    'Analytics & reporting API',
    'Branded learning portal'
  ];

  return (
    <div className="bg-[#0A0F1E] min-h-screen text-white">
      {/* Hero Section */}
      <section className="bg-[#0A0F1E] pt-[100px] pb-16 px-6 text-center max-w-[800px] mx-auto">
        <span className="inline-block border border-[#FF6B2B] text-[#FF6B2B] text-[11px] font-bold tracking-widest px-3.5 py-1 rounded-full uppercase mb-4">
          FOR TEAMS & ENTERPRISE
        </span>
        <h1 className="text-[56px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
          Upskill your entire team.
        </h1>
        <p className="text-[18px] text-[#9CA3AF] max-w-[600px] mx-auto mb-8 leading-relaxed">
          Give your team access to 120+ expert-led courses. Track progress, assign paths, and grow together.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mb-10">
          <button 
            onClick={() => setShowDemoModal(true)}
            className="h-[52px] w-full sm:w-[200px] bg-[#FF6B2B] text-white font-bold rounded-[8px] flex items-center justify-center hover:bg-[#FF8C42] active:scale-[0.97] transition-all cursor-pointer shadow-md"
          >
            Get a Free Demo
          </button>
          <button 
            onClick={scrollToPricing}
            className="h-[52px] w-full sm:w-[200px] border border-[#1E2D45] bg-transparent text-[#9CA3AF] hover:text-white hover:border-white font-bold rounded-[8px] flex items-center justify-center transition-all cursor-pointer"
          >
            View Pricing
          </button>
        </div>

        {/* Trust logos */}
        <div className="pt-4">
          <span className="block text-[13px] text-[#9CA3AF] font-semibold uppercase tracking-wider mb-4">
            Trusted by teams at
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {logos.map((logo) => (
              <div 
                key={logo} 
                className="w-[90px] h-[34px] bg-[#111827] border border-[#1E2D45] rounded-[8px] flex items-center justify-center text-[12px] text-[#9CA3AF] font-bold select-none"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#111827] py-20 px-6 border-y border-[#1E2D45]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="block text-[40px] font-bold text-[#FF6B2B] mb-1 leading-none">
                {stat.value}
              </span>
              <span className="text-[14px] text-[#9CA3AF] font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[36px] font-bold text-white text-center mb-12">
            Everything your team needs.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-[#111827] border border-[#1E2D45] rounded-[12px] p-7 hover:border-[#FF6B2B] hover:shadow-[0_0_15px_rgba(255,107,43,0.1)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A2540] border border-[#1E2D45] flex items-center justify-center mb-5 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-[18px] font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="bg-[#0A0F1E] py-20 px-6 border-t border-[#1E2D45]">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[40px] font-bold text-white mb-2 leading-none">
            Simple, transparent pricing.
          </h2>
          <p className="text-[17px] text-[#9CA3AF] mb-12">
            Start free. Scale as your team grows.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-[800px] mx-auto">
            {/* Teams Plan */}
            <div className="flex-1 bg-[#1A2540] rounded-[12px] p-8 text-left border border-[#1E2D45] flex flex-col justify-between shadow-lg">
              <div>
                <span className="block text-[13px] text-[#9CA3AF] font-bold uppercase tracking-wider mb-2">
                  Teams
                </span>
                <div className="flex items-baseline mb-1">
                  <span className="text-[48px] font-bold text-white leading-none">$12</span>
                  <span className="text-[16px] text-[#9CA3AF] font-medium ml-1">/user/month</span>
                </div>
                <span className="block text-[13px] text-[#00C97B] font-semibold mb-6">Billed annually</span>

                <div className="border-t border-[#1E2D45] my-6"></div>

                <ul className="space-y-3.5">
                  {teamFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-white font-medium">
                      <Check size={16} className="text-[#00C97B] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setShowDemoModal(true)}
                className="w-full h-[48px] bg-[#FF6B2B] text-white hover:bg-[#FF8C42] active:scale-[0.97] font-bold rounded-[8px] text-[14px] transition-all mt-8 cursor-pointer shadow-sm flex items-center justify-center border-none"
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex-grow flex-1 bg-[#1A2540] rounded-[12px] p-8 text-left border border-[#FF6B2B] relative flex flex-col justify-between shadow-xl mt-6 md:mt-0 hover:shadow-[0_0_15px_rgba(255,107,43,0.15)]">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF6B2B] text-white text-[10px] font-extrabold tracking-wider px-3.5 py-1 rounded-full uppercase shadow-md border border-[#FF6B2B]">
                Most Popular
              </span>

              <div>
                <span className="block text-[13px] text-[#9CA3AF] font-bold uppercase tracking-wider mb-2">
                  Enterprise
                </span>
                <div className="flex items-baseline mb-1">
                  <span className="text-[40px] font-bold text-white leading-none">Custom</span>
                </div>
                <span className="block text-[13px] text-[#9CA3AF] mb-6">Tailored to your organization</span>

                <div className="border-t border-[#1E2D45] my-6"></div>

                <ul className="space-y-3.5">
                  {enterpriseFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-white font-medium">
                      <Check size={16} className="text-[#00C97B] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => { window.location.href = 'mailto:sales@learnify.com'; }}
                className="w-full h-[48px] bg-[#FF6B2B] text-white hover:bg-[#FF8C42] active:scale-[0.97] font-bold rounded-[8px] text-[14px] transition-all mt-8 cursor-pointer shadow-sm flex items-center justify-center border-none"
              >
                Contact Sales
              </button>
            </div>
          </div>

          <div className="mt-8 text-center flex items-center justify-center gap-2">
            <Lock size={14} className="text-[#9CA3AF]" />
            <span className="text-[13px] text-[#9CA3AF] font-medium">
              No credit card required for trial.
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-[#0A0F1E] py-20 px-6 text-center border-t border-[#1E2D45]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[40px] font-bold text-white mb-2 leading-none">
            Ready to upskill your team?
          </h2>
          <p className="text-[18px] text-[#9CA3AF] mb-8 font-medium">
            Start with a free 14-day trial — no credit card needed.
          </p>
          <button 
            onClick={() => setShowDemoModal(true)}
            className="h-[56px] px-8 bg-[#FF6B2B] text-white font-bold rounded-[8px] text-[16px] hover:bg-[#FF8C42] active:scale-[0.97] transition-all cursor-pointer shadow-md border-none"
          >
            Get a Free Demo
          </button>
        </div>
      </section>

      {/* DEMO MODAL SCREEN */}
      {showDemoModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) handleModalClose();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
        >
          <div className="bg-[#111827] border border-[#1E2D45] w-full max-w-[480px] h-auto rounded-[12px] p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-[scaleIn_0.2s_ease-out]">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#1A2540] flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer font-bold text-[18px] transition-colors focus:outline-none border-0"
            >
              ×
            </button>

            {submitted ? (
              /* SUCCESS STATE */
              <div className="text-center py-6">
                <div className="w-[80px] h-[80px] rounded-full bg-[#FF6B2B]/20 flex items-center justify-center text-white mb-6 mx-auto animate-[bounceIn_0.4s_ease-out] shadow-md border border-[#FF6B2B]/30">
                  <Check size={36} strokeWidth={3} className="text-[#FF6B2B]" />
                </div>
                <h3 className="text-[22px] font-bold text-white mb-2 leading-tight">
                  Demo Request Sent! 🎉
                </h3>
                <p className="text-[15px] text-[#9CA3AF] max-w-[340px] mx-auto mb-8">
                  We'll reach out to <strong className="text-[#FF6B2B]">{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={handleModalClose}
                  className="h-[44px] w-[160px] bg-transparent border border-[#1E2D45] text-[#9CA3AF] hover:text-white hover:border-white active:scale-[0.97] transition-all cursor-pointer mx-auto flex items-center justify-center rounded-[8px]"
                >
                  Close
                </button>
              </div>
            ) : (
              /* DEMO REQUEST FORM */
              <div>
                <div className="mb-6">
                  <span className="inline-block bg-[#FF6B2B]/20 text-[#FF6B2B] text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-3 border border-[#FF6B2B]/30">
                    Free Demo Request
                  </span>
                  <h3 className="text-[24px] font-bold text-white mb-2 leading-snug">
                    See Learnify for Teams in action.
                  </h3>
                  <p className="text-[14px] text-[#9CA3AF]">
                    Fill out the form and our team will reach out within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-all"
                      required
                    />
                  </div>

                  {/* Work Email */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-all"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-all"
                      required
                    />
                  </div>

                  {/* Team Size */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-all cursor-pointer"
                      required
                    >
                      <option value="" disabled className="bg-[#111827]">Select team size</option>
                      <option value="Just me" className="bg-[#111827]">Just me</option>
                      <option value="2-10" className="bg-[#111827]">2-10</option>
                      <option value="11-50" className="bg-[#111827]">11-50</option>
                      <option value="51-200" className="bg-[#111827]">51-200</option>
                      <option value="200+" className="bg-[#111827]">200+</option>
                    </select>
                  </div>

                  {/* Your Role */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">
                      Your Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-white text-[14px] outline-none focus:border-[#FF6B2B] transition-all cursor-pointer"
                      required
                    >
                      <option value="" disabled className="bg-[#111827]">Select your role</option>
                      <option value="Engineering" className="bg-[#111827]">Engineering</option>
                      <option value="Product" className="bg-[#111827]">Product</option>
                      <option value="HR/L&D" className="bg-[#111827]">HR/L&D</option>
                      <option value="Founder/CEO" className="bg-[#111827]">Founder/CEO</option>
                      <option value="Other" className="bg-[#111827]">Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-[48px] bg-[#FF6B2B] text-white font-bold rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#FF8C42] active:scale-[0.97] transition-all cursor-pointer border-none text-[15px]"
                    >
                      Request Demo →
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
export default TeamsPage;

