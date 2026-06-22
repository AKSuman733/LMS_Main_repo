import { useState } from 'react';
import { Search, Download, UserPlus, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', enrolled: 5, joined: 'Jan 15, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', enrolled: 3, joined: 'Jan 12, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', enrolled: 8, joined: 'Jan 8, 2025', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'James Wilson', email: 'james.w@example.com', enrolled: 2, joined: 'Dec 28, 2024', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Olivia Brown', email: 'olivia.b@example.com', enrolled: 6, joined: 'Dec 20, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 font-sans text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            User Management
          </h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">
            Manage, search, and invite platform users and administrators.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#111827] rounded-[16px] border border-[#1E2D45] shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E2D45]">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-bold text-white">Users</h2>
            <div className="px-2.5 py-0.5 bg-[#1A2540] rounded-full text-[12px] text-[#9CA3AF] font-bold">
              {mockUsers.length}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[240px] h-[40px] pl-10 pr-4 bg-[#1A2540] border border-[#1E2D45] text-white rounded-[10px] text-[14px] outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] transition-all"
              />
            </div>

            <button className="h-[40px] px-4 bg-[#1A2540] border border-[#1E2D45] rounded-[10px] text-[14px] font-semibold text-white hover:bg-[#1A2540]/80 transition-colors flex items-center gap-2 cursor-pointer">
              <Download size={16} className="text-[#FF8C42]" />
              Export CSV
            </button>

            <button
              className="h-[40px] px-4 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white rounded-[10px] text-[14px] font-bold transition-all flex items-center gap-2 cursor-pointer border-none active:scale-[0.97]"
            >
              <UserPlus size={16} />
              Invite user
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1A2540]/30 border-b border-[#1E2D45]">
              <tr>
                <th className="text-left px-6 py-4 w-[48px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#1E2D45] bg-[#1A2540] accent-[#FF6B2B] cursor-pointer"
                  />
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Enrolled
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Joined
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D45]">
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#1E2D45] hover:bg-[#1A2540]/20 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#1E2D45] bg-[#1A2540] accent-[#FF6B2B] cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-[#1E2D45]"
                      />
                      <span className="text-[14px] font-semibold text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] text-[#9CA3AF]">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-semibold text-white">{user.enrolled}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] text-[#9CA3AF]">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#00C97B]' : 'bg-[#9CA3AF]'}`}></div>
                      <span className={`text-[13px] font-semibold ${user.status === 'Active' ? 'text-[#00E88A]' : 'text-[#9CA3AF]'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-[#9CA3AF] hover:text-[#FF6B2B] hover:bg-[#1A2540] rounded transition-all cursor-pointer border-none bg-transparent">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#1A2540] rounded transition-all cursor-pointer border-none bg-transparent">
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
        <div className="flex items-center justify-between p-4 border-t border-[#1E2D45] bg-[#1A2540]/10">
          <span className="text-[12px] text-[#9CA3AF]">
            Showing 1-5 of {mockUsers.length} users
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-[12px] text-[#9CA3AF] hover:text-white hover:bg-[#1A2540] transition-colors cursor-pointer border-none bg-transparent">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#FF6B2B] text-white rounded-[8px] text-[12px] font-bold border-none cursor-pointer">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg text-[12px] text-[#9CA3AF] hover:text-white hover:bg-[#1A2540] transition-colors cursor-pointer border-none bg-transparent">
              2
            </button>
            <button className="px-3 py-1.5 rounded-lg text-[12px] text-[#9CA3AF] hover:text-white hover:bg-[#1A2540] transition-colors cursor-pointer border-none bg-transparent">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
