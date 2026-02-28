import s from "../styles/setup.module.css";

const FIELDS = [
  { label: "Property Name", key: "name" },
  { label: "Check-in Time", key: "checkin_time" },
  { label: "Check-out Time", key: "checkout_time" },
  { label: "WiFi Network", key: "wifi_name" },
  { label: "WiFi Password", key: "wifi_password" },
  { label: "Address", key: "address" },
  { label: "Max Guests", key: "max_guests", type: "number" },
];

export default function PropertySetup({ propForm, setPropForm, saving, saveProperty }) {
  if (!propForm) return <div className={s.loading}>Loading property...</div>;

  return (
    <div className={s.card}>
      <div className={s.title}>Property Configuration</div>
      <div className={s.desc}>This context powers every AI response.</div>
      <div className={s.grid}>
        {FIELDS.map(f => (
          <div key={f.key} className={s.field}>
            <label className={s.label}>{f.label}</label>
            <input
              type={f.type || "text"}
              className={s.input}
              value={propForm[f.key] || ""}
              onChange={e => setPropForm(p => ({ ...p, [f.key]: e.target.value }))}
            />
          </div>
        ))}
        <div className={`${s.field} ${s.fullWidth}`}>
          <label className={s.label}>House Rules</label>
          <textarea
            className={s.textarea}
            value={propForm.rules || ""}
            onChange={e => setPropForm(p => ({ ...p, rules: e.target.value }))}
          />
        </div>
      </div>
      <button className={s.saveBtn} onClick={saveProperty} disabled={saving}>
        {saving ? "Saving..." : "💾 Save Property"}
      </button>
    </div>
  );
}
