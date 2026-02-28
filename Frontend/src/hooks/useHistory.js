import { useState } from "react";
import { fetchConversations, clearConversations } from "../api";

export function useHistory(propertyId = 1) {
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      setHistory(await fetchConversations(propertyId));
    } catch {}
    setHistoryLoading(false);
  };

  const clearHistory = async () => {
    await clearConversations(propertyId);
    setHistory([]);
  };

  return { history, historyLoading, loadHistory, clearHistory };
}
