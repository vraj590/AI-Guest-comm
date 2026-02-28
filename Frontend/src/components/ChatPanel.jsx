import Badge from "./Badge";
import { DEMO_MESSAGES, SENTIMENT_CONFIG, SEVERITY_CONFIG, CATEGORY_ICONS } from "../constants";
import s from "../styles/chat.module.css";

export default function ChatPanel({ messages, input, setInput, loading, sendMessage, chatEndRef }) {
  return (
    <div className={s.layout}>
      {/* Chat window */}
      <div className={s.window}>
        {messages.length === 0 && (
          <div className={s.empty}>
            <div className={s.emptyIcon}>💬</div>
            <div className={s.emptyTitle}>No messages yet</div>
            <div className={s.emptyDesc}>Try a demo message below</div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "guest" ? s.guestWrap : s.aiWrap}>
            {m.role === "guest" ? (
              <div className={s.guestBubble}>
                <div className={s.label}>👤 Guest</div>
                <div className={s.text}>{m.text}</div>
                <div className={s.time}>{m.ts.toLocaleTimeString()}</div>
              </div>
            ) : (
              <div className={s.aiBubble}>
                <div className={s.aiHeader}>
                  <span className={s.label}>🤖 AI Draft</span>
                  <div className={s.badges}>
                    {m.sentiment && <Badge label={SENTIMENT_CONFIG[m.sentiment]?.label} color={SENTIMENT_CONFIG[m.sentiment]?.color} />}
                    {m.category && <Badge label={`${CATEGORY_ICONS[m.category]} ${m.category}`} color="#475569" />}
                  </div>
                </div>
                <div className={s.text}>{m.draft_reply}</div>
                {m.is_issue && m.staff_action && (
                  <div className={s.staffAction} style={{ borderLeftColor: SEVERITY_CONFIG[m.severity]?.color }}>
                    <span style={{ color: SEVERITY_CONFIG[m.severity]?.color, fontWeight: 700, fontSize: 11 }}>
                      ⚡ STAFF ACTION [{SEVERITY_CONFIG[m.severity]?.label?.toUpperCase()}]
                    </span>
                    <div className={s.staffText}>{m.staff_action}</div>
                  </div>
                )}
                <div className={s.time}>{m.ts.toLocaleTimeString()}</div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={s.aiWrap}>
            <div className={s.aiBubble}>
              <div className={s.label}>🤖 AI is drafting...</div>
              <div className={s.dots}>
                <span className={s.d1} /><span className={s.d2} /><span className={s.d3} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Demo messages */}
      <div className={s.demoPanel}>
        <div className={s.demoTitle}>Quick Demo Messages</div>
        <div className={s.demoGrid}>
          {DEMO_MESSAGES.map((msg, i) => (
            <button key={i} className={s.demoBtn} onClick={() => sendMessage(msg)}>{msg}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className={s.inputRow}>
        <input
          className={s.input}
          placeholder="Type a guest message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button className={s.sendBtn} onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          Send ➤
        </button>
      </div>
    </div>
  );
}
