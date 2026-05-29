import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Eye,
  FileBadge,
  Mail,
  Printer,
  RefreshCcw,
  Search,
  ShieldCheck,
} from "lucide-react";

import { getCertificatesByStudentEmail } from "../../services/certificateApi";

export default function StudentCertificates() {
  const user = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const studentEmail = user.email || "charvraj2006@gmail.com";

  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCertificatesByStudentEmail(studentEmail);
      setCertificates(data || []);
    } catch (err) {
      setError(err.message || "Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const text = `${certificate.studentName} ${certificate.title} ${certificate.certificateNumber} ${certificate.certificateType}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [certificates, search]);

  const validCount = certificates.filter(
    (certificate) => certificate.status === "Valid"
  ).length;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-white shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">
              Dashboard / My Certificates
            </p>

            <h1 className="mt-2 text-4xl font-black">My Certificates</h1>

            <p className="mt-2 text-slate-400">
              Certificates are fetched automatically from backend using your
              login email.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <Mail size={16} className="text-cyan-300" />
              {studentEmail}
            </div>
          </div>

          <button
            onClick={fetchCertificates}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Certificates"
            value={certificates.length}
            icon={FileBadge}
          />

          <StatCard
            title="Valid Certificates"
            value={validCount}
            icon={ShieldCheck}
          />

          <StatCard title="Backend Sync" value="ON" icon={CheckCircle2} />
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
          <Search size={18} className="text-cyan-300" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search certificate..."
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            <AlertCircle />
            <p className="font-semibold">{error}</p>
          </div>
        )}
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

          <p className="mt-4 font-bold text-slate-300">
            Loading certificates...
          </p>
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white">
          <FileBadge className="mx-auto text-slate-500" size={56} />

          <h2 className="mt-4 text-2xl font-black">No certificates found</h2>

          <p className="mt-2 text-slate-400">
            Complete a course or attend an event to unlock certificates.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate._id}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 text-white transition hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
                    <Award size={34} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      certificate.status === "Valid"
                        ? "bg-emerald-400/20 text-emerald-100"
                        : "bg-red-400/20 text-red-100"
                    }`}
                  >
                    {certificate.status}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-black">
                  {certificate.title}
                </h2>

                <p className="mt-2 text-sm font-semibold text-white/80">
                  {certificate.certificateType} Certificate
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <Info label="Student" value={certificate.studentName} />

                  <Info
                    label="Certificate No."
                    value={certificate.certificateNumber}
                  />

                  <Info label="Issued Date" value={certificate.issuedDate} />

                  <Info label="Valid Till" value={certificate.validTill} />

                  <Info label="Score" value={certificate.score || "N/A"} />
                </div>

                <button
                  onClick={() => setSelectedCertificate(certificate)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  <Eye size={18} />
                  Preview / Save PDF
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          closeModal={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

function CertificatePreviewModal({ certificate, closeModal }) {
  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4 print:hidden">
          <div>
            <h2 className="text-2xl font-black text-white">
              Certificate Preview
            </h2>

            <p className="text-sm text-slate-400">
              Click Print / Save PDF. In print window choose Save as PDF.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={printCertificate}
              className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950"
            >
              <Printer size={18} />
              Print / Save PDF
            </button>

            <button
              onClick={closeModal}
              className="rounded-xl bg-red-500 px-5 py-3 font-black text-white"
            >
              Close
            </button>
          </div>
        </div>

        <CertificateTemplate certificate={certificate} />
      </div>
    </div>
  );
}

function CertificateTemplate({ certificate }) {
  return (
    <div className="certificate-print mx-auto flex min-h-[720px] max-w-5xl flex-col justify-between overflow-hidden rounded-[1.5rem] bg-white p-10 text-slate-950 shadow-2xl">
      <div className="rounded-[1.2rem] border-[8px] border-cyan-500 p-8">
        <div className="rounded-[1rem] border-2 border-slate-900 p-8 text-center">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-2xl font-black text-cyan-600">
                UptoSkills
              </h3>

              <p className="text-sm font-semibold text-slate-500">
                Learn • Build • Achieve
              </p>
            </div>

            <div className="rounded-full border-4 border-cyan-500 px-5 py-3 text-sm font-black text-cyan-600">
              VERIFIED
            </div>
          </div>

          <div className="mt-14">
            <p className="text-lg font-semibold uppercase tracking-[0.4em] text-slate-500">
              Certificate of Completion
            </p>

            <h1 className="mt-6 text-6xl font-black text-slate-950">
              {certificate.studentName}
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-700">
              This is to certify that the above learner has{" "}
              <b>successfully completed</b> the{" "}
              {certificate.certificateType?.toLowerCase()} titled
            </p>

            <h2 className="mt-5 text-4xl font-black text-cyan-600">
              {certificate.title}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600">
              {certificate.description ||
                "The learner has demonstrated dedication, consistency and successful completion of the required learning activities."}
            </p>

            {certificate.score && (
              <p className="mt-5 text-lg font-bold text-slate-800">
                Score / Grade: {certificate.score}
              </p>
            )}
          </div>

          <div className="mt-16 grid grid-cols-3 items-end gap-6">
            <div className="text-left">
              <div className="h-px bg-slate-900" />

              <p className="mt-2 text-sm font-bold">Issued Date</p>

              <p className="text-sm text-slate-600">
                {certificate.issuedDate}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full border-4 border-cyan-500 p-2">
                <Award className="mx-auto text-cyan-600" size={40} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Official Certificate
              </p>
            </div>

            <div className="text-right">
              <div className="h-px bg-slate-900" />

              <p className="mt-2 text-sm font-bold">Authorized Signatory</p>

              <p className="text-sm text-slate-600">Aarav Sharma</p>

              <p className="text-xs text-slate-500">Program Director</p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-slate-100 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Certificate Number
            </p>

            <p className="mt-1 text-lg font-black text-slate-950">
              {certificate.certificateNumber}
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Status: {certificate.status} • Valid Till: {certificate.validTill}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <Icon className="text-cyan-300" size={24} />

      <h3 className="mt-3 text-2xl font-black">{value}</h3>

      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 truncate font-bold text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
}