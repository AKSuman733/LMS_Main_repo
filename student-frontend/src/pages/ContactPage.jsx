import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import uptoskillsLogo from "../assets/logo/UptoSkills.webp";

export default function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you! Your message has been received.");
    event.target.reset();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:36px_36px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Home
          </Link>

          <img
            src={uptoskillsLogo}
            alt="UptoSkills Logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        <section className="mt-10 overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-orange-500/20 p-8 shadow-2xl shadow-cyan-500/10 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-cyan-300">
                <Sparkles size={18} />
                Contact UptoSkills
              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
                Need Help?
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300 bg-clip-text text-transparent">
                  Contact Us.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Have questions about courses, certificates, payments, dashboard
                access or internship learning? Send your message and our team
                will help you.
              </p>

              <div className="mt-10 grid gap-4">
                <ContactCard
                  icon={MapPin}
                  title="Location"
                  value="Jaipur, Rajasthan, India"
                />

                <ContactCard
                  icon={Phone}
                  title="Phone"
                  value="+91 9887196182"
                />

                <ContactCard
                  icon={Mail}
                  title="Email"
                  value="support@uptoskills.com"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl backdrop-blur-xl md:p-8"
            >
              <h2 className="text-3xl font-black">Send Message</h2>

              <p className="mt-2 text-sm text-slate-400">
                Fill the form and we will contact you soon.
              </p>

              <div className="mt-7 grid gap-5">
                <Input label="Full Name" placeholder="Enter your name" />

                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                />

                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                />

                <label className="block">
                  <span className="text-sm font-bold text-slate-300">
                    Subject
                  </span>

                  <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 text-white outline-none focus:border-cyan-400">
                    <option className="bg-slate-950">Course Inquiry</option>
                    <option className="bg-slate-950">Certificate Help</option>
                    <option className="bg-slate-950">Payment Issue</option>
                    <option className="bg-slate-950">Dashboard Support</option>
                    <option className="bg-slate-950">Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-300">
                    Message
                  </span>

                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </label>

                <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-xl font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02]">
                  <Send size={22} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoBox
            title="Course Support"
            text="Ask about available courses, levels, mentors and learning roadmap."
          />

          <InfoBox
            title="Certificate Support"
            text="Get help with certificate generation, verification and download."
          />

          <InfoBox
            title="Technical Support"
            text="Report login, dashboard, payment or enrollment related issues."
          />
        </section>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-sm text-slate-500">
          © 2026 UptoSkills LMS. All rights reserved.
        </footer>
      </div>

      <button className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white shadow-2xl shadow-purple-500/30 transition hover:scale-110">
        <MessageCircle />
      </button>

      <button
        onClick={() =>
          window.open(
            "https://wa.me/919887196182?text=Hello%20UptoSkills%2C%20I%20need%20help%20regarding%20LMS%20platform.",
            "_blank"
          )
        }
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:scale-110"
      >
        <Phone />
      </button>
    </div>
  );
}

function ContactCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <Icon size={26} />
        </div>

        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 font-black text-slate-100">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-300">{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
      />
    </label>
  );
}

function InfoBox({ title, text }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 transition hover:-translate-y-2 hover:border-cyan-400/40">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}