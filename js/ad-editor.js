(() => {
  "use strict";

  const STORE = window.STORE_CONFIG || {};
  const API = window.MITTI_API || null;

  const ids = {
    ad_id: "ad-id",
    badge: "badge",
    headline: "headline",
    subheadline: "subheadline",
    offer_price: "offer-price",
    compare_price: "compare-price",
    cta_text: "cta-text",
    image_url: "image-url",
    wa_number: "wa-number",
    wa_prefill: "wa-prefill",
    active: "active",
    theme: "theme"
  };

  const fallback = STORE.defaultAd || {
    ad_id: "AD001",
    active: "Yes",
    badge: "Limited Slots",
    headline: "WhatsApp pe Catalog + Order",
    subheadline: "Google Sheet pe track. Chhoti dukaan ke liye simple setup.",
    offer_price: "1999",
    compare_price: "3999",
    cta_text: "Message Karein",
    image_url: "assets/images/hero/hero-home.jpg",
    wa_number: STORE.whatsapp || "",
    wa_prefill: "Namaste, demo bhejiye",
    theme: "#166534"
  };

  function getEl(id) { return document.getElementById(id); }
  function setStatus(text) { getEl("editor-status").textContent = text; }

  function readForm() {
    const out = {};
    Object.entries(ids).forEach(([key, id]) => out[key] = getEl(id).value.trim());
    return out;
  }

  function fillForm(ad) {
    Object.entries(ids).forEach(([key, id]) => {
      getEl(id).value = ad[key] ?? "";
    });
  }

  function render(ad) {
    getEl("p-badge").textContent = ad.badge || "Offer";
    getEl("p-headline").textContent = ad.headline || "Headline";
    getEl("p-subheadline").textContent = ad.subheadline || "Subheadline";
    getEl("p-offer").textContent = ad.offer_price ? `₹${ad.offer_price}` : "";
    getEl("p-compare").textContent = ad.compare_price ? `₹${ad.compare_price}` : "";
    getEl("p-cta").textContent = ad.cta_text || "Message";
    getEl("p-cta").style.background = ad.theme || "#166534";
    getEl("p-badge").style.background = (ad.theme || "#166534") + "22";
    getEl("p-badge").style.color = ad.theme || "#166534";
    getEl("p-image").style.backgroundImage = `url(${ad.image_url || fallback.image_url})`;
    getEl("p-cta").href = `https://wa.me/${(ad.wa_number || "").replace(/\D/g, "")}?text=${encodeURIComponent(ad.wa_prefill || "Namaste")}`;
    getEl("mode-text").textContent = API?.hasApi?.() ? "Mode: API connected" : "Mode: Local preview";
    const queue = JSON.parse(localStorage.getItem(API?.queueKey || "mitti-more-lead-queue-v1") || "[]");
    getEl("queue-text").textContent = `Lead queue: ${queue.length}`;
  }

  async function init() {
    const saved = API?.getLocalAd?.() || fallback;
    fillForm(saved);
    render(saved);

    getEl("preview-btn").addEventListener("click", () => {
      const ad = readForm();
      render(ad);
      setStatus("Preview updated.");
    });

    getEl("save-local-btn").addEventListener("click", () => {
      const ad = readForm();
      API?.saveLocalAd?.(ad);
      render(ad);
      setStatus("Saved locally in this browser.");
    });

    getEl("push-live-btn").addEventListener("click", async () => {
      const ad = readForm();
      render(ad);
      if (!API?.updateAd) {
        setStatus("API helper missing. Local save only.");
        return;
      }
      const result = await API.updateAd(ad);
      if (result?.ok && result?.localOnly) setStatus("Saved locally. API URL add karoge to live push hoga.");
      else if (result?.ok) setStatus("Ad saved and pushed successfully.");
      else setStatus("Save failed. Local copy browser me reh gayi hai.");
    });

    getEl("copy-json-btn").addEventListener("click", async () => {
      const ad = readForm();
      await navigator.clipboard.writeText(JSON.stringify(ad, null, 2));
      setStatus("Ad JSON copied.");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
