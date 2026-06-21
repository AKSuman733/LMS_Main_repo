// components/Kpicard.jsx

function Kpicard({ value, label, color, bg }) {
  return (
    <div
      className="card kpi-card"
      style={{
        "--kpi-border": color,
        "--kpi-bg": bg,
      }}
    >
      <h2 className="kpi-value">{value}</h2>
      <p className="kpi-label">{label}</p>
    </div>
  );
}

export default Kpicard;