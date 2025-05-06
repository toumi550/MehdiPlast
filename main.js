// main.js
// JavaScript extrait depuis index.html pour MehdiPlast

// Sample product data
const products = [
    {
        id: 1,
        name: "Support pour Caméra",
        category: "mounts",
        price: 3900,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1630&q=80",
        description: "Support robuste et adaptable pour caméras industrielles."
    },
    {
        id: 2,
        name: "Joint d'Étanchéité",
        category: "sealing",
        price: 850,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Composant d'étanchéité haute performance pour applications industrielles."
    },
    {
        id: 3,
        name: "Pièce Sur Mesure",
        category: "custom",
        price: 7200,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fabrication de pièces plastiques sur mesure selon vos besoins."
    },
    {
        id: 4,
        name: "Support Universel",
        category: "mounts",
        price: 3100,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Support universel pour divers équipements industriels."
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

// Affiche les produits dans la grille
function renderProducts(productsToRender) {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;
    productsList.innerHTML = '';
    if (productsToRender.length === 0) {
        productsList.innerHTML = '<div class="col-span-3 text-center text-gray-400">Aucun produit trouvé.</div>';
        return;
    }
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col items-center';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="h-40 w-40 object-cover rounded mb-4" loading="lazy">
            <h3 class="text-lg font-bold mb-2">${product.name}</h3>
            <p class="text-gray-500 mb-2">${product.description}</p>
            <div class="font-bold text-blue-800 mb-4">${product.price} DA</div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 add-to-cart-btn" data-id="${product.id}">Ajouter au panier</button>
        `;
        productsList.appendChild(productCard);
    });
    // Ajoute l'écouteur sur chaque bouton "Ajouter au panier"
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

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
