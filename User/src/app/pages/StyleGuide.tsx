import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  IconLayoutDashboard,
  IconUsers,
  IconClipboardList,
  IconChartBar,
  IconFileAnalytics,
  IconSettings,
  IconShieldLock,
  IconPlus,
  IconPencil,
  IconTrash,
  IconEye,
  IconArchive,
  IconDownload,
  IconUpload,
  IconFilter,
  IconSearch,
  IconRefresh,
  IconX,
  IconCheck,
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconDotsVertical,
  IconChevronRight,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconAlertTriangle,
  IconInfoCircle,
  IconMail,
  IconLock,
  IconPhone,
  IconCalendar,
  IconUser,
  IconBook,
  IconTrendingUp,
  IconActivity,
  IconAlertOctagon,
  IconMenu2
} from '@tabler/icons-react';

export function StyleGuide() {
  const [activeTab, setActiveTab] = useState<'icons' | 'states' | 'animations' | 'responsive'>('icons');
  
  // Iconography Tab configuration
  const [iconSize, setIconSize] = useState<'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL'>('MD');
  const [iconColor, setIconColor] = useState<'Default' | 'Primary' | 'Success' | 'Warning' | 'Error' | 'Muted'>('Default');

  // Interactive component state simulations
  const [toggleOn, setToggleOn] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState('Option 1');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  // Table Row State Simulator
  const [selectedRows, setSelectedRows] = useState<number[]>([3]); // Row 3 starts selected
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [focusedRow, setFocusedRow] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [sortState, setSortState] = useState<'none' | 'asc' | 'desc'>('asc');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  // Animations Tab Simulations
  const [runPageTransition, setRunPageTransition] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAnimationModalOpen, setIsAnimationModalOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ show: boolean; type: 'success' | 'error' | 'warning' | 'info' }>({ show: false, type: 'success' });
  const [toastAnimationKey, setToastAnimationKey] = useState(0);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [metricCounter, setMetricCounter] = useState(0);
  const [badgePulseCount, setBadgePulseCount] = useState(0);
  const [checkmarkDrawKey, setCheckmarkDrawKey] = useState(0);
  const [reducedMotionMode, setReducedMotionMode] = useState(false);

  // Responsive Viewport simulator configs
  const [viewportSimSize, setViewportSimSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [responsiveSidebarOpen, setResponsiveSidebarOpen] = useState(false);
  const [responsiveCourseStep, setResponsiveCourseStep] = useState(1);
  const [responsiveTableSelected, setResponsiveTableSelected] = useState<number[]>([1]);
  const [responsiveFilterOpen, setResponsiveFilterOpen] = useState(false);

  // Toast Timer Trigger Helper
  const triggerToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    setToastNotification({ show: true, type });
    setToastAnimationKey(prev => prev + 1);
    
    // Auto-dismiss toast simulation
    const timer = setTimeout(() => {
      setToastNotification(prev => ({ ...prev, show: false }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  // Re-run metric counters
  const reRunCounter = () => {
    setMetricCounter(0);
    setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 5;
        if (count >= 100) {
          setMetricCounter(100);
          clearInterval(interval);
        } else {
          setMetricCounter(count);
        }
      }, 30);
    }, 100);
  };

  useEffect(() => {
    reRunCounter();
  }, []);

  // Icon sizing parameters
  const sizeMap = {
    XS: { px: 14, stroke: 1.5, desc: 'Tags, Badges, Inline labels' },
    SM: { px: 16, stroke: 1.5, desc: 'Table cells, Dropdown items, Breadcrumbs' },
    MD: { px: 20, stroke: 2.0, desc: 'Buttons, Inputs, Sidebars, Navbars' },
    LG: { px: 24, stroke: 2.0, desc: 'Card headers, Section headings, Tabs' },
    XL: { px: 48, stroke: 2.0, desc: 'Empty states, Onboarding illustrations' },
    XXL: { px: 64, stroke: 2.0, desc: 'Error states, Full-page illustrations' }
  };

  // Color classes for iconography
  const colorMap = {
    Default: 'text-gray-700',
    Primary: 'text-[#FF6B35]',
    Success: 'text-[#22C55E]',
    Warning: 'text-[#F59E0B]',
    Error: 'text-[#EF4444]',
    Muted: 'text-[#718096]'
  };

  // CSS Copy utility
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Developer CSS code snippet copied to clipboard.');
  };

  return (
    <div className={`min-h-screen bg-[#F8F7F4] p-4 md:p-8 font-sans ${reducedMotionMode ? 'prefers-reduced-motion-active' : ''}`}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* DESIGN SYSTEM MAIN HERO BANNER */}
        <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2D1B69] rounded-[20px] p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF6B35]/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#00B5A5]/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FF6B35] font-bold text-[13px] bg-[#FF6B35]/20 px-3 py-1 rounded-full uppercase tracking-widest border border-[#FF6B35]/30">
                UptoSkills Design Spec
              </span>
              <span className="text-[#00B5A5] font-bold text-[13px] bg-[#00B5A5]/20 px-3 py-1 rounded-full uppercase tracking-widest border border-[#00B5A5]/30">
                Figma-to-React Playground
              </span>
            </div>
            <h1 className="text-[32px] md:text-[48px] font-black tracking-tight leading-none mb-3">
              Design System Showcase
            </h1>
            <p className="text-[14px] md:text-[16px] text-gray-300 max-w-[680px] leading-relaxed">
              Complete, live-interactive documentation of the UptoSkills Admin Panel design system specifications. 
              Toggle viewports, trigger 60fps micro-animations, inspect all 30 button combinations, and test mobile cards.
            </p>
          </div>

          <div className="flex flex-col gap-2 relative z-10 w-full md:w-auto">
            <button
              onClick={() => {
                setReducedMotionMode(!reducedMotionMode);
              }}
              className={`px-4 py-2.5 rounded-lg font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-sm ${
                reducedMotionMode 
                  ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <IconX size={16} /> {reducedMotionMode ? 'Reduced Motion: ON' : 'Trigger Reduced Motion Mode'}
            </button>
            <div className="text-[11px] text-white/40 text-center md:text-right">
              Respects user prefers-reduced-motion media query
            </div>
          </div>
        </div>

        {/* =======================================================
            TABBED FIGMA SPEC SECTIONS
            ======================================================= */}
        <div className="flex bg-white rounded-xl border border-[#E2E8F0] p-1.5 shadow-sm mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { id: 'icons', label: '5.4 Iconography', icon: IconBook },
            { id: 'states', label: '5.2 Component States', icon: IconLayers },
            { id: 'animations', label: '5.3 Animations', icon: IconActivity },
            { id: 'responsive', label: '5.1 Responsive Breakpoints', icon: IconMobile }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all cursor-pointer border-none ${
                activeTab === tab.id
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-[#FFF5F0]'
              }`}
            >
              <span className="flex items-center"><tab.icon size={16} /></span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* =======================================================
            TAB 1: 5.4 ICONOGRAPHY SPEC SHEET
            ======================================================= */}
        {activeTab === 'icons' && (
          <div className="space-y-8 animate-scale-in">
            {/* Spec Controller Bar */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">Figma Component Variants Controller</h3>
                <p className="text-[12px] text-gray-500">Configure size variants and inherit color states dynamically for visual handoff.</p>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Size select */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Variant: Size</span>
                  <div className="flex bg-gray-100 p-0.5 rounded-lg">
                    {['XS', 'SM', 'MD', 'LG', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setIconSize(sz as any)}
                        className={`px-3 py-1.5 rounded-md text-[11px] font-bold cursor-pointer border-none transition-all ${
                          iconSize === sz ? 'bg-white text-[#FF6B35] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {sz} ({sizeMap[sz as keyof typeof sizeMap].px}px)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color select */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Variant: Color</span>
                  <select
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value as any)}
                    className="h-[36px] bg-gray-50 border border-gray-200 px-3 rounded-lg text-[12px] font-bold text-gray-700 outline-none"
                  >
                    {['Default', 'Primary', 'Success', 'Warning', 'Error', 'Muted'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Icon Categorized Display Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Category: Sidebar Navigation */}
              <IconCategoryCard
                title="Sidebar Navigation Icons"
                desc="Size: 20px MD. default outline weight 2.0px. Inherited color."
                icons={[
                  { name: 'Overview', key: 'icon-layout-dashboard', icon: IconLayoutDashboard },
                  { name: 'Users', key: 'icon-users', icon: IconUsers },
                  { name: 'Courses', key: 'icon-book-open', icon: IconBook },
                  { name: 'Enrollments', key: 'icon-clipboard-list', icon: IconClipboardList },
                  { name: 'Analytics', key: 'icon-chart-bar', icon: IconChartBar },
                  { name: 'Reports', key: 'icon-file-analytics', icon: IconFileAnalytics },
                  { name: 'Settings', key: 'icon-settings', icon: IconSettings },
                  { name: 'Roles', key: 'icon-shield-lock', icon: IconShieldLock }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Action Buttons */}
              <IconCategoryCard
                title="Action Button Icons"
                desc="Size: 20px MD. default outline weight 2.0px."
                icons={[
                  { name: 'Create', key: 'icon-plus', icon: IconPlus },
                  { name: 'Edit', key: 'icon-pencil', icon: IconPencil },
                  { name: 'Delete', key: 'icon-trash', icon: IconTrash },
                  { name: 'Preview', key: 'icon-eye', icon: IconEye },
                  { name: 'Archive', key: 'icon-archive', icon: IconArchive },
                  { name: 'Export', key: 'icon-download', icon: IconDownload },
                  { name: 'Import', key: 'icon-upload', icon: IconUpload },
                  { name: 'Filter', key: 'icon-filter', icon: IconFilter },
                  { name: 'Search', key: 'icon-search', icon: IconSearch },
                  { name: 'Refresh', key: 'icon-refresh', icon: IconRefresh },
                  { name: 'Close', key: 'icon-x', icon: IconX },
                  { name: 'Confirm', key: 'icon-check', icon: IconCheck }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Table & Data */}
              <IconCategoryCard
                title="Table & Data Icons"
                desc="Size: 16px SM. default outline weight 1.5px."
                icons={[
                  { name: 'Sort Asc', key: 'icon-chevron-up', icon: IconChevronUp },
                  { name: 'Sort Desc', key: 'icon-chevron-down', icon: IconChevronDown },
                  { name: 'Sort Both', key: 'icon-selector', icon: IconSelector },
                  { name: 'Three-Dot', key: 'icon-dots-vertical', icon: IconDotsVertical },
                  { name: 'Check Box', key: 'icon-checkbox', icon: IconCircleCheck },
                  { name: 'Expand Row', key: 'icon-chevron-right', icon: IconChevronRight }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Status Icons */}
              <IconCategoryCard
                title="Status Icons"
                desc="Size: 16px SM. colored. Filled options for success/inactive."
                icons={[
                  { name: 'Active', key: 'icon-circle-check', icon: IconCircleCheck, forceFill: '#22C55E' },
                  { name: 'Inactive', key: 'icon-circle-x', icon: IconCircleX, forceFill: '#EF4444' },
                  { name: 'Pending', key: 'icon-clock', icon: IconClock, forceColor: '#F59E0B' },
                  { name: 'Warning', key: 'icon-alert-triangle', icon: IconAlertTriangle, forceColor: '#F59E0B' },
                  { name: 'Info', key: 'icon-info-circle', icon: IconInfoCircle, forceColor: '#3B82F6' }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Form Fields */}
              <IconCategoryCard
                title="Form Field Prefix Icons"
                desc="Size: 20px MD. default color #718096, outline weight 2.0px."
                icons={[
                  { name: 'Email', key: 'icon-mail', icon: IconMail },
                  { name: 'Password', key: 'icon-lock', icon: IconLock },
                  { name: 'Phone', key: 'icon-phone', icon: IconPhone },
                  { name: 'Search', key: 'icon-search', icon: IconSearch },
                  { name: 'Date', key: 'icon-calendar', icon: IconCalendar },
                  { name: 'User', key: 'icon-user', icon: IconUser },
                  { name: 'Course', key: 'icon-book', icon: IconBook }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Toast / Notifications */}
              <IconCategoryCard
                title="Toast / Notifications Icons"
                desc="Size: 20px MD inside 28px colored circle"
                icons={[
                  { name: 'Success Toast', key: 'icon-check', icon: IconCheck, forceCircleBg: '#22C55E' },
                  { name: 'Error Toast', key: 'icon-x', icon: IconX, forceCircleBg: '#EF4444' },
                  { name: 'Warning Toast', key: 'icon-alert-triangle', icon: IconAlertTriangle, forceCircleBg: '#F59E0B' },
                  { name: 'Info Toast', key: 'icon-info-circle', icon: IconInfoCircle, forceCircleBg: '#3B82F6' }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Empty States */}
              <IconCategoryCard
                title="Empty State Illustrations"
                desc="Size: 64px XXL inside 96px tinted circle"
                icons={[
                  { name: 'No Courses', key: 'icon-book', icon: IconBook, forceStateCircle: { bg: '#FFF0EB', stroke: '#FF6B35' } },
                  { name: 'No Users', key: 'icon-users', icon: IconUsers, forceStateCircle: { bg: '#FFF0EB', stroke: '#FF6B35' } },
                  { name: 'No Results', key: 'icon-search-off', icon: IconX, forceStateCircle: { bg: '#FFF0EB', stroke: '#FF6B35' } },
                  { name: 'All Caught Up', key: 'icon-circle-check', icon: IconCircleCheck, forceStateCircle: { bg: '#F0FDF4', stroke: '#22C55E' } },
                  { name: 'Error State', key: 'icon-alert-octagon', icon: IconAlertOctagon, forceStateCircle: { bg: '#FEF2F2', stroke: '#EF4444' } }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

              {/* Category: Metric Cards */}
              <IconCategoryCard
                title="Metric Card Accent Icons"
                desc="Size: 24px LG inside 40px tinted circle"
                icons={[
                  { name: 'Active Users', key: 'icon-users', icon: IconUsers, forceStateCircle: { bg: '#F0FDF4', stroke: '#22C55E' } },
                  { name: 'Total Courses', key: 'icon-book-open', icon: IconBook, forceStateCircle: { bg: '#E6F7F6', stroke: '#00B5A5' } },
                  { name: 'Enrollments', key: 'icon-trending-up', icon: IconTrendingUp, forceStateCircle: { bg: '#FFF0EB', stroke: '#FF6B35' } },
                  { name: 'Completion Rate', key: 'icon-checkbox', icon: IconCircleCheck, forceStateCircle: { bg: '#F0FDF4', stroke: '#22C55E' } },
                  { name: 'Pending Appr.', key: 'icon-clock', icon: IconClock, forceStateCircle: { bg: '#FEF2F2', stroke: '#EF4444' } },
                  { name: 'System Health', key: 'icon-activity', icon: IconActivity, forceStateCircle: { bg: '#F0FDF4', stroke: '#22C55E' } }
                ]}
                currentSize={iconSize}
                currentColor={iconColor}
                sizeMap={sizeMap}
                colorMap={colorMap}
              />

            </div>
          </div>
        )}

        {/* =======================================================
            TAB 2: 5.2 COMPONENT STATES SPECS
            ======================================================= */}
        {activeTab === 'states' && (
          <div className="space-y-8 animate-scale-in">
            
            {/* 1. BUTTON STATES GRID - Renders ALL 30 COMBINATIONS! */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">Buttons Interactive States Matrix</h3>
                <p className="text-[12px] text-gray-500">Renders the complete set of 30 component variants across all types and states.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] uppercase font-bold text-gray-400">
                      <th className="pb-3 pr-4">Button Variant</th>
                      <th className="pb-3 pr-4">Default</th>
                      <th className="pb-3 pr-4">Hover State</th>
                      <th className="pb-3 pr-4">Focus State</th>
                      <th className="pb-3 pr-4">Active / Press</th>
                      <th className="pb-3 pr-4">Loading</th>
                      <th className="pb-3 pr-4">Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[13px]">
                    {/* Row: Primary */}
                    <tr>
                      <td className="py-4 font-bold text-gray-800">Primary (Orange)</td>
                      <td className="py-4 pr-3"><Button variant="primary">Primary</Button></td>
                      <td className="py-4 pr-3"><Button variant="primary" className="bg-[#E85520] shadow-[0_6px_16px_rgba(255,107,53,0.35)] -translate-y-[1px]">Hover</Button></td>
                      <td className="py-4 pr-3"><Button variant="primary" className="bg-[#E85520] ring-2 ring-[#FF6B35] ring-offset-2">Focus</Button></td>
                      <td className="py-4 pr-3"><Button variant="primary" className="bg-[#D44A1A] scale-[0.98] shadow-sm">Pressed</Button></td>
                      <td className="py-4 pr-3"><Button variant="primary" loading={true}>Loading</Button></td>
                      <td className="py-4 pr-3"><Button variant="primary" disabled={true}>Disabled</Button></td>
                    </tr>
                    {/* Row: Secondary */}
                    <tr>
                      <td className="py-4 font-bold text-gray-800">Secondary (Teal)</td>
                      <td className="py-4 pr-3"><Button variant="secondary">Secondary</Button></td>
                      <td className="py-4 pr-3"><Button variant="secondary" className="bg-[#E6F7F6] shadow-[0_4px_12px_rgba(0,181,165,0.2)] -translate-y-[1px]">Hover</Button></td>
                      <td className="py-4 pr-3"><Button variant="secondary" className="bg-[#E6F7F6] ring-2 ring-[#00B5A5] ring-offset-2">Focus</Button></td>
                      <td className="py-4 pr-3"><Button variant="secondary" className="bg-[#CCF0EE] scale-[0.98]">Pressed</Button></td>
                      <td className="py-4 pr-3"><Button variant="secondary" loading={true}>Loading</Button></td>
                      <td className="py-4 pr-3"><Button variant="secondary" disabled={true}>Disabled</Button></td>
                    </tr>
                    {/* Row: Ghost */}
                    <tr>
                      <td className="py-4 font-bold text-gray-800">Ghost (Neutral)</td>
                      <td className="py-4 pr-3"><Button variant="ghost">Ghost Button</Button></td>
                      <td className="py-4 pr-3"><Button variant="ghost" className="bg-[#F8F9FA] border-[#CBD5E0]">Hover</Button></td>
                      <td className="py-4 pr-3"><Button variant="ghost" className="ring-2 ring-[#FF6B35] ring-offset-2">Focus</Button></td>
                      <td className="py-4 pr-3"><Button variant="ghost" className="bg-[#F1F5F9] scale-[0.98]">Pressed</Button></td>
                      <td className="py-4 pr-3"><Button variant="ghost" loading={true}>Loading</Button></td>
                      <td className="py-4 pr-3"><Button variant="ghost" disabled={true}>Disabled</Button></td>
                    </tr>
                    {/* Row: Danger */}
                    <tr>
                      <td className="py-4 font-bold text-gray-800">Danger (Red)</td>
                      <td className="py-4 pr-3"><Button variant="danger">Danger</Button></td>
                      <td className="py-4 pr-3"><Button variant="danger" className="bg-[#DC2626] shadow-[0_6px_16px_rgba(239,68,68,0.35)] -translate-y-[1px]">Hover</Button></td>
                      <td className="py-4 pr-3"><Button variant="danger" className="bg-[#DC2626] ring-2 ring-[#EF4444] ring-offset-2">Focus</Button></td>
                      <td className="py-4 pr-3"><Button variant="danger" className="bg-[#B91C1C] scale-[0.98]">Pressed</Button></td>
                      <td className="py-4 pr-3"><Button variant="danger" loading={true}>Loading</Button></td>
                      <td className="py-4 pr-3"><Button variant="danger" disabled={true}>Disabled</Button></td>
                    </tr>
                    {/* Row: Icon */}
                    <tr>
                      <td className="py-4 font-bold text-gray-800">Icon Button (Circle)</td>
                      <td className="py-4 pr-3"><Button variant="icon"><IconSettings size={18} /></Button></td>
                      <td className="py-4 pr-3"><Button variant="icon" className="bg-[#FFE4D6] text-[#FF6B35]">Hover</Button></td>
                      <td className="py-4 pr-3"><Button variant="icon" className="ring-2 ring-[#FF6B35] ring-offset-2">Focus</Button></td>
                      <td className="py-4 pr-3"><Button variant="icon" className="bg-[#FFD4C0] scale-[0.95]"></Button></td>
                      <td className="py-4 pr-3"><Button variant="icon" loading={true} /></td>
                      <td className="py-4 pr-3"><Button variant="icon" disabled={true}><IconSettings size={18} /></Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. SIDEBAR, TOP NAVBAR, & BREADCRUMB SPECS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Sidebar Navigation Items Spec */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">Sidebar Navigation States</h3>
                  <p className="text-[12px] text-gray-500">Spec dimensions: height 44px, radius 8px, left border 3px solid.</p>
                </div>

                <div className="space-y-4">
                  {/* Default State */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase mb-1.5">Default State</div>
                    <div className="h-11 px-4 bg-[#1A1A2E] rounded-lg flex items-center justify-between text-[#9CA3AF]">
                      <div className="flex items-center gap-3">
                        <IconBook size={20} className="text-[#6B7280]" />
                        <span>Courses Catalog</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">No border</span>
                    </div>
                  </div>

                  {/* Hover State */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase mb-1.5">Hover State</div>
                    <div className="h-11 px-4 bg-[#1A1A2E] rounded-lg flex items-center justify-between text-[#374151]" style={{ backgroundColor: 'rgba(255,107,53,0.06)' }}>
                      <div className="flex items-center gap-3">
                        <IconBook size={20} className="text-[#FF6B35]" />
                        <span className="text-[#374151] font-medium">Courses Catalog</span>
                      </div>
                      <span className="text-[10px] text-[#FF6B35] font-semibold">Hover tint</span>
                    </div>
                  </div>

                  {/* Active State */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase mb-1.5">Active / Current Page</div>
                    <div className="h-11 px-4 bg-[#1A1A2E] rounded-lg flex items-center justify-between text-[#FF6B35] border-l-3 border-[#FF6B35]" style={{ backgroundColor: 'rgba(255,107,53,0.1)' }}>
                      <div className="flex items-center gap-3">
                        <IconBook size={20} className="text-[#FF6B35]" />
                        <span className="font-bold">Courses Catalog</span>
                      </div>
                      <span className="text-[10px] bg-[#FF6B35]/20 px-2 py-0.5 rounded text-[#FF6B35] font-bold uppercase">Active</span>
                    </div>
                  </div>

                  {/* Collapsed State with Hover Tooltip */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase mb-1.5">Collapsed (Icon Only, 64px width)</div>
                    <div className="flex items-center gap-6 bg-[#1A1A2E] p-3 rounded-lg">
                      <div className="w-11 h-11 rounded-lg bg-[rgba(255,107,53,0.1)] flex items-center justify-center border-l-3 border-[#FF6B35] text-[#FF6B35] relative group cursor-pointer">
                        <IconBook size={20} />
                        {/* Tooltip Spec */}
                        <div className="absolute left-[54px] bg-[#1A202C] text-white text-[11px] font-medium px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1">
                          Courses <span className="w-2 h-2 bg-[#FF6B35] rounded-full"></span>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">Hovering collapsed row displays right-pointing dark tooltip</span>
                    </div>
                  </div>

                  {/* Sidebar Section Label */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase mb-1.5">Sidebar Section Title Label</div>
                    <div className="text-[11px] uppercase font-black tracking-widest text-[#4B5563] bg-gray-50 py-2 px-4 rounded border border-gray-100">
                      Manage / Configure
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">Non-interactive uppercase, 11px font size, 0.08em letter-spacing.</div>
                  </div>
                </div>
              </div>

              {/* Public Top Navbar Links & Breadcrumbs Spec */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">Top Navbar & Breadcrumb States</h3>
                  <p className="text-[12px] text-gray-500">Public/Student-facing navbar interactions and breadcrumb hierarchies.</p>
                </div>

                <div className="space-y-6">
                  {/* Top Navbar Links */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Top Navbar Links</span>
                    <div className="flex gap-8 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                      {/* Default */}
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[14px] text-[#6B6B80] cursor-pointer">Explore Courses</span>
                        <span className="text-[10px] text-gray-400 font-medium">Default</span>
                      </div>

                      {/* Hover */}
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[14px] text-[#1A1A2E] cursor-pointer font-medium relative">
                          Explore Courses
                          <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-[#FF6B35]"></span>
                        </span>
                        <span className="text-[10px] text-[#FF6B35] font-semibold mt-1">Hover Underline</span>
                      </div>

                      {/* Active */}
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[14px] text-[#FF6B35] cursor-pointer font-bold relative">
                          Explore Courses
                          <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-[#FF6B35]"></span>
                        </span>
                        <span className="text-[10px] text-[#FF6B35] font-bold mt-1">Active Page</span>
                      </div>
                    </div>
                  </div>

                  {/* Breadcrumb Links */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Breadcrumbs (13px text)</span>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-[13px] text-[#718096]">
                        <span className="cursor-pointer hover:text-[#FF6B35] hover:underline">Admin</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-[#FF6B35] hover:underline">Courses</span>
                        <span>/</span>
                        <span className="text-[#1A202C] font-semibold">Web Development</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-center text-gray-400">
                        <div>Default: #718096</div>
                        <div className="text-[#FF6B35]">Hover: Underline orange</div>
                        <div className="text-[#1A202C] font-bold">Active: #1A202C bold</div>
                      </div>
                    </div>
                  </div>

                  {/* Course Cards & Metric Cards Spec */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Card Elevation & Interactive States</span>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Metric Card hover */}
                      <div className="bg-white p-4 rounded-[12px] border border-gray-200 border-l-[4px] border-l-[#FF6B35] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] transition-all cursor-pointer">
                        <div className="text-[11px] font-bold text-gray-400 uppercase">Metric Card</div>
                        <div className="text-[20px] font-bold text-gray-800 mt-1">Hover Elevate</div>
                        <div className="text-[11px] text-[#FF6B35] font-semibold mt-1">TranslateY(-2px) + shadow</div>
                      </div>

                      {/* Content Card hover */}
                      <div className="bg-white p-4 rounded-[12px] border border-gray-200 hover:border-[#FFD4C0] hover:scale-[1.01] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] active:scale-[0.99] transition-all cursor-pointer">
                        <div className="text-[11px] font-bold text-gray-400 uppercase">Content Card</div>
                        <div className="text-[20px] font-bold text-gray-800 mt-1">Scale Press</div>
                        <div className="text-[11px] text-[#00B5A5] font-semibold mt-1">Scale(1.01) hover / (0.99) active</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* 3. TABLE ROW & CHECKBOX STATES SHOWCASE */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
              <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-1">Data Table Interactions & Checkboxes Spec</h3>
                  <p className="text-[12px] text-gray-500">Live preview of striped rows, hover colors, selection overlays, checkbox nodes, and sorting icons.</p>
                </div>
                <button
                  onClick={() => setSelectedRows([3])}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[11px] font-bold text-gray-700 rounded-md border-none cursor-pointer"
                >
                  Reset Row States
                </button>
              </div>

              {/* Checkbox Catalog bar */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex flex-wrap gap-6 items-center">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Variant Checkboxes:</span>
                
                <div className="flex items-center gap-2">
                  <CustomCheckbox checked={false} onChange={() => {}} />
                  <span className="text-[12px] text-gray-600">Unchecked (Default)</span>
                </div>

                <div className="flex items-center gap-2">
                  <CustomCheckbox checked={true} onChange={() => {}} />
                  <span className="text-[12px] text-gray-600 font-semibold text-[#FF6B35]">Checked (Filled Orange)</span>
                </div>

                <div className="flex items-center gap-2">
                  <CustomCheckbox checked={false} indeterminate={true} onChange={() => {}} />
                  <span className="text-[12px] text-gray-600 font-semibold text-[#FF6B35]">Indeterminate (30% tint + dash)</span>
                </div>

                <div className="flex items-center gap-2">
                  <div style={{ outline: '2px solid #FF6B35', outlineOffset: '2px', borderRadius: 4 }}>
                    <CustomCheckbox checked={false} onChange={() => {}} />
                  </div>
                  <span className="text-[12px] text-gray-600">Focus Ring (2px offset)</span>
                </div>
              </div>

              {/* Visual Table simulation */}
              <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-[#F3F1ED] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="p-4 w-12 text-center">
                        <CustomCheckbox 
                          checked={selectedRows.length === 5} 
                          indeterminate={selectedRows.length > 0 && selectedRows.length < 5} 
                          onChange={(checked) => {
                            if (checked) setSelectedRows([1, 2, 3, 4, 5]);
                            else setSelectedRows([]);
                          }} 
                        />
                      </th>
                      
                      {/* Sortable Column Header */}
                      <th 
                        onClick={() => setSortState(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className={`p-4 text-[11px] font-bold uppercase tracking-wider cursor-pointer select-none transition-colors hover:bg-[#EAE7E1] ${
                          sortState !== 'none' ? 'text-[#FF6B35]' : 'text-[#718096]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Sortable Student Header</span>
                          <span className="text-[#FF6B35]">
                            {sortState === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
                          </span>
                        </div>
                      </th>

                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Course Detail</th>
                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Category Tag</th>
                      
                      {/* Filter Column Header */}
                      <th 
                        onClick={() => setIsFilterActive(!isFilterActive)}
                        className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer hover:bg-[#EAE7E1] select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Status Filter</span>
                          <IconFilter size={13} fill={isFilterActive ? '#FF6B35' : 'none'} className={isFilterActive ? 'text-[#FF6B35]' : 'text-gray-400'} />
                        </div>
                      </th>

                      <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {[
                      { id: 1, name: 'Row State: Even (Unselected)', course: 'Python Data Science', tag: 'Data Science', status: 'Active', isEven: true },
                      { id: 2, name: 'Row State: Odd (Striped, Unselected)', course: 'Full-Stack Web Development', tag: 'Web Dev', status: 'Pending', isEven: false },
                      { id: 3, name: 'Row State: Selected Row', course: 'AWS Cloud Practitioner', tag: 'Cloud', status: 'Active', isEven: true },
                      { id: 4, name: 'Row State: Focus Outline (Keyboard)', course: 'UX/UI Design Foundations', tag: 'Design', status: 'Inactive', isEven: false },
                      { id: 5, name: 'Row State: Active Clicked (Flash Orange)', course: 'Cybersecurity Essentials', tag: 'Security', status: 'Active', isEven: true }
                    ].map((row) => {
                      const isSelected = selectedRows.includes(row.id);
                      
                      // Compute background color
                      let bg = '#FFFFFF';
                      if (isSelected) bg = '#FFF0EB'; // selected row bg
                      else if (row.id === 5 && activeRow === 5) bg = '#FFE4D6'; // active clicked row bg
                      else if (row.id === 4 && focusedRow === 4) bg = '#FFFFFF';
                      else if (hoveredRow === row.id) bg = '#FFF5F0'; // hover ANY row bg
                      else if (!row.isEven) bg = '#F9F8F6'; // odd striped row bg

                      // Outlines and borders
                      const leftBorder = isSelected ? '3px solid #FF6B35' : '3px solid transparent';
                      const focusOutline = row.id === 4 ? 'outline-[2px] outline-solid outline-[#FF6B35] outline-offset-[-2px]' : '';

                      return (
                        <tr
                          key={row.id}
                          onMouseEnter={() => setHoveredRow(row.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onFocus={() => setFocusedRow(row.id)}
                          onBlur={() => setFocusedRow(null)}
                          onMouseDown={() => setActiveRow(row.id)}
                          onMouseUp={() => setActiveRow(null)}
                          onClick={() => {
                            if (isSelected) setSelectedRows(prev => prev.filter(r => r !== row.id));
                            else setSelectedRows(prev => [...prev, row.id]);
                          }}
                          style={{
                            backgroundColor: bg,
                            borderLeft: leftBorder,
                            transition: 'all 150ms ease',
                            cursor: 'pointer'
                          }}
                          className={`${focusOutline}`}
                        >
                          <td className="p-4 text-center">
                            <CustomCheckbox
                              checked={isSelected}
                              onChange={(checked) => {
                                if (checked) setSelectedRows(prev => [...prev, row.id]);
                                else setSelectedRows(prev => prev.filter(r => r !== row.id));
                              }}
                            />
                          </td>
                          <td className="p-4 font-bold text-gray-800">{row.name}</td>
                          <td className="p-4 text-gray-600">{row.course}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded bg-[#EDE9FF] text-[#2D1B69] text-[11px] font-semibold">
                              {row.tag}
                            </span>
                          </td>
                          <td className="p-4">
                            {row.status === 'Active' && (
                              <span className="px-2.5 py-0.5 bg-[#F0FDF4] text-[#22C55E] text-[11px] font-bold rounded-full inline-flex items-center gap-1.5">
                                <IconCircleCheck size={14} fill="#22C55E" className="text-white" /> Active
                              </span>
                            )}
                            {row.status === 'Pending' && (
                              <span className="px-2.5 py-0.5 bg-[#FFFBEB] text-[#F59E0B] text-[11px] font-bold rounded-full inline-flex items-center gap-1.5">
                                <IconClock size={14} className="text-[#F59E0B]" /> Pending
                              </span>
                            )}
                            {row.status === 'Inactive' && (
                              <span className="px-2.5 py-0.5 bg-[#FEF2F2] text-[#EF4444] text-[11px] font-bold rounded-full inline-flex items-center gap-1.5">
                                <IconCircleX size={14} fill="#EF4444" className="text-white" /> Inactive
                              </span>
                            )}
                          </td>
                          
                          {/* 3-Dot Action Menu */}
                          <td className="p-4 text-right">
                            <div className="action-menu-container relative inline-block">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsActionMenuOpen(!isActionMenuOpen);
                                }}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  backgroundColor: isActionMenuOpen ? '#FFE4D6' : 'transparent',
                                  border: 'none',
                                  color: isActionMenuOpen ? '#FF6B35' : '#9CA3AF',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                className="hover:bg-gray-100 hover:text-gray-800 transition-all"
                              >
                                <IconDotsVertical size={16} />
                              </button>

                              {isActionMenuOpen && (
                                <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 text-left">
                                  <button className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-[#FFF5F0] hover:text-[#FF6B35] flex items-center gap-2 border-none bg-transparent cursor-pointer">
                                    <IconEye size={14} className="text-[#FF6B35]" /> View Course
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-[#FFF5F0] hover:text-[#FF6B35] flex items-center gap-2 border-none bg-transparent cursor-pointer">
                                    <IconPencil size={14} className="text-[#FF6B35]" /> Edit details
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-[12px] text-red-600 hover:bg-[#FEF2F2] hover:text-red-700 flex items-center gap-2 border-none bg-transparent cursor-pointer border-t border-gray-100 font-semibold">
                                    <IconTrash size={14} className="text-red-500" /> Delete row
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. FORM FIELD INPUT STATES & ACCORDIONS */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">Inputs & Interactive Form Controls</h3>
                <p className="text-[12px] text-gray-500">Renders the complete set of input validation fields, drop options, and toggle pill shims.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Default field */}
                <Input label="Default Form Input" placeholder="Enter your full name" icon={<IconUser size={18} />} />
                
                {/* Focus indicator mock */}
                <Input 
                  label="Focus State (Simulated)" 
                  placeholder="Focusing inherits orange ring..." 
                  icon={<IconMail size={18} />}
                  className="border-[#FF6B35] shadow-[0_0_0_3px_rgba(255,107,53,0.12)] bg-white"
                />

                {/* Valid Input field */}
                <Input label="Valid State (Validated)" value="alex@uptoskills.com" valid={true} icon={<IconMail size={18} />} />

                {/* Error Input field */}
                <Input 
                  label="Error State (Validation Failed)" 
                  value="invalid-email-address" 
                  error="Please enter a valid email address." 
                  icon={<IconMail size={18} />} 
                />

                {/* Disabled field */}
                <Input label="Disabled State" value="Locked system value" disabled={true} icon={<IconLock size={18} />} />

                {/* Custom Select Dropdown simulation */}
                <div className="w-full text-left">
                  <label className="block text-[13px] text-[#4A5568] mb-2 font-medium">Select Dropdown (spec chevron rotate)</label>
                  <div className="relative">
                    <button
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`w-full h-[44px] border rounded-lg px-4 text-[14px] flex items-center justify-between transition-all bg-white cursor-pointer ${
                        isSelectOpen ? 'border-[#FF6B35]' : 'border-gray-200'
                      }`}
                    >
                      <span>{selectedDropdownOption}</span>
                      <IconChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180 text-[#FF6B35]' : ''}`} />
                    </button>

                    {isSelectOpen && (
                      <div className="absolute top-[48px] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                        {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSelectedDropdownOption(opt);
                              setIsSelectOpen(false);
                            }}
                            className={`px-4 py-2.5 text-[13px] cursor-pointer transition-colors ${
                              selectedDropdownOption === opt 
                                ? 'bg-[#FFF0EB] text-[#FF6B35] font-semibold' 
                                : 'hover:bg-[#FFF5F0] hover:text-[#FF6B35]'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-wrap gap-8 items-center">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Variant Toggles (spec 200ms slide):</span>
                
                {/* Toggle Off */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setToggleOn(!toggleOn)}
                    className="w-10 h-[22px] rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E0] relative transition-all duration-200 flex items-center p-0.5 cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                  >
                    <div className="w-[18px] h-[18px] rounded-full bg-white transition-all duration-200 translate-x-0" />
                  </button>
                  <span className="text-[12px] text-gray-600 font-medium">Toggle Switch: OFF</span>
                </div>

                {/* Toggle On */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setToggleOn(!toggleOn)}
                    className="w-10 h-[22px] rounded-full bg-[#FF6B35] hover:bg-[#E85520] relative transition-all duration-200 flex items-center p-0.5 cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                  >
                    <div className="w-[18px] h-[18px] rounded-full bg-white transition-all duration-200 translate-x-[18px]" />
                  </button>
                  <span className="text-[12px] text-[#FF6B35] font-bold">Toggle Switch: ON</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* =======================================================
            TAB 3: 5.3 ANIMATIONS & TRANSITIONS PLAYGROUND
            ======================================================= */}
        {activeTab === 'animations' && (
          <div className="space-y-8 animate-scale-in">
            
            {/* Interactive Animations Simulator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Animation 1: Success checkmark bounce SVG */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Success Checkmark Bounce</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: SVG stroke-dashoffset draws in 200ms after a 300ms circle bounce.</p>
                </div>
                
                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center mb-4">
                  <div key={checkmarkDrawKey} className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center animate-success-circle">
                    <svg className="w-6 h-6 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                      <path className="animate-success-check" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <Button variant="secondary" fullWidth={true} onClick={() => setCheckmarkDrawKey(prev => prev + 1)}>
                  Trigger Success Checkmark
                </Button>
              </div>

              {/* Animation 2: Dropdown menus staggering ease */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Dropdown Stagger Item Menus</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: scaleY 0.94 → 1 open in 150ms. Items staggered in 20ms intervals.</p>
                </div>

                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center mb-4 relative">
                  {/* Dropdown open trigger */}
                  <button 
                    onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 cursor-pointer flex items-center gap-1"
                  >
                    <span>Click Menu</span>
                    <IconChevronDown size={14} />
                  </button>

                  {isActionMenuOpen && (
                    <div className="absolute top-[68px] bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 w-44 animate-slide-down flex flex-col">
                      <span className="px-3 py-1.5 text-[11px] text-[#FF6B35] font-bold hover:bg-[#FFF5F0] transition-colors cursor-pointer" style={{ animationDelay: '0ms' }}>Stagger 1: View Course</span>
                      <span className="px-3 py-1.5 text-[11px] text-[#FF6B35] font-bold hover:bg-[#FFF5F0] transition-colors cursor-pointer" style={{ animationDelay: '20ms' }}>Stagger 2: Edit Details</span>
                      <span className="px-3 py-1.5 text-[11px] text-red-600 font-bold hover:bg-red-50 transition-colors cursor-pointer border-t border-gray-50" style={{ animationDelay: '40ms' }}>Stagger 3: Delete Item</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-center text-gray-400">
                  Toggles a live 150ms drop with staggered links
                </div>
              </div>

              {/* Animation 3: Toast enter/exit slide-in */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Toast Notifications Slide</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: translateX 120% → 0 enter (200ms ease), progress width 100% → 0% linear.</p>
                </div>

                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center mb-4 relative overflow-hidden">
                  <span className="text-[12px] text-gray-500">Triggers absolute screen-edge slide</span>
                  
                  {/* Absolute toast inside simulated box */}
                  {toastNotification.show && (
                    <div 
                      key={toastAnimationKey}
                      className="absolute right-3 left-3 bg-white border border-gray-100 rounded-lg shadow-lg p-3 z-50 flex flex-col justify-between border-l-[4px] border-l-[#22C55E] animate-scale-in"
                      style={{ animationDuration: '200ms' }}
                    >
                      <div className="flex items-center gap-2">
                        <IconCircleCheck size={18} fill="#22C55E" className="text-white" />
                        <div className="text-[11px] font-bold text-gray-800">Success Toast Triggered!</div>
                      </div>
                      {/* Progress Bar linear loading */}
                      <div className="h-0.5 bg-[#22C55E] mt-2 rounded transition-all duration-[3000ms] ease-linear w-0" style={{ width: '100%', animation: 'skeletonShimmer 3s linear' }}></div>
                    </div>
                  )}
                </div>

                <Button variant="primary" fullWidth={true} onClick={() => triggerToast('success')}>
                  Trigger Action Toast
                </Button>
              </div>

              {/* Animation 4: Continuous rotation Loading Spinner */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Continuous Loading Spinner</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: 360deg rotation, 800ms linear infinite. 3px border, top orange segment.</p>
                </div>

                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center mb-4">
                  {/* Specs spinner rotation */}
                  <div className="w-10 h-10 rounded-full border-3 border-gray-200 border-t-[#FF6B35] animate-spinner" />
                </div>

                <div className="text-[11px] text-center text-gray-400 font-bold text-[#FF6B35]">
                  Continuous 800ms Linear Loop
                </div>
              </div>

              {/* Animation 5: Skeleton Pulse & Shimmer */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Skeleton Pulse & Shimmer</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: Slide background gradient right (1.5s ease-in-out infinite).</p>
                </div>

                <div className="h-24 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-center px-4 gap-2 mb-4">
                  {/* Shimmer layout */}
                  <div className="h-4 w-3/4 rounded animate-shimmer-gradient" />
                  <div className="h-3 w-1/2 rounded animate-shimmer-gradient" />
                  <div className="h-3 w-5/6 rounded animate-shimmer-gradient" />
                </div>

                <div className="text-[11px] text-center text-gray-400">
                  Sliding gradient backgroundPosition 200% → -200%
                </div>
              </div>

              {/* Animation 6: Accordion Collapse & Expand */}
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-2">Accordion Expand Transition</h4>
                  <p className="text-[12px] text-gray-500 mb-4">Specs: height 200ms ease. Chevron rotate 0deg → 180deg. Content fades.</p>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 mb-4 flex flex-col justify-center">
                  <button 
                    onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
                    className="w-full flex justify-between items-center bg-white border border-gray-200 rounded p-2 text-[12px] font-bold text-gray-700 cursor-pointer"
                  >
                    <span>Specification FAQ Accordion</span>
                    <IconChevronDown size={16} className={`transition-transform duration-200 ${isAccordionExpanded ? 'rotate-180 text-[#FF6B35]' : ''}`} />
                  </button>
                  
                  <div 
                    style={{
                      maxHeight: isAccordionExpanded ? '80px' : '0px',
                      opacity: isAccordionExpanded ? 1 : 0,
                      transition: 'all 200ms ease-out',
                      overflow: 'hidden'
                    }}
                    className="mt-2 text-[11px] text-gray-500 px-1"
                  >
                    All micro-interactions are under 300ms, using ease-out (deceleration) curves, and automatically respect OS reduced motion preferences.
                  </div>
                </div>

                <div className="text-[11px] text-center text-gray-400">
                  200ms auto expand ease transition
                </div>
              </div>

            </div>

            {/* Micro-Animation Developer Spec Handoff Board */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Developer Micro-Animation Handoff Specs</h3>
                <p className="text-[12px] text-gray-500">Copy precompiled CSS transition segments to guarantee precise design implementation.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Card Handoff CSS 1 */}
                <div className="bg-[#1A1A2E] p-4 rounded-xl border border-white/10 text-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-[#FF6B35]">CSS: Primary Button Hover/Active</span>
                    <button 
                      onClick={() => copyToClipboard(`/* Button micro-interactions 100-150ms */\n.btn-primary {\n  transition: all 0.15s ease-out;\n}\n.btn-primary:hover {\n  background-color: #E85520;\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(255,107,53,0.35);\n}\n.btn-primary:active {\n  transform: scale(0.98);\n  background-color: #D44A1A;\n  box-shadow: none;\n  transition: all 0.1s ease;\n}`)}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white rounded cursor-pointer border-none"
                    >
                      Copy Snippet
                    </button>
                  </div>
                  <pre className="text-[11px] text-[#A0AEC0] overflow-x-auto bg-black/40 p-3 rounded leading-normal">
{`.btn-primary { transition: all 0.15s ease-out; }
.btn-primary:hover {
  background-color: #E85520;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255,107,53,0.35);
}
.btn-primary:active {
  transform: scale(0.98);
  background-color: #D44A1A;
  transition: all 0.1s ease;
}`}
                  </pre>
                </div>

                {/* Card Handoff CSS 2 */}
                <div className="bg-[#1A1A2E] p-4 rounded-xl border border-white/10 text-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-[#00B5A5]">CSS: Table Row Hover & Selection</span>
                    <button 
                      onClick={() => copyToClipboard(`.table-row {\n  transition: background-color 150ms ease;\n}\n.table-row:hover {\n  background-color: #FFF5F0; /* light orange hover */\n  cursor: pointer;\n}\n.table-row.selected {\n  background-color: #FFF0EB;\n  border-left: 3px solid #FF6B35;\n}`)}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white rounded cursor-pointer border-none"
                    >
                      Copy Snippet
                    </button>
                  </div>
                  <pre className="text-[11px] text-[#A0AEC0] overflow-x-auto bg-black/40 p-3 rounded leading-normal">
{`.table-row { transition: background-color 150ms ease; }
.table-row:hover {
  background-color: #FFF5F0;
  cursor: pointer;
}
.table-row.selected {
  background-color: #FFF0EB;
  border-left: 3px solid #FF6B35;
}`}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* =======================================================
            TAB 4: 5.1 RESPONSIVE VIEWPORT BREAKPOINTS
            ======================================================= */}
        {activeTab === 'responsive' && (
          <div className="space-y-8 animate-scale-in">
            
            {/* Viewport Select buttons */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">Responsive Breakpoint Frame Simulator</h3>
                <p className="text-[12px] text-gray-500">Sandboxes the admin layout across 1440px Desktop, 768px Collapsible Tablet, and 375px Off-canvas Mobile.</p>
              </div>

              <div className="flex bg-gray-100 p-0.5 rounded-lg w-full md:w-auto">
                {[
                  { id: 'desktop', label: 'Desktop (1440px)', width: 'lg:w-[1440px]' },
                  { id: 'tablet', label: 'Tablet (768px)', width: 'md:w-[768px]' },
                  { id: 'mobile', label: 'Mobile (375px)', width: 'w-[375px]' }
                ].map((vp) => (
                  <button
                    key={vp.id}
                    onClick={() => {
                      setViewportSimSize(vp.id as any);
                      // Auto-adjust course creations viewports
                      if (vp.id !== 'mobile') setResponsiveCourseStep(1);
                    }}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border-none transition-all ${
                      viewportSimSize === vp.id ? 'bg-[#FF6B35] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {vp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Simulation Frame */}
            <div className="flex items-center justify-center p-2 bg-[#1A1A2E]/5 rounded-[24px] border-4 border-dashed border-gray-300 min-h-[640px] overflow-hidden">
              <div 
                className={`bg-[#F8F7F4] border border-gray-200 rounded-[20px] overflow-hidden shadow-2xl flex flex-col transition-all duration-[3000ms] ease-out min-h-[560px] relative ${
                  viewportSimSize === 'desktop' ? 'w-full max-w-[1440px]' : viewportSimSize === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                }`}
              >
                
                {/* Sandboxed Admin topbar */}
                <div className="h-14 bg-[#1A1A2E] text-white px-4 flex items-center justify-between z-30">
                  <div className="flex items-center gap-3">
                    {viewportSimSize !== 'desktop' && (
                      <button 
                        onClick={() => setResponsiveSidebarOpen(!responsiveSidebarOpen)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full cursor-pointer text-white border-none bg-transparent"
                      >
                        {responsiveSidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
                      </button>
                    )}
                    <span className="font-bold text-[14px]">UptoSkills Panel</span>
                    <span className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <IconBell size={18} className="text-gray-300" />
                    <div className="w-7 h-7 rounded-full bg-[#FF6B35] text-[11px] font-bold flex items-center justify-center">A</div>
                  </div>
                </div>

                {/* Sandboxed body content */}
                <div className="flex flex-1 relative min-h-0">
                  
                  {/* Responsive Sidebar Simulator */}
                  {(viewportSimSize === 'desktop' || responsiveSidebarOpen) && (
                    <div 
                      className={`bg-[#1A1A2E] text-[#9CA3AF] flex flex-col z-20 border-r border-white/5 transition-transform duration-[300ms] ${
                        viewportSimSize === 'desktop' 
                          ? 'w-[200px] relative translate-x-0' 
                          : viewportSimSize === 'tablet'
                          ? 'w-[220px] fixed top-14 bottom-0 left-0 translate-x-0 shadow-2xl'
                          : 'w-[280px] fixed top-0 bottom-0 left-0 translate-x-0 shadow-2xl h-full' // Mobile off-canvas (280px wide)
                      }`}
                    >
                      {/* Mobile Header block inside mobile off-canvas drawer */}
                      {viewportSimSize === 'mobile' && (
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#151526]">
                          <span className="font-bold text-white text-[13px]">UptoSkills Sidebar</span>
                          <button onClick={() => setResponsiveSidebarOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none bg-transparent"><IconX size={18} /></button>
                        </div>
                      )}

                      <div className="flex-1 py-4 px-2 space-y-1">
                        <div className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Manage</div>
                        <div className="h-10 px-3 rounded bg-[rgba(255,107,53,0.1)] text-[#FF6B35] flex items-center gap-2 text-[12px] font-semibold cursor-pointer border-l-3 border-[#FF6B35]">
                          <IconLayoutDashboard size={18} /> Overview
                        </div>
                        <div className="h-10 px-3 rounded hover:bg-white/5 hover:text-white flex items-center gap-2 text-[12px] cursor-pointer">
                          <IconUsers size={18} /> Users List
                        </div>
                        <div className="h-10 px-3 rounded hover:bg-white/5 hover:text-white flex items-center gap-2 text-[12px] cursor-pointer">
                          <IconBook size={18} /> Courses Catalog
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sandboxed Main content screen */}
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
                    
                    {/* Viewport responsive layouts details */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">Course Creation Layout Simulation</span>
                        {viewportSimSize === 'mobile' && (
                          <div className="flex gap-2">
                            {[1, 2, 3].map(step => (
                              <div key={step} className={`w-2 h-2 rounded-full ${responsiveCourseStep === step ? 'bg-[#FF6B35]' : 'bg-gray-200'}`} />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Course Form grid layout responsive */}
                      <div className="mt-4">
                        {viewportSimSize === 'desktop' && (
                          <div className="grid grid-cols-[65%_35%] gap-6">
                            <div className="space-y-4 border-r border-gray-100 pr-6">
                              <Input label="Course Title" placeholder="Enter course name" />
                              <div className="text-[12px] text-gray-500 font-medium">Description text editor and thumbnail uploads go here.</div>
                            </div>
                            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                              <Input label="Category" placeholder="e.g. Web Dev" />
                              <Input label="Price (USD)" placeholder="99.00" />
                              <Button variant="primary" fullWidth={true}>Publish Course</Button>
                            </div>
                          </div>
                        )}

                        {viewportSimSize === 'tablet' && (
                          <div className="flex flex-col gap-6">
                            <div className="space-y-4">
                              <Input label="Course Title" placeholder="Enter course name" />
                            </div>
                            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                              <Input label="Category" placeholder="e.g. Web Dev" />
                              <Input label="Price (USD)" placeholder="99.00" />
                              <Button variant="primary" fullWidth={true}>Publish Course</Button>
                            </div>
                          </div>
                        )}

                        {viewportSimSize === 'mobile' && (
                          <div className="space-y-4">
                            {responsiveCourseStep === 1 && (
                              <div className="space-y-4 animate-scale-in">
                                <h5 className="text-[13px] font-bold text-[#FF6B35]">Step 1: Course Info</h5>
                                <Input label="Course Title" placeholder="Enter course name" />
                                <Button variant="secondary" fullWidth={true} onClick={() => setResponsiveCourseStep(2)}>Next Step ➔</Button>
                              </div>
                            )}

                            {responsiveCourseStep === 2 && (
                              <div className="space-y-4 animate-scale-in">
                                <h5 className="text-[13px] font-bold text-[#FF6B35]">Step 2: Pricing & Config</h5>
                                <Input label="Category" placeholder="e.g. Web Dev" />
                                <Input label="Price (USD)" placeholder="99.00" />
                                <div className="flex gap-2">
                                  <Button variant="ghost" className="flex-1" onClick={() => setResponsiveCourseStep(1)}>Back</Button>
                                  <Button variant="primary" className="flex-1" onClick={() => setResponsiveCourseStep(3)}>Next Step ➔</Button>
                                </div>
                              </div>
                            )}

                            {responsiveCourseStep === 3 && (
                              <div className="space-y-4 animate-scale-in text-center p-4">
                                <IconCircleCheck size={44} className="text-[#22C55E] mx-auto animate-success-circle" />
                                <h5 className="text-[14px] font-bold text-gray-800 mt-2">Ready to Publish!</h5>
                                <p className="text-[11px] text-gray-500">Your multi-step form is complete.</p>
                                <div className="flex gap-2 mt-4">
                                  <Button variant="ghost" className="flex-1" onClick={() => setResponsiveCourseStep(2)}>Back</Button>
                                  <Button variant="primary" className="flex-1" onClick={() => setResponsiveCourseStep(1)}>Save & Exit</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Table Viewport Responsive Simulation */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wider block mb-3">Table Layout Response</span>
                      
                      {viewportSimSize === 'mobile' ? (
                        /* Mobile conversion Card list simulator */
                        <div className="space-y-3">
                          {[
                            { id: 1, name: 'Alex Johnson', email: 'alex@skills.com', status: 'Active', role: 'Student' },
                            { id: 2, name: 'Sarah Connor', email: 'sarah@skills.com', status: 'Inactive', role: 'Author' }
                          ].map(user => (
                            <div key={user.id} className="border border-gray-200 rounded-lg p-3 space-y-3 bg-white shadow-xs">
                              <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <CustomCheckbox checked={responsiveTableSelected.includes(user.id)} onChange={(checked) => {
                                    if (checked) setResponsiveTableSelected(prev => [...prev, user.id]);
                                    else setResponsiveTableSelected(prev => prev.filter(p => p !== user.id));
                                  }} />
                                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B35] font-bold text-[12px] flex items-center justify-center">{user.name.charAt(0)}</div>
                                  <div>
                                    <div className="text-[12px] font-bold text-gray-800">{user.name}</div>
                                    <div className="text-[10px] text-gray-400">{user.email}</div>
                                  </div>
                                </div>
                                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${user.status === 'Active' ? 'bg-green-50 text-[#22C55E]' : 'bg-red-50 text-[#EF4444]'}`}>{user.status}</span>
                              </div>
                              
                              <div className="flex gap-2">
                                <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] text-gray-500 font-medium">{user.role}</span>
                              </div>

                              <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
                                <div className="flex gap-2">
                                  <span className="text-[11px] text-[#00B5A5] font-bold cursor-pointer">View</span>
                                  <span className="text-[11px] text-gray-400 font-bold cursor-pointer">Edit</span>
                                </div>
                                <IconTrash size={16} className="text-red-500 cursor-pointer" />
                              </div>
                            </div>
                          ))}

                          {/* Mobile fixed bulk action bar */}
                          {responsiveTableSelected.length > 0 && (
                            <div className="bg-[#FF6B35] text-white p-2 rounded-lg flex justify-between items-center text-[12px]">
                              <span>{responsiveTableSelected.length} rows selected</span>
                              <div className="flex gap-2">
                                <button className="px-2 py-1 bg-white/20 text-white rounded text-[10px] font-bold border-none cursor-pointer">Delete</button>
                                <button className="px-2 py-1 bg-white text-[#FF6B35] rounded text-[10px] font-bold border-none cursor-pointer">Export</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Desktop & Tablet scrollable horizontal table */
                        <div className="overflow-x-auto border border-gray-100 rounded-lg">
                          <table className="w-full text-left border-collapse text-[12px]">
                            <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
                              <tr>
                                <th className="p-3 w-8"></th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                {viewportSimSize === 'desktop' && (
                                  <>
                                    <th className="p-3">Enrolled</th>
                                    <th className="p-3">Joined Date</th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t border-gray-100 bg-white">
                                <td className="p-3"><CustomCheckbox checked={true} onChange={() => {}} /></td>
                                <td className="p-3 font-bold">Alex Johnson</td>
                                <td className="p-3">Student</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-bold">Active</span></td>
                                {viewportSimSize === 'desktop' && (
                                  <>
                                    <td className="p-3">4 Courses</td>
                                    <td className="p-3">May 12, 2026</td>
                                  </>
                                )}
                              </tr>
                            </tbody>
                          </table>
                          {viewportSimSize === 'tablet' && (
                            <div className="text-[10px] text-right italic text-gray-400 p-2 border-t border-gray-100">
                              Swipe horizontally for hidden columns (Date/Enrolled) ➔
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* Mobile Bottom Fixed Nav simulation bar */}
                {viewportSimSize === 'mobile' && (
                  <div className="h-14 bg-white border-t border-gray-200 z-30 flex items-center justify-around px-2 w-full">
                    {[
                      { icon: IconLayoutDashboard, label: 'Overview', active: true },
                      { icon: IconUsers, label: 'Users', active: false },
                      { icon: IconBook, label: 'Courses', active: false },
                      { icon: IconChartBar, label: 'Analytics', active: false },
                      { icon: IconSettings, label: 'Settings', active: false }
                    ].map((tab, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center cursor-pointer relative">
                        {tab.active && <span className="absolute top-[-2px] w-1 h-1 bg-[#FF6B35] rounded-full" />}
                        <tab.icon size={18} className={tab.active ? 'text-[#FF6B35]' : 'text-gray-400'} />
                        <span className={`text-[8px] mt-0.5 ${tab.active ? 'text-[#FF6B35] font-bold' : 'text-gray-400'}`}>{tab.label}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Filter Bottom Sheet simulation on Mobile */}
            {viewportSimSize === 'mobile' && (
              <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-1">Bottom Sheet Filters Simulator (Mobile Only)</h4>
                  <p className="text-[12px] text-gray-500">Specs: 80% height bottom sheet slides up from bottom with 20px rounded top corners.</p>
                </div>
                
                <div className="relative">
                  <Button variant="secondary" onClick={() => setResponsiveFilterOpen(true)}>
                    Open Filter Bottom Sheet
                  </Button>

                  {responsiveFilterOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                      <div 
                        className="bg-white w-[375px] max-h-[80vh] rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden animate-slide-up"
                        style={{ animationDuration: '300ms' }}
                      >
                        {/* Drawer handle drag bar */}
                        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3 flex-shrink-0" />
                        
                        <div className="px-5 pb-3 border-b border-gray-100 flex justify-between items-center">
                          <h4 className="text-[14px] font-bold text-gray-800">Filter Course Catalog</h4>
                          <button onClick={() => setResponsiveFilterOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center border-none bg-transparent cursor-pointer"><IconX size={16} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Choose Levels</span>
                          {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                            <label key={lvl} className="h-12 border border-gray-100 rounded-lg px-4 flex items-center gap-3 hover:bg-[#FFF5F0] transition-colors cursor-pointer text-[13px] text-gray-700 font-semibold select-none">
                              <input type="checkbox" style={{ accentColor: '#FF6B35' }} />
                              <span>{lvl}</span>
                            </label>
                          ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                          <Button variant="primary" fullWidth={true} onClick={() => setResponsiveFilterOpen(false)}>
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: FIGMA CARD FOR CATEGORY REPRESENTATIONS ---
interface IconCategoryCardProps {
  title: string;
  desc: string;
  icons: Array<{ name: string; key: string; icon: React.ComponentType<any>; forceFill?: string; forceColor?: string; forceCircleBg?: string; forceStateCircle?: { bg: string; stroke: string } }>;
  currentSize: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';
  currentColor: 'Default' | 'Primary' | 'Success' | 'Warning' | 'Error' | 'Muted';
  sizeMap: Record<string, { px: number; stroke: number }>;
  colorMap: Record<string, string>;
}

function IconCategoryCard({ title, desc, icons, currentSize, currentColor, sizeMap, colorMap }: IconCategoryCardProps) {
  const activeSize = sizeMap[currentSize];
  const activeColor = colorMap[currentColor];

  return (
    <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <h4 className="text-[14px] font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-[11px] text-gray-500 leading-normal">{desc}</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {icons.map((item, idx) => {
          
          // Render SVGs in auto-layout frame style
          let inlineStyle: React.CSSProperties = {};
          let sizeOverride = activeSize.px;
          let strokeOverride = activeSize.stroke;

          // Override sizing rules for particular specs
          if (item.forceCircleBg) {
            sizeOverride = 20; // force MD inside circles
            strokeOverride = 2.0;
          } else if (item.forceStateCircle) {
            sizeOverride = 24; // force empty LG
            strokeOverride = 2.0;
          }

          // Build node markup
          let iconNode = (
            <item.icon
              size={sizeOverride}
              strokeWidth={strokeOverride}
              className={`${item.forceColor ? '' : activeColor}`}
              color={item.forceColor || undefined}
              fill={item.forceFill || 'none'}
              style={inlineStyle}
            />
          );

          // Wrap inside custom status circle if needed
          if (item.forceCircleBg) {
            iconNode = (
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: item.forceCircleBg }}
              >
                <item.icon size={16} strokeWidth={2.0} fill="none" />
              </div>
            );
          } else if (item.forceStateCircle) {
            // Empty state sizes XXL / XXL inside orange tinted circles
            const isLargeEmpty = title.toLowerCase().includes('empty');
            const circleSize = isLargeEmpty ? 'w-24 h-24' : 'w-10 h-10';
            const drawSize = isLargeEmpty ? 48 : 24;

            iconNode = (
              <div 
                className={`${circleSize} rounded-full flex items-center justify-center`}
                style={{ backgroundColor: item.forceStateCircle.bg }}
              >
                <item.icon size={drawSize} strokeWidth={2.0} color={item.forceStateCircle.stroke} fill="none" />
              </div>
            );
          }

          return (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center p-2 rounded-lg border border-dashed border-gray-150 hover:bg-[#FFF5F0] transition-colors"
              title={`Figma Component name: icon/${title.toLowerCase().replace(/\s+/g, '-')}/${item.key}`}
            >
              {/* Auto Layout Box padding simulator */}
              <div className="p-1 flex items-center justify-center select-none">
                {iconNode}
              </div>
              <span className="text-[10px] text-gray-500 font-medium text-center truncate w-full mt-1.5 leading-none">
                {item.name}
              </span>
              <span className="text-[8px] text-gray-300 font-bold tracking-tight text-center leading-none mt-1">
                {item.key}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Dummy Icons for tab headings
function IconLayers(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconMobile(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
