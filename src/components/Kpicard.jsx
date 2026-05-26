// components/Kpicard.jsx
function Kpicard({ value, label, color, bg }) {
  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${color}`,
        background: bg,
      }}
    >
      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
        {value}
      </h2>
      <p style={{ fontSize: "11px" }}>
        {label}
      </p>
    </div>
  );
}

export default Kpicard;