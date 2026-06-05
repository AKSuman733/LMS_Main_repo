import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  RefreshCcw,
  Search,
  Trash2,
  User,
} from "lucide-react";

const demoMessages = [
  {
    id: 1,
    name: "Student User",
    email: "student@example.com",
    subject: "Course Inquiry",
    message: "I want to know more about Java Full Course.",
    status: "Unread",
    createdAt: "29 May 2026",
  },
  {
    id: 2,
    name: "Charv Raj",
    email: "charvraj2006@gmail.com",
    subject: "Certificate Help",
    message: "I completed my course but certificate is not visible.",
    status: "Read",
    createdAt: "28 May 2026",
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(demoMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchText = `${message.name} ${message.email} ${message.subject} ${message.message}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || message.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  const totalMessages = messages.length;

  const unreadMessages = messages.filter(
    (message) => message.status === "Unread"
  ).length;

  const readMessages = messages.filter(
    (message) => message.status === "Read"
  ).length;

  const refreshMessages = () => {
    setError("");
    setSuccess("Messages refreshed.");
    setMessages(demoMessages);
  };

  const markAsRead = (messageId) => {
    setError("");

    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: "Read" } : message
      )
    );

    setSuccess("Message marked as read.");
  };

  const deleteMessage = (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    setError("");

    setMessages((prev) => prev.filter((message) => message.id !== messageId));

    setSuccess("Message deleted successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Messages</p>

            <h1 className="mt-2 text-4xl font-black">Manage Messages</h1>

            <p className="mt-2 text-slate-400">
              View student queries, contact messages and support requests.
            </p>
          </div>

          <button
            onClick={refreshMessages}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard title="Total Messages" value={totalMessages} />
          <StatCard title="Unread" value={unreadMessages} />
          <StatCard title="Read" value={readMessages} />
        </div>

        {(error || success) && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 ${
              error
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            }`}
          >
            {error ? <AlertCircle /> : <CheckCircle2 />}
            <p className="font-semibold">{error || success}</p>
          </div>
        )}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search messages..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Unread</option>
            <option className="bg-slate-950">Read</option>
          </select>
        </div>
      </section>

      {filteredMessages.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <Mail className="mx-auto text-slate-500" size={52} />

          <h2 className="mt-4 text-2xl font-black">No messages found</h2>

          <p className="mt-2 text-slate-400">
            No messages match your current filters.
          </p>
        </div>
      ) : (
        <section className="grid gap-6">
          {filteredMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              markAsRead={markAsRead}
              deleteMessage={deleteMessage}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function MessageCard({ message, markAsRead, deleteMessage }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 transition hover:border-cyan-400/40">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <User size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-black">{message.subject}</h2>

            <p className="mt-1 text-sm text-cyan-300">
              {message.name} • {message.email}
            </p>

            <p className="mt-1 text-xs text-slate-500">{message.createdAt}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            message.status === "Unread"
              ? "bg-orange-400/20 text-orange-300"
              : "bg-emerald-400/20 text-emerald-300"
          }`}
        >
          {message.status}
        </span>
      </div>

      <p className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
        {message.message}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => markAsRead(message.id)}
          className="flex items-center gap-2 rounded-xl bg-cyan-400/10 px-4 py-3 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
        >
          <CheckCircle2 size={18} />
          Mark Read
        </button>

        <button
          onClick={() => deleteMessage(message.id)}
          className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <Mail className="text-cyan-300" size={24} />

      <h3 className="mt-3 text-2xl font-black">{value}</h3>

      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}