export default function Badge({ label, color }) {
  return (
    <span style={{
      fontSize: 10,
      padding: "2px 8px",
      border: `1px solid ${color}`,
      borderRadius: 20,
      color,
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}
