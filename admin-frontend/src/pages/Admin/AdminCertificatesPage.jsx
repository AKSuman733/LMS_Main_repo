import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Edit3,
  Eye,
  FileBadge,
  Plus,
  Printer,
  RefreshCcw,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
  verifyCertificate,
} from "../../services/certificateApi";
import DataTable from "../../components/ui/DataTable";
import { ConfirmModal } from "../../components/ui/Modal";
import { showSuccess, showError } from "../../components/ui/Toasts";

const emptyForm = {
  certificateNumber: "",
  studentName: "",
  email: "",
  certificateType: "Course",
  title: "",
  issuedDate: "",
  validTill: "Lifetime",
  status: "Valid",
  score: "",
  description: "",
};

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [verifyNumber, setVerifyNumber] = useState("");
  const [verifiedCertificate, setVerifiedCertificate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmBulkAction, setConfirmBulkAction] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCertificates();
      setCertificates(data);
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
      const searchArea =
        `${certificate.certificateNumber} ${certificate.studentName} ${certificate.email} ${certificate.title} ${certificate.certificateType}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || certificate.certificateType === typeFilter;

      const matchesStatus =
        statusFilter === "All" || certificate.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [certificates, search, typeFilter, statusFilter]);

  const totalCertificates = certificates.length;
  const validCertificates = certificates.filter((item) => item.status === "Valid").length;
  const revokedCertificates = certificates.filter((item) => item.status === "Revoked").length;
  const courseCertificates = certificates.filter((item) => item.certificateType === "Course").length;

  const openAddModal = () => {
    const today = new Date().toLocaleDateString("en-IN");

    setEditingCertificate(null);
    setForm({
      ...emptyForm,
      issuedDate: today,
      certificateNumber: `UPTO-CERT-${Date.now()}`,
    });
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (certificate) => {
    setEditingCertificate(certificate);

    setForm({
      certificateNumber: certificate.certificateNumber || "",
      studentName: certificate.studentName || "",
      email: certificate.email || "",
      certificateType: certificate.certificateType || "Course",
      title: certificate.title || "",
      issuedDate: certificate.issuedDate || "",
      validTill: certificate.validTill || "Lifetime",
      status: certificate.status || "Valid",
      score: certificate.score || "",
      description: certificate.description || "",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openPreview = (certificate) => {
    setSelectedCertificate(certificate);
    setPreviewOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    if (!form.certificateNumber.trim()) return "Certificate number is required.";
    if (!form.studentName.trim()) return "Student name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.title.trim()) return "Certificate title is required.";
    if (!form.issuedDate.trim()) return "Issued date is required.";

    return "";
  };

  const saveCertificate = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingCertificate) {
        const updatedCertificate = await updateCertificate(
          editingCertificate._id,
          form
        );

        setCertificates((prev) =>
          prev.map((item) =>
            item._id === editingCertificate._id ? updatedCertificate : item
          )
        );

        setSuccess("Certificate updated successfully.");
      } else {
        const newCertificate = await createCertificate(form);
        setCertificates((prev) => [newCertificate, ...prev]);
        setSuccess("Certificate created successfully.");
      }

      setModalOpen(false);
      setEditingCertificate(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Failed to save certificate.");
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyCertificate = async () => {
    if (!verifyNumber.trim()) {
      setError("Enter certificate number to verify.");
      return;
    }

    try {
      setError("");
      setVerifiedCertificate(null);

      const data = await verifyCertificate(verifyNumber.trim());
      setVerifiedCertificate(data);
      setSuccess("Certificate verified successfully.");
    } catch (err) {
      setVerifiedCertificate(null);
      setError(err.message || "Certificate verification failed.");
    }
  };

  const handleDeleteCertificate = async (certificate) => {
    setConfirmTarget(certificate);
    setConfirmAction(() => async () => {
      try {
        setError("");
        await deleteCertificate(certificate._id);

        setCertificates((prev) => prev.filter((item) => item._id !== certificate._id));
        setSuccess("Certificate deleted successfully.");
        showSuccess("Certificate deleted successfully.");
      } catch (err) {
        const msg = err.message || "Failed to delete certificate.";
        setError(msg);
        showError(msg);
      } finally {
        setConfirmTarget(null);
        setConfirmAction(null);
      }
    });
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      for (const id of selectedIds) {
        await deleteCertificate(id);
      }
      setCertificates((prev) => prev.filter((c) => !selectedIds.includes(c._id)));
      showSuccess(`${selectedIds.length} certificates deleted`);
      setSelectedIds([]);
    } catch (err) {
      const msg = err.message || "Failed to delete selected certificates.";
      setError(msg);
      showError(msg);
    } finally {
      setConfirmBulkAction(null);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Certificates</p>
            <h1 className="mt-2 text-4xl font-black">Manage Certificates</h1>
            <p className="mt-2 text-slate-400">
              Create, verify, preview, print and manage course/event certificates.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchCertificates}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
            >
              <Plus size={20} />
              Add Certificate
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Certificates" value={totalCertificates} icon={FileBadge} />
          <StatCard title="Valid" value={validCertificates} icon={ShieldCheck} />
          <StatCard title="Revoked" value={revokedCertificates} icon={X} />
          <StatCard title="Course Certificates" value={courseCertificates} icon={Award} />
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

        <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by certificate number, student, email or title..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Course</option>
            <option className="bg-slate-950">Event</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Valid</option>
            <option className="bg-slate-950">Revoked</option>
          </select>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
        <h2 className="text-2xl font-black">Verify Certificate</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter certificate number to check validity.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_180px]">
          <input
            value={verifyNumber}
            onChange={(event) => setVerifyNumber(event.target.value)}
            placeholder="Example: UPTO-CERT-2026-001"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />

          <button
            onClick={handleVerifyCertificate}
            className="rounded-2xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Verify
          </button>
        </div>

        {verifiedCertificate && (
          <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
            <p className="font-black text-emerald-300">Certificate Found ✅</p>
            <p className="mt-2 text-sm text-slate-300">
              {verifiedCertificate.studentName} successfully completed{" "}
              <b>{verifiedCertificate.title}</b>.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Certificate No: {verifiedCertificate.certificateNumber}
            </p>
          </div>
        )}
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading certificates...</p>
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <FileBadge className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No certificates found</h2>
          <p className="mt-2 text-slate-400">
            Add certificate or change filters.
          </p>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { if (selectedIds.length) setConfirmBulkAction('delete'); }} disabled={!selectedIds.length} className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-40">Delete Selected</button>
            </div>
            <div className="text-sm text-gray-400">{selectedIds.length} selected</div>
          </div>

          <DataTable
            columns={[
              { key: 'certificate', label: 'Certificate', accessor: 'title', render: (r) => (<div><div className="font-black text-cyan-300">{r.title}</div><div className="text-xs text-gray-400">{r.certificateNumber}</div></div>) },
              { key: 'student', label: 'Student', accessor: 'studentName', render: (r)=>(<div><div className="font-bold">{r.studentName}</div><div className="text-xs text-gray-400">{r.email}</div></div>)},
              { key: 'type', label: 'Type', accessor: 'certificateType' },
              { key: 'issued', label: 'Issued', accessor: 'issuedDate', render: (r)=>(<div><div className="text-sm text-gray-300">{r.issuedDate}</div><div className="text-xs text-gray-500">Valid: {r.validTill}</div></div>)},
              { key: 'status', label: 'Status', accessor: 'status' },
            ]}
            data={filteredCertificates}
            rowKey="_id"
            onView={(r)=> openPreview(r)}
            onEdit={(r)=> openEditModal(r)}
            onDelete={(r)=> handleDeleteCertificate(r)}
            onSelectionChange={(ids)=> setSelectedIds(ids)}
          />
        </div>
      )}

      {modalOpen && (
        <CertificateFormModal
          form={form}
          updateFormValue={updateFormValue}
          saveCertificate={saveCertificate}
          saving={saving}
          editingCertificate={editingCertificate}
          closeModal={() => setModalOpen(false)}
          error={error}
        />
      )}

      {confirmTarget && (
        <ConfirmModal
          open={!!confirmTarget}
          title="Delete Certificate"
          message={`Are you sure you want to delete certificate "${confirmTarget.certificateNumber}"?`}
          onConfirm={() => confirmAction && confirmAction()}
          onCancel={() => { setConfirmTarget(null); setConfirmAction(null); }}
        />
      )}

      {confirmBulkAction && (
        <ConfirmModal
          open={!!confirmBulkAction}
          title="Delete Selected"
          message={`Are you sure you want to delete ${selectedIds.length} selected certificates?`}
          onConfirm={handleBulkDelete}
          onCancel={() => setConfirmBulkAction(null)}
        />
      )}

      {previewOpen && selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          closeModal={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}

function CertificateFormModal({
  form,
  updateFormValue,
  saveCertificate,
  saving,
  editingCertificate,
  closeModal,
  error,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveCertificate}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingCertificate ? "Edit Certificate" : "Create Certificate"}
            </h2>
            <p className="mt-2 text-slate-400">
              Certificate number will be displayed at the bottom of the certificate.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-red-500 p-3 text-white"
          >
            <X />
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <Input
            label="Certificate Number"
            value={form.certificateNumber}
            onChange={(v) => updateFormValue("certificateNumber", v)}
            placeholder="UPTO-CERT-2026-001"
          />

          <Input
            label="Student Name"
            value={form.studentName}
            onChange={(v) => updateFormValue("studentName", v)}
            placeholder="Charv Raj"
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => updateFormValue("email", v)}
            placeholder="student@example.com"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Certificate Type
            </span>

            <select
              value={form.certificateType}
              onChange={(event) =>
                updateFormValue("certificateType", event.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Course</option>
              <option className="bg-slate-950">Event</option>
            </select>
          </label>

          <Input
            label="Title / Course / Event Name"
            value={form.title}
            onChange={(v) => updateFormValue("title", v)}
            placeholder="Intro to JavaScript"
          />

          <Input
            label="Issued Date"
            value={form.issuedDate}
            onChange={(v) => updateFormValue("issuedDate", v)}
            placeholder="28 May 2026"
          />

          <Input
            label="Valid Till"
            value={form.validTill}
            onChange={(v) => updateFormValue("validTill", v)}
            placeholder="Lifetime"
          />

          <Input
            label="Score / Grade"
            value={form.score}
            onChange={(v) => updateFormValue("score", v)}
            placeholder="A+ / 95%"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>

            <select
              value={form.status}
              onChange={(event) => updateFormValue("status", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Valid</option>
              <option className="bg-slate-950">Revoked</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-300">Description</span>

          <textarea
            value={form.description}
            onChange={(event) => updateFormValue("description", event.target.value)}
            rows={4}
            placeholder="Certificate description..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl border border-white/10 px-6 py-3 font-bold text-slate-300"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingCertificate
              ? "Update Certificate"
              : "Save Certificate"}
          </button>
        </div>
      </form>
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
            <h2 className="text-2xl font-black text-white">Certificate Preview</h2>
            <p className="text-sm text-slate-400">
              Use Print button and save as PDF.
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
              <h3 className="text-2xl font-black text-cyan-600">UptoSkills</h3>
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
              {certificate.certificateType.toLowerCase()} titled
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
              <p className="text-sm text-slate-600">{certificate.issuedDate}</p>
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

function Input({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-300">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
      />
    </label>
  );
}