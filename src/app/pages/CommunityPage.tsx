import { useState } from 'react';
import { MessageSquare, Heart, Eye, Calendar, Award, Flame, Star } from 'lucide-react';

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
  const [discussions] = useState<Discussion[]>([
    {
      id: 'd-1',
      category: 'AI Agents',
      timeAgo: '2 hours ago',
      title: 'How to build multi-agent flows using LangGraph and vector stores?',
      preview: 'I am trying to orchestrate multiple cooperative agents in a RAG pipeline. One agent queries the vector store, another formats, and a third audits. Any design patterns?',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
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
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
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
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
      },
      likes: 95,
      replies: 34,
      views: '3.1k'
    },
    {
      id: 'd-4',
      category: 'Prompt Engineering',
      timeAgo: '2 days ago',
      title: 'System prompts vs few-shot exemplars: Which gives better structural control?',
      preview: 'When aiming for highly specific JSON structures, does few-shot learning perform better than precise system instructions? Here is a test on GPT-4o.',
      author: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
      },
      likes: 56,
      replies: 22,
      views: '1.8k'
    },
    {
      id: 'd-5',
      category: 'Deep Learning',
      timeAgo: '3 days ago',
      title: 'Fine-tuning small models (7B) for domain-specific medical summaries',
      preview: 'I have shared the full training script and hyperparameters used to fine-tune Llama 3 8B on medical reports. We achieved amazing precision gains!',
      author: {
        name: 'Devon Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
      },
      likes: 112,
      replies: 45,
      views: '4.2k'
    }
  ]);

  const [leaderboard] = useState<Member[]>([
    { rank: 1, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80', coursesCount: 14, xp: 4850 },
    { rank: 2, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', coursesCount: 11, xp: 4200 },
    { rank: 3, name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80', coursesCount: 9, xp: 3950 },
    { rank: 4, name: 'Marcus Brody', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', coursesCount: 8, xp: 3500 },
    { rank: 5, name: 'Devon Patel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', coursesCount: 12, xp: 3100 }
  ]);

  const [events] = useState<Event[]>([
    { day: '24', month: 'MAY', title: 'Live Workshop: Designing Vector Pipelines', type: 'Workshop' },
    { day: '28', month: 'MAY', title: 'LLMOps Expert Panel Q&A Session', type: 'Live QA' },
    { day: '04', month: 'JUN', title: 'RAG Hackathon 2026 Orientation', type: 'Live Event' }
  ]);

  const topics = [
    'AI Agents',
    'LLMOps',
    'RAG',
    'Python',
    'Data Science',
    'Prompt Engineering',
    'LangChain',
    'GenAI',
    'Deep Learning'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2D1B69] to-[#1A0F3C] h-[320px] px-6 flex flex-col justify-center text-center">
        <div className="max-w-[1280px] mx-auto w-full z-10">
          <h1 className="text-[48px] font-bold text-white mb-3 tracking-tight leading-none">
            Learn together. Grow faster.
          </h1>
          <p className="text-[17px] text-white/70 max-w-xl mx-auto mb-6">
            Join 1.3M+ learners sharing knowledge, asking questions, and celebrating wins.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <button className="h-[48px] w-[180px] bg-white text-[#2D1B69] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#F7F6F3] transition-all cursor-pointer shadow-md">
              Join the Community
            </button>
            <button className="h-[48px] w-[180px] border border-white bg-transparent text-white font-bold rounded-[10px] flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
              Browse Discussions
            </button>
          </div>
        </div>

        {/* Floating Stat Cards (Overlapping) */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6 z-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-4 rounded-[12px] shadow-[0_8px_24px_rgba(45,27,105,0.08)] border border-[#E2E1F0] text-center">
              <span className="block text-[28px] font-bold text-[#2D1B69]">1.3M</span>
              <span className="text-[13px] md:text-[14px] text-[#6B6B80] font-medium">Members</span>
            </div>
            <div className="bg-white p-4 rounded-[12px] shadow-[0_8px_24px_rgba(45,27,105,0.08)] border border-[#E2E1F0] text-center">
              <span className="block text-[28px] font-bold text-[#2D1B69]">50K+</span>
              <span className="text-[13px] md:text-[14px] text-[#6B6B80] font-medium">Posts</span>
            </div>
            <div className="bg-white p-4 rounded-[12px] shadow-[0_8px_24px_rgba(45,27,105,0.08)] border border-[#E2E1F0] text-center">
              <span className="block text-[28px] font-bold text-[#2D1B69]">200+</span>
              <span className="text-[13px] md:text-[14px] text-[#6B6B80] font-medium">Events/Year</span>
            </div>
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section className="pt-24 pb-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN — DISCUSSIONS FEED */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#1A1A2E]">Recent Discussions</h2>
              <button className="h-[38px] px-4 bg-[#2D1B69] text-[#BBFF00] font-bold text-[14px] rounded-[8px] hover:bg-[#3D2B89] transition-all cursor-pointer shadow-sm">
                Start a Discussion
              </button>
            </div>

            {/* Discussion Feed list */}
            <div className="space-y-4">
              {discussions.map((d) => (
                <div 
                  key={d.id} 
                  className="bg-white border border-[#E2E1F0] rounded-[12px] p-5 hover:border-[#2D1B69] hover:shadow-[0_4px_16px_rgba(45,27,105,0.04)] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                      {d.category}
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">{d.timeAgo}</span>
                  </div>

                  <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-2 leading-snug hover:text-[#2D1B69] transition-colors line-clamp-2">
                    {d.title}
                  </h3>

                  <p className="text-[14px] text-[#6B6B80] mb-4 leading-relaxed line-clamp-2">
                    {d.preview}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#E2E1F0] pt-3.5 mt-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={d.author.avatar} 
                        alt={d.author.name} 
                        className="w-6 h-6 rounded-full border object-cover"
                      />
                      <span className="text-[13px] text-[#1A1A2E] font-semibold">{d.author.name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[13px] text-[#6B6B80]">
                      <div className="flex items-center gap-1.5 hover:text-[#EF4444] transition-colors">
                        <Heart size={14} />
                        <span>{d.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-[#2D1B69] transition-colors">
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
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button className="h-[44px] px-6 border border-[#E2E1F0] bg-white text-[#6B6B80] font-bold text-[14px] rounded-[10px] hover:border-[#2D1B69] hover:text-[#2D1B69] transition-colors cursor-pointer">
                Load more discussions
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 lg:col-span-1">
            {/* LEADERBOARD CARD */}
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-5 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <span>🏆</span> Top Learners this Week
              </h3>
              <div className="space-y-3.5">
                {leaderboard.map((member) => (
                  <div key={member.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[#2D1B69] w-4 text-center">
                        {member.rank}
                      </span>
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-9 h-9 rounded-full border object-cover"
                      />
                      <div>
                        <span className="block text-[14px] font-bold text-[#1A1A2E] leading-tight">{member.name}</span>
                        <span className="text-[11px] text-[#6B6B80] font-medium">{member.coursesCount} courses completed</span>
                      </div>
                    </div>
                    <span className="bg-[#BBFF00] text-[#1A1A2E] text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                      {member.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING EVENTS CARD */}
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-5 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <span>📅</span> Upcoming Events
              </h3>
              <div className="space-y-4">
                {events.map((e, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="w-[40px] h-[48px] flex-shrink-0 bg-[#2D1B69] text-white rounded-[6px] flex flex-col items-center justify-center font-bold">
                      <span className="text-[14px] leading-tight">{e.day}</span>
                      <span className="text-[9px] uppercase tracking-wider leading-none text-[#BBFF00]">{e.month}</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <span className="block text-[13px] font-bold text-[#1A1A2E] truncate leading-tight mb-0.5">{e.title}</span>
                      <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px]">
                        {e.type}
                      </span>
                    </div>
                    <button className="h-[28px] px-2.5 border border-[#2D1B69] text-[#2D1B69] hover:bg-[#EDE9FF] font-bold text-[11px] rounded-[6px] transition-colors cursor-pointer flex-shrink-0">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TOPICS TO EXPLORE */}
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-5 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-4">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {topics.map((t, idx) => (
                  <button 
                    key={idx}
                    className="px-3.5 py-1.5 bg-white border border-[#E2E1F0] rounded-[10px] text-[13px] text-[#6B6B80] font-medium hover:bg-[#2D1B69] hover:border-[#2D1B69] hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
