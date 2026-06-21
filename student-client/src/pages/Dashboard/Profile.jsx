import {
  Camera,
  Mail,
  Phone,
  User,
  Lock,
  Globe,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Trophy,
  BookOpen,
  Save,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

/* ── tokens ── */
const card =
  "rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-wide text-slate-400";

const inputBase =
  "flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-indigo-500/50 focus-within:bg-white/[0.05]";

const inputText =
  "w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600";

const label = "mb-2 block text-[11px] font-medium uppercase tracking-widest text-slate-500";

const stats = [
  { icon: BookOpen, value: "12", label: "Courses", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { icon: Trophy, value: "6", label: "Awards", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: BrainCircuit, value: "18", label: "Skills", color: "text-violet-400", bg: "bg-violet-500/10" },
];

function Profile() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080c14] px-5 pb-20 pt-24 lg:px-8">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── page header ── */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className={pill}>
              <Sparkles size={10} className="text-indigo-400" />
              Profile settings
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              My Profile
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Manage your identity, credentials, and account security.
            </p>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
              saved
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={15} /> Saved
              </>
            ) : (
              <>
                <Save size={15} /> Save changes
              </>
            )}
          </button>
        </div>

        {/* ── two-col layout ── */}
        <div className="grid gap-5 xl:grid-cols-[280px_1fr]">

          {/* ── sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${card} flex flex-col overflow-hidden`}
          >
            {/* avatar area */}
            <div className="flex flex-col items-center bg-gradient-to-b from-indigo-600/10 to-transparent px-6 py-10">
              <div className="relative mb-4">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-bold text-white">
                  JD
                </div>
                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#0d1220] text-slate-400 transition-colors hover:text-white">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-base font-semibold text-white">John Doe</h2>
              <p className="mt-0.5 text-xs text-slate-500">john@gmail.com</p>
            </div>

            {/* stats */}
            <div className="divide-y divide-white/[0.05] px-6 pb-6">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}>
                        <Icon size={14} className={s.color} />
                      </div>
                      <span className="text-sm text-slate-400">{s.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {s.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── main form ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            {/* personal info */}
            <div className={`${card} p-6`}>
              <h3 className="mb-5 text-sm font-semibold text-white">
                Personal Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className={label}>First name</p>
                  <div className={inputBase}>
                    <User size={15} className="shrink-0 text-indigo-400" />
                    <input type="text" defaultValue="John" className={inputText} />
                  </div>
                </div>
                <div>
                  <p className={label}>Last name</p>
                  <div className={inputBase}>
                    <User size={15} className="shrink-0 text-indigo-400" />
                    <input type="text" defaultValue="Doe" className={inputText} />
                  </div>
                </div>
                <div>
                  <p className={label}>Email address</p>
                  <div className={inputBase}>
                    <Mail size={15} className="shrink-0 text-indigo-400" />
                    <input type="email" defaultValue="john@gmail.com" className={inputText} />
                  </div>
                </div>
                <div>
                  <p className={label}>Phone</p>
                  <div className={inputBase}>
                    <Phone size={15} className="shrink-0 text-indigo-400" />
                    <input type="text" placeholder="+91 9876543210" className={inputText} />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className={label}>Portfolio website</p>
                  <div className={inputBase}>
                    <Globe size={15} className="shrink-0 text-indigo-400" />
                    <input type="text" placeholder="yourwebsite.com" className={inputText} />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className={label}>Bio</p>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.05]"
                  />
                </div>
              </div>
            </div>

            {/* password */}
            <div className={`${card} p-6`}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Lock size={15} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Change Password
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Keep your account secure
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="password"
                  placeholder="New password"
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
                />
              </div>
            </div>

            {/* security notice */}
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">
                  Secure profile management
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Your information is encrypted and securely stored.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
