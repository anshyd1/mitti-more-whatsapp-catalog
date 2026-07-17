# Mitti More — Sheet CRM + Ad Editor Setup

## Kya add kiya gaya

### 1) Lead capture scaffold
- `js/sheet-api.js`
- cart aur contact form submissions ab lead payload banate hain
- API na hone par leads local queue me save hoti hain

### 2) Self-edit ad page
- `ad-editor.html`
- `js/ad-editor.js`
- local preview + local save + future API push support

### 3) Safer storefront logic
- stock cap
- stale cart cleanup
- invalid product fallback
- schema address uses `STORE.address`

---

## Abhi kya kaam karega bina kisi extra cheez ke
- Storefront normal chalega
- Cart / contact form WhatsApp pe send hoga
- Lead data local browser queue me save hogi
- Ad editor local preview/save karega

---

## Real Sheet CRM connect karne ke liye baad me kya chahiye hoga

### Option A — easiest
1. Google Sheet banao with tabs:
   - `Leads_Orders`
   - `Products`
   - `Ads`
   - `Settings`
2. Apps Script deploy karo
3. Web app URL ko `js/store-config.js` me `apiBase` me daalo

### Example
```js
apiBase: "https://script.google.com/macros/s/XXXX/exec"
```

---

## Required `Leads_Orders` columns
| Date | Name | Phone | Source | Product_Need | Amount | Status | Follow_Up | Notes | WA_Link |
|---|---|---|---|---|---|---|---|---|---|

---

## Required `Ads` columns
| ad_id | active | headline | subheadline | offer_price | compare_price | cta_text | image_url | wa_number | wa_prefill | badge | theme |
|---|---|---|---|---|---|---|---|---|---|---|---|

---

## Required `Settings` columns
| key | value |
|---|---|
| default_wa_number | 919918996096 |

---

## Important note
Agar API URL blank hai, system break nahi karega.  
Bas live sheet save ki jagah local queue mode me chalega.
