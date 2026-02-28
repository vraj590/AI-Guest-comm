import { useState, useRef, useEffect } from "react";
import { sendGuestMessage } from "../api";

export function useChat(propertyId = 1) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { role: "guest", text: msg, ts: new Date() }]);
    setLoading(true);
    try {
      const ai = await sendGuestMessage(msg, propertyId);
      setMessages(prev => [...prev, { role: "ai", ...ai, ts: new Date() }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "ai",
        draft_reply: "⚠️ Could not reach backend. Is the server running on port 8000?",
        sentiment: "neutral",
        is_issue: false,
        severity: "none",
        ts: new Date()
      }]);
    }
    setLoading(false);
  };

  return { messages, input, setInput, loading, sendMessage, chatEndRef };
}
