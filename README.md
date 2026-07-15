# Mitti & More — WhatsApp Catalog Demo

A mobile-first static commerce catalog for handmade products. Visitors can browse, search, save favourites, build a cart and send a complete order on WhatsApp.

## Included

- Responsive home, shop and product pages
- 9 demo products with optimized WebP imagery
- Categories, live search and sorting
- Wishlist and cart saved in `localStorage`
- Customer details and generated WhatsApp order message
- Demo message preview when no WhatsApp number is configured
- About, contact and policy pages
- No framework or build command required

## Local preview

From this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Connect a real WhatsApp number

Open `js/store-config.js` and enter the number with country code, digits only:

```js
whatsapp: "919876543210"
```

When the value is blank, the site safely shows a message-preview modal instead of opening an unknown number.

## Replace store details

Edit `js/store-config.js`:

- Business name
- WhatsApp number
- Email
- Address and hours
- Shipping threshold
- Social links
- Announcement text

## Replace products

Products live in `js/products.js`. Keep each product `id` unique. Product images belong in:

```text
assets/images/products/
```

Recommended image format: WebP, square, 900 × 900 px.

## Main project structure

```text
mitti-and-more/
├── index.html
├── shop.html
├── product.html
├── wishlist.html
├── cart.html
├── about.html
├── contact.html
├── policies.html
├── css/style.css
├── js/store-config.js
├── js/products.js
├── js/app.js
└── assets/
```

## Deploy to Vercel

Import the repository in Vercel. No framework preset and no build command are needed; deploy the project root as a static site.

## Before a real client launch

1. Replace demo business details and policies.
2. Add the real WhatsApp number.
3. Replace generated demo images with the client's product photos.
4. Update testimonials with genuine reviews.
5. Add the final domain to metadata and create `sitemap.xml`.
6. Test every generated order message on mobile.

## Future admin upgrade

The static `products.js` source can later be replaced with Google Sheets or Supabase. The catalog/cart UI can remain the same while products are fetched from a non-coder admin source.
