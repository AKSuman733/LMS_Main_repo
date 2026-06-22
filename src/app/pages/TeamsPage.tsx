import { useState, useEffect, useRef } from 'react';
import { BarChart, Route, Award, TrendingUp, Shield, Headphones, Check } from 'lucide-react';

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
    { value: '500+', label: 'Companies Trusted' },
    { value: '50K+', label: 'Team Members' },
    { value: '92%', label: 'Completion Rate' },
    { value: '4.8★', label: 'Team Rating' }
  ];

  const features: FeatureCard[] = [
    {
      icon: <BarChart size={24} className="text-[#2D1B69]" />,
      title: 'Team Dashboard',
      desc: "Track every learner's progress, completions, and time spent in real time."
    },
    {
      icon: <Route size={24} className="text-[#2D1B69]" />,
      title: 'Custom Learning Paths',
      desc: 'Assign role-specific courses and paths to different team members.'
    },
    {
      icon: <Award size={24} className="text-[#2D1B69]" />,
      title: 'Verified Certificates',
      desc: 'Team members earn shareable certificates on course completion.'
    },
    {
      icon: <TrendingUp size={24} className="text-[#2D1B69]" />,
      title: 'Deep Analytics',
      desc: 'Get insights on engagement, skill gaps, and ROI across your organization.'
    },
    {
      icon: <Shield size={24} className="text-[#2D1B69]" />,
      title: 'SSO & Security',
      desc: 'Enterprise-grade security with Single Sign-On and role-based access.'
    },
    {
      icon: <Headphones size={24} className="text-[#2D1B69]" />,
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-[100px] pb-16 px-6 text-center max-w-[800px] mx-auto">
        <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-4">
          For Teams & Enterprise
        </span>
        <h1 className="text-[56px] font-bold text-[#1A1A2E] leading-[1.1] mb-6 tracking-tight">
          Upskill your entire team.
        </h1>
        <p className="text-[18px] text-[#6B6B80] max-w-[600px] mx-auto mb-8 leading-relaxed">
          Give your team access to 120+ expert-led courses. Track progress, assign paths, and grow together.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 mb-10">
          <button 
            onClick={() => setShowDemoModal(true)}
            className="h-[52px] w-full sm:w-[200px] bg-[#2D1B69] text-[#BBFF00] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer shadow-md"
          >
            Get a Free Demo
          </button>
          <button 
            onClick={scrollToPricing}
            className="h-[52px] w-full sm:w-[200px] border-2 border-[#2D1B69] bg-white text-[#2D1B69] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EDE9FF] transition-all cursor-pointer"
          >
            View Pricing
          </button>
        </div>

        {/* Trust logos */}
        <div className="pt-4">
          <span className="block text-[13px] text-[#6B6B80] font-semibold uppercase tracking-wider mb-4">
            Trusted by teams at
          </span>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {logos.map((logo) => (
              <div 
                key={logo} 
                className="w-[90px] h-[34px] bg-[#F7F6F3] border border-[#E2E1F0] rounded-[8px] flex items-center justify-center text-[12px] text-[#6B6B80] font-bold select-none"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F7F6F3] py-20 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="block text-[40px] font-bold text-[#2D1B69] mb-1 leading-none">
                {stat.value}
              </span>
              <span className="text-[14px] text-[#6B6B80] font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[36px] font-bold text-[#1A1A2E] text-center mb-12">
            Everything your team needs.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#E2E1F0] rounded-[16px] p-7 hover:border-[#2D1B69] hover:shadow-[0_8px_24px_rgba(45,27,105,0.06)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#EDE9FF] flex items-center justify-center mb-5 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#6B6B80] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="bg-[#2D1B69] py-20 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[40px] font-bold text-white mb-2 leading-none">
            Simple, transparent pricing.
          </h2>
          <p className="text-[17px] text-white/70 mb-12">
            Start free. Scale as your team grows.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 max-w-[800px] mx-auto">
            {/* Teams Plan */}
            <div className="flex-1 bg-white rounded-[20px] p-8 text-left border border-white flex flex-col justify-between shadow-lg">
              <div>
                <span className="block text-[13px] text-[#2D1B69] font-bold uppercase tracking-wider mb-2">
                  Teams
                </span>
                <div className="flex items-baseline mb-1">
                  <span className="text-[48px] font-bold text-[#2D1B69] leading-none">$12</span>
                  <span className="text-[16px] text-[#6B6B80] font-medium ml-1">/user/month</span>
                </div>
                <span className="block text-[13px] text-[#6B6B80] mb-6">Billed annually</span>

                <div className="border-t border-[#E2E1F0] my-6"></div>

                <ul className="space-y-3.5">
                  {teamFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#1A1A2E] font-medium">
                      <Check size={16} className="text-[#2D1B69] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setShowDemoModal(true)}
                className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89] font-bold rounded-[10px] text-[14px] transition-colors mt-8 cursor-pointer shadow-sm flex items-center justify-center"
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex-grow flex-1 bg-white rounded-[20px] p-8 text-left border-t-[3px] border-[#2D1B69] relative flex flex-col justify-between shadow-xl mt-6 md:mt-0">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#BBFF00] text-[#2D1B69] text-[10px] font-extrabold tracking-wider px-3.5 py-1 rounded-full uppercase shadow-sm">
                Most Popular
              </span>

              <div>
                <span className="block text-[13px] text-[#2D1B69] font-bold uppercase tracking-wider mb-2">
                  Enterprise
                </span>
                <div className="flex items-baseline mb-1">
                  <span className="text-[40px] font-bold text-[#2D1B69] leading-none">Custom</span>
                </div>
                <span className="block text-[13px] text-[#6B6B80] mb-6">Tailored to your organization</span>

                <div className="border-t border-[#E2E1F0] my-6"></div>

                <ul className="space-y-3.5">
                  {enterpriseFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#1A1A2E] font-medium">
                      <Check size={16} className="text-[#2D1B69] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => { window.location.href = 'mailto:sales@learnify.com'; }}
                className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89] font-bold rounded-[10px] text-[14px] transition-colors mt-8 cursor-pointer shadow-sm flex items-center justify-center"
              >
                Contact Sales
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="text-[13px] text-white/60 font-medium">
              🔒 No credit card required for trial. Cancel anytime.
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[40px] font-bold text-[#1A1A2E] mb-2 leading-none">
            Ready to upskill your team?
          </h2>
          <p className="text-[18px] text-[#6B6B80] mb-8 font-medium">
            Start with a free 14-day trial — no credit card needed.
          </p>
          <button 
            onClick={() => setShowDemoModal(true)}
            className="h-[56px] px-8 bg-[#2D1B69] text-[#BBFF00] font-bold rounded-[10px] text-[16px] hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer shadow-md"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-[1000] flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-[480px] h-auto rounded-[20px] p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-[scaleIn_0.2s_ease-out]">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#6B6B80] hover:text-[#1A1A2E] cursor-pointer font-bold text-[18px] transition-colors focus:outline-none border-0"
            >
              ×
            </button>

            {submitted ? (
              /* SUCCESS STATE */
              <div className="text-center py-6">
                <div className="w-[80px] h-[80px] rounded-full bg-[#2D1B69] flex items-center justify-center text-white mb-6 mx-auto animate-[bounceIn_0.4s_ease-out] shadow-md">
                  <Check size={36} strokeWidth={3} className="text-[#BBFF00]" />
                </div>
                <h3 className="text-[22px] font-bold text-[#1A1A2E] mb-2 leading-tight">
                  Demo Request Sent! 🎉
                </h3>
                <p className="text-[15px] text-[#6B6B80] max-w-[340px] mx-auto mb-8">
                  We'll reach out to <strong className="text-[#2D1B69]">{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={handleModalClose}
                  className="h-[44px] w-[160px] bg-white border-2 border-[#2D1B69] text-[#2D1B69] font-bold rounded-[10px] hover:bg-[#EDE9FF] active:scale-[0.98] transition-all cursor-pointer mx-auto flex items-center justify-center"
                >
                  Close
                </button>
              </div>
            ) : (
              /* DEMO REQUEST FORM */
              <div>
                <div className="mb-6">
                  <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-3">
                    Free Demo Request
                  </span>
                  <h3 className="text-[24px] font-bold text-[#1A1A2E] mb-2 leading-snug">
                    See Learnify for Teams in action.
                  </h3>
                  <p className="text-[14px] text-[#6B6B80]">
                    Fill out the form and our team will reach out within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                      required
                    />
                  </div>

                  {/* Work Email */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                      required
                    />
                  </div>

                  {/* Team Size */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select team size</option>
                      <option value="Just me">Just me</option>
                      <option value="2-10">2-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>

                  {/* Your Role */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">
                      Your Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select your role</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="HR/L&D">HR/L&D</option>
                      <option value="Founder/CEO">Founder/CEO</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] font-bold rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer border-0 text-[15px]"
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
