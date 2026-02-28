import { useState, useEffect } from "react";
import { fetchProperty, updateProperty } from "../api";

export function useProperty(id = 1) {
  const [property, setProperty] = useState(null);
  const [propForm, setPropForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProperty(id)
      .then(d => { setProperty(d); setPropForm(d); })
      .catch(() => {});
  }, [id]);

  const saveProperty = async () => {
    setSaving(true);
    try {
      await updateProperty(id, propForm);
      setProperty(propForm);
    } catch {}
    setSaving(false);
  };

  return { property, propForm, setPropForm, saving, saveProperty };
}
