import { Link, useLocation } from 'react-router';
import { Home, BookOpen, Award, User } from 'lucide-react';

export function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: BookOpen, label: 'Courses', href: '/dashboard/courses' },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E1F0] z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <item.icon
                size={20}
                className={isActive ? 'text-[#2D1B69]' : 'text-[#6B6B80]'}
              />
              <span
                className={`text-[11px] mt-1 ${
                  isActive ? 'text-[#2D1B69] font-medium' : 'text-[#6B6B80]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-[#BBFF00] rounded-t-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
