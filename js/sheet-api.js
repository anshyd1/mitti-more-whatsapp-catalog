(() => {
  "use strict";

  const STORE = window.STORE_CONFIG || {};
  const API_BASE = (STORE.apiBase || "").trim();
  const QUEUE_KEY = "mitti-more-lead-queue-v1";
  const AD_KEY = "mitti-more-active-ad-v1";

  function safeJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function hasApi() {
    return Boolean(API_BASE);
  }

  async function getJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  }

  async function saveLead(payload) {
    const lead = {
      action: "saveLead",
      source: payload.source || "Website",
      name: payload.name || "",
      phone: payload.phone || "",
      product_need: payload.product_need || "",
      amount: payload.amount || "",
      status: payload.status || "New",
      follow_up: payload.follow_up || "",
      notes: payload.notes || "",
      page: payload.page || location.pathname,
      created_at: new Date().toISOString()
    };

    if (!hasApi()) {
      const queue = safeJSON(QUEUE_KEY, []);
      queue.push(lead);
      setJSON(QUEUE_KEY, queue);
      return { ok: true, queued: true, message: "Lead queued locally until API is connected." };
    }

    return getJSON(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(lead)
    });
  }

  async function syncQueuedLeads() {
    if (!hasApi()) return { ok: false, skipped: true };
    const queue = safeJSON(QUEUE_KEY, []);
    if (!queue.length) return { ok: true, synced: 0 };

    let synced = 0;
    const pending = [];

    for (const lead of queue) {
      try {
        await getJSON(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(lead)
        });
        synced += 1;
      } catch {
        pending.push(lead);
      }
    }

    setJSON(QUEUE_KEY, pending);
    return { ok: true, synced, pending: pending.length };
  }

  async function fetchAds() {
    if (!hasApi()) {
      const localAd = safeJSON(AD_KEY, STORE.defaultAd || null);
      return localAd ? [localAd] : [];
    }

    return getJSON(`${API_BASE}?action=ads`);
  }

  function getLocalAd() {
    return safeJSON(AD_KEY, STORE.defaultAd || null);
  }

  function saveLocalAd(ad) {
    setJSON(AD_KEY, ad);
    return ad;
  }

  async function updateAd(ad) {
    saveLocalAd(ad);
    if (!hasApi()) return { ok: true, localOnly: true, message: "Saved locally. Connect API to push live." };

    return getJSON(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "updateAd", ...ad })
    });
  }

  window.MITTI_API = {
    hasApi,
    saveLead,
    syncQueuedLeads,
    fetchAds,
    getLocalAd,
    saveLocalAd,
    updateAd,
    queueKey: QUEUE_KEY,
    adKey: AD_KEY
  };
})();
