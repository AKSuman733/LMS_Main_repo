import React, { useState, useEffect } from 'react';
import { Building2, Palette, Mail, CreditCard, Link2, Lock, Bell, Save, Upload, Send } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: <Building2 size={16} /> },
  { id: 'branding', label: 'Branding', icon: <Palette size={16} /> },
  { id: 'email', label: 'Email', icon: <Mail size={16} /> },
  { id: 'security', label: 'Security', icon: <Lock size={16} /> },
  { id: 'integrations', label: 'Integrations', icon: <Link2 size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
];

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState<string | null>(null);
  const [general, setGeneral] = useState({ name: 'Learnify', url: 'https://learnify.com', email: 'support@learnify.com', language: 'English', timezone: 'IST', maintenance: false });
  const [branding, setBranding] = useState({ primary: '#2D1B69', accent: '#BBFF00' });
  const [smtp, setSmtp] = useState({ host: 'smtp.gmail.com', port: '587', user: '', pass: '', fromName: 'Learnify', fromEmail: 'noreply@learnify.com' });
  const [emailTemplates, setEmailTemplates] = useState([{ name: 'Welcome Email', on: true }, { name: 'Course Enrollment', on: true }, { name: 'Certificate Issued', on: true }, { name: 'Weekly Digest', on: false }]);
  const [security, setSecurity] = useState({ timeout: '4hr', maxAttempts: 5, require2FA: false, minChars: true, uppercase: true, number: true, special: false, ipWhitelist: '' });
  const [integrations] = useState([
    { name: 'Google OAuth', logo: '🔵', connected: true },
    { name: 'GitHub OAuth', logo: '⚫', connected: false },
    { name: 'Stripe', logo: '🟣', connected: false },
    { name: 'Mailchimp', logo: '🟡', connected: false },
    { name: 'Slack', logo: '🟢', connected: false },
    { name: 'Zapier', logo: '🟠', connected: false },
  ]);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  const inputCls = "w-full h-11 px-4 bg-white border border-[#E2E1F0] rounded-lg text-[#1A1A2E] text-[14px] outline-none focus:border-[#F59E0B] transition-colors";
  const labelCls = "text-[12px] font-semibold text-[#6B6B80] uppercase tracking-wide mb-1.5 block";

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] min-h-[calc(100vh-64px)] font-sans flex">
      {toast && <div className="fixed top-6 right-6 bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl z-50">{toast}</div>}

      {/* Left Nav */}
      <aside className="w-[200px] bg-white border-r border-[#E2E1F0] p-4 flex-shrink-0 sticky top-[64px] h-[calc(100vh-64px)]">
        <div className="space-y-1 mt-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all ${activeTab === t.id ? 'bg-[#F59E0B]/10 text-[#D97706] border-l-2 border-l-[#F59E0B]' : 'bg-transparent text-[#6B6B80] hover:bg-gray-50 hover:text-[#1A1A2E]'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-[40px]">
        <h2 className="text-[28px] font-extrabold text-[#1A1A2E] mb-2">Settings</h2>
        <p className="text-[14px] text-[#6B6B80] mb-8">Configure your platform preferences.</p>

        {/* General */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-[14px] border border-[#E2E1F0] p-6 shadow-sm space-y-5 max-w-[640px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">General Settings</h3>
            <div><label className={labelCls}>Platform Name</label><input value={general.name} onChange={e => setGeneral({...general, name: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Platform URL</label><input value={general.url} onChange={e => setGeneral({...general, url: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Support Email</label><input type="email" value={general.email} onChange={e => setGeneral({...general, email: e.target.value})} className={inputCls} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Language</label><select value={general.language} onChange={e => setGeneral({...general, language: e.target.value})} className={inputCls + ' cursor-pointer'}><option>English</option><option>Hindi</option><option>Spanish</option><option>French</option></select></div>
              <div><label className={labelCls}>Timezone</label><select value={general.timezone} onChange={e => setGeneral({...general, timezone: e.target.value})} className={inputCls + ' cursor-pointer'}><option>IST</option><option>UTC</option><option>EST</option><option>PST</option></select></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div><div className="font-semibold text-[14px] text-[#1A1A2E]">Maintenance Mode</div>
                {general.maintenance && <p className="text-[12px] text-red-500 font-semibold mt-0.5">⚠ Site will be offline for users</p>}</div>
              <button onClick={() => setGeneral({...general, maintenance: !general.maintenance})} className={`relative w-10 h-[22px] rounded-full cursor-pointer ${general.maintenance ? 'bg-red-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${general.maintenance ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} /></button>
            </div>
            <button onClick={() => setToast('Settings saved ✓')} className="h-11 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[14px] rounded-lg cursor-pointer border-none flex items-center gap-2 mt-2"><Save size={16} />Save Changes</button>
          </div>
        )}

        {/* Branding */}
        {activeTab === 'branding' && (
          <div className="bg-white rounded-[14px] border border-[#E2E1F0] p-6 shadow-sm space-y-5 max-w-[640px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Branding</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-[#F59E0B]/40 rounded-xl p-6 text-center hover:border-[#F59E0B] transition-colors cursor-pointer">
                <Upload size={28} className="mx-auto text-[#F59E0B] mb-2" /><p className="text-[13px] font-semibold text-[#6B6B80]">Upload Logo</p><p className="text-[11px] text-[#6B6B80]">PNG / SVG</p></div>
              <div className="border-2 border-dashed border-[#E2E1F0] rounded-xl p-6 text-center hover:border-[#F59E0B] transition-colors cursor-pointer">
                <Upload size={28} className="mx-auto text-[#6B6B80] mb-2" /><p className="text-[13px] font-semibold text-[#6B6B80]">Upload Favicon</p><p className="text-[11px] text-[#6B6B80]">32×32 PNG</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Primary Color</label><div className="flex gap-2"><input type="color" value={branding.primary} onChange={e => setBranding({...branding, primary: e.target.value})} className="w-11 h-11 rounded-lg border border-[#E2E1F0] cursor-pointer" /><input value={branding.primary} onChange={e => setBranding({...branding, primary: e.target.value})} className={inputCls} /></div></div>
              <div><label className={labelCls}>Accent Color</label><div className="flex gap-2"><input type="color" value={branding.accent} onChange={e => setBranding({...branding, accent: e.target.value})} className="w-11 h-11 rounded-lg border border-[#E2E1F0] cursor-pointer" /><input value={branding.accent} onChange={e => setBranding({...branding, accent: e.target.value})} className={inputCls} /></div></div>
            </div>
            <div><label className={labelCls}>Preview</label>
              <div className="h-12 rounded-lg flex items-center px-4 gap-2" style={{ backgroundColor: branding.primary }}>
                <span className="font-bold text-[16px]" style={{ color: branding.accent }}>Learnify</span><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: branding.accent }} /></div>
            </div>
            <button onClick={() => setToast('Branding saved ✓')} className="h-11 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[14px] rounded-lg cursor-pointer border-none flex items-center gap-2"><Save size={16} />Save Changes</button>
          </div>
        )}

        {/* Email */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-[14px] border border-[#E2E1F0] p-6 shadow-sm space-y-5 max-w-[640px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Email Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>SMTP Host</label><input value={smtp.host} onChange={e => setSmtp({...smtp, host: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Port</label><input value={smtp.port} onChange={e => setSmtp({...smtp, port: e.target.value})} className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Username</label><input value={smtp.user} onChange={e => setSmtp({...smtp, user: e.target.value})} className={inputCls} placeholder="SMTP username" /></div>
              <div><label className={labelCls}>Password</label><input type="password" value={smtp.pass} onChange={e => setSmtp({...smtp, pass: e.target.value})} className={inputCls} placeholder="••••••" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>From Name</label><input value={smtp.fromName} onChange={e => setSmtp({...smtp, fromName: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>From Email</label><input value={smtp.fromEmail} onChange={e => setSmtp({...smtp, fromEmail: e.target.value})} className={inputCls} /></div>
            </div>
            <button onClick={() => setToast('Test email sent ✓')} className="h-10 px-5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[13px] rounded-lg cursor-pointer border-none flex items-center gap-2"><Send size={15} />Send Test Email</button>
            <div className="border-t border-[#E2E1F0] pt-4 mt-2"><label className={labelCls}>Email Templates</label>
              <div className="space-y-3 mt-2">{emailTemplates.map((t, i) => (
                <div key={i} className="flex items-center justify-between"><span className="text-[14px] font-medium text-[#1A1A2E]">{t.name}</span>
                  <button onClick={() => setEmailTemplates(prev => prev.map((x, j) => j === i ? {...x, on: !x.on} : x))} className={`relative w-10 h-[22px] rounded-full cursor-pointer ${t.on ? 'bg-[#F59E0B]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${t.on ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} /></button>
                </div>))}</div>
            </div>
            <button onClick={() => setToast('Email settings saved ✓')} className="h-11 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[14px] rounded-lg cursor-pointer border-none flex items-center gap-2"><Save size={16} />Save Changes</button>
          </div>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-[14px] border border-[#E2E1F0] p-6 shadow-sm space-y-5 max-w-[640px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Security Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Session Timeout</label><select value={security.timeout} onChange={e => setSecurity({...security, timeout: e.target.value})} className={inputCls + ' cursor-pointer'}><option value="30min">30 minutes</option><option value="1hr">1 hour</option><option value="4hr">4 hours</option><option value="8hr">8 hours</option><option value="never">Never</option></select></div>
              <div><label className={labelCls}>Max Login Attempts</label><input type="number" value={security.maxAttempts} onChange={e => setSecurity({...security, maxAttempts: Number(e.target.value)})} className={inputCls} min={1} /></div>
            </div>
            <div className="flex items-center justify-between"><div><div className="font-semibold text-[14px]">Require 2FA for Admins</div><p className="text-[12px] text-[#6B6B80]">Two-factor authentication for admin accounts</p></div>
              <button onClick={() => setSecurity({...security, require2FA: !security.require2FA})} className={`relative w-10 h-[22px] rounded-full cursor-pointer ${security.require2FA ? 'bg-[#F59E0B]' : 'bg-gray-300'}`}>
                <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${security.require2FA ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} /></button>
            </div>
            <div><label className={labelCls}>Password Policy</label>
              <div className="space-y-2 mt-1">{[
                { k: 'minChars' as const, l: 'Minimum 8 characters' }, { k: 'uppercase' as const, l: 'Require uppercase letter' },
                { k: 'number' as const, l: 'Require number' }, { k: 'special' as const, l: 'Require special character' },
              ].map(p => (
                <label key={p.k} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={security[p.k] as boolean} onChange={() => setSecurity({...security, [p.k]: !security[p.k]})} className="w-4 h-4 accent-[#F59E0B] cursor-pointer" /><span className="text-[13px] text-[#1A1A2E]">{p.l}</span></label>
              ))}</div>
            </div>
            <div><label className={labelCls}>IP Whitelist for Admin</label><textarea value={security.ipWhitelist} onChange={e => setSecurity({...security, ipWhitelist: e.target.value})} placeholder="Enter IP addresses, one per line" className="w-full p-3 bg-white border border-[#E2E1F0] rounded-lg text-[14px] outline-none focus:border-[#F59E0B] h-[80px] resize-none" /></div>
            <button onClick={() => setToast('Security settings saved ✓')} className="h-11 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[14px] rounded-lg cursor-pointer border-none flex items-center gap-2"><Save size={16} />Save Changes</button>
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'integrations' && (
          <div className="max-w-[740px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((ig, i) => (
                <div key={i} className="bg-white rounded-[12px] border border-[#E2E1F0] p-5 shadow-sm flex flex-col items-center text-center">
                  <div className="text-[32px] mb-3">{ig.logo}</div>
                  <div className="font-bold text-[14px] text-[#1A1A2E] mb-2">{ig.name}</div>
                  {ig.connected ? (<><span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold px-2.5 py-1 rounded-full mb-2">Connected ✓</span>
                    <button className="text-[12px] font-bold text-red-500 hover:underline cursor-pointer bg-transparent border-none">Disconnect</button></>
                  ) : (<button className="h-9 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[13px] rounded-lg cursor-pointer border-none">Connect</button>)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-[14px] border border-[#E2E1F0] p-6 shadow-sm space-y-4 max-w-[640px]">
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Notification Preferences</h3>
            {['New user registration', 'New enrollment', 'Course completion', 'Certificate issued', 'System alerts', 'Weekly summary email'].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-1"><span className="text-[14px] font-medium text-[#1A1A2E]">{n}</span>
                <button className={`relative w-10 h-[22px] rounded-full cursor-pointer ${i < 4 ? 'bg-[#F59E0B]' : 'bg-gray-300'}`}>
                  <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${i < 4 ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} /></button>
              </div>
            ))}
            <button onClick={() => setToast('Notifications saved ✓')} className="h-11 px-6 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[14px] rounded-lg cursor-pointer border-none flex items-center gap-2 mt-2"><Save size={16} />Save Changes</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminSettings;
