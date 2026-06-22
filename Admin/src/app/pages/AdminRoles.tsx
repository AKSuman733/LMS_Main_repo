import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  Lock, 
  Info, 
  Users, 
  Search, 
  CheckSquare, 
  Square,
  AlertCircle,
  X
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionGroup {
  category: string;
  permissions: Permission[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystem: boolean;
  permissions: string[]; // List of permission IDs
}

const ALL_PERMISSIONS: PermissionGroup[] = [
  {
    category: 'Content Management',
    permissions: [
      { id: 'course_create', name: 'Create Courses', description: 'Create new courses, lessons, and quizzes.' },
      { id: 'course_edit', name: 'Edit Courses', description: 'Modify course structure, upload videos, and change lessons.' },
      { id: 'course_publish', name: 'Publish Courses', description: 'Publish or archive courses for public enrollment.' },
      { id: 'course_delete', name: 'Delete Courses', description: 'Permanently remove courses and assets from the system.' },
    ]
  },
  {
    category: 'User Management',
    permissions: [
      { id: 'user_view', name: 'View Users', description: 'Access user details, enrollment progress, and profiles.' },
      { id: 'user_invite', name: 'Invite Admin/Staff', description: 'Send invitations to new administrators, instructors, or moderators.' },
      { id: 'user_edit', name: 'Edit User Roles', description: 'Assign or modify roles and access levels of users.' },
      { id: 'user_delete', name: 'Suspend/Delete Users', description: 'Suspend or permanently delete user accounts.' },
    ]
  },
  {
    category: 'Financial & Reports',
    permissions: [
      { id: 'reports_view', name: 'View Analytics & Reports', description: 'Access dashboard overview charts, course metrics, and audit logs.' },
      { id: 'financial_view', name: 'View Transactions', description: 'Access enrollment financial summaries, purchase logs, and pricing tiers.' },
      { id: 'financial_refund', name: 'Process Refunds', description: 'Approve, cancel, or initiate student refund requests.' },
    ]
  },
  {
    category: 'System Configuration',
    permissions: [
      { id: 'settings_general', name: 'Modify System Settings', description: 'Edit platform name, domain, branding colors, and SMTP configurations.' },
      { id: 'settings_integrations', name: 'Manage Integrations', description: 'Link or disconnect third-party payment gateways, OAuth providers, and analytics tools.' },
      { id: 'roles_manage', name: 'Manage Roles & Permissions', description: 'Create, modify, or delete custom security roles (this screen).' },
    ]
  }
];

const INITIAL_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full system access with complete read and write capabilities across all platform modules.',
    userCount: 3,
    isSystem: true,
    permissions: ALL_PERMISSIONS.flatMap(g => g.permissions.map(p => p.id))
  },
  {
    id: 'user',
    name: 'User',
    description: 'Standard user role with basic access to view courses, enroll in lessons, and track personal progress.',
    userCount: 150,
    isSystem: true,
    permissions: ['user_view', 'reports_view']
  }
];

export function AdminRoles() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('admin');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newRoleName, setNewRoleName] = useState<string>('');
  const [newRoleDesc, setNewRoleDesc] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const activeRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  // Toggle permission helper
  const handleTogglePermission = (permissionId: string) => {
    if (activeRole.isSystem && activeRole.id === 'admin') {
      // Admin permissions cannot be modified
      setToast('Admin permissions are locked for safety.');
      return;
    }

    setRoles(prev => 
      prev.map(role => {
        if (role.id === selectedRoleId) {
          const hasPermission = role.permissions.includes(permissionId);
          const updatedPermissions = hasPermission
            ? role.permissions.filter(id => id !== permissionId)
            : [...role.permissions, permissionId];
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  // Toggle all permissions inside a group
  const handleToggleGroup = (groupPermissions: Permission[]) => {
    if (activeRole.isSystem && activeRole.id === 'admin') {
      setToast('Admin permissions are locked for safety.');
      return;
    }

    const groupIds = groupPermissions.map(p => p.id);
    const hasAll = groupIds.every(id => activeRole.permissions.includes(id));

    setRoles(prev => 
      prev.map(role => {
        if (role.id === selectedRoleId) {
          let updatedPermissions: string[];
          if (hasAll) {
            // Remove all in group
            updatedPermissions = role.permissions.filter(id => !groupIds.includes(id));
          } else {
            // Add all in group (avoiding duplicates)
            updatedPermissions = Array.from(new Set([...role.permissions, ...groupIds]));
          }
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  // Save changes handler
  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToast(`Permissions updated for role "${activeRole.name}" successfully!`);
    }, 800);
  };

  // Create new role handler
  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newId = newRoleName.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    const newRole: Role = {
      id: newId,
      name: newRoleName.trim(),
      description: newRoleDesc.trim() || 'Custom administrative role.',
      userCount: 0,
      isSystem: false,
      permissions: ['user_view'] // default read permissions
    };

    setRoles(prev => [...prev, newRole]);
    setSelectedRoleId(newId);
    setNewRoleName('');
    setNewRoleDesc('');
    setShowCreateModal(false);
    setToast(`Role "${newRole.name}" created!`);
  };

  // Delete role handler
  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${roleName}"? This cannot be undone.`)) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
      setSelectedRoleId('admin');
      setToast(`Role "${roleName}" has been deleted.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toast && (
        <div 
          className="fixed top-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl z-50 bg-[#1A1A2E] text-white border border-[#FF6B35]/20 flex items-center justify-between gap-4 text-[13px] font-bold"
          style={{ animation: 'fadeInSlide 0.2s ease-out forwards' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInSlide {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}} />
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#FF6B35]" />
            <span>{toast}</span>
          </div>
          <button 
            onClick={() => setToast(null)}
            className="text-white/50 hover:text-white focus:outline-none cursor-pointer border-none bg-transparent"
          >
            ×
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
            Roles & Permissions
          </h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">
            Assign admin capabilities, define moderator access controls, and manage security settings.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="h-11 px-5 bg-[#FF6B35] hover:bg-[#E85520] text-white text-[14px] font-extrabold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
        >
          <Plus size={18} />
          Create Custom Role
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        
        {/* Left Column: Roles Cards List */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wider px-1">
            Access Roles ({roles.length})
          </div>
          
          {roles.map((role) => {
            const isActive = role.id === selectedRoleId;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer select-none group relative ${
                  isActive 
                    ? 'border-[#FF6B35] shadow-[0_4px_20px_rgba(255,107,53,0.08)] ring-2 ring-[#FF6B35]/10' 
                    : 'border-[#E2E1F0] hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Shield 
                      size={18} 
                      className={`transition-colors ${isActive ? 'text-[#FF6B35]' : 'text-gray-400'}`} 
                    />
                    <span className="font-bold text-[14px] text-[#1A1A2E]">
                      {role.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    role.isSystem 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'bg-orange-50 text-orange-600 border border-orange-100'
                  }`}>
                    {role.isSystem ? 'System' : 'Custom'}
                  </span>
                </div>
                
                <p className="text-[12px] text-[#6B6B80] mt-2 line-clamp-2">
                  {role.description}
                </p>

                <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[#F3F4F6]">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#6B6B80] font-medium">
                    <Users size={14} />
                    <span>{role.userCount} {role.userCount === 1 ? 'user' : 'users'}</span>
                  </div>

                  {/* Delete Option for Custom Roles */}
                  {!role.isSystem && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.id, role.name);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all cursor-pointer border-none bg-transparent"
                      title="Delete Role"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Permissions Matrix for selected role */}
        <div className="bg-white rounded-2xl border border-[#E2E1F0] overflow-hidden shadow-sm flex flex-col">
          {/* Header Panel */}
          <div className="p-6 border-b border-[#E2E1F0] bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-[20px] font-bold text-[#1A1A2E]">{activeRole.name}</h3>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  activeRole.isSystem 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-orange-50 text-orange-600'
                }`}>
                  {activeRole.isSystem ? 'System Managed' : 'Custom Configured'}
                </span>
              </div>
              <p className="text-[13px] text-[#6B6B80] mt-1.5">{activeRole.description}</p>
            </div>
            
            {activeRole.isSystem && activeRole.id === 'admin' ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-[12px] font-semibold rounded-lg border border-blue-200">
                <Lock size={14} />
                <span>All privileges enabled</span>
              </div>
            ) : (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="h-[40px] px-4 bg-[#FF6B35] hover:bg-[#E85520] text-white text-[13px] font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    <span>Save Role Configurations</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Locked Notice for Super Admin */}
          {activeRole.id === 'admin' && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-start gap-2.5 text-[12px] text-amber-800">
              <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>System Protection Active:</strong> As a security safeguard, the permissions of the default <strong>Admin</strong> role cannot be modified. They are kept fully enabled to prevent platform lockouts.
              </span>
            </div>
          )}

          {/* Permissions Lists */}
          <div className="p-6 space-y-8 divide-y divide-[#E2E1F0]">
            {ALL_PERMISSIONS.map((group, groupIdx) => {
              const groupIds = group.permissions.map(p => p.id);
              const groupEnabledCount = groupIds.filter(id => activeRole.permissions.includes(id)).length;
              const isAllGroupChecked = groupEnabledCount === group.permissions.length;
              const isSomeGroupChecked = groupEnabledCount > 0 && !isAllGroupChecked;

              return (
                <div key={group.category} className={`pt-6 ${groupIdx === 0 ? '!pt-0' : ''}`}>
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[14px] font-bold text-[#1A1A2E] tracking-wide uppercase">
                      {group.category}
                    </h4>
                    
                    {activeRole.id !== 'admin' && (
                      <button
                        onClick={() => handleToggleGroup(group.permissions)}
                        className="text-[12px] font-bold text-[#FF6B35] hover:text-[#E85520] hover:underline cursor-pointer border-none bg-transparent outline-none flex items-center gap-1.5"
                      >
                        {isAllGroupChecked ? 'Deselect Group' : 'Select All Group'}
                      </button>
                    )}
                  </div>

                  {/* Permissions Rows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.permissions.map((perm) => {
                      const isChecked = activeRole.permissions.includes(perm.id);
                      const isAdmin = activeRole.id === 'admin';

                      return (
                        <div
                          key={perm.id}
                          onClick={() => !isAdmin && handleTogglePermission(perm.id)}
                          className={`p-4 rounded-xl border transition-all duration-200 select-none ${
                            isChecked 
                              ? 'bg-orange-50/20 border-[#FF6B35]/20' 
                              : 'bg-white border-[#E2E1F0]'
                          } ${isAdmin ? 'cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Custom Checkbox */}
                            <div className="mt-0.5 flex-shrink-0">
                              {isChecked ? (
                                <div className="w-[18px] h-[18px] bg-[#FF6B35] border border-[#FF6B35] rounded text-white flex items-center justify-center">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-[18px] h-[18px] border border-gray-300 rounded bg-white hover:border-[#FF6B35]" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="text-[13.5px] font-bold text-[#1A1A2E]">
                                {perm.name}
                              </div>
                              <p className="text-[12px] text-[#6B6B80] mt-1 leading-normal">
                                {perm.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Panel */}
          {!(activeRole.id === 'admin') && (
            <div className="p-6 border-t border-[#E2E1F0] bg-gray-50/50 flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="h-11 px-6 bg-[#FF6B35] hover:bg-[#E85520] text-white text-[14px] font-extrabold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shadow-sm"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Custom Role Dialog Modal Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl w-full max-w-[480px] shadow-2xl border border-[#E2E1F0] overflow-hidden"
            style={{ animation: 'modalSlideUp 0.2s ease-out forwards' }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes modalSlideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}} />
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E2E1F0] flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-[#FF6B35]" />
                <span className="font-bold text-[16px] text-[#1A1A2E]">Create Custom Role</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer border-none bg-transparent"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateRole}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#6B6B80] uppercase tracking-wide mb-1.5 block">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g., Content Editor, Lead Instructor"
                    className="w-full h-11 px-4 bg-white border border-[#E2E1F0] rounded-lg text-[#1A1A2E] text-[14px] outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#6B6B80] uppercase tracking-wide mb-1.5 block">
                    Description
                  </label>
                  <textarea
                    value={newRoleDesc}
                    onChange={(e) => setNewRoleDesc(e.target.value)}
                    placeholder="Describe what tasks this administrative role performs..."
                    className="w-full p-4 bg-white border border-[#E2E1F0] rounded-lg text-[#1A1A2E] text-[14px] outline-none focus:border-[#FF6B35] transition-colors h-[100px] resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#E2E1F0] bg-gray-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="h-10 px-4 bg-white border border-[#E2E1F0] rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#FF6B35] hover:bg-[#E85520] text-white text-[13px] font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoles;
