import { Link } from 'react-router';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#F7F6F3] border-t border-[#E2E1F0] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <span className="text-[20px] font-bold text-[#2D1B69]">Learnify</span>
              <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
            </div>
            <p className="text-[14px] text-[#6B6B80] mb-4">
              Learn without limits. Join 1.3M+ learners mastering new skills.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E1F0] text-[#6B6B80] hover:border-[#2D1B69] hover:text-[#2D1B69] transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E1F0] text-[#6B6B80] hover:border-[#2D1B69] hover:text-[#2D1B69] transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E1F0] text-[#6B6B80] hover:border-[#2D1B69] hover:text-[#2D1B69] transition-colors"
              >
                <Github size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E2E1F0] text-[#6B6B80] hover:border-[#2D1B69] hover:text-[#2D1B69] transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/paths" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  For Teams
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-[14px] text-[#6B6B80] hover:text-[#2D1B69]">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#E2E1F0] text-center">
          <p className="text-[13px] text-[#6B6B80]">
            © 2026 Learnify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
