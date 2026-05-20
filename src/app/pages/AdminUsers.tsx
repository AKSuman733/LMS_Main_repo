import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, Users, BookOpen, FileCheck, Award, BarChart3, FileText, Settings, Shield, Plug, Search, Download, UserPlus, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', enrolled: 5, joined: 'Jan 15, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', enrolled: 3, joined: 'Jan 12, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', enrolled: 8, joined: 'Jan 8, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'James Wilson', email: 'james.w@example.com', enrolled: 2, joined: 'Dec 28, 2024', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Olivia Brown', email: 'olivia.b@example.com', enrolled: 6, joined: 'Dec 20, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const navItems = [
    { section: 'MANAGE', items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
      { icon: Users, label: 'Users', href: '/admin/users' },
      { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
      { icon: FileCheck, label: 'Enrollments', href: '/admin/enrollments' },
      { icon: Award, label: 'Certificates', href: '/admin/certificates' },
    ]},
    { section: 'ANALYZE', items: [
      { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
      { icon: FileText, label: 'Reports', href: '/admin/reports' },
    ]},
    { section: 'CONFIGURE', items: [
      { icon: Settings, label: 'Settings', href: '/admin/settings' },
      { icon: Shield, label: 'Roles', href: '/admin/roles' },
      { icon: Plug, label: 'Integrations', href: '/admin/integrations' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#F0EFF8]">
      {/* Top Navbar */}
      <nav className="h-[68px] bg-white/80 backdrop-blur-[12px] border-b border-[#E2E1F0] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0">
            <Link to="/">
              <span className="text-[20px] font-bold text-[#2D1B69]">Learnify</span>
            </Link>
            <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[#6B6B80]">/</span>
            <span className="text-[#2D1B69] font-medium">Admin</span>
            <span className="text-[#6B6B80]">/</span>
            <span className="text-[#1A1A2E] font-medium">Users</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F6F3]">
            <span className="text-[#6B6B80]">🔔</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#EF4444] rounded-full"></div>
          </button>
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[220px] bg-white border-r border-[#E2E1F0] min-h-[calc(100vh-68px)]">
          <nav className="p-4">
            {navItems.map((section) => (
              <div key={section.section} className="mb-6">
                <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wide mb-2 px-3">
                  {section.section}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-[8px] transition-colors ${
                        item.href === '/admin/users'
                          ? 'bg-[#2D1B69]/8 text-[#2D1B69]'
                          : 'text-[#6B6B80] hover:bg-[#F7F6F3]'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="text-[13px] font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Table Container */}
          <div className="bg-white rounded-[16px] border border-[#E2E1F0] shadow-[0_2px_16px_rgba(45,27,105,0.06)]">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-6 border-b border-[#E2E1F0]">
              <div className="flex items-center gap-3">
                <h2 className="text-[20px] font-bold text-[#1A1A2E]">Users</h2>
                <div className="px-2 py-1 bg-[#F7F6F3] rounded-full text-[12px] text-[#6B6B80] font-medium">
                  {mockUsers.length}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B80]" size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[240px] h-[40px] pl-10 pr-4 bg-[#F7F6F3] border border-transparent rounded-[10px] text-[14px] outline-none focus:border-[#2D1B69] focus:bg-white transition-all"
                  />
                </div>

                <button className="h-[40px] px-4 bg-white border border-[#E2E1F0] rounded-[10px] text-[14px] font-medium text-[#6B6B80] hover:bg-[#F7F6F3] transition-colors flex items-center gap-2">
                  <Download size={16} />
                  Export CSV
                </button>

                <button
                  onClick={() => setShowInviteModal(true)}
                  className="h-[40px] px-4 bg-[#2D1B69] text-[#BBFF00] rounded-[10px] text-[14px] font-medium hover:bg-[#3D2879] transition-colors flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  Invite user
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white border-b border-[#E2E1F0]">
                  <tr>
                    <th className="text-left px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#E2E1F0] text-[#2D1B69]"
                      />
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Enrolled
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Joined
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#E2E1F0] hover:bg-[#F7F6F3] transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#E2E1F0] text-[#2D1B69]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-[14px] font-medium text-[#1A1A2E]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] text-[#6B6B80]">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] font-medium text-[#1A1A2E]">{user.enrolled}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] text-[#6B6B80]">{user.joined}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#22C55E]' : 'bg-[#6B6B80]'}`}></div>
                          <span className={`text-[13px] font-medium ${user.status === 'Active' ? 'text-[#22C55E]' : 'text-[#6B6B80]'}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-[#6B6B80] hover:text-[#2D1B69] transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-[#6B6B80] hover:text-[#EF4444] transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#E2E1F0]">
              <span className="text-[12px] text-[#6B6B80]">
                Showing 1-5 of {mockUsers.length} users
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-[12px] text-[#6B6B80] hover:text-[#2D1B69] transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-[#2D1B69] text-white rounded-[6px] text-[12px] font-medium">
                  1
                </button>
                <button className="px-3 py-1 text-[12px] text-[#6B6B80] hover:text-[#2D1B69] transition-colors">
                  2
                </button>
                <button className="px-3 py-1 text-[12px] text-[#6B6B80] hover:text-[#2D1B69] transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
