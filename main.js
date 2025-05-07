// main.js
// JavaScript extrait depuis index.html pour MehdiPlast

// Sample product data
const products = [
    // --- Supports pour Caméra ---
    {
        id: 1,
        name: "Support mural en acier",
        category: "mounts",
        price: 4200,
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
        description: "Support mural robuste en acier galvanisé pour caméras de surveillance." 
    },
    {
        id: 2,
        name: "Fixation orientable 360°",
        category: "mounts",
        price: 3700,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        description: "Support orientable pour installation flexible de caméras, intérieur/extérieur."
    },
    {
        id: 3,
        name: "Support plafond discret",
        category: "mounts",
        price: 3350,
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        description: "Support plafond compact, idéal pour caméras dôme ou mini-caméras."
    },
    {
        id: 4,
        name: "Support antivol renforcé",
        category: "mounts",
        price: 5100,
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3a8b?auto=format&fit=crop&w=800&q=80",
        description: "Support antivol en aluminium, conçu pour milieux industriels exigeants."
    },
    // --- Joints d'étanchéité ---
    {
        id: 5,
        name: "Joint torique EPDM",
        category: "sealing",
        price: 450,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        description: "Joint torique en EPDM pour étanchéité de raccords hydrauliques et pneumatiques."
    },
    {
        id: 6,
        name: "Joint plat silicone",
        category: "sealing",
        price: 690,
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
        description: "Joint plat en silicone alimentaire, résistant aux hautes températures."
    },
    {
        id: 7,
        name: "Joint mousse autocollant",
        category: "sealing",
        price: 380,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
        description: "Joint mousse à coller, idéal pour portes, coffrets, armoires électriques."
    },
    {
        id: 8,
        name: "Joint spiralé inox/PTFE",
        category: "sealing",
        price: 1200,
        image: "https://images.unsplash.com/photo-1519121788667-01c1b2edc8b9?auto=format&fit=crop&w=800&q=80",
        description: "Joint spiralé haute pression, pour brides et tuyauteries industrielles."
    },
    // --- Pièces sur mesure ---
    {
        id: 9,
        name: "Bague d'usure sur mesure",
        category: "custom",
        price: 2750,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "Bague d'usure en plastique technique, usinée à la demande."
    },
    {
        id: 10,
        name: "Entretoise polyamide",
        category: "custom",
        price: 1550,
        image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=800&q=80",
        description: "Entretoise en polyamide, fabrication sur plan pour applications mécaniques."
    },
    {
        id: 11,
        name: "Capot de protection personnalisé",
        category: "custom",
        price: 3400,
        image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=800&q=80",
        description: "Capot de protection en ABS, moulé selon vos dimensions."
    },
    {
        id: 12,
        name: "Rondelle plastique technique",
        category: "custom",
        price: 800,
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3a8b?auto=format&fit=crop&w=800&q=80",
        description: "Rondelle en plastique technique, idéale pour isolations et montages spéciaux."
    }
];

// Cart functionality
let cart = [];

// Persistance du panier (localStorage)
function saveCart() {
    localStorage.setItem('mehdiPlastCart', JSON.stringify(cart));
}
function loadCart() {
    const data = localStorage.getItem('mehdiPlastCart');
    cart = data ? JSON.parse(data) : [];
}

// Feedback visuel/toast
function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-6 py-3 rounded shadow-lg z-50 text-lg';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1300);
}

// --- Nouvelle UX page produits ---
const categories = [
    {
        key: 'mounts',
        name: 'Supports pour Caméra',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1630&q=80'
    },
    {
        key: 'sealing',
        name: "Joints d’étanchéité",
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        key: 'custom',
        name: 'Pièces sur mesure',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

function renderCategories() {
    const catList = document.getElementById('categories-list');
    if (!catList) return;
    catList.innerHTML = '';
    categories.forEach(cat => {
        // Carte catégorie
        const card = document.createElement('div');
        card.className = 'relative group bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl';
        card.style.width = '320px';
        // Contenu normal (catégorie)
        const normalContent = document.createElement('div');
        normalContent.className = 'category-normal flex flex-col items-center justify-center w-full';
        normalContent.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" class="h-40 w-40 object-cover rounded mb-4 transition-all duration-300 group-hover:scale-110">
            <h3 class="text-xl font-bold mb-2 text-blue-800">${cat.name}</h3>
            <div class="text-gray-500 text-center mb-2">Découvrez nos produits</div>
        `;
        // Mini-carrousel (caché par défaut)
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'category-carousel flex flex-col items-center justify-center w-full hidden';
        carouselDiv.style.minHeight = '220px';
        carouselDiv.innerHTML = `
            <div class="relative w-full flex flex-col items-center">
                <div class="w-full flex justify-center">
                    <img id="mini-carousel-img-${cat.key}" src="" alt="" class="h-40 w-40 object-cover rounded shadow-lg mb-2 transition-all duration-500">
                </div>
                <div id="mini-carousel-name-${cat.key}" class="text-base font-semibold text-blue-800 mb-1"></div>
            </div>
        `;
        card.appendChild(normalContent);
        card.appendChild(carouselDiv);
        // Animation mini-carrousel au survol
        let miniCarouselInterval = null;
        card.addEventListener('mouseenter', () => {
            normalContent.classList.add('hidden');
            carouselDiv.classList.remove('hidden');
            // Lance le mini-carrousel
            const catProducts = products.filter(p => p.category === cat.key);
            let idx = 0;
            function showMiniSlide() {
                const img = carouselDiv.querySelector(`#mini-carousel-img-${cat.key}`);
                const name = carouselDiv.querySelector(`#mini-carousel-name-${cat.key}`);
                if (catProducts.length > 0) {
                    img.src = catProducts[idx].image;
                    img.alt = catProducts[idx].name;
                    name.textContent = catProducts[idx].name;
                    idx = (idx + 1) % catProducts.length;
                }
            }
            showMiniSlide();
            miniCarouselInterval = setInterval(showMiniSlide, 1600);
        });
        card.addEventListener('mouseleave', () => {
            normalContent.classList.remove('hidden');
            carouselDiv.classList.add('hidden');
            // Stop le mini-carrousel
            if (miniCarouselInterval) clearInterval(miniCarouselInterval);
        });
        // Clic = carrousel complet
        card.addEventListener('click', () => {
            document.getElementById('categories-list').classList.add('hidden');
            showCategoryCarousel(cat.key);
        });
        catList.appendChild(card);
    });
}

function renderCategoryPreview(catKey) {
    const previewDiv = document.getElementById(`preview-${catKey}`);
    if (!previewDiv) return;
    const catProducts = products.filter(p => p.category === catKey).slice(0, 3);
    previewDiv.innerHTML = catProducts.map(p => `
        <div class="flex flex-col items-center mx-2">
            <img src="${p.image}" alt="${p.name}" class="h-16 w-16 object-cover rounded mb-1 border border-blue-100">
            <span class="text-xs font-semibold text-blue-800">${p.name}</span>
        </div>
    `).join('');
}

function showCategoryCarousel(catKey) {
    const container = document.getElementById('category-carousel-container');
    if (!container) return;
    container.classList.remove('hidden');
    container.innerHTML = '';
    // Bouton retour
    const backBtn = document.createElement('button');
    backBtn.className = 'mb-6 bg-gray-200 hover:bg-blue-600 hover:text-white text-blue-800 font-bold py-2 px-6 rounded transition duration-300';
    backBtn.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>Retour aux catégories';
    backBtn.onclick = () => {
        container.classList.add('hidden');
        document.getElementById('categories-list').classList.remove('hidden');
    };
    container.appendChild(backBtn);
    // Carrousel produits de la catégorie
    const catProducts = products.filter(p => p.category === catKey);
    if (catProducts.length === 0) {
        container.innerHTML += '<div class="text-center text-gray-400">Aucun produit dans cette catégorie.</div>';
        return;
    }
    let current = 0;
    function getVisibleCount() {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    function renderCarousel() {
        // Animation slide-out si déjà un slide
        const oldSlide = container.querySelector('.carousel-slide');
        if (oldSlide) {
            oldSlide.classList.add('transition-transform', 'duration-500', 'ease-in-out', 'translate-x-[-100%]', 'opacity-0');
            setTimeout(() => {
                oldSlide.remove();
            }, 500);
        }
        const slide = document.createElement('div');
        const visibleCount = getVisibleCount();
        slide.className = `carousel-slide grid grid-cols-1 sm:grid-cols-${Math.min(visibleCount,catProducts.length)} md:grid-cols-${Math.min(visibleCount,catProducts.length)} gap-8 items-stretch justify-center p-4 md:p-8 transition-all duration-700 translate-x-[100%] opacity-0`;
        for (let i = 0; i < visibleCount; i++) {
            const idx = (current + i) % catProducts.length;
            const prod = catProducts[idx];
            const prodDiv = document.createElement('div');
            prodDiv.className = 'flex flex-col items-center bg-white rounded-lg shadow-lg p-6 h-full';
            prodDiv.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}" class="h-40 w-40 md:h-56 md:w-56 object-cover rounded-lg shadow mb-4 transition-all duration-500">
                <h3 class="text-xl font-bold mb-2 text-blue-800 text-center">${prod.name}</h3>
                <p class="text-gray-600 mb-2 text-center text-base">${prod.description}</p>
                <div class="font-bold text-blue-800 text-lg mb-4">${prod.price} DA</div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 add-to-cart-btn" data-id="${prod.id}">Ajouter au panier</button>
            `;
            slide.appendChild(prodDiv);
        }
        container.appendChild(slide);
        // Animation slide-in
        setTimeout(() => {
            slide.classList.remove('translate-x-[100%]', 'opacity-0');
            slide.classList.add('translate-x-0', 'opacity-100');
        }, 10);
        // Flèches navigation
        let nav = container.querySelector('.carousel-nav');
        if (!nav && catProducts.length > visibleCount) {
            nav = document.createElement('div');
            nav.className = 'carousel-nav flex justify-center gap-8 mt-4';
            nav.innerHTML = `
                <button id="carousel-prev" class="bg-white hover:bg-blue-600 hover:text-white text-blue-800 font-bold rounded-full p-3 shadow-lg transition"><i class="fas fa-chevron-left"></i></button>
                <button id="carousel-next" class="bg-white hover:bg-blue-600 hover:text-white text-blue-800 font-bold rounded-full p-3 shadow-lg transition"><i class="fas fa-chevron-right"></i></button>
            `;
            container.appendChild(nav);
            nav.querySelector('#carousel-prev').addEventListener('click', () => {
                current = (current - visibleCount + catProducts.length) % catProducts.length;
                renderCarousel();
            });
            nav.querySelector('#carousel-next').addEventListener('click', () => {
                current = (current + visibleCount) % catProducts.length;
                renderCarousel();
            });
        }
        // Ajout au panier
        slide.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                addToCart(id);
            });
        });
    }
    renderCarousel();
    window.addEventListener('resize', renderCarousel);
}

// Initialisation page produits
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCategories();
    updateCartCount();
    // Recherche
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.trim().toLowerCase();
            // Filtre les catégories selon le nom
            document.querySelectorAll('#categories-list > div').forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = name.includes(term) ? '' : 'none';
            });
        });
    }
});


// Filtre les produits selon la catégorie
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        renderProducts(products.filter(p => p.category === category));
    }
}

// Initialisation des filtres et affichage produits au chargement
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts(products);
    updateCartCount();
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
            btn.classList.add('bg-blue-600', 'text-white');
            filterProducts(btn.getAttribute('data-category'));
        });
    });
    setTimeout(() => {
        const clearBtn = document.getElementById('clear-cart-btn');
        if (clearBtn) {
            clearBtn.onclick = null;
            clearBtn.addEventListener('click', clearCart);
        }
        rebindCartSidebarListeners();
    }, 200);
});

// Fonctions extraites depuis index.html (à compléter avec toutes les fonctions JS)

function openProductModal(productId) {
    // ...
}

function closeModal() {
    // ...
}

function increaseQty() {
    // ...
}

function decreaseQty() {
    // ...
}

function addToCartFromModal() {
    // ...
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (cartSidebar) {
        const isOpen = !cartSidebar.classList.contains('translate-x-full');
        if (isOpen) {
            cartSidebar.classList.add('translate-x-full');
            if (overlay) overlay.classList.add('hidden');
        } else {
            cartSidebar.classList.remove('translate-x-full');
            if (overlay) overlay.classList.remove('hidden');
            renderCartItems();
        }
    }
}

function addToCart(productId, quantity = 1) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity += quantity;
        showToast('Quantité augmentée');
    } else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, quantity });
            showToast('Produit ajouté au panier');
        }
    }
    updateCartCount();
    saveCart();
    showAddToCartFeedback();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function showAddToCartFeedback() {
    // Affiche un petit feedback visuel sur le bouton ou le panier
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.classList.add('animate-bounce');
        setTimeout(() => cartToggle.classList.remove('animate-bounce'), 600);
    }
}

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItemsDiv || !cartTotal) return;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-gray-400 text-center">Votre panier est vide.</p>';
        cartTotal.textContent = '0 DA';
        return;
    }
    let total = 0;
    cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h4 class="font-bold">${item.name}</h4>
                    <div class="text-sm text-gray-500">${item.price} DA x 
                        <button class='inline px-2 py-0.5 bg-gray-200 rounded-l hover:bg-blue-200 decrease-qty-btn' data-id='${item.id}'>-</button>
                        <span class='inline-block w-8 text-center'>${item.quantity}</span>
                        <button class='inline px-2 py-0.5 bg-gray-200 rounded-r hover:bg-blue-200 increase-qty-btn' data-id='${item.id}'>+</button>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800 remove-from-cart-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');
    cartTotal.textContent = `${total} DA`;
    // Ajoute l'écouteur pour supprimer un produit du panier
    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            removeFromCart(id);
        });
    });
    // Ajoute les écouteurs pour les boutons + / -
    document.querySelectorAll('.increase-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeCartQty(id, 1);
        });
    });
    document.querySelectorAll('.decrease-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeCartQty(id, -1);
        });
    });
    updateCheckoutBtn();
    rebindCartSidebarListeners();
}

function changeCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCartItems();
            updateCartCount();
            saveCart();
            showToast('Quantité modifiée');
        }
    }
}

function removeFromCart(productId) {
    if (confirm('Supprimer ce produit du panier ?')) {
        cart = cart.filter(item => item.id !== productId);
        renderCartItems();
        updateCartCount();
        saveCart();
        showToast('Produit retiré du panier');
    }
}

function updateCheckoutBtn() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = (cart.length === 0);
        checkoutBtn.classList.toggle('opacity-50', cart.length === 0);
    }
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

function toggleMobileMenu() {
    // ...
}

function clearCart() {
    if (confirm('Voulez-vous vraiment vider tout le panier ?')) {
        cart = [];
        saveCart();
        renderCartItems();
        updateCartCount();
        showToast('Panier vidé');
    }
}

function rebindCartSidebarListeners() {
    // Réactive l'écouteur sur la croix de fermeture
    const closeCart = document.getElementById('cart-close');
    if (closeCart) {
        closeCart.onclick = null;
        closeCart.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleCart();
        });
    }
    // Réactive l'écouteur sur le bouton commander
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = null;
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            proceedToCheckout();
        });
    }
}

// Gestion du panier
window.addEventListener('DOMContentLoaded', () => {
    // Toggle du panier
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }
    // Overlay et ESC
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const cartSidebar = document.getElementById('cart-sidebar');
            if (cartSidebar) cartSidebar.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartSidebar = document.getElementById('cart-sidebar');
            const overlay = document.getElementById('cart-overlay');
            if (cartSidebar && !cartSidebar.classList.contains('translate-x-full')) {
                cartSidebar.classList.add('translate-x-full');
                if (overlay) overlay.classList.add('hidden');
            }
        }
    });
    // (Ré)attacher croix et checkout-btn via rebindCartSidebarListeners
    setTimeout(rebindCartSidebarListeners, 200);
});

// --- Recherche dynamique sur produits.html ---
if (window.location.pathname.endsWith('produits.html')) {
    let filteredCategory = 'all';
    let searchTerm = '';
    // On garde une référence aux produits d'origine
    const baseProducts = [...products];
    function renderFilteredProducts() {
        let filtered = baseProducts;
        if (filteredCategory !== 'all') {
            filtered = filtered.filter(p => p.category === filteredCategory);
        }
        if (searchTerm.trim() !== '') {
            const term = searchTerm.trim().toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(term) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
        }
        renderProducts(filtered);
    }
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                renderFilteredProducts();
            });
        }
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                filteredCategory = btn.getAttribute('data-category');
                renderFilteredProducts();
            });
        });
    });
}

// --- Menu mobile hamburger ---
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        // Ferme le menu mobile quand on clique sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// --- Carousel Produits Vedettes sur l'accueil, effet center mode, sans flou, écart réduit ---
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
    document.addEventListener('DOMContentLoaded', function() {
        const carouselInner = document.getElementById('carousel-inner');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        if (!carouselInner || !prevBtn || !nextBtn) return;
        const slides = products.map(product => `
            <div class="carousel-slide flex flex-col items-center justify-center p-6 transition-all duration-700">
                <img src="${product.image}" alt="${product.name}" class="carousel-img h-56 w-56 md:h-72 md:w-72 object-cover rounded-lg shadow-lg mb-4" loading="lazy">
                <h3 class="text-xl md:text-2xl font-bold mb-2 text-blue-800">${product.name}</h3>
                <p class="text-gray-600 mb-2 text-center text-base md:text-lg">${product.description}</p>
                <div class="font-bold text-blue-800 text-lg md:text-xl mb-2">${product.price} DA</div>
            </div>
        `);
        let current = 0;
        const showCount = 3;
        function renderSlides(start) {
            let html = '';
            for (let i = 0; i < showCount; i++) {
                const idx = (start + i) % slides.length;
                let slideClass = 'opacity-80 scale-95';
                if (i === 1) slideClass = 'opacity-100 scale-105 z-10'; // slide centrale
                html += `<div class="flex-1 mx-3 carousel-anim ${slideClass}">${slides[idx]}</div>`;
            }
            carouselInner.innerHTML = `<div class="flex flex-row justify-center items-stretch transition-transform duration-700">${html}</div>`;
        }
        function slideTo(direction) {
            carouselInner.firstChild && (carouselInner.firstChild.style.transition = 'transform 0.7s cubic-bezier(0.77,0,0.18,1)');
            carouselInner.firstChild && (carouselInner.firstChild.style.transform = `translateX(${direction === 'left' ? '-100%' : '100%'})`);
            setTimeout(() => {
                current = (current + (direction === 'left' ? 1 : -1) + slides.length) % slides.length;
                renderSlides(current);
            }, 400);
        }
        renderSlides(current);
        prevBtn.addEventListener('click', () => slideTo('right'));
        nextBtn.addEventListener('click', () => slideTo('left'));
        setInterval(() => {
            slideTo('left');
        }, 4000);
    });
}
