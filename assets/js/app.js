/**
 * AMERICAS CONTINENTAL EXPORT LLC - APLICACIÓN PRINCIPAL
 * Sistema de Catálogo, Carrito de Cotización, Pedido Personalizado y WhatsApp
 * Atención Personalizada
 */

(function () {
  'use strict';

  // --- ESTADO GLOBAL DE LA APLICACIÓN ---
  const state = {
    currentTab: 'inicio',
    activeCategory: 'all',
    searchQuery: '',
    activeTag: null,
    cart: [],
    selectedProductForModal: null,
    slideIndex: 0
  };

  // --- INICIALIZACIÓN ---
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollProgressBar();
    loadCartFromStorage();
    initNavigation();
    initHeroSlider();
    initCategoryTabs();
    initSearchAndFilters();
    renderCatalog();
    updateCartUI();
    initCartForm();
    initRequisicionForm();
    initFloatingButtons();
    initQuickViewModal();
    initWhatsAppNameModal();
    initFaqAccordion();
    initCookieBanner();
    initInlineFormValidation();
    initScrollReveal();

    // Comprobar si hay hash en la URL (ej: #inicio, #catalogo, #carrito, #requisicion, #nosotros)
    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
  });

  // --- PERSISTENCIA DEL CARRITO ---
  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('ace_quotation_cart');
      if (saved) {
        state.cart = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('No se pudo cargar el carrito previo:', e);
      state.cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('ace_quotation_cart', JSON.stringify(state.cart));
    } catch (e) {
      console.error('Error guardando carrito:', e);
    }
  }

  // --- NAVEGACIÓN ENTRE SECCIONES (5 SECCIONES) ---
  function initNavigation() {
    const navLinks = document.querySelectorAll('[data-nav-target]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav-target');
        switchTab(target);
      });
    });

    // Menú móvil hamburguesa
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Cerrar menú al hacer clic en un enlace
      mobileMenu.querySelectorAll('[data-nav-target]').forEach(item => {
        item.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['inicio', 'catalogo', 'carrito', 'requisicion', 'pedido-personalizado', 'nosotros'].includes(hash)) {
      switchTab(hash === 'pedido-personalizado' ? 'requisicion' : hash, false);
    }
  }

  function switchTab(tabId, updateHash = true) {
    if (tabId === 'pedido-personalizado') tabId = 'requisicion';
    if (!['inicio', 'catalogo', 'carrito', 'requisicion', 'nosotros'].includes(tabId)) {
      tabId = 'inicio';
    }
    state.currentTab = tabId;

    // Actualizar secciones visibles
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const targetSec = document.getElementById(`section-${tabId}`);
    if (targetSec) {
      targetSec.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Actualizar enlaces activos
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      const isCurrent = link.getAttribute('data-nav-target') === tabId;
      if (isCurrent) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });

    if (updateHash) {
      history.pushState(null, null, `#${tabId}`);
    }

    // Si entra al carrito, refrescar su vista
    if (tabId === 'carrito') {
      renderCartPage();
    }
  }
  window.switchTab = switchTab;

  // --- SLIDER DE MAQUINARIA & HERO ---
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    let current = 0;
    const dots = document.querySelectorAll('.hero-slide-dot');

    function showSlide(index) {
      slides.forEach((s, idx) => {
        if (idx === index) {
          s.classList.remove('opacity-0', 'pointer-events-none');
          s.classList.add('opacity-100', 'z-10');
        } else {
          s.classList.add('opacity-0', 'pointer-events-none');
          s.classList.remove('opacity-100', 'z-10');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('bg-accent-yellow', 'w-8');
          dot.classList.remove('bg-white/40', 'w-2.5');
        } else {
          dot.classList.remove('bg-accent-yellow', 'w-8');
          dot.classList.add('bg-white/40', 'w-2.5');
        }
      });
      state.slideIndex = index;
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
      });
    });

    const nextBtn = document.getElementById('hero-next');
    const prevBtn = document.getElementById('hero-prev');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });
    }

    // Auto avance cada 5.5 segundos
    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5500);
  }

  // --- CATEGORÍAS & FILTROS ---
  function initCategoryTabs() {
    const container = document.getElementById('category-filter-bar');
    if (!container || !window.PRODUCT_CATEGORIES) return;

    container.innerHTML = '';
    window.PRODUCT_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-pill ${cat.id === state.activeCategory ? 'active' : ''}`;
      btn.setAttribute('data-category-id', cat.id);
      btn.innerHTML = `
        <span class="inline-block mr-1.5">${getCategoryIconSvg(cat.icon)}</span>
        <span>${cat.name}</span>
      `;
      btn.addEventListener('click', () => {
        state.activeCategory = cat.id;
        state.activeTag = null;
        document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCatalog();
      });
      container.appendChild(btn);
    });
  }

  function getCategoryIconSvg(iconName) {
    const icons = {
      grid: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`,
      cpu: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m16-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>`,
      droplet: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
      disc: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke-width="2"/></svg>`,
      zap: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
      wind: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>`,
      shield: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
      tool: `<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
    };
    return icons[iconName] || icons.grid;
  }

  function initSearchAndFilters() {
    const searchInput = document.getElementById('catalog-search-input');
    const clearSearchBtn = document.getElementById('catalog-search-clear');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
        }
        renderCatalog();
      });

      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
          searchInput.value = '';
          state.searchQuery = '';
          clearSearchBtn.classList.add('hidden');
          renderCatalog();
        });
      }
    }
  }

  // --- RENDERIZADO DEL CATÁLOGO ---
  function renderCatalog() {
    const grid = document.getElementById('catalog-products-grid');
    const emptyState = document.getElementById('catalog-empty-state');
    const countBadge = document.getElementById('catalog-results-count');

    if (!grid || !window.PRODUCTS_DATA) return;

    const filtered = window.PRODUCTS_DATA.filter(prod => {
      if (state.activeCategory !== 'all' && prod.category !== state.activeCategory) {
        return false;
      }
      if (state.searchQuery) {
        const textTarget = `${prod.name} ${prod.brand} ${prod.code} ${prod.categoryName} ${(prod.tags || []).join(' ')} ${prod.shortDesc}`.toLowerCase();
        if (!textTarget.includes(state.searchQuery)) {
          return false;
        }
      }
      return true;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} productos y repuestos encontrados`;
    }

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    grid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(prod => createProductCardHTML(prod)).join('');

    // Asignar eventos a botones de tarjeta
    grid.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-product-id');
        const qtyInput = grid.querySelector(`[data-qty-input="${pId}"]`);
        const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
        addToCart(pId, qty);
      });
    });

    grid.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-product-id');
        openQuickViewModal(pId);
      });
    });

    grid.querySelectorAll('[data-qty-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-product-id');
        const type = btn.getAttribute('data-qty-btn');
        const input = grid.querySelector(`[data-qty-input="${pId}"]`);
        if (input) {
          let val = parseInt(input.value) || 1;
          if (type === 'plus') val++;
          if (type === 'minus' && val > 1) val--;
          input.value = val;
        }
      });
    });
  }

  function createProductCardHTML(prod) {
    const inCart = state.cart.find(item => item.id === prod.id);
    const cartQtyBadge = inCart ? `<span class="bg-brand-dark text-accent-yellow text-xs font-bold px-2 py-0.5 rounded-full">${inCart.quantity} en cotización</span>` : '';

    return `
      <div class="product-card glass-card group flex flex-col justify-between overflow-hidden relative">
        <!-- Badge superior -->
        <div class="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 items-center">
          <span class="badge-status">${prod.badge || 'Al Mayor & Detal'}</span>
          ${cartQtyBadge}
        </div>

        <!-- Imagen y Vista Rápida -->
        <div class="relative overflow-hidden bg-brand-lightGray/30 aspect-[4/3] flex items-center justify-center p-2 cursor-pointer" data-action="quick-view" data-product-id="${prod.id}">
          <img 
            src="${prod.image}" 
            alt="${prod.name}" 
            class="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105 rounded-xl"
            loading="lazy"
            onerror="this.src='assets/images/Backhoe_loader_.jpg'"
          />
          <div class="absolute inset-0 bg-brand-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <span class="bg-white/90 text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              Ficha Técnica
            </span>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-brand-dark/60 dark:text-white/60 font-medium mb-1">
              <span>${prod.categoryName}</span>
              <span class="font-mono bg-brand-lightGray/60 dark:bg-white/10 px-2 py-0.5 rounded text-[11px] font-bold text-brand-dark dark:text-accent-yellow">${prod.brand}</span>
            </div>

            <!-- Calificación con estrellas -->
            <div class="flex items-center gap-1.5 text-xs text-amber-500 font-extrabold my-1">
              <span class="tracking-tight text-accent-yellow">★★★★★</span>
              <span class="text-[11px] text-brand-dark/60 dark:text-white/60 font-semibold">(5.0 • Garantía OEM)</span>
            </div>
            
            <h3 class="font-bold text-brand-dark dark:text-white text-base leading-snug line-clamp-2 hover:text-accent-yellow transition-colors cursor-pointer" data-action="quick-view" data-product-id="${prod.id}">
              ${prod.name}
            </h3>

            <p class="text-xs text-brand-dark/70 dark:text-white/70 font-mono mt-1">Ref / Código: <span class="font-bold text-brand-dark dark:text-accent-yellow">${prod.code}</span></p>

            <p class="text-xs text-brand-dark/60 dark:text-white/70 line-clamp-2 mt-2 leading-relaxed">
              ${prod.shortDesc}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1 mt-3">
              ${(prod.tags || []).slice(0, 3).map(t => `<span class="text-[10px] bg-white dark:bg-white/10 border border-brand-lightGray dark:border-white/10 px-2 py-0.5 rounded-md text-brand-dark/70 dark:text-white/80">#${t}</span>`).join('')}
            </div>
          </div>

          <!-- Selector de cantidad & Botón agregar -->
          <div class="mt-5 pt-3 border-t border-brand-lightGray/60 dark:border-white/10 flex items-center gap-2">
            <!-- Counter -->
            <div class="flex items-center border border-brand-lightGray dark:border-white/10 rounded-xl bg-white/70 dark:bg-white/10 overflow-hidden shadow-sm h-10">
              <button type="button" class="px-2.5 h-full text-brand-dark/70 dark:text-white/70 hover:bg-brand-lightGray/50 dark:hover:bg-white/10 active:scale-90 transition font-bold" data-qty-btn="minus" data-product-id="${prod.id}">-</button>
              <input type="number" min="1" value="1" class="w-9 text-center bg-transparent text-xs font-bold text-brand-dark dark:text-white focus:outline-none" data-qty-input="${prod.id}">
              <button type="button" class="px-2.5 h-full text-brand-dark/70 dark:text-white/70 hover:bg-brand-lightGray/50 dark:hover:bg-white/10 active:scale-90 transition font-bold" data-qty-btn="plus" data-product-id="${prod.id}">+</button>
            </div>

            <!-- Botón Agregar -->
            <button 
              type="button" 
              class="btn-add-cart flex-1 h-10 flex items-center justify-center gap-1.5 text-xs font-bold rounded-xl bg-brand-dark dark:bg-accent-yellow text-white dark:text-brand-dark hover:bg-black dark:hover:bg-yellow-400 transition-all shadow hover:shadow-md active:scale-98"
              data-action="add-to-cart"
              data-product-id="${prod.id}"
            >
              <svg class="w-4 h-4 text-accent-yellow dark:text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <span>Añadir al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- CARRITO DE COTIZACIÓN ---
  function addToCart(productId, quantity = 1, note = '') {
    const product = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(i => i.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
      if (note && !state.cart[existingIndex].note) {
        state.cart[existingIndex].note = note;
      }
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        code: product.code,
        brand: product.brand,
        categoryName: product.categoryName,
        image: product.image,
        quantity: quantity,
        note: note
      });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`¡${product.name} añadido a tu carrito!`, 'success');
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    renderCartPage();
    showToast('Repuesto removido de la cotización.', 'info');
  }

  function updateCartItemQty(productId, newQty) {
    const item = state.cart.find(i => i.id === productId);
    if (item) {
      if (newQty <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQty;
        saveCartToStorage();
        updateCartUI();
        renderCartPage();
      }
    }
  }

  function updateCartItemNote(productId, noteText) {
    const item = state.cart.find(i => i.id === productId);
    if (item) {
      item.note = noteText;
      saveCartToStorage();
    }
  }

  function clearCart() {
    if (confirm('¿Deseas vaciar todos los repuestos del carrito de cotización?')) {
      state.cart = [];
      saveCartToStorage();
      updateCartUI();
      renderCartPage();
      showToast('El carrito ha sido vaciado.', 'info');
    }
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll('.cart-badge-count').forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });
  }

  // --- VISTA DETALLADA DEL CARRITO ---
  function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyView = document.getElementById('cart-empty-view');
    const activeView = document.getElementById('cart-active-view');
    const totalItemsCount = document.getElementById('cart-total-items-count');

    if (!container) return;

    if (state.cart.length === 0) {
      if (emptyView) emptyView.classList.remove('hidden');
      if (activeView) activeView.classList.add('hidden');
      return;
    }

    if (emptyView) emptyView.classList.add('hidden');
    if (activeView) activeView.classList.remove('hidden');

    const totalQty = state.cart.reduce((sum, i) => sum + i.quantity, 0);
    if (totalItemsCount) {
      totalItemsCount.textContent = `${totalQty} ${totalQty === 1 ? 'pieza en total' : 'piezas en total'}`;
    }

    container.innerHTML = state.cart.map((item) => `
      <div class="cart-item glass-card p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-brand-dark/20">
        <!-- Minuta e info -->
        <div class="flex items-center gap-4 flex-1">
          <div class="w-16 h-16 rounded-xl bg-brand-lightGray/40 overflow-hidden flex-shrink-0 border border-brand-lightGray">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src='assets/images/Backhoe_loader_.jpg'">
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono bg-brand-lightGray/80 px-2 py-0.5 rounded text-brand-dark font-semibold">${item.brand}</span>
              <span class="text-xs text-brand-dark/50">${item.categoryName}</span>
            </div>
            <h4 class="font-bold text-brand-dark text-sm leading-tight mt-0.5">${item.name}</h4>
            <p class="text-xs font-mono text-brand-dark/70">Ref: <strong>${item.code}</strong></p>
          </div>
        </div>

        <!-- Nota / Modelo de máquina para este ítem -->
        <div class="w-full md:w-56">
          <input 
            type="text" 
            placeholder="Nº Serie / Chasis / VIN (opcional)" 
            value="${item.note || ''}" 
            class="cart-note-input w-full text-xs px-3 py-2 rounded-xl border border-brand-lightGray bg-white/70 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-dark"
            data-cart-id="${item.id}"
          />
        </div>

        <!-- Controles de Cantidad y Eliminar -->
        <div class="flex items-center justify-between w-full md:w-auto gap-4">
          <div class="flex items-center border border-brand-lightGray rounded-xl bg-white overflow-hidden shadow-sm h-9">
            <button type="button" class="px-2.5 h-full text-brand-dark/70 hover:bg-brand-lightGray/50 active:scale-95 transition font-bold" data-cart-qty-btn="minus" data-cart-id="${item.id}">-</button>
            <input type="number" min="1" value="${item.quantity}" class="w-10 text-center bg-transparent text-xs font-bold text-brand-dark focus:outline-none" data-cart-qty-input="${item.id}">
            <button type="button" class="px-2.5 h-full text-brand-dark/70 hover:bg-brand-lightGray/50 active:scale-95 transition font-bold" data-cart-qty-btn="plus" data-cart-id="${item.id}">+</button>
          </div>

          <button type="button" class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition" title="Eliminar de cotización" data-cart-delete-id="${item.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    // Eventos del carrito
    container.querySelectorAll('[data-cart-delete-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-cart-delete-id');
        removeFromCart(pId);
      });
    });

    container.querySelectorAll('[data-cart-qty-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-cart-id');
        const type = btn.getAttribute('data-cart-qty-btn');
        const item = state.cart.find(i => i.id === pId);
        if (item) {
          let q = item.quantity;
          if (type === 'plus') q++;
          if (type === 'minus') q--;
          updateCartItemQty(pId, q);
        }
      });
    });

    container.querySelectorAll('[data-cart-qty-input]').forEach(input => {
      input.addEventListener('change', () => {
        const pId = input.getAttribute('data-cart-qty-input');
        const q = parseInt(input.value) || 1;
        updateCartItemQty(pId, q);
      });
    });

    container.querySelectorAll('.cart-note-input').forEach(input => {
      input.addEventListener('input', () => {
        const pId = input.getAttribute('data-cart-id');
        updateCartItemNote(pId, input.value);
      });
    });
  }

  // --- FORMULARIO Y ENLACE DE WHATSAPP PARA EL CARRITO ---
  function initCartForm() {
    const form = document.getElementById('quotation-client-form');
    const quoteBtn = document.getElementById('btn-submit-whatsapp-quote');
    const clearBtn = document.getElementById('btn-clear-cart');

    if (clearBtn) {
      clearBtn.addEventListener('click', clearCart);
    }

    if (quoteBtn) {
      quoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitQuotationToWhatsApp();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitQuotationToWhatsApp();
      });
    }
  }

  function submitQuotationToWhatsApp() {
    if (state.cart.length === 0) {
      showToast('Tu carrito de cotización está vacío. Añade productos primero.', 'error');
      switchTab('catalogo');
      return;
    }

    const nameInput = document.getElementById('quote-name');
    const companyInput = document.getElementById('quote-company');
    const modeInput = document.getElementById('quote-mode');
    const countryInput = document.getElementById('quote-country');
    const phoneInput = document.getElementById('quote-phone');
    const notesInput = document.getElementById('quote-notes');

    const clientName = nameInput ? nameInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const salesMode = modeInput ? modeInput.value : 'Al Detal';
    const destination = countryInput ? countryInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const generalNotes = notesInput ? notesInput.value.trim() : '';

    if (!destination) {
      showToast('Por favor indica el País y Ciudad de destino para calcular el flete.', 'error');
      if (countryInput) countryInput.focus();
      return;
    }

    // Cuadro flotante para capturar Nombre y Apellido antes de enviar
    promptWhatsAppName(clientName, (confirmedName) => {
      if (nameInput) nameInput.value = confirmedName;

      const phoneTarget = (window.APP_CONFIG && window.APP_CONFIG.company.whatsappNumber) || '18434469786';

      let msg = `👋 *SOLICITUD DE COTIZACIÓN*\n`;
      msg += `_Americas Continental Export LLC (americascontinentalexport.com)_\n\n`;

      msg += `📋 *DATOS DEL CLIENTE / SOLICITANTE:*\n`;
      msg += `• *Contacto:* ${confirmedName}\n`;
      if (company) msg += `• *Empresa / Taller:* ${company}\n`;
      msg += `• *Modalidad de Compra:* ${salesMode}\n`;
      msg += `• *Destino (País / Ciudad):* ${destination}\n`;
      if (phone) msg += `• *Teléfono / WhatsApp:* ${phone}\n`;
      if (generalNotes) msg += `• *Observaciones:* ${generalNotes}\n`;

      msg += `\n📦 *LISTA DE PRODUCTOS SELECCIONADOS (${state.cart.length} ítems):*\n`;

      state.cart.forEach((item, index) => {
        msg += `\n${index + 1}. *${item.name}*\n`;
        msg += `   ▫ *Cantidad:* ${item.quantity} unidad(es)\n`;
        msg += `   ▫ *Ref / Código:* ${item.code}\n`;
        msg += `   ▫ *Marca:* ${item.brand}\n`;
        msg += `   ▫ *Categoría:* ${item.categoryName}\n`;
        if (item.note) {
          msg += `   ▫ *VIN / Modelo Máquina:* ${item.note}\n`;
        }
      });

      msg += `\n-----------------------------------\n`;
      msg += `💬 *Estimado equipo de Americas Continental Export, quedo a la espera de su respuesta con el costo de cada ítem más el envío hasta mi lugar de destino.* ¡Muchas gracias!`;

      const encodedMsg = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
      showToast('¡Redirigiendo a WhatsApp con tu resumen de cotización!', 'success');
    });
  }

  // --- SECCIÓN REQUISICIÓN ESPECIAL (PIEZAS FUERA DE CATÁLOGO) ---
  function initRequisicionForm() {
    const reqForm = document.getElementById('requisicion-direct-form');
    if (!reqForm) return;

    reqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitRequisicionToWhatsApp();
    });
  }

  function submitRequisicionToWhatsApp() {
    const type = document.getElementById('req-type')?.value || 'Repuesto Especial';
    const salesMode = document.getElementById('req-sales-mode')?.value || 'Al Detal';
    const machine = document.getElementById('req-machine')?.value.trim() || '';
    const partNumber = document.getElementById('req-part-number')?.value.trim() || 'No especificado';
    const desc = document.getElementById('req-desc')?.value.trim() || '';
    const urgency = document.getElementById('req-urgency')?.value || 'Normal';
    const country = document.getElementById('req-country')?.value.trim() || '';
    const nameInput = document.getElementById('req-name');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = document.getElementById('req-phone')?.value.trim() || '';

    if (!machine || !desc || !country) {
      showToast('Por favor completa los campos requeridos con asterisco (*).', 'error');
      return;
    }

    // Cuadro flotante para capturar Nombre y Apellido antes de enviar
    promptWhatsAppName(name, (confirmedName) => {
      if (nameInput) nameInput.value = confirmedName;

      const phoneTarget = (window.APP_CONFIG && window.APP_CONFIG.company.whatsappNumber) || '18434469786';

      let msg = `🚨 *SOLICITUD DE PEDIDO PERSONALIZADO (FUERA DE CATÁLOGO)*\n`;
      msg += `_Americas Continental Export LLC - Atención Personalizada_\n\n`;

      msg += `👤 *DATOS DEL SOLICITANTE:*\n`;
      msg += `• *Nombre / Contacto:* ${confirmedName}\n`;
      msg += `• *País y Ciudad de Destino:* ${country}\n`;
      if (phone) msg += `• *Teléfono / WhatsApp:* ${phone}\n`;
      msg += `• *Modalidad de Compra:* ${salesMode}\n`;
      msg += `• *Nivel de Urgencia:* ${urgency}\n\n`;

      msg += `🚜 *DETALLES DEL REQUERIMIENTO:*\n`;
      msg += `• *Tipo:* ${type}\n`;
      msg += `• *Marca y Modelo del Equipo:* ${machine}\n`;
      msg += `• *Nº de Parte / VIN:* ${partNumber}\n`;
      msg += `• *Descripción de la Pieza o Falla:* ${desc}\n\n`;

      msg += `📍 *Hola, solicito por favor verificar disponibilidad en Estados Unidos y cotizarme con flete hasta mi destino.* ¡Muchas gracias!`;

      const encodedMsg = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
      showToast('¡Enviando pedido personalizado por WhatsApp!', 'success');
    });
  }

  // --- MODAL DE VISTA RÁPIDA (FICHA TÉCNICA) ---
  function initQuickViewModal() {
    const modal = document.getElementById('quickview-modal');
    const closeBtn = document.getElementById('quickview-close-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', closeQuickViewModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeQuickViewModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeQuickViewModal();
    });
  }

  function openQuickViewModal(productId) {
    const prod = window.PRODUCTS_DATA.find(p => p.id === productId);
    if (!prod) return;

    state.selectedProductForModal = prod;
    const modal = document.getElementById('quickview-modal');
    if (!modal) return;

    document.getElementById('qv-title').textContent = prod.name;
    document.getElementById('qv-category').textContent = prod.categoryName;
    document.getElementById('qv-brand').textContent = prod.brand;
    document.getElementById('qv-code').textContent = prod.code;
    document.getElementById('qv-desc').textContent = prod.shortDesc;
    document.getElementById('qv-badge').textContent = prod.badge || 'Al Mayor & Detal';
    
    const imgEl = document.getElementById('qv-image');
    if (imgEl) {
      imgEl.src = prod.image;
      imgEl.alt = prod.name;
    }

    const specsContainer = document.getElementById('qv-specs');
    if (specsContainer && prod.specs) {
      specsContainer.innerHTML = Object.entries(prod.specs).map(([key, val]) => `
        <div class="flex items-center justify-between py-1.5 border-b border-brand-lightGray/40 text-xs">
          <span class="font-semibold text-brand-dark/70">${key}:</span>
          <span class="text-brand-dark font-medium text-right">${val}</span>
        </div>
      `).join('');
    }

    const modalQtyInput = document.getElementById('qv-qty-input');
    if (modalQtyInput) modalQtyInput.value = 1;

    const addBtn = document.getElementById('qv-add-btn');
    if (addBtn) {
      addBtn.onclick = () => {
        const qty = modalQtyInput ? parseInt(modalQtyInput.value) || 1 : 1;
        addToCart(prod.id, qty);
        closeQuickViewModal();
      };
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickViewModal() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  // --- MODAL DE IDENTIFICACIÓN PREVIO A WHATSAPP ---
  let pendingWhatsAppCallback = null;

  function initWhatsAppNameModal() {
    const modal = document.getElementById('whatsapp-name-modal');
    const form = document.getElementById('whatsapp-name-form');
    const closeBtn = document.getElementById('whatsapp-name-close-btn');
    const cancelBtn = document.getElementById('whatsapp-name-cancel-btn');
    const nameInput = document.getElementById('whatsapp-client-name');

    function closeModal() {
      if (!modal) return;
      modal.classList.add('opacity-0', 'pointer-events-none');
      const dialog = modal.querySelector('.modal-dialog-box');
      if (dialog) dialog.classList.add('scale-95');
      document.body.style.overflow = '';
      pendingWhatsAppCallback = null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('pointer-events-none')) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredName = nameInput ? nameInput.value.trim() : '';
        if (!enteredName) {
          showToast('Por favor ingrese su nombre y apellido.', 'error');
          if (nameInput) nameInput.focus();
          return;
        }

        // Guardar nombre en memoria/localStorage para comodidad del usuario
        try {
          localStorage.setItem('ace_client_name', enteredName);
        } catch (_) {}

        const callback = pendingWhatsAppCallback;
        closeModal();

        if (typeof callback === 'function') {
          callback(enteredName);
        }
      });
    }
  }

  function promptWhatsAppName(defaultName = '', callback) {
    const modal = document.getElementById('whatsapp-name-modal');
    const nameInput = document.getElementById('whatsapp-client-name');
    if (!modal) {
      callback(defaultName || 'Cliente');
      return;
    }

    let initialName = defaultName;
    if (!initialName) {
      try {
        initialName = localStorage.getItem('ace_client_name') || '';
      } catch (_) {}
    }

    if (nameInput) {
      nameInput.value = initialName;
    }

    pendingWhatsAppCallback = callback;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    const dialog = modal.querySelector('.modal-dialog-box');
    if (dialog) dialog.classList.remove('scale-95');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (nameInput) {
        nameInput.focus();
        nameInput.select();
      }
    }, 150);
  }

  // --- BOTONES FLOTANTES & TOAST ---
  function initFloatingButtons() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
          scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
      });
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Botón flotante de WhatsApp (esquina inferior derecha)
    const floatingBtn = document.getElementById('floating-whatsapp-btn');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        promptWhatsAppName('', (confirmedName) => {
          const phoneTarget = (window.APP_CONFIG && window.APP_CONFIG.company.whatsappNumber) || '18434469786';
          const msg = `👋 Hola Americas Continental Export, mi nombre es *${confirmedName}*. Deseo atención personalizada para cotizar repuestos o herramientas.`;
          window.open(`https://wa.me/${phoneTarget}?text=${encodeURIComponent(msg)}`, '_blank');
        });
      });
    }

    // Botón de Chat Directo en sección Concierge
    const conciergeBtn = document.getElementById('concierge-chat-btn');
    if (conciergeBtn) {
      conciergeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        promptWhatsAppName('', (confirmedName) => {
          const phoneTarget = (window.APP_CONFIG && window.APP_CONFIG.company.whatsappNumber) || '18434469786';
          const msg = `👋 Hola Americas Continental Export, mi nombre es *${confirmedName}*. Me pongo en contacto desde su sitio web para una cotización directa.`;
          window.open(`https://wa.me/${phoneTarget}?text=${encodeURIComponent(msg)}`, '_blank');
        });
      });
    }
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-pill pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border text-xs font-semibold ${
      type === 'success' 
        ? 'bg-brand-dark text-white border-accent-yellow/40' 
        : type === 'error'
        ? 'bg-red-900 text-white border-red-500'
        : 'bg-white text-brand-dark border-brand-lightGray'
    }`;

    let icon = `
      <svg class="w-5 h-5 text-accent-yellow flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;
    if (type === 'error') {
      icon = `
        <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      `;
    }

    toast.innerHTML = `
      <div class="flex items-center gap-2.5">
        ${icon}
        <span>${message}</span>
      </div>
      <button class="text-white/60 hover:text-white text-sm font-bold ml-2">×</button>
    `;

    toast.querySelector('button').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- BARRA DE PROGRESO DE SCROLL ---
  function initScrollProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = `${scrolled}%`;
    }, { passive: true });
  }

  // --- MODO OSCURO / CLARO CON PERSISTENCIA ---
  function initThemeToggle() {
    const desktopBtn = document.getElementById('theme-toggle-btn');
    const mobileBtn = document.getElementById('theme-toggle-mobile-btn');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');
    const mobileLabel = document.getElementById('theme-toggle-mobile-label');

    function applyTheme(isDark) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
        if (mobileLabel) mobileLabel.textContent = 'Claro ☀️';
      } else {
        document.documentElement.classList.remove('dark');
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (mobileLabel) mobileLabel.textContent = 'Oscuro 🌙';
      }
    }

    // Comprobar preferencia guardada o del sistema
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('ace_theme');
    } catch (_) {}

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(initialIsDark);

    function toggle() {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      const newDark = !isCurrentlyDark;
      applyTheme(newDark);
      try {
        localStorage.setItem('ace_theme', newDark ? 'dark' : 'light');
      } catch (_) {}
    }

    if (desktopBtn) desktopBtn.addEventListener('click', toggle);
    if (mobileBtn) mobileBtn.addEventListener('click', toggle);
  }

  // --- PREGUNTAS FRECUENTES (FAQ EN ACORDEÓN) ---
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');
    if (!triggers.length) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const content = item ? item.querySelector('.faq-content') : null;
        const icon = trigger.querySelector('.faq-icon');
        if (!content) return;

        const isCurrentlyOpen = !content.classList.contains('hidden');

        // Cerrar otros acordeones abiertos para mantener orden visual
        document.querySelectorAll('.faq-item').forEach(other => {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        });

        // Alternar el actual
        if (!isCurrentlyOpen) {
          content.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    });
  }

  // --- BANNER DE CONSENTIMIENTO DE COOKIES ---
  window.acceptCookies = function(type) {
    try {
      localStorage.setItem('ace_cookie_consent', type || 'all');
    } catch (_) {}
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      banner.classList.remove('opacity-100', 'translate-y-0');
      setTimeout(() => {
        banner.style.display = 'none';
      }, 350);
    }
  };

  function initCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const essentialBtn = document.getElementById('cookie-essential-btn');
    if (!banner) return;

    let consent = null;
    try {
      consent = localStorage.getItem('ace_cookie_consent');
    } catch (_) {}

    if (!consent) {
      setTimeout(() => {
        banner.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        banner.classList.add('opacity-100', 'translate-y-0');
      }, 1000);
    } else {
      banner.style.display = 'none';
    }

    if (acceptBtn) acceptBtn.addEventListener('click', () => window.acceptCookies('all'));
    if (essentialBtn) essentialBtn.addEventListener('click', () => window.acceptCookies('essential'));
  }

  // --- VALIDACIÓN VISUAL EN TIEMPO REAL ---
  function initInlineFormValidation() {
    const inputs = document.querySelectorAll('#quotation-client-form input, #quotation-client-form textarea, #requisicion-direct-form input, #requisicion-direct-form textarea, #whatsapp-client-name');
    
    inputs.forEach(input => {
      if (!input.hasAttribute('required')) return;

      function validate() {
        const val = input.value.trim();
        if (val.length >= 2) {
          input.classList.remove('field-invalid');
          input.classList.add('field-valid');
        } else {
          input.classList.remove('field-valid');
          if (val.length > 0) {
            input.classList.add('field-invalid');
          } else {
            input.classList.remove('field-invalid');
          }
        }
      }

      input.addEventListener('input', validate);
      input.addEventListener('blur', validate);
    });
  }

  // --- ANIMACIONES DE ENTRADA SUAVES (SCROLL REVEAL) ---
  function initScrollReveal() {
    const targets = document.querySelectorAll('.glass-card, .faq-item, .hero-slide, .app-section h2');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach(el => {
      el.classList.add('reveal-on-scroll');
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targets.forEach(el => observer.observe(el));
  }

  window.showToast = showToast;

})();
