(() => {
  "use strict";

  const STORE = window.STORE_CONFIG;
  const PRODUCTS = window.PRODUCTS || [];
  const CART_KEY = "mitti-more-cart-v1";
  const WISHLIST_KEY = "mitti-more-wishlist-v1";
  const CUSTOMER_KEY = "mitti-more-customer-v1";
  const page = document.body.dataset.page || "home";
  const root = document.getElementById("page-root");

  const icons = {
    search: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7.5"/><path d="m16.5 16.5 4 4"/></svg>',
    cart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L21 7H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>',
    heart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.4 5.4 0 0 0-7.7 0L12 5.9l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7l1.1 1.1L12 21l7.7-7.4 1.1-1.1a5.4 5.4 0 0 0 0-7.7Z"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    home: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>',
    grid: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    store: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v10h16V10"/><path d="M3 4h18l-2 6a3 3 0 0 1-5 1 3 3 0 0 1-4 0 3 3 0 0 1-5-1L3 4Z"/><path d="M9 20v-5h6v5"/></svg>',
    whatsapp: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.2 7.5c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.8 2c.1.2 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.7 1.2 1.7 2.1 3 2.7.2.1.4.1.6-.1l.9-1.1c.2-.2.4-.2.7-.1l2 .9c.2.1.4.3.4.5-.1.8-.4 1.5-1 2-.6.5-1.4.8-2.2.7-1.2-.2-2.4-.7-3.5-1.3-1.6-1-3-2.3-4-3.9-.6-1-.9-2.1-.8-3.2 0-.5.2-.9.4-1.2Z"/></svg>',
    leaf: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C11 4 5 8 5 15c0 2.8 2.2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c2-6 6-10 12-13"/></svg>',
    truck: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
    package: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/></svg>',
    arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"/></svg>',
    trash: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
    copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    map: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    clock: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    mail: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  function formatPrice(value) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: STORE.currency, maximumFractionDigits: 0 }).format(value);
  }

  function productSrcset(image) {
    return `${image.replace(/\.webp$/, "-640.webp")} 640w, ${image} 900w`;
  }

  function safeJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }

  function getCart() { return safeJSON(CART_KEY, []); }
  function setCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateShellCounts(); }
  function getWishlist() { return safeJSON(WISHLIST_KEY, []); }
  function setWishlist(ids) { localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids)); updateShellCounts(); }
  function getProduct(id) { return PRODUCTS.find(product => product.id === id); }
  function cartCount() { return getCart().reduce((sum, item) => sum + item.qty, 0); }
  function cartSubtotal() { return getCart().reduce((sum, item) => sum + ((getProduct(item.id)?.price || 0) * item.qty), 0); }

  function shell() {
    const active = key => page === key ? "active" : "";
    document.body.insertAdjacentHTML("afterbegin", `
      <aside class="announcement" aria-label="Store announcement">${STORE.announcement}</aside>
      <header class="site-header" id="site-header">
        <div class="container header-inner">
          <a class="brand-logo" href="index.html" aria-label="${STORE.name} home"><img src="assets/brand/logo.svg" alt="${STORE.name}" width="260" height="64"></a>
          <nav class="desktop-nav" aria-label="Main navigation">
            <a class="${active("home")}" href="index.html">Home</a>
            <a class="${active("shop") || active("product")}" href="shop.html">Shop</a>
            <a class="${active("about")}" href="about.html">Our Story</a>
            <a class="${active("contact")}" href="contact.html">Contact</a>
          </nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" data-open-search aria-label="Search products">${icons.search}</button>
            <a class="icon-btn header-wishlist" href="wishlist.html" aria-label="Wishlist">${icons.heart}<span class="badge-count wishlist-count">0</span></a>
            <a class="icon-btn" href="cart.html" aria-label="Shopping cart">${icons.cart}<span class="badge-count cart-count">0</span></a>
            <button class="icon-btn menu-toggle" type="button" data-open-menu aria-label="Open menu">${icons.menu}</button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <div class="mobile-menu-panel">
          <div class="menu-head"><img src="assets/brand/logo.svg" alt="${STORE.name}"><button class="icon-btn" data-close-menu aria-label="Close menu">${icons.close}</button></div>
          <nav class="mobile-nav"><a href="index.html">Home</a><a href="shop.html">Shop all</a><a href="wishlist.html">Wishlist</a><a href="about.html">Our story</a><a href="contact.html">Contact</a></nav>
          <div class="mobile-menu-foot"><strong>Need help choosing?</strong><br>Chat with us for product details and delivery support.</div>
        </div>
      </div>
      <div class="search-overlay" id="search-overlay" aria-hidden="true">
        <div class="search-panel" role="dialog" aria-modal="true" aria-label="Product search">
          <div class="search-head">${icons.search}<input id="global-search" type="search" placeholder="Search pottery, baskets, textiles…" autocomplete="off"><button class="icon-btn" data-close-search aria-label="Close search">${icons.close}</button></div>
          <div class="search-results" id="global-search-results"></div>
        </div>
      </div>
    `);

    document.body.insertAdjacentHTML("beforeend", `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand"><img src="assets/brand/logo.svg" alt="${STORE.name}"><p>${STORE.description} Each piece is selected to add warmth, texture and meaning to everyday spaces.</p><div class="footer-social"><a class="icon-btn" href="${STORE.instagram}" aria-label="Instagram">IG</a><a class="icon-btn" href="${STORE.facebook}" aria-label="Facebook">f</a></div></div>
            <div class="footer-col"><h3>Shop</h3><div class="footer-links"><a href="shop.html">All products</a><a href="shop.html?category=Pottery">Pottery</a><a href="shop.html?category=Baskets">Baskets</a><a href="shop.html?category=Textiles">Textiles</a><a href="shop.html?filter=new">New arrivals</a></div></div>
            <div class="footer-col"><h3>About</h3><div class="footer-links"><a href="about.html">Our story</a><a href="contact.html">Contact us</a><a href="policies.html#shipping">Shipping</a><a href="policies.html#returns">Returns</a></div></div>
            <div class="footer-col"><h3>Visit</h3><div class="footer-links"><a href="${STORE.mapsUrl}">${STORE.address}</a><a href="contact.html">${STORE.hours}</a><a href="mailto:${STORE.email}">${STORE.email}</a><button class="btn btn-whatsapp btn-sm" data-general-wa>${icons.whatsapp} WhatsApp us</button></div></div>
          </div>
          <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</span><span>Handmade with care · Demo storefront</span></div>
        </div>
      </footer>
      <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
        <a class="${active("home")}" href="index.html">${icons.home}<span>Home</span></a>
        <a class="${active("shop") || active("product")}" href="shop.html">${icons.grid}<span>Shop</span></a>
        <a class="${active("wishlist")}" href="wishlist.html">${icons.heart}<span>Wishlist</span><span class="badge-count wishlist-count">0</span></a>
        <a class="${active("cart")}" href="cart.html">${icons.cart}<span>Cart</span><span class="badge-count cart-count">0</span></a>
      </nav>
      <aside class="whatsapp-float" aria-label="WhatsApp support"><span>Chat with us</span><button type="button" data-general-wa aria-label="Chat on WhatsApp">${icons.whatsapp}</button></aside>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      <div class="modal" id="message-modal" aria-hidden="true">
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="WhatsApp message preview">
          <div class="modal-head"><div><p class="eyebrow">Demo mode</p><h2>Order message is ready</h2></div><button class="icon-btn" data-close-modal aria-label="Close preview">${icons.close}</button></div>
          <p class="muted">Client का WhatsApp number जोड़ने तक message preview और copy किया जा सकता है।</p>
          <pre class="message-preview" id="message-preview"></pre>
          <div class="modal-actions"><button class="btn btn-dark" id="copy-message">${icons.copy} Copy message</button><button class="btn btn-soft" data-close-modal>Close</button></div>
        </div>
      </div>
    `);
    updateShellCounts();
  }

  function updateShellCounts() {
    const c = cartCount();
    const w = getWishlist().length;
    document.querySelectorAll(".cart-count").forEach(el => { el.textContent = c; el.hidden = c === 0; });
    document.querySelectorAll(".wishlist-count").forEach(el => { el.textContent = w; el.hidden = w === 0; });
  }

  function productCard(product) {
    const wished = getWishlist().includes(product.id);
    return `
      <article class="product-card" data-product-card="${product.id}">
        <div class="product-media">
          <a href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}"><img src="${product.image}" srcset="${productSrcset(product.image)}" sizes="(max-width: 767px) 46vw, (max-width: 1023px) 31vw, 280px" alt="${product.name}" loading="lazy" decoding="async" width="900" height="900"></a>
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <button class="icon-btn wishlist-btn ${wished ? "active" : ""}" type="button" data-wishlist="${product.id}" aria-label="${wished ? "Remove from" : "Add to"} wishlist">${icons.heart}</button>
        </div>
        <div class="product-body">
          <p class="product-category">${product.category}</p>
          <h3 class="product-title"><a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
          <div class="product-price-row"><span class="product-price">${formatPrice(product.price)}</span>${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ""}</div>
          <div class="product-actions"><button class="btn btn-soft btn-sm" type="button" data-add="${product.id}">${icons.cart} Add</button><button class="icon-btn quick-whatsapp" type="button" data-product-wa="${product.id}" aria-label="Ask on WhatsApp">${icons.whatsapp}</button></div>
        </div>
      </article>`;
  }

  function categoriesMarkup(active = "All", prefix = "") {
    const categories = ["All", "Pottery", "Baskets", "Textiles", "Décor", "New Arrivals"];
    return categories.map(category => `<button type="button" class="category-pill ${active === category ? "active" : ""}" ${prefix ? `data-${prefix}-category` : "data-home-category"}="${category}">${category}</button>`).join("");
  }

  function homePage() {
    root.innerHTML = `
      <section class="hero">
        <div class="hero-media"><img src="assets/images/hero/hero-home.webp" srcset="assets/images/hero/hero-home-960.webp 960w, assets/images/hero/hero-home.webp 1376w" sizes="100vw" alt="Handcrafted pottery, basket and tableware in warm window light" fetchpriority="high" decoding="async" width="1376" height="768"></div>
        <div class="container hero-content"><p class="eyebrow">Small-batch · Natural · Thoughtful</p><h1>Made with<br>care.</h1><p>Curated artisan goods for a slower, warmer home—ordered simply and directly through WhatsApp.</p><div class="hero-actions"><a class="btn btn-primary" href="#featured">Explore collection ${icons.arrow}</a><button class="btn btn-outline" data-general-wa>${icons.whatsapp} Order via WhatsApp</button></div></div>
        <div class="hero-note">Thoughtfully sourced · Carefully packed</div>
      </section>
      <div class="category-strip-wrap"><div class="container"><div class="category-strip no-scrollbar" id="home-categories">${categoriesMarkup()}</div></div></div>
      <section class="section" id="featured"><div class="container"><div class="section-heading"><div><p class="eyebrow">The collection</p><h2 class="section-title" id="home-grid-title">Pieces for everyday rituals</h2></div><a class="btn btn-link" href="shop.html">Shop all ${icons.arrow}</a></div><div class="product-grid" id="home-product-grid">${PRODUCTS.filter(p => p.featured).slice(0,8).map(productCard).join("")}</div></div></section>
      <section class="section-sm"><div class="container"><div class="trust-grid"><div class="trust-item"><div class="trust-icon">${icons.leaf}</div><h3>Natural materials</h3><p>Jute, cotton, clay and thoughtfully chosen finishes.</p></div><div class="trust-item"><div class="trust-icon">${icons.package}</div><h3>Carefully packed</h3><p>Protective packaging for a safe journey home.</p></div><div class="trust-item"><div class="trust-icon">${icons.whatsapp}</div><h3>Direct support</h3><p>Order updates and help from a real person.</p></div><div class="trust-item"><div class="trust-icon">${icons.truck}</div><h3>Delivery support</h3><p>Availability and shipping confirmed before order.</p></div></div></div></section>
      <section class="section story-section"><div class="container story-grid"><div class="story-collage"><img class="story-main" src="assets/images/products/terracotta-vase.webp" alt="Handcrafted terracotta vase" loading="lazy"><img class="story-small" src="assets/images/products/jute-basket.webp" alt="Handwoven jute basket" loading="lazy"></div><div class="story-copy"><p class="eyebrow">Our point of view</p><h2 class="section-title">Useful objects can still feel special.</h2><p>We look for honest materials, skilled hands and forms that age gracefully. Our collection is made for homes that value warmth over perfection and meaning over more.</p><p>Natural variations are not flaws—they are the signature of the maker and the material.</p><div class="signature">Made slowly, chosen thoughtfully.</div><a class="btn btn-outline" href="about.html">Read our story ${icons.arrow}</a></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Kind words</p><h2 class="section-title">Loved in real homes</h2></div></div><div class="testimonial-grid"><article class="testimonial"><div class="stars">★★★★★</div><blockquote>“The basket feels sturdy and beautiful. Even the packaging felt thoughtful.”</blockquote><div class="reviewer"><div class="reviewer-avatar">A</div><div><strong>Aditi Sharma</strong><span>Gorakhpur</span></div></div></article><article class="testimonial"><div class="stars">★★★★★</div><blockquote>“Ordering on WhatsApp was simple, and I could confirm every detail before paying.”</blockquote><div class="reviewer"><div class="reviewer-avatar">R</div><div><strong>Rhea Kapoor</strong><span>Lucknow</span></div></div></article><article class="testimonial"><div class="stars">★★★★★</div><blockquote>“The mug has become part of my morning ritual. No two glaze marks look exactly alike.”</blockquote><div class="reviewer"><div class="reviewer-avatar">N</div><div><strong>Naman Verma</strong><span>Varanasi</span></div></div></article></div></div></section>
      <section class="section-sm"><div class="container"><div class="cta-banner"><p class="eyebrow">Personal help, no complicated checkout</p><h2>Found something you love?</h2><p>Send your cart on WhatsApp. We will confirm stock, delivery and the final total before your order is placed.</p><button class="btn btn-whatsapp" data-general-wa>${icons.whatsapp} Start a conversation</button></div></div></section>`;

    document.querySelectorAll("[data-home-category]").forEach(button => button.addEventListener("click", () => {
      const category = button.dataset.homeCategory;
      document.querySelectorAll("[data-home-category]").forEach(b => b.classList.toggle("active", b === button));
      let items = category === "All" ? PRODUCTS.filter(p => p.featured) : category === "New Arrivals" ? PRODUCTS.filter(p => p.newArrival) : PRODUCTS.filter(p => p.category === category);
      document.getElementById("home-grid-title").textContent = category === "All" ? "Pieces for everyday rituals" : category;
      document.getElementById("home-product-grid").innerHTML = items.map(productCard).join("") || emptyState("search", "Nothing here yet", "New handmade pieces are coming soon.", "Shop all", "shop.html");
    }));
  }

  function shopPage() {
    const params = new URLSearchParams(location.search);
    let activeCategory = params.get("category") || (params.get("filter") === "new" ? "New Arrivals" : "All");
    root.innerHTML = `
      <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Shop</span></div><p class="eyebrow">Browse the collection</p><h1>Made to be lived with.</h1><p>Quietly beautiful pieces in clay, natural fibres and handwoven cotton.</p></div></section>
      <section class="section"><div class="container shop-layout"><div class="shop-toolbar"><label class="search-box">${icons.search}<span class="sr-only">Search products</span><input id="shop-search" type="search" placeholder="Search the collection…"></label><div class="sort-row"><span class="product-count" id="shop-count"></span><select class="select" id="shop-sort" aria-label="Sort products"><option value="featured">Featured</option><option value="new">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div></div><div class="shop-categories no-scrollbar" id="shop-categories">${categoriesMarkup(activeCategory,"shop")}</div><h2 class="sr-only" id="shop-results-heading">Shop products</h2><div class="product-grid" id="shop-grid" aria-labelledby="shop-results-heading"></div></div></section>`;

    const search = document.getElementById("shop-search");
    const sort = document.getElementById("shop-sort");
    const render = () => {
      const term = search.value.trim().toLowerCase();
      let items = PRODUCTS.filter(product => {
        const categoryMatch = activeCategory === "All" || (activeCategory === "New Arrivals" ? product.newArrival : product.category === activeCategory);
        const searchMatch = !term || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(term);
        return categoryMatch && searchMatch;
      });
      if (sort.value === "low") items.sort((a,b) => a.price-b.price);
      if (sort.value === "high") items.sort((a,b) => b.price-a.price);
      if (sort.value === "new") items.sort((a,b) => Number(b.newArrival)-Number(a.newArrival));
      if (sort.value === "featured") items.sort((a,b) => Number(b.featured)-Number(a.featured));
      document.getElementById("shop-count").textContent = `${items.length} ${items.length === 1 ? "piece" : "pieces"}`;
      document.getElementById("shop-grid").innerHTML = items.length ? items.map(productCard).join("") : emptyState("search", "No matching pieces", "Try a different search or category.", "Clear filters", "shop.html");
    };
    search.addEventListener("input", render);
    sort.addEventListener("change", render);
    document.querySelectorAll("[data-shop-category]").forEach(button => button.addEventListener("click", () => {
      activeCategory = button.dataset.shopCategory;
      document.querySelectorAll("[data-shop-category]").forEach(b => b.classList.toggle("active", b === button));
      render();
    }));
    render();
  }

  function productPage() {
    const id = new URLSearchParams(location.search).get("id");
    const product = getProduct(id) || PRODUCTS[0];
    document.title = `${product.name} — ${STORE.name}`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.content = product.shortDescription;
    root.innerHTML = `
      <section class="section-sm"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span><span>${product.name}</span></div><div class="product-detail"><div class="product-gallery"><img class="product-main-image" src="${product.image}" srcset="${productSrcset(product.image)}" sizes="(max-width: 767px) calc(100vw - 32px), 52vw" alt="${product.name}" decoding="async" width="900" height="900"><span class="product-badge">${product.badge || "Handmade"}</span></div><div class="product-info"><p class="eyebrow">${product.category} · Handcrafted</p><h1>${product.name}</h1><div class="product-detail-price"><span>${formatPrice(product.price)}</span>${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ""}</div><div class="stock-line"><span class="stock-dot"></span>${product.stock > 0 ? `${product.stock} available` : "Currently unavailable"}</div><p class="product-lead">${product.shortDescription}</p><div class="quantity-row"><div class="quantity-control" aria-label="Quantity"><button type="button" id="qty-minus" aria-label="Decrease quantity">−</button><span id="product-qty">1</span><button type="button" id="qty-plus" aria-label="Increase quantity">+</button></div><button class="icon-btn ${getWishlist().includes(product.id) ? "active" : ""}" data-wishlist="${product.id}" aria-label="Add to wishlist">${icons.heart}</button></div><div class="product-cta-row"><button class="btn btn-primary" id="detail-add">${icons.cart} Add to cart</button><button class="btn btn-whatsapp" id="detail-wa">${icons.whatsapp} Order now</button></div><div class="product-meta"><span><strong>Material:</strong> ${product.material}</span><span><strong>Size:</strong> ${product.dimensions}</span><span><strong>Delivery:</strong> Confirmed on WhatsApp</span></div><div class="accordions"><details class="accordion" open><summary>Description</summary><p>${product.description}</p></details><details class="accordion"><summary>Care</summary><p>${product.care}</p></details><details class="accordion"><summary>Handmade variation</summary><p>Small differences in colour, texture and form are natural signs of a handmade piece and make yours unique.</p></details></div></div></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">You may also like</p><h2 class="section-title">More to discover</h2></div><a href="shop.html" class="btn btn-link">Shop all ${icons.arrow}</a></div><div class="product-grid">${PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.featured)).slice(0,4).map(productCard).join("")}</div></div></section>`;
    let qty = 1;
    const qtyEl = document.getElementById("product-qty");
    document.getElementById("qty-minus").addEventListener("click", () => { qty = Math.max(1, qty-1); qtyEl.textContent = qty; });
    document.getElementById("qty-plus").addEventListener("click", () => { qty = Math.min(product.stock || 20, qty+1); qtyEl.textContent = qty; });
    document.getElementById("detail-add").addEventListener("click", () => addToCart(product.id, qty));
    document.getElementById("detail-wa").addEventListener("click", () => sendWhatsApp(productMessage(product, qty)));
  }

  function wishlistPage() {
    const items = getWishlist().map(getProduct).filter(Boolean);
    root.innerHTML = `
      <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Wishlist</span></div><p class="eyebrow">Saved for later</p><h1>Your favourites.</h1><p>Pieces you have saved stay here on this device.</p></div></section>
      <section class="section"><div class="container" id="wishlist-content">${items.length ? `<div class="product-grid">${items.map(productCard).join("")}</div>` : emptyState("heart", "Your wishlist is empty", "Tap the heart on any piece you would like to remember.", "Explore the collection", "shop.html")}</div></section>`;
  }

  function cartPage() {
    const render = () => {
      const cart = getCart();
      if (!cart.length) {
        root.innerHTML = `<section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Cart</span></div><p class="eyebrow">Your selection</p><h1>Your cart.</h1></div></section><section class="section"><div class="container">${emptyState("cart", "Your cart is empty", "Add a few pieces, then send the complete order on WhatsApp.", "Start shopping", "shop.html")}</div></section>`;
        return;
      }
      const subtotal = cartSubtotal();
      const remaining = Math.max(0, STORE.freeShippingAbove - subtotal);
      const progress = Math.min(100, (subtotal / STORE.freeShippingAbove) * 100);
      const saved = safeJSON(CUSTOMER_KEY, {});
      root.innerHTML = `
        <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Cart</span></div><p class="eyebrow">Your selection</p><h1>Your cart.</h1><p>Review quantities and send the final list directly on WhatsApp.</p></div></section>
        <section class="section"><div class="container cart-layout"><div class="cart-items">${cart.map(item => { const product = getProduct(item.id); return `<article class="cart-item"><a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a><div><div class="cart-item-head"><div><h3><a href="product.html?id=${product.id}">${product.name}</a></h3><div class="cart-item-price">${formatPrice(product.price)} each</div></div><button class="icon-btn remove-btn" data-cart-remove="${product.id}" aria-label="Remove ${product.name}">${icons.trash}</button></div><div class="cart-item-actions"><div class="quantity-control"><button data-cart-minus="${product.id}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-cart-plus="${product.id}" aria-label="Increase quantity">+</button></div><span class="cart-line-total">${formatPrice(product.price * item.qty)}</span></div></div></article>`; }).join("")}</div><aside class="order-summary"><p class="eyebrow">Order summary</p><h2>${cartCount()} ${cartCount() === 1 ? "piece" : "pieces"}</h2><div class="summary-line"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div><div class="summary-line"><span>Delivery</span><strong>To be confirmed</strong></div><div class="summary-line summary-total"><span>Estimated total</span><span>${formatPrice(subtotal)}</span></div><div class="free-shipping">${remaining > 0 ? `Add ${formatPrice(remaining)} more for free shipping.` : "You qualify for free shipping."}<div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div></div><form class="checkout-form" id="checkout-form"><div class="form-row"><div class="field"><label for="customer-name">Name *</label><input id="customer-name" name="name" value="${saved.name || ""}" required autocomplete="name"></div><div class="field"><label for="customer-phone">Mobile</label><input id="customer-phone" name="phone" value="${saved.phone || ""}" inputmode="tel" autocomplete="tel"></div></div><div class="field"><label for="customer-city">City / Pincode *</label><input id="customer-city" name="city" value="${saved.city || ""}" required autocomplete="postal-code"></div><div class="field"><label for="customer-address">Delivery address</label><textarea id="customer-address" name="address" autocomplete="street-address">${saved.address || ""}</textarea></div><div class="field"><label for="customer-note">Order note</label><textarea id="customer-note" name="note" placeholder="Colour, delivery or gifting instructions…">${saved.note || ""}</textarea></div><button class="btn btn-whatsapp btn-block" type="submit">${icons.whatsapp} Send order on WhatsApp</button><p class="form-note">No payment is taken here. Stock, delivery and final total are confirmed in chat.</p></form></aside></div></section>`;
      document.getElementById("checkout-form").addEventListener("submit", event => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));
        sendWhatsApp(cartMessage(data));
      });
    };
    root.addEventListener("click", event => {
      const minus = event.target.closest("[data-cart-minus]");
      const plus = event.target.closest("[data-cart-plus]");
      const remove = event.target.closest("[data-cart-remove]");
      if (minus) { updateCartQty(minus.dataset.cartMinus, -1); render(); }
      if (plus) { updateCartQty(plus.dataset.cartPlus, 1); render(); }
      if (remove) { setCart(getCart().filter(item => item.id !== remove.dataset.cartRemove)); render(); showToast("Removed from cart"); }
    });
    render();
  }

  function aboutPage() {
    root.innerHTML = `
      <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Our story</span></div><p class="eyebrow">About Mitti & More</p><h1>Warmth, texture<br>and honest making.</h1><p>A demo brand built around useful handmade objects and the people who shape them.</p></div></section>
      <section class="section"><div class="container editorial-grid"><div class="editorial-image"><img src="assets/images/products/terracotta-vase.webp" alt="Handmade terracotta vase"></div><div class="editorial-copy"><span class="big-number">01</span><p class="eyebrow">Why we began</p><h2 class="section-title">A quieter kind of beautiful.</h2><p>Homes are shaped by the things we touch every day: the cup that starts a morning, the basket that keeps a room calm, the textile pulled across a table.</p><p>Mitti & More brings these humble objects together with a preference for natural materials, skilled hands and timeless forms.</p></div></div></section>
      <section class="section story-section"><div class="container editorial-grid reverse"><div class="editorial-image"><img src="assets/images/products/jute-basket.webp" alt="Natural jute basket"></div><div class="editorial-copy"><span class="big-number">02</span><p class="eyebrow">Our promise</p><h2 class="section-title">Fewer pieces, chosen well.</h2><p>We value details that cannot be mass-produced perfectly: a visible weave, a softly uneven rim, a glaze mark that belongs only to one piece.</p><p>Every order is confirmed personally on WhatsApp so questions about colour, dimensions and delivery can be answered before purchase.</p></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">What guides us</p><h2 class="section-title">Simple values.</h2></div></div><div class="values-grid"><article class="value-card"><span class="number">01 / MATERIAL</span><h3>Natural first</h3><p>We favour clay, cotton, jute and finishes that feel honest in the hand.</p></article><article class="value-card"><span class="number">02 / MAKING</span><h3>Human character</h3><p>Small variations are celebrated as evidence of the maker and process.</p></article><article class="value-card"><span class="number">03 / SERVICE</span><h3>Personal support</h3><p>Clear conversations and confirmed details before an order is final.</p></article></div></div></section>`;
  }

  function contactPage() {
    root.innerHTML = `
      <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Contact</span></div><p class="eyebrow">We are here to help</p><h1>Let’s talk.</h1><p>Questions about a product, delivery or a larger order? Send us a message.</p></div></section>
      <section class="section"><div class="container contact-layout"><div><p class="eyebrow">Contact details</p><h2 class="section-title">A real person will reply.</h2><p class="section-intro">For the fastest response, use WhatsApp. Demo mode currently previews the message until a client number is added.</p><div class="contact-cards section-sm"><div class="contact-card"><div class="trust-icon">${icons.whatsapp}</div><div><h3>WhatsApp</h3><p>${STORE.phoneDisplay}</p></div></div><div class="contact-card"><div class="trust-icon">${icons.mail}</div><div><h3>Email</h3><a href="mailto:${STORE.email}">${STORE.email}</a></div></div><div class="contact-card"><div class="trust-icon">${icons.map}</div><div><h3>Location</h3><p>${STORE.address}</p></div></div><div class="contact-card"><div class="trust-icon">${icons.clock}</div><div><h3>Business hours</h3><p>${STORE.hours}</p></div></div></div></div><div class="contact-form-card"><p class="eyebrow">Send an enquiry</p><h2>How can we help?</h2><form class="checkout-form" id="contact-form"><div class="form-row"><div class="field"><label for="contact-name">Name *</label><input id="contact-name" name="name" required></div><div class="field"><label for="contact-phone">Mobile</label><input id="contact-phone" name="phone" inputmode="tel"></div></div><div class="field"><label for="contact-subject">Subject</label><select id="contact-subject" name="subject"><option>Product question</option><option>Delivery question</option><option>Bulk / gifting order</option><option>Other</option></select></div><div class="field"><label for="contact-message">Message *</label><textarea id="contact-message" name="message" required rows="6"></textarea></div><button class="btn btn-whatsapp" type="submit">${icons.whatsapp} Send on WhatsApp</button></form></div></div></section>`;
    document.getElementById("contact-form").addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      sendWhatsApp(`Hello ${STORE.name},\n\nName: ${data.name}\nMobile: ${data.phone || "Not provided"}\nSubject: ${data.subject}\n\n${data.message}`);
    });
  }

  function policiesPage() {
    root.innerHTML = `
      <section class="page-hero"><div class="container"><div class="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Policies</span></div><p class="eyebrow">Clear and simple</p><h1>Store policies.</h1><p>Demo policy copy—replace it with the first client’s confirmed terms before launch.</p></div></section>
      <section class="section"><div class="container policy-layout"><nav class="policy-nav no-scrollbar"><a href="#shipping">Shipping</a><a href="#returns">Returns</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></nav><div class="policy-content"><section class="policy-section" id="shipping"><p class="eyebrow">01</p><h2>Shipping & delivery</h2><p>Availability, delivery charge and estimated dispatch date are confirmed on WhatsApp before an order is final.</p><h3>Packaging</h3><p>Fragile products are carefully packed. Please record an unboxing video for any damage claim.</p><h3>Delivery timing</h3><p>Delivery times vary by pincode and product. Custom or small-batch products may need additional preparation time.</p></section><section class="policy-section" id="returns"><p class="eyebrow">02</p><h2>Returns & damage</h2><p>Contact the store within 48 hours of delivery if an item arrives damaged or incorrect. Share clear photos and an unboxing video.</p><ul><li>Handmade variations in colour and shape are not considered defects.</li><li>Used, washed or altered items cannot be returned.</li><li>Approved refunds are processed using the original agreed method.</li></ul></section><section class="policy-section" id="privacy"><p class="eyebrow">03</p><h2>Privacy</h2><p>Cart and wishlist information is stored only in your browser. Information entered for an order is included in the WhatsApp message you choose to send.</p><p>This static demo does not store customer addresses on a server. Analytics or forms added later must be disclosed here.</p></section><section class="policy-section" id="terms"><p class="eyebrow">04</p><h2>Terms of use</h2><p>Product prices, stock and delivery are subject to final confirmation. Website images aim to represent products accurately, but screen and handmade variations may occur.</p><p>These terms are placeholder content for the demo and should be legally reviewed for the operating business.</p></section></div></div></section>`;
  }

  function updateSEO() {
    const canonicalUrl = new URL(location.href);
    canonicalUrl.hash = "";
    if (page !== "product") canonicalUrl.search = "";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl.href;

    const graph = [{
      "@type": "LocalBusiness",
      "@id": `${new URL("index.html", location.href).href}#business`,
      name: STORE.name,
      description: STORE.description,
      url: new URL("index.html", location.href).href,
      image: new URL("assets/images/hero/hero-home.webp", location.href).href,
      address: { "@type": "PostalAddress", addressLocality: "Gorakhpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" }
    }];

    if (page === "product") {
      const product = getProduct(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
      graph.push({
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: [new URL(product.image, location.href).href],
        sku: product.id,
        category: product.category,
        offers: {
          "@type": "Offer",
          url: canonicalUrl.href,
          priceCurrency: STORE.currency,
          price: product.price,
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition"
        }
      });
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: new URL("index.html", location.href).href },
          { "@type": "ListItem", position: 2, name: "Shop", item: new URL("shop.html", location.href).href },
          { "@type": "ListItem", position: 3, name: product.name, item: canonicalUrl.href }
        ]
      });
    }

    let schema = document.getElementById("site-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "site-schema";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  }

  function emptyState(icon, title, text, cta, href) {
    return `<div class="empty-state"><div class="empty-icon">${icons[icon] || icons.package}</div><h2>${title}</h2><p>${text}</p><a class="btn btn-primary" href="${href}">${cta} ${icons.arrow}</a></div>`;
  }

  function addToCart(id, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else cart.push({ id, qty });
    setCart(cart);
    showToast(`${getProduct(id)?.name || "Item"} added to cart`);
  }

  function updateCartQty(id, delta) {
    const cart = getCart();
    const item = cart.find(entry => entry.id === id);
    if (!item) return;
    item.qty += delta;
    setCart(cart.filter(entry => entry.qty > 0));
  }

  function toggleWishlist(id) {
    const wishlist = getWishlist();
    const exists = wishlist.includes(id);
    const next = exists ? wishlist.filter(item => item !== id) : [...wishlist, id];
    setWishlist(next);
    document.querySelectorAll(`[data-wishlist="${CSS.escape(id)}"]`).forEach(button => {
      button.classList.toggle("active", !exists);
      button.setAttribute("aria-label", `${!exists ? "Remove from" : "Add to"} wishlist`);
    });
    showToast(exists ? "Removed from wishlist" : "Saved to wishlist");
    if (page === "wishlist" && exists) wishlistPage();
  }

  function productMessage(product, qty = 1) {
    const url = new URL(`product.html?id=${product.id}`, location.href).href;
    return `Hello ${STORE.name},\n\nI am interested in:\n${product.name}\nPrice: ${formatPrice(product.price)}\nQuantity: ${qty}\nProduct link: ${url}\n\nPlease confirm availability and delivery.`;
  }

  function cartMessage(customer) {
    const cart = getCart();
    const lines = cart.map((item, index) => {
      const product = getProduct(item.id);
      return `${index + 1}. ${product.name} × ${item.qty} — ${formatPrice(product.price * item.qty)}`;
    }).join("\n");
    return `Hello ${STORE.name},\nI would like to place an order:\n\n${lines}\n\nSubtotal: ${formatPrice(cartSubtotal())}\nDelivery: To be confirmed\n\nName: ${customer.name}\nMobile: ${customer.phone || "Not provided"}\nCity/Pincode: ${customer.city}\nAddress: ${customer.address || "Will share in chat"}\nNote: ${customer.note || "None"}\n\nPlease confirm availability and final total.`;
  }

  function sendWhatsApp(message) {
    if (STORE.whatsapp) {
      window.open(`https://wa.me/${STORE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    } else {
      lastFocusedElement = document.activeElement;
      document.getElementById("message-preview").textContent = message;
      const modal = document.getElementById("message-modal");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      focusFirst(modal);
    }
  }

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  let lastFocusedElement = null;

  function focusFirst(container) {
    const target = container?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (target) setTimeout(() => target.focus(), 30);
  }

  function trapFocus(container, event) {
    if (event.key !== "Tab" || !container) return;
    const focusable = [...container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter(el => getComputedStyle(el).display !== "none" && getComputedStyle(el).visibility !== "hidden");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function restoreFocus() {
    if (lastFocusedElement && document.contains(lastFocusedElement)) lastFocusedElement.focus();
    lastFocusedElement = null;
  }

  function setupGlobalEvents() {
    document.addEventListener("click", event => {
      const add = event.target.closest("[data-add]");
      const wish = event.target.closest("[data-wishlist]");
      const productWA = event.target.closest("[data-product-wa]");
      const generalWA = event.target.closest("[data-general-wa]");
      if (add) addToCart(add.dataset.add);
      if (wish) toggleWishlist(wish.dataset.wishlist);
      if (productWA) sendWhatsApp(productMessage(getProduct(productWA.dataset.productWa)));
      if (generalWA) sendWhatsApp(`Hello ${STORE.name},\n\nI would like to know more about your collection.`);
      if (event.target.closest("[data-open-menu]")) toggleMenu(true);
      if (event.target.closest("[data-close-menu]") || (event.target.id === "mobile-menu")) toggleMenu(false);
      if (event.target.closest("[data-open-search]")) toggleSearch(true);
      if (event.target.closest("[data-close-search]") || (event.target.id === "search-overlay")) toggleSearch(false);
      if (event.target.closest("[data-close-modal]") || (event.target.id === "message-modal")) closeModal();
    });

    document.getElementById("global-search").addEventListener("input", event => renderGlobalSearch(event.target.value));
    document.getElementById("copy-message").addEventListener("click", async () => {
      const text = document.getElementById("message-preview").textContent;
      try { await navigator.clipboard.writeText(text); showToast("Message copied"); }
      catch { showToast("Select and copy the message manually"); }
    });
    window.addEventListener("scroll", () => document.getElementById("site-header")?.classList.toggle("scrolled", scrollY > 8), { passive: true });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") { toggleMenu(false); toggleSearch(false); closeModal(); return; }
      const menu = document.getElementById("mobile-menu");
      const search = document.getElementById("search-overlay");
      const modal = document.getElementById("message-modal");
      if (modal?.classList.contains("open")) trapFocus(modal, event);
      else if (search?.classList.contains("open")) trapFocus(search, event);
      else if (menu?.classList.contains("open")) trapFocus(menu, event);
    });
  }

  function toggleMenu(open) {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;
    const wasOpen = menu.classList.contains("open");
    if (open && !wasOpen) lastFocusedElement = document.activeElement;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    if (open) focusFirst(menu.querySelector(".mobile-menu-panel"));
    else if (wasOpen) restoreFocus();
  }

  function toggleSearch(open) {
    const overlay = document.getElementById("search-overlay");
    if (!overlay) return;
    const wasOpen = overlay.classList.contains("open");
    if (open && !wasOpen) lastFocusedElement = document.activeElement;
    overlay.classList.toggle("open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);
    if (open) { const input = document.getElementById("global-search"); input.value = ""; renderGlobalSearch(""); setTimeout(() => input.focus(), 50); }
    else if (wasOpen) restoreFocus();
  }

  function closeModal() {
    const modal = document.getElementById("message-modal");
    if (!modal) return;
    const wasOpen = modal.classList.contains("open");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (wasOpen) restoreFocus();
  }

  function renderGlobalSearch(term) {
    const results = document.getElementById("global-search-results");
    const query = term.trim().toLowerCase();
    const items = query ? PRODUCTS.filter(product => `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(query)).slice(0,7) : PRODUCTS.filter(p => p.featured).slice(0,5);
    results.innerHTML = `<p class="eyebrow" style="padding:8px 10px 0">${query ? "Search results" : "Popular pieces"}</p>${items.length ? items.map(product => `<a class="search-result" href="product.html?id=${product.id}"><img src="${product.image}" alt=""><div><h4>${product.name}</h4><p>${product.category}</p></div><strong>${formatPrice(product.price)}</strong></a>`).join("") : `<div class="search-empty">No matching pieces found.</div>`}`;
  }

  shell();
  setupGlobalEvents();
  const renderers = { home: homePage, shop: shopPage, product: productPage, wishlist: wishlistPage, cart: cartPage, about: aboutPage, contact: contactPage, policies: policiesPage };
  (renderers[page] || homePage)();
  updateSEO();
})();
