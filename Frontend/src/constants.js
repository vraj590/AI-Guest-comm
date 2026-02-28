export const API = "http://127.0.0.1:8000";

export const DEMO_MESSAGES = [
  "What's the WiFi password?",
  "We'd like to check in early around 1pm, is that possible?",
  "The AC isn't working and it's really hot in here 😤",
  "What time do we need to check out by?",
  "Is there parking available nearby?",
  "The toilet is making a strange noise and might be broken",
];

export const SENTIMENT_CONFIG = {
  happy:      { color: "#22c55e", label: "😊 Happy" },
  neutral:    { color: "#94a3b8", label: "😐 Neutral" },
  frustrated: { color: "#f97316", label: "😤 Frustrated" },
  urgent:     { color: "#ef4444", label: "🚨 Urgent" },
};

export const SEVERITY_CONFIG = {
  none:   { color: "#64748b", label: "No Issue" },
  low:    { color: "#3b82f6", label: "Low" },
  medium: { color: "#eab308", label: "Medium" },
  high:   { color: "#ef4444", label: "High" },
};

export const CATEGORY_ICONS = {
  checkin: "🔑", checkout: "🧳", amenities: "🛋️",
  complaint: "⚠️", pricing: "💰", other: "💬",
};
