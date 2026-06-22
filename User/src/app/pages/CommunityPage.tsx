import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Heart, Eye, Calendar, Award, X, Search } from 'lucide-react';

interface Discussion {
  id: string;
  category: string;
  timeAgo: string;
  title: string;
  preview: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  replies: number;
  views: string;
}

interface Member {
  rank: number;
  name: string;
  avatar: string;
  coursesCount: number;
  xp: number;
}

interface Event {
  day: string;
  month: string;
  title: string;
  type: string;
}

export function CommunityPage() {
  // 1. Modals Open State
  const [activeModal, setActiveModal] = useState<'join' | 'post' | 'event' | null>(null);

  // 2. Event Modal Prefill State
  const [eventToRegister, setEventToRegister] = useState<{ name: string; date: string } | null>(null);

  // 3. Form Success States
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);

  // 4. Form Fields
  const [joinForm, setJoinForm] = useState({ name: '', email: '', interest: '' });
  const [postForm, setPostForm] = useState({ title: '', category: '', description: '' });
  const [eventForm, setEventForm] = useState({ name: '', email: '', role: '' });

  // 5. Active Category Filter Tab & Local Search Query
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 6. Toasts Notifications List
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // 7. Ref for smooth scrolling
  const discussionsRef = useRef<HTMLDivElement>(null);

  // 8. Discussions Feed (Updated to match exact specification card content)
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 'd-1',
      category: 'AI Agents',
      timeAgo: '2 hours ago',
      title: 'How to build multi-agent flows using LangGraph and vector stores?',
      preview: 'I am trying to orchestrate multiple cooperative agents in a RAG pipeline. One agent queries the vector store, another formats, and a third audits. Any design patterns?',
      author: {
        name: 'Sarah Chen',
        avatar: 'SC'
      },
      likes: 42,
      replies: 18,
      views: '1.2k'
    },
    {
      id: 'd-2',
      category: 'LLMOps',
      timeAgo: '5 hours ago',
      title: 'Best tools for evaluation of prompt variants in production?',
      preview: 'Looking for recommended frameworks to evaluate dynamic prompts against test suites. We are currently testing custom evaluators using semantic similarity metrics.',
      author: {
        name: 'Marcus Brody',
        avatar: 'MB'
      },
      likes: 28,
      replies: 12,
      views: '840'
    },
    {
      id: 'd-3',
      category: 'Graph RAG',
      timeAgo: '1 day ago',
      title: 'GraphRAG vs Vector RAG: Performance benchmarks for complex queries',
      preview: 'We completed a comprehensive benchmark comparison of Neo4j-based Knowledge Graph RAG versus standard chunk embeddings. Here are the unexpected results...',
      author: {
        name: 'Elena Rostova',
        avatar: 'ER'
      },
      likes: 67,
      replies: 31,
      views: '3.4k'
    },
    {
      id: 'd-4',
      category: 'ML Ops',
      timeAgo: '2 days ago',
      title: 'Automating model drift detection with Evidently AI and Airflow',
      preview: 'In this post, we discuss automating data drift and target drift monitoring using Evidently AI and scheduling them with Airflow DAGs.',
      author: {
        name: 'Devon Patel',
        avatar: 'DP'
      },
      likes: 54,
      replies: 22,
      views: '2.1k'
    }
  ]);

  // 9. Keep track of liked posts locally
  const [likedDiscussions, setLikedDiscussions] = useState<Record<string, boolean>>({});

  const leaderboard: Member[] = [
    { rank: 1, name: 'Sarah Chen', avatar: 'SC', coursesCount: 15, xp: 4850 },
    { rank: 2, name: 'Alex Rivera', avatar: 'AR', coursesCount: 12, xp: 4200 },
    { rank: 3, name: 'Elena Rostova', avatar: 'ER', coursesCount: 11, xp: 3950 },
    { rank: 4, name: 'Marcus Brody', avatar: 'MB', coursesCount: 9, xp: 3500 },
    { rank: 5, name: 'Devon Patel', avatar: 'DP', coursesCount: 8, xp: 3100 }
  ];

  const events: Event[] = [
    { day: '24', month: 'MAY', title: 'Live Workshop: Designing Vector Stores at Scale', type: 'Workshop' },
    { day: '28', month: 'MAY', title: 'LLMOps Expert Panel Q&A Session', type: 'Live QA' },
    { day: '04', month: 'JUN', title: 'RAG Hackathon 2026 Orientation', type: 'Live Event' }
  ];

  // Trigger floating toast notification
  const triggerToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Modal display toggles
  const openModal = (type: 'join' | 'post' | 'event', eventName = '', eventDate = '') => {
    if (type === 'event') {
      setEventToRegister({ name: eventName, date: eventDate });
      setEventForm({ name: '', email: '', role: '' });
      setEventSuccess(false);
    } else if (type === 'join') {
      setJoinForm({ name: '', email: '', interest: '' });
      setJoinSuccess(false);
    } else if (type === 'post') {
      setPostForm({ title: '', category: '', description: '' });
      setPostSuccess(false);
    }
    setActiveModal(type);
  };

  const closeModal = (type: 'join' | 'post' | 'event') => {
    setActiveModal(null);
  };

  // Close modals on backdrop click
  const handleBackdropClick = (e: React.MouseEvent, type: 'join' | 'post' | 'event') => {
    if (e.target === e.currentTarget) {
      closeModal(type);
    }
  };

  // Close modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // Form submission functions
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSuccess(true);
    triggerToast('Welcome to Learnify Community! 🎉');
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add discussion dynamically
    const newDiscussion: Discussion = {
      id: `d-${Date.now()}`,
      category: postForm.category,
      timeAgo: 'Just now',
      title: postForm.title,
      preview: postForm.description,
      author: {
        name: 'You (Member)',
        avatar: 'YOU'
      },
      likes: 0,
      replies: 0,
      views: '1'
    };

    setDiscussions([newDiscussion, ...discussions]);
    setPostSuccess(true);
    triggerToast('Discussion posted successfully! ✅');
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEventSuccess(true);
    triggerToast('Registration confirmed! 🎟️');
  };

  // Toggle Heart likes
  const toggleLike = (e: React.MouseEvent, id: string, initialLikes: number) => {
    e.stopPropagation();
    const isLiked = likedDiscussions[id];
    
    setLikedDiscussions(prev => ({
      ...prev,
      [id]: !isLiked
    }));

    setDiscussions(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          likes: isLiked ? d.likes - 1 : d.likes + 1
        };
      }
      return d;
    }));

    if (!isLiked) {
      triggerToast('Discussion liked! ❤️');
    }
  };

  // Smooth scroll
  const scrollToDiscussions = () => {
    if (discussionsRef.current) {
      const headerOffset = 85;
      const elementPosition = discussionsRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Category Tag styles mapping
  const getTagStyles = (category: string) => {
    const norm = category.toLowerCase().replace(' ', '-');
    if (norm === 'ai-agents') {
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    } else if (norm === 'llmops') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    } else if (norm === 'graph-rag') {
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    } else if (norm === 'ml-ops') {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  // Avatar Gradient generator
  const getAvatarGradient = (initials: string) => {
    if (initials === 'SC') return 'from-[#f97316] to-[#f43f5e]';
    if (initials === 'MB') return 'from-[#3b82f6] to-[#8b5cf6]';
    if (initials === 'ER') return 'from-[#10b981] to-[#06b6d4]';
    if (initials === 'DP') return 'from-[#ec4899] to-[#f43f5e]';
    if (initials === 'AR') return 'from-[#a855f7] to-[#e879f9]';
    return 'from-[#8892b0] to-[#2a2f52]';
  };

  // Filter feed logic
  const filteredDiscussions = discussions.filter(d => {
    const normTab = activeTab.toLowerCase().replace(' ', '-');
    const normCat = d.category.toLowerCase().replace(' ', '-');
    const matchesCategory = normTab === 'all' || normCat === normTab;

    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.preview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0d0f1e] min-h-screen text-[#e8eaf6]">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #2a2f52;
          border-radius: 10px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#13162b] to-[#0d0f1e] h-[320px] px-6 flex flex-col justify-center text-center border-b border-[#2a2f52]">
        <div className="max-w-[1280px] mx-auto w-full z-10">
          <h1 className="text-[48px] font-bold text-white mb-3 tracking-tight leading-none font-sans">
            Learn together. <span className="bg-gradient-to-r from-[#f97316] to-[#ff8c3b] bg-clip-text text-transparent">Grow faster.</span>
          </h1>
          <p className="text-[17px] text-[#8892b0] max-w-xl mx-auto mb-6">
            Join 1.3M+ learners sharing knowledge, asking questions, and celebrating wins.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => openModal('join')}
              className="h-[48px] px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold rounded-[8px] flex items-center justify-center active:scale-[0.97] transition-all cursor-pointer shadow-md border-none"
            >
              Join Community
            </button>
            <button 
              onClick={scrollToDiscussions}
              className="h-[48px] px-6 border border-[#2a2f52] bg-transparent text-[#8892b0] hover:text-white hover:border-white active:scale-[0.97] transition-all cursor-pointer rounded-[8px]"
            >
              Browse Discussions
            </button>
          </div>
        </div>

        {/* Floating Stat Cards (Overlapping) */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 z-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#161a30] p-4 rounded-[12px] shadow-lg border border-[#2a2f52] text-center">
              <span className="block text-[28px] font-bold text-[#f97316]">1.3M</span>
              <span className="text-[13px] md:text-[14px] text-[#8892b0] font-medium uppercase tracking-wider">Members</span>
            </div>
            <div className="bg-[#161a30] p-4 rounded-[12px] shadow-lg border border-[#2a2f52] text-center">
              <span className="block text-[28px] font-bold text-[#22d3a5]">50K+</span>
              <span className="text-[13px] md:text-[14px] text-[#8892b0] font-medium uppercase tracking-wider">Posts</span>
            </div>
            <div className="bg-[#161a30] p-4 rounded-[12px] shadow-lg border border-[#2a2f52] text-center">
              <span className="block text-[28px] font-bold text-[#60a5fa]">200+</span>
              <span className="text-[13px] md:text-[14px] text-[#8892b0] font-medium uppercase tracking-wider">Events/Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section ref={discussionsRef} className="pt-24 pb-20 px-6 bg-[#0d0f1e]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN — DISCUSSIONS FEED */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-white font-sans">Recent Discussions</h2>
              <button 
                onClick={() => openModal('post')}
                className="h-[38px] px-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[14px] rounded-[8px] active:scale-[0.97] transition-all cursor-pointer shadow-sm border-none flex items-center gap-1.5"
              >
                <span>+</span> Start a Discussion
              </button>
            </div>

            {/* Filter Tabs & Local Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin max-w-full">
                {['All', 'AI Agents', 'LLMOps', 'Graph RAG', 'ML Ops'].map((category) => {
                  const tagValue = category.toLowerCase().replace(' ', '-');
                  const isActive = activeTab === tagValue;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveTab(tagValue)}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all border ${
                        isActive 
                          ? 'border-[#f97316] text-[#f97316] bg-[#f97316]/5' 
                          : 'border-[#2a2f52] text-[#8892b0] hover:text-[#e8eaf6]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Local Page Search Input */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8892b0]" size={16} />
                <input
                  type="text"
                  placeholder="Filter discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[36px] pl-9 pr-4 bg-[#13162b] border border-[#2a2f52] rounded-[8px] text-[13px] text-white outline-none focus:border-[#f97316] placeholder-[#8892b0]/50"
                />
              </div>
            </div>

            {/* Discussion Feed list */}
            <div className="space-y-4">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((d) => (
                  <div 
                    key={d.id} 
                    className="bg-[#161a30] border border-[#2a2f52] rounded-[12px] p-5 hover:border-[#f97316] hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${getTagStyles(d.category)}`}>
                        {d.category}
                      </span>
                      <span className="text-[12px] text-[#8892b0] font-medium">{d.timeAgo}</span>
                    </div>

                    <h3 className="text-[17px] font-bold text-white mb-2 leading-snug hover:text-[#f97316] transition-colors line-clamp-2">
                      {d.title}
                    </h3>

                    <p className="text-[14px] text-[#8892b0] mb-4 leading-relaxed line-clamp-2">
                      {d.preview}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#2a2f52] pt-3.5 mt-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${getAvatarGradient(d.author.avatar)} flex items-center justify-center text-white text-[11px] font-bold shadow-sm`}>
                          {d.author.avatar}
                        </div>
                        <span className="text-[13px] text-white font-semibold">{d.author.name}</span>
                      </div>

                      <div className="flex items-center gap-4 text-[13px] text-[#8892b0]">
                        <button 
                          onClick={(e) => toggleLike(e, d.id, d.likes)}
                          className={`flex items-center gap-1.5 transition-colors border-none bg-transparent cursor-pointer ${likedDiscussions[d.id] ? 'text-red-500' : 'hover:text-red-400'}`}
                        >
                          <Heart size={14} className={likedDiscussions[d.id] ? 'fill-red-500 stroke-red-500' : ''} />
                          <span>{d.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5 hover:text-[#f97316] transition-colors">
                          <MessageSquare size={14} />
                          <span>{d.replies}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye size={14} />
                          <span>{d.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-[#2a2f52] rounded-[12px] text-[#8892b0]">
                  <p className="text-[15px] mb-1">No discussions match your filter criteria.</p>
                  <p className="text-[13px]">Try starting a discussion of your own!</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button className="h-[44px] px-6 border border-[#2a2f52] bg-[#13162b] text-[#8892b0] font-bold text-[14px] rounded-[8px] hover:border-[#f97316] hover:text-white active:scale-[0.97] transition-all cursor-pointer">
                Load more discussions
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 lg:col-span-1">
            {/* LEADERBOARD CARD */}
            <div className="bg-[#161a30] border border-[#2a2f52] rounded-[12px] p-5 shadow-sm">
              <h3 className="text-[16px] font-bold text-white mb-4 flex items-center gap-2 border-b border-[#2a2f52] pb-2">
                <span>🏆</span> Top Learners this Week
              </h3>
              <div className="space-y-3.5">
                {leaderboard.map((member) => (
                  <div key={member.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[#f97316] w-4 text-center">
                        {member.rank}
                      </span>
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${getAvatarGradient(member.avatar)} flex items-center justify-center text-white text-[13px] font-bold shadow-sm`}>
                        {member.avatar}
                      </div>
                      <div>
                        <span className="block text-[14px] font-bold text-white leading-tight">{member.name}</span>
                        <span className="text-[11px] text-[#8892b0] font-medium">{member.coursesCount} courses completed</span>
                      </div>
                    </div>
                    <span className="bg-[#22d3a5]/10 text-[#22d3a5] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#22d3a5]/20 uppercase">
                      {member.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING EVENTS CARD */}
            <div className="bg-[#161a30] border border-[#2a2f52] rounded-[12px] p-5 shadow-sm">
              <h3 className="text-[16px] font-bold text-white mb-4 flex items-center gap-2 border-b border-[#2a2f52] pb-2">
                <span>📅</span> Upcoming Events
              </h3>
              <div className="space-y-4">
                {events.map((e, idx) => {
                  let badgeColor = 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20';
                  let dateTopBorder = 'border-t-3 border-t-[#f97316]';
                  let dayColor = 'text-[#f97316]';

                  if (e.type === 'Live QA') {
                    badgeColor = 'bg-[#22d3a5]/10 text-[#22d3a5] border-[#22d3a5]/20';
                    dateTopBorder = 'border-t-3 border-t-[#22d3a5]';
                    dayColor = 'text-[#22d3a5]';
                  } else if (e.type === 'Live Event') {
                    badgeColor = 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20';
                    dateTopBorder = 'border-t-3 border-t-[#60a5fa]';
                    dayColor = 'text-[#60a5fa]';
                  }

                  return (
                    <div key={idx} className="flex items-center gap-3.5 pb-4 border-b border-dashed border-[#2a2f52] last:border-b-0 last:pb-0">
                      <div className={`w-[42px] h-[50px] flex-shrink-0 bg-[#13162b] border border-[#2a2f52] rounded-[8px] flex flex-col items-center justify-center font-bold overflow-hidden ${dateTopBorder}`}>
                        <span className="text-[9px] uppercase tracking-wider leading-none text-[#8892b0] mb-0.5">{e.month}</span>
                        <span className={`text-[15px] leading-none font-extrabold ${dayColor}`}>{e.day}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="block text-[13px] font-bold text-white truncate leading-tight mb-1" title={e.title}>{e.title}</span>
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeColor}`}>
                          {e.type}
                        </span>
                      </div>
                      <button 
                        onClick={() => openModal('event', e.title, `${e.month} ${e.day}, 2026`)}
                        className="h-[28px] px-2.5 border border-[#2a2f52] bg-[#13162b] text-[#e8eaf6] hover:border-[#f97316] hover:text-[#f97316] hover:bg-[#f97316]/5 font-bold text-[11px] rounded-[6px] active:scale-[0.97] transition-all cursor-pointer flex-shrink-0"
                      >
                        Register
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 🪟 MODAL 1: JOIN COMMUNITY MODAL */}
      {activeModal === 'join' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => closeModal('join')}
        >
          <div 
            className="bg-[#161a30] border border-[#2a2f52] rounded-[16px] w-full max-w-[500px] p-6 relative shadow-[0_15px_40px_rgba(0,0,0,0.5)] transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-[#8892b0] hover:text-[#e8eaf6] transition-colors p-1 rounded-full hover:bg-white/5 border-none bg-transparent cursor-pointer"
              onClick={() => closeModal('join')}
            >
              <X size={18} />
            </button>

            {!joinSuccess ? (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-white mb-1">Join the Learnify Community</h3>
                  <p className="text-[13px] text-[#8892b0]">Unlock structured paths, exclusive expert panels, events, and collaborative forums.</p>
                </div>
                
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Elena Rostova"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="elena.rostova@example.com"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Primary Interest</label>
                    <select 
                      required
                      value={joinForm.interest}
                      onChange={(e) => setJoinForm({ ...joinForm, interest: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] transition-all"
                    >
                      <option value="" disabled>Select your tech interest...</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="LLMOps">LLMOps</option>
                      <option value="Graph RAG">Graph RAG</option>
                      <option value="Data Engineering">Data Engineering</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => closeModal('join')}
                      className="px-4 py-2 border border-[#2a2f52] bg-transparent text-[#8892b0] hover:text-[#e8eaf6] hover:bg-white/5 rounded-[8px] font-bold text-[14px] transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all shadow-md cursor-pointer border-none"
                    >
                      Join Now 🚀
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-[70px] h-[70px] mx-auto mb-4 bg-[#22d3a5]/10 text-[#22d3a5] rounded-full flex items-center justify-center text-[28px]">
                  🚀
                </div>
                <h4 className="text-[22px] font-bold text-white mb-2">Welcome aboard! 🎉</h4>
                <p className="text-[14px] text-[#8892b0] max-w-[360px] mx-auto mb-6">Your application is approved. Join discussions, complete paths, earn XP, and register for workshops immediately!</p>
                <button 
                  onClick={() => closeModal('join')}
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all border-none cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🪟 MODAL 2: START A DISCUSSION MODAL */}
      {activeModal === 'post' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => closeModal('post')}
        >
          <div 
            className="bg-[#161a30] border border-[#2a2f52] rounded-[16px] w-full max-w-[500px] p-6 relative shadow-[0_15px_40px_rgba(0,0,0,0.5)] transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-[#8892b0] hover:text-[#e8eaf6] transition-colors p-1 rounded-full hover:bg-white/5 border-none bg-transparent cursor-pointer"
              onClick={() => closeModal('post')}
            >
              <X size={18} />
            </button>

            {!postSuccess ? (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-white mb-1">Start a New Discussion</h3>
                  <p className="text-[13px] text-[#8892b0]">Pose a question, post a tutorial, or share your latest findings with 1.3M+ members.</p>
                </div>
                
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Discussion Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Tips for fine-tuning small language models on budget GPUs"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Category</label>
                    <select 
                      required
                      value={postForm.category}
                      onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] transition-all"
                    >
                      <option value="" disabled>Choose a category...</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="LLMOps">LLMOps</option>
                      <option value="Graph RAG">Graph RAG</option>
                      <option value="ML Ops">ML Ops</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Description</label>
                    <textarea 
                      required
                      placeholder="Detail your thoughts, include code blocks, benchmarks, or specific questions..."
                      value={postForm.description}
                      onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all h-[110px] resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => closeModal('post')}
                      className="px-4 py-2 border border-[#2a2f52] bg-transparent text-[#8892b0] hover:text-[#e8eaf6] hover:bg-white/5 rounded-[8px] font-bold text-[14px] transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all shadow-md cursor-pointer border-none"
                    >
                      Post Discussion
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-[70px] h-[70px] mx-auto mb-4 bg-[#22d3a5]/10 text-[#22d3a5] rounded-full flex items-center justify-center text-[28px]">
                  ✅
                </div>
                <h4 className="text-[22px] font-bold text-white mb-2">Discussion Posted! ✅</h4>
                <p className="text-[14px] text-[#8892b0] max-w-[360px] mx-auto mb-6">Your discussion has been published directly to the feed. Keep an eye out for comments and engagement from other members!</p>
                <button 
                  onClick={() => closeModal('post')}
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all border-none cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🪟 MODAL 3: EVENT REGISTER MODAL */}
      {activeModal === 'event' && eventToRegister && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => closeModal('event')}
        >
          <div 
            className="bg-[#161a30] border border-[#2a2f52] rounded-[16px] w-full max-w-[500px] p-6 relative shadow-[0_15px_40px_rgba(0,0,0,0.5)] transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-[#8892b0] hover:text-[#e8eaf6] transition-colors p-1 rounded-full hover:bg-white/5 border-none bg-transparent cursor-pointer"
              onClick={() => closeModal('event')}
            >
              <X size={18} />
            </button>

            {!eventSuccess ? (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-white mb-1 truncate" title={eventToRegister.name}>
                    Register: {eventToRegister.name}
                  </h3>
                  <p className="text-[13px] text-[#8892b0]">
                    Reserve your spot for this live session happening on {eventToRegister.date}. Calendar invite details sent instantly on confirmation.
                  </p>
                </div>
                
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alex Rivera"
                      value={eventForm.name}
                      onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="alex.rivera@example.com"
                      value={eventForm.email}
                      onChange={(e) => setEventForm({ ...eventForm, email: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8892b0] mb-2 uppercase tracking-wide">Role / Occupation</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Senior Machine Learning Engineer"
                      value={eventForm.role}
                      onChange={(e) => setEventForm({ ...eventForm, role: e.target.value })}
                      className="w-full bg-[#13162b] border border-[#2a2f52] rounded-[8px] px-4 py-2.5 text-[#e8eaf6] text-[14px] outline-none focus:border-[#f97316] placeholder-[#8892b0]/40 transition-all"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => closeModal('event')}
                      className="px-4 py-2 border border-[#2a2f52] bg-transparent text-[#8892b0] hover:text-[#e8eaf6] hover:bg-white/5 rounded-[8px] font-bold text-[14px] transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all shadow-md cursor-pointer border-none"
                    >
                      Confirm Registration
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-[70px] h-[70px] mx-auto mb-4 bg-[#22d3a5]/10 text-[#22d3a5] rounded-full flex items-center justify-center text-[28px]">
                  🎟️
                </div>
                <h4 className="text-[22px] font-bold text-white mb-2">You're registered! 🎟️</h4>
                <p className="text-[14px] text-[#8892b0] max-w-[360px] mx-auto mb-6">We've sent a calendar invite and access credentials to your email. See you at the live session!</p>
                <button 
                  onClick={() => closeModal('event')}
                  className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-[8px] font-bold text-[14px] transition-all border-none cursor-pointer"
                >
                  Awesome
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔔 TOAST NOTIFICATIONS HOLDER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#161a30] border border-[#2a2f52] border-l-4 border-l-[#22d3a5] text-[#e8eaf6] px-5 py-3.5 rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 font-semibold text-[14px] min-w-[300px] animate-slide-up"
          >
            <span className="text-[#22d3a5] flex items-center justify-center">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
              </svg>
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
