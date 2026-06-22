import React, { useState, useEffect } from 'react';
import { Search, Download, UserPlus, Edit, Trash2, ArrowUpDown, X, UserCheck } from 'lucide-react';
import { EmptyState } from '../../components/States/EmptyState';

const initialMockUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', enrolled: 5, joined: 'Jan 15, 2025', status: 'Active', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', enrolled: 3, joined: 'Jan 12, 2025', status: 'Active', role: 'Instructor', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emma Davis', email: 'emma.d@example.com', enrolled: 8, joined: 'Jan 8, 2025', status: 'Active', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'James Wilson', email: 'james.w@example.com', enrolled: 2, joined: 'Dec 28, 2024', status: 'Inactive', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Olivia Brown', email: 'olivia.b@example.com', enrolled: 6, joined: 'Dec 20, 2024', status: 'Active', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>(initialMockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Sorting state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Selection state
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Toast state
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Reset selection on filter change
  useEffect(() => {
    setSelectedUsers([]);
  }, [searchQuery, roleFilter, statusFilter]);

  // Filter & Search Logic
  let filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort Logic
  if (sortField) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'joined') {
        aVal = new Date(a.joined).getTime();
        bVal = new Date(b.joined).getTime();
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' 
          ? (aVal as number) - (bVal as number) 
          : (bVal as number) - (aVal as number);
      }
    });
  }

  // Handle header sort triggers
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
    }
  };

  // Bulk actions handlers
  const handleBulkActivate = () => {
    setUsers((prev) =>
      prev.map((u) => (selectedUsers.includes(u.id) ? { ...u, status: 'Active' } : u))
    );
    setToast(`Activated ${selectedUsers.length} users successfully ✓`);
    setSelectedUsers([]);
  };

  const handleBulkDeactivate = () => {
    setUsers((prev) =>
      prev.map((u) => (selectedUsers.includes(u.id) ? { ...u, status: 'Inactive' } : u))
    );
    setToast(`Deactivated ${selectedUsers.length} users successfully ✓`);
    setSelectedUsers([]);
  };

  const handleBulkDelete = () => {
    setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u.id)));
    setToast(`Deleted ${selectedUsers.length} users successfully ✓`);
    setSelectedUsers([]);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setToast('User deleted successfully ✓');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
    setSortField(null);
  };

  // Search Highlighter
  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} style={{ backgroundColor: 'rgba(255, 107, 43, 0.25)', color: '#FF6B2B', borderRadius: '2px', padding: '0 2px', fontWeight: 'bold' }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="space-y-6 font-sans text-[#2D1B69]">
      {/* Toast alert banner */}
      {toast && (
        <div
          className="fixed top-6 right-6 px-5 py-3.5 bg-white border border-[#2D1B69] text-[#2D1B69] rounded-xl shadow-2xl z-50 flex items-center justify-between gap-3 text-[14px] font-bold"
          style={{ animation: 'fadeInSlide 0.2s ease-out forwards' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInSlide {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}} />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-current opacity-70 hover:opacity-100 font-bold ml-2 bg-transparent border-none cursor-pointer">×</button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#2D1B69] tracking-tight leading-tight">
            User Management
          </h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">
            Manage, search, and invite platform users and administrators.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[16px] border border-[#E2E1F0] shadow-sm">
        
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 border-b border-[#E2E1F0]">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-bold text-[#1A1A2E]">Users</h2>
            <div className="px-2.5 py-0.5 bg-[#F7F6F3] rounded-full text-[12px] text-[#6B6B80] font-bold">
              {filteredUsers.length}
            </div>
          </div>

          {/* Interactive Filters Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 w-full lg:w-auto">
            {/* Search Input (44px target) */}
            <div className="relative w-full sm:w-[220px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B80]" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[#F7F6F3] border border-[#E2E1F0] text-[#1A1A2E] rounded-[10px] text-[13px] outline-none focus:border-[#2D1B69] focus:bg-white focus:ring-1 focus:ring-[#2D1B69] transition-all"
              />
            </div>

            {/* Role filter dropdown (44px target) */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full sm:w-auto h-11 px-3 bg-[#F7F6F3] border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-[10px] outline-none cursor-pointer focus:border-[#2D1B69] focus:bg-white"
            >
              <option value="all">All Roles</option>
              <option value="Student">Students</option>
              <option value="Instructor">Instructors</option>
              <option value="Admin">Admins</option>
            </select>

            {/* Status filter dropdown (44px target) */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto h-11 px-3 bg-[#F7F6F3] border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-[10px] outline-none cursor-pointer focus:border-[#2D1B69] focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Export (44px target) */}
            <button className="w-full sm:w-auto h-11 px-4 bg-white border border-[#E2E1F0] rounded-[10px] text-[13px] font-semibold text-[#6B6B80] hover:bg-[#F7F6F3] transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Download size={15} className="text-[#FF6B35]" />
              Export CSV
            </button>

            {/* Invite Button (44px target) */}
            <button
              className="w-full sm:w-auto h-11 px-4 bg-[#2D1B69] hover:bg-[#3D2879] text-[#BBFF00] rounded-[10px] text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border-none active:scale-[0.97]"
            >
              <UserPlus size={15} />
              Invite User
            </button>
          </div>
        </div>

        {/* Dynamic Filters Active Banner */}
        {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all' || sortField) && (
          <div className="flex items-center justify-between px-6 py-3 bg-[#F7F6F3] border-b border-[#E2E1F0] text-[13px] text-[#6B6B80]">
            <span>Active filters list. Result count: <strong>{filteredUsers.length}</strong></span>
            <button
              onClick={clearFilters}
              className="text-[#FF6B35] hover:text-[#E85520] hover:underline cursor-pointer border-none bg-transparent outline-none flex items-center gap-1 font-bold text-[13px]"
            >
              <X size={14} />
              Clear filters
            </button>
          </div>
        )}

        {/* BULK ACTIONS BAR */}
        {selectedUsers.length > 0 && (
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#E85520] text-white px-6 py-3.5 rounded-none flex items-center justify-between gap-4 transition-all duration-200">
            <div className="font-extrabold text-[14px]">
              {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkActivate}
                className="h-8 px-3.5 bg-white text-[#2D1B69] hover:bg-white/90 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none flex items-center gap-1.5"
              >
                <UserCheck size={14} className="text-[#22C55E]" />
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="h-8 px-3.5 bg-white/20 text-white hover:bg-white/30 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
              >
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="h-8 px-3.5 bg-[#EF4444] text-white hover:bg-[#EF4444] text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="text-white hover:opacity-75 transition-opacity focus:outline-none ml-2 cursor-pointer font-bold text-[18px]"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Table Content or Empty State */}
        {filteredUsers.length === 0 ? (
          <div className="p-10">
            <EmptyState
              icon="🔍"
              title="No Users Found"
              message="No users match your active query. Try clearing the search query or active filter settings."
              actionLabel="Clear All Filters"
              onAction={clearFilters}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#F7F6F3] border-b border-[#E2E1F0]">
                <tr className="text-[12px] text-[#6B6B80] uppercase font-bold tracking-wider h-[46px]">
                  <th className="px-6 py-4 w-[48px]">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filteredUsers.length > 0 && filteredUsers.every((u) => selectedUsers.includes(u.id))}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#2D1B69] cursor-pointer"
                      />
                    </label>
                  </th>
                  <th onClick={() => handleSort('name')} className="px-6 py-4 cursor-pointer hover:text-[#2D1B69] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Name
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('email')} className="px-6 py-4 cursor-pointer hover:text-[#2D1B69] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Email
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-[#6B6B80]">
                    Role
                  </th>
                  <th onClick={() => handleSort('enrolled')} className="px-6 py-4 cursor-pointer hover:text-[#2D1B69] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Enrolled
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('joined')} className="px-6 py-4 cursor-pointer hover:text-[#2D1B69] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Joined
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-[#6B6B80]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right pr-8 text-[#6B6B80]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-[#E2E1F0] hover:bg-[#F7F6F3]/40 transition-colors h-[72px] ${
                      selectedUsers.includes(user.id) ? 'bg-[#FF6B35]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => handleSelectRow(user.id, e.target.checked)}
                          className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#2D1B69] cursor-pointer"
                        />
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-[38px] h-[38px] rounded-full border border-[#E2E1F0] object-cover flex-shrink-0"
                        />
                        <span className="font-bold text-[#1A1A2E] leading-none">
                          {highlightText(user.name, searchQuery)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#6B6B80] font-medium">
                        {highlightText(user.email, searchQuery)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        user.role === 'Admin' 
                          ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                          : user.role === 'Instructor' 
                          ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' 
                          : 'bg-gray-500/10 text-gray-600 border border-gray-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#1A1A2E]">
                      {user.enrolled} courses
                    </td>
                    <td className="px-6 py-4 text-[#6B6B80] font-medium">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#22C55E]' : 'bg-[#6B6B80]'}`}></div>
                        <span className={`text-[13px] font-semibold ${user.status === 'Active' ? 'text-[#22C55E]' : 'text-[#6B6B80]'}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <div className="flex items-center justify-end gap-2">
                        {/* 44px target container button */}
                        <button className="w-9 h-9 rounded-lg text-[#6B6B80] hover:text-[#2D1B69] hover:bg-[#F7F6F3] flex items-center justify-center transition-all cursor-pointer border-none bg-transparent active:scale-[0.95]" title="Edit User" aria-label="Edit User">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="w-9 h-9 rounded-lg text-[#6B6B80] hover:text-[#EF4444] hover:bg-[#F7F6F3] flex items-center justify-center transition-all cursor-pointer border-none bg-transparent active:scale-[0.95]" title="Delete User" aria-label="Delete User">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-[#E2E1F0] bg-[#F7F6F3]/20 flex-wrap gap-4 text-[#6B6B80]">
            <span className="text-[12px]">
              Showing 1-{filteredUsers.length} of {filteredUsers.length} users
            </span>
            <div className="flex items-center gap-2">
              <button className="h-10 px-3 rounded-lg text-[12px] text-[#6B6B80] hover:text-[#2D1B69] hover:bg-[#F7F6F3] transition-colors cursor-pointer border-none bg-transparent">
                Previous
              </button>
              <button className="w-10 h-10 bg-[#2D1B69] text-white rounded-[8px] text-[12px] font-bold border-none cursor-pointer">
                1
              </button>
              <button className="h-10 px-3 rounded-lg text-[12px] text-[#6B6B80] hover:text-[#2D1B69] hover:bg-[#F7F6F3] transition-colors cursor-pointer border-none bg-transparent">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
