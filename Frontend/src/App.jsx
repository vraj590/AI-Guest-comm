import { useState, useEffect } from "react";
import Header from "./components/Header";
import ChatPanel from "./components/ChatPanel";
import PropertySetup from "./components/PropertySetup";
import HistoryPanel from "./components/HistoryPanel";
import { useProperty } from "./hooks/useProperty";
import { useChat } from "./hooks/useChat";
import { useHistory } from "./hooks/useHistory";
import "./styles/global.css";

const TABS = [
  { id: "chat",    label: "💬 Live Chat" },
  { id: "setup",   label: "🏠 Property" },
  { id: "history", label: "📊 History" },
];

export default function App() {
  const [tab, setTab] = useState("chat");

  const { property, propForm, setPropForm, saving, saveProperty } = useProperty(1);
  const { messages, input, setInput, loading, sendMessage, chatEndRef } = useChat(1);
  const { history, historyLoading, loadHistory, clearHistory } = useHistory(1);

  useEffect(() => {
    if (tab === "history") loadHistory();
  }, [tab]);

  return (
    <div style={{ background: "#050a14", minHeight: "100vh", position: "relative" }}>
      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.07) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.05) 0%, transparent 50%)
        `
      }} />

      <Header />

      {/* Nav tabs */}
      <nav style={{
        maxWidth: 900, margin: "0 auto", padding: "0 24px",
        display: "flex", gap: 4, borderBottom: "1px solid #0f172a",
        position: "relative", zIndex: 1,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 18px", background: "none", border: "none",
            color: tab === t.id ? "#06b6d4" : "#64748b",
            borderBottom: tab === t.id ? "2px solid #06b6d4" : "2px solid transparent",
            cursor: "pointer", fontSize: 13, fontFamily: "'Syne', sans-serif",
            fontWeight: 600, transition: "all 0.2s",
          }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, position: "relative", zIndex: 1 }}>
        {tab === "chat" && (
          <ChatPanel
            messages={messages} input={input} setInput={setInput}
            loading={loading} sendMessage={sendMessage} chatEndRef={chatEndRef}
          />
        )}
        {tab === "setup" && (
          <PropertySetup
            propForm={propForm} setPropForm={setPropForm}
            saving={saving} saveProperty={saveProperty}
          />
        )}
        {tab === "history" && (
          <HistoryPanel
            history={history} historyLoading={historyLoading}
            clearHistory={clearHistory}
          />
        )}
      </main>
    </div>
  );
}
