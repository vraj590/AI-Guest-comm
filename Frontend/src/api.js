import { API } from "./constants";

export const fetchProperty = async (id = 1) => {
  const r = await fetch(`${API}/property/${id}`);
  if (!r.ok) throw new Error("Failed to fetch property");
  return r.json();
};

export const updateProperty = async (id = 1, data) => {
  const r = await fetch(`${API}/property/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Failed to update property");
  return r.json();
};

export const sendGuestMessage = async (guest_message, property_id = 1) => {
  const r = await fetch(`${API}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guest_message, property_id }),
  });
  if (!r.ok) throw new Error("Failed to send message");
  return r.json();
};

export const fetchConversations = async (property_id = 1, limit = 50) => {
  const r = await fetch(`${API}/conversations/${property_id}?limit=${limit}`);
  if (!r.ok) throw new Error("Failed to fetch conversations");
  return r.json();
};

export const clearConversations = async (property_id = 1) => {
  const r = await fetch(`${API}/conversations/${property_id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to clear conversations");
  return r.json();
};
