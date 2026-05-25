import templateImg from "../../assets/template.png";

function Mycertificates() {
  return (
    <div className="cert-page">

      <h1>My Certificates</h1>

      <div className="cert-card">
        <img src={templateImg} alt="Certificate" />
        <p>Sample Certificate</p>
      </div>

    </div>
  );
}

export default Mycertificates;