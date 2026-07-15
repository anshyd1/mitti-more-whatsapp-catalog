# GitHub Upload Guide — Mitti & More

## Repository details

- **Repository name:** `mitti-more-whatsapp-catalog`
- **Description:** `Mobile-first product catalog with cart, wishlist and direct WhatsApp ordering.`
- **Visibility:** Public — portfolio के लिए recommended
- **Default branch:** `main`
- **Suggested topics:** `whatsapp-catalog`, `ecommerce`, `static-site`, `javascript`, `local-business`, `vercel`

---

## कौन-सी file इस्तेमाल करनी है?

Download and extract:

```text
mitti-more-whatsapp-catalog-upload.zip
```

ZIP extract करने के बाद उसके अंदर का पूरा content GitHub repository में upload करना है। `index.html` repository के root में दिखाई देना चाहिए। ZIP file को बिना extract किए repository में upload करने से website deploy नहीं होगी।

---

## GitHub website से upload करने के steps

### 1. New repository बनाइए

यह URL खोलें:

```text
https://github.com/new
```

Details:

```text
Owner: anshyd1
Repository name: mitti-more-whatsapp-catalog
Description: Mobile-first product catalog with cart, wishlist and direct WhatsApp ordering.
Visibility: Public
```

इन options को unchecked रखें, क्योंकि files पहले से तैयार हैं:

- Add a README file
- Add .gitignore
- Choose a license

फिर **Create repository** दबाएँ।

### 2. Files upload करें

नई empty repository में:

1. `uploading an existing file` पर click करें।
2. Extracted ZIP के अंदर की सभी files और folders drag-and-drop करें।
3. Confirm करें कि list में `index.html`, `css`, `js`, `assets` और `.github` मौजूद हैं।
4. Commit message लिखें:

```text
Launch Mitti & More WhatsApp catalog demo
```

5. **Commit changes** दबाएँ।

---

## GitHub Pages deployment

Repository में deployment workflow पहले से मौजूद है:

```text
.github/workflows/deploy-pages.yml
```

### Pages enable करना

1. Repository → **Settings**
2. Left menu → **Pages**
3. Source में **GitHub Actions** चुनें
4. Repository → **Actions** tab खोलें
5. `Deploy Mitti & More to GitHub Pages` workflow complete होने दें

Live URL सामान्यतः यह होगा:

```text
https://anshyd1.github.io/mitti-more-whatsapp-catalog/
```

अगर workflow अपने आप run न हो तो:

1. Actions tab खोलें
2. `Deploy Mitti & More to GitHub Pages` चुनें
3. `Run workflow` → `Run workflow`

---

## Vercel deployment — recommended client demo

GitHub upload के बाद:

1. `https://vercel.com/new` खोलें
2. GitHub repository import करें
3. Repository चुनें: `mitti-more-whatsapp-catalog`
4. Framework Preset: **Other**
5. Build Command: खाली
6. Output Directory: खाली
7. Deploy दबाएँ

हर GitHub commit के बाद Vercel website automatically update करेगा।

---

## Real WhatsApp number जोड़ना

Repository में यह file खोलें:

```text
js/store-config.js
```

यह line बदलें:

```js
whatsapp: "",
```

उदाहरण:

```js
whatsapp: "919876543210",
```

Rules:

- Country code जरूरी है
- `+`, spaces और dashes नहीं लगाने
- India के लिए number `91` से शुरू होगा

फिर commit message:

```text
Add business WhatsApp number
```

Number blank रहने पर website safe demo mode में message preview दिखाती है।

---

## Client मिलने पर मुख्य files

| काम | File |
|---|---|
| Business details और WhatsApp | `js/store-config.js` |
| Products और prices | `js/products.js` |
| Product images | `assets/images/products/` |
| Logo | `assets/brand/logo.svg` |
| Colours/design | `css/style.css` |
| Deployment workflow | `.github/workflows/deploy-pages.yml` |

---

## Upload के बाद checklist

- [ ] Homepage खुल रही है
- [ ] Product images दिखाई दे रही हैं
- [ ] Shop search और filters काम कर रहे हैं
- [ ] Add to cart काम करता है
- [ ] Wishlist refresh के बाद save रहती है
- [ ] Cart WhatsApp message बनाता है
- [ ] Mobile पर bottom navigation दिखाई देती है
- [ ] GitHub Actions deployment green है
- [ ] Vercel URL GitHub README में जोड़ा गया है
