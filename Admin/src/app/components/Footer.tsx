import { Link } from 'react-router';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-[#1A2540] mt-20 text-white">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <span className="text-[20px] font-bold text-white">Learnify</span>
              <div className="w-[6px] h-[6px] rounded-full bg-[#FF6B2B] ml-[2px]"></div>
            </div>
            <p className="text-[14px] text-[#9CA3AF] mb-6 leading-relaxed">
              Learn without limits. Join 1.3M+ learners mastering new skills with expert-led courses.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#FF6B2B]/20 text-[#FF6B2B] hover:border-[#00C97B] hover:text-[#00C97B] hover:bg-[#00C97B]/10 transition-all duration-200"
              >
                <Twitter size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#00C97B]/20 text-[#00C97B] hover:border-[#FF6B2B] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all duration-200"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#FF6B2B]/20 text-[#FF6B2B] hover:border-[#00C97B] hover:text-[#00C97B] hover:bg-[#00C97B]/10 transition-all duration-200"
              >
                <Github size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#00C97B]/20 text-[#00C97B] hover:border-[#FF6B2B] hover:text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-all duration-200"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-[13px] font-bold text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/paths" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  For Teams
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-[13px] font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#9CA3AF] hover:text-[#FF6B2B] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1A2540] text-center">
          <p className="text-[13px] text-[#9CA3AF]">
            © 2026 Learnify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
