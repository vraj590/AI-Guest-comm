import Badge from "./Badge";
import { SENTIMENT_CONFIG, SEVERITY_CONFIG, CATEGORY_ICONS } from "../constants";
import s from "../styles/history.module.css";

export default function HistoryPanel({ history, historyLoading, clearHistory }) {
  return (
    <div className={s.layout}>
      <div className={s.topBar}>
        <div>
          <div className={s.title}>Conversation History</div>
          <div className={s.desc}>{history.length} conversations stored</div>
        </div>
        {history.length > 0 && (
          <button className={s.clearBtn} onClick={clearHistory}>🗑 Clear All</button>
        )}
      </div>

      {historyLoading && (
        <div className={s.empty}><div className={s.emptyIcon}>⏳</div><div>Loading...</div></div>
      )}

      {!historyLoading && history.length === 0 && (
        <div className={s.empty}>
          <div className={s.emptyIcon}>📭</div>
          <div className={s.emptyTitle}>No history yet</div>
          <div className={s.emptyDesc}>Send some messages in Live Chat first</div>
        </div>
      )}

      <div className={s.list}>
        {history.map((h, i) => (
          <div key={i} className={s.card}>
            <div className={s.cardTop}>
              <span className={s.category}>{CATEGORY_ICONS[h.category]} {h.category}</span>
              <div className={s.badges}>
                {h.sentiment && <Badge label={SENTIMENT_CONFIG[h.sentiment]?.label} color={SENTIMENT_CONFIG[h.sentiment]?.color} />}
                {h.is_issue === 1 && <Badge label={`⚡ ${SEVERITY_CONFIG[h.severity]?.label}`} color={SEVERITY_CONFIG[h.severity]?.color} />}
              </div>
              <span className={s.time}>{new Date(h.created_at).toLocaleString()}</span>
            </div>
            <div className={s.guest}>👤 {h.guest_message}</div>
            <div className={s.reply}>🤖 {h.draft_reply}</div>
            {h.staff_action && <div className={s.staff}>⚡ {h.staff_action}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
