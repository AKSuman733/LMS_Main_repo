import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Dashboard.css";
import "../../styles/Certificate.css";

const Certificate = () => {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [certData, setCertData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Great+Vibes&family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const fetchCertificateData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/enrollment/${enrollmentId}`);
                if (!res.data.completed) {
                    setError("This course has not been marked as completed yet. Complete all curriculum lessons to unlock your certificate!");
                } else {
                    setCertData(res.data);
                }
            } catch (err) {
                console.error("Error fetching certificate data", err);
                setError("Could not retrieve certificate information. Please verify your enrollment status.");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateData();

        return () => {
            document.head.removeChild(link);
        };
    }, [enrollmentId]);

    if (loading) {
        return (
            <div className="cert-loader-container">
                <div className="premium-page-loader skeleton-pulse">
                    <div className="spinner-ring"></div>
                    <p className="loader-text">Loading... Generating Certificate</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cert-error-container">
                <div className="cert-error-box">
                    <span className="cert-error-emoji">⚠️</span>
                    <h3 className="cert-error-title">Access Denied</h3>
                    <p className="cert-error-message">{error}</p>
                    <button 
                        onClick={() => navigate("/dashboard")} 
                        className="cert-error-btn"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const studentName = certData.user_fullname || "Uptoskills Student";
    const courseTitle = certData.course_title || "LMS Training Course";
    const instructorName = certData.selected_instructor_name || certData.default_instructor_name || "LMS Faculty";
    const issueDate = certData.enrolled_at ? new Date(certData.enrolled_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    const certCode = `UPTO-CE-${certData.id}-${certData.course_id}-${String(certData.user_id).padStart(3, '0')}`;

    return (
        <div className="cert-page-container">
            <div className="no-print cert-no-print-header">
                <button 
                    onClick={() => navigate("/dashboard")} 
                    className="cert-back-btn"
                >
                    ← Back to Dashboard
                </button>
                <div className="cert-header-title">
                    <h3>Your Certificate is Ready!</h3>
                    <p>You can download or print it</p>
                </div>
                <button 
                    onClick={() => window.print()} 
                    className="cert-print-btn"
                >
                    🖨️ Print / Download PDF
                </button>
            </div>

            <div className="certificate-sheet">
                <div className="cert-watermark"></div>
                <div className="cert-double-border"></div>
                <div className="cert-single-border"></div>

                <div className="cert-top-section">
                    <div className="cert-icon-container">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 3h12l4 6-10 13L2 9z"></path>
                            <path d="M11 3 8 9l4 13 4-13-3-6z"></path>
                            <path d="M2 9h20"></path>
                        </svg>
                    </div>

                    <h5 className="cert-org-title">
                        Uptoskills AI Learn
                    </h5>
                    
                    <div className="cert-divider-line"></div>

                    <h1 className="cert-main-title">
                        Certificate of Completion
                    </h1>
                </div>

                <div className="cert-body-section">
                    <p className="cert-presented-text">
                        This is proudly presented to
                    </p>

                    <h2 className="cert-student-name">
                        {studentName}
                    </h2>

                    <p className="cert-accomplishment-text">
                        for successfully fulfilling all curriculum requirements, specialized assessments, and advanced training hours required for the professional completion of
                    </p>

                    <h3 className="cert-course-title">
                        "{courseTitle}"
                    </h3>
                </div>

                <div className="cert-footer-section">
                    <div className="cert-signature-block">
                        <div className="cert-signature-img">
                            xyz person
                        </div>
                        <h6 className="cert-signature-title">
                            President & CEO
                        </h6>
                        <span className="cert-signature-org">Uptoskills AI Learn</span>
                    </div>

                    <div className="cert-seal-block">
                        <div className="cert-seal-outer">
                            <div className="cert-seal-gold"></div>
                            <div className="cert-seal-ribbon-left"></div>
                            <div className="cert-seal-ribbon-right"></div>

                            <div className="cert-seal-inner">
                                <span className="cert-seal-text-1">OFFICIAL</span>
                                <span className="cert-seal-emoji">👑</span>
                                <span className="cert-seal-text-2">SEAL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cert-bottom-info">
                    <span>Issued Date: <strong>{issueDate}</strong></span>
                    <span>Verification Hash: <strong className="cert-verification-hash">{certCode}</strong></span>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
