import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import templateImg from "../../assets/template.png";
import "./Mycertificates.css";

function Mycertificates() {
  const certRefs = useRef({});

  const certificates = [
    { id: 1, title: "Python Programming", image: templateImg, status: "Verified" },
    { id: 2, title: "Web Development", image: templateImg, status: "Verified" },
    { id: 3, title: "MERN Stack", image: templateImg, status: "Verified" },
  ];

  const downloadPDF = async (id, title) => {
    const element = certRefs.current[id];

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`${title}-certificate.pdf`);
  };

  return (
    <div className="cert-page">
      <div className="cert-hero">
        <div>
          <h1>My Certificates 🎓</h1>
          <p>Your verified achievements, ready to download anytime</p>
        </div>
      </div>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div className="cert-card" key={cert.id}>

            {/* CERTIFICATE AREA (this becomes PDF) */}
            <div
              className="cert-image"
              ref={(el) => (certRefs.current[cert.id] = el)}
            >
              <img src={cert.image} alt={cert.title} />

              <span className="badge verified">
                {cert.status}
              </span>
            </div>

            {/* ACTION */}
            <div className="cert-content">
              <h3>{cert.title}</h3>
              <p>Issued by AI Learning Platform</p>

              <button
                className="download-btn"
                onClick={() => downloadPDF(cert.id, cert.title)}
              >
                ⬇ Download Certificate
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Mycertificates;