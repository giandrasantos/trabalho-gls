// CONTROLE DE SEÇÕES
function showSection(sectionId) {
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("active");
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove("hidden");
        target.classList.add("active");
    }
    
    // Se abrir a home, podemos mostrar o Dashboard
    if(sectionId === 'home') updateDashboard();
}

// PRODUTOS COM ESTOQUE, FORNECEDOR E VENDAS
const products = [
    { id: 1, name: "Biquíni Tropical", price: 129.90, category: "banho", img: "imagens/biquini.webp", brand: "Água de Coco", stock: 10, sold: 0 },
    { id: 2, name: "Maiô Verão", price: 149.90, category: "banho", img: "imagens/maio.jpg", brand: "Caju Brasil", stock: 12, sold: 0 },
    { id: 3, name: "Saída de Praia Floral" , price: 120.00, category: "saidas", img: "imagens/saida.webp", brand: "Ana Hickmann", stock: 4, sold: 0 },
    { id: 4, name: "Chinelo Praia", price: 349.90, category: "calcados", img: "imagens/birkenstock.webp", brand: "Birkenstock", stock: 20, sold: 0 },
    { id: 5, name: "Óculos de Sol", price: 200.00, category: "acessorios", img: "imagens/oculos.webp", brand: "Ray-Ban", stock: 8, sold: 0 },
    { id: 6, name: "Short Estampa", price: 159.90, category: "banho", img: "imagens/shortrl.webp", brand: "Polo Ralph Lauren", stock: 15, sold: 0 }
];

const ESTOQUE_MINIMO = 5;
let cart = [];

// EXIBIR PRODUTOS (Com trava de estoque e fornecedor)
function displayProducts(filter) {
    const productGrid = document.getElementById("product-grid");
    if (!productGrid) return;
    productGrid.innerHTML = "";

    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const isEsgotado = product.stock <= 0;
        const lowStockClass = (product.stock <= ESTOQUE_MINIMO && product.stock > 0) ? "style='color: orange; font-weight: bold;'" : "";
        
        productGrid.innerHTML += `
            <div class="product-card ${isEsgotado ? 'esgotado' : ''}">
                <div class="product-img-container">
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='imagens/placeholder.jpg'">
                    ${isEsgotado ? '<div class="badge-esgotado">ESGOTADO</div>' : ''}
                </div>
                <p><small>${product.brand}</small></p>
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <p ${lowStockClass}>Estoque: ${product.stock}</p>
                <button class="btn-main" onclick="addToCart(${product.id})" ${isEsgotado ? 'disabled' : ''}>
                    ${isEsgotado ? 'Sem Estoque' : 'Adicionar'}
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    // Valida se ainda tem estoque físico antes de adicionar ao array do carrinho
    const unidadesNoCarrinho = cart.filter(item => item.id === id).length;
    
    if (product && product.stock > unidadesNoCarrinho) {
        cart.push(product);
        updateCart();
    } else {
        alert("Desculpe, não há mais unidades disponíveis deste produto!");
    }
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    if (!cartItems) return;
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        cartItems.innerHTML += `<div class="cart-item"><span>${item.name}</span><span>R$ ${item.price.toFixed(2)}</span></div>`;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = "R$ " + total.toFixed(2);
}

// FINALIZAR: Baixa no estoque e registra venda
function finalizePurchase() {
    if (cart.length === 0) return alert("Carrinho vazio!");

    cart.forEach(item => {
        const p = products.find(prod => prod.id === item.id);
        if (p) {
            p.stock--;  // Diminui estoque
            p.sold++;   // Registra venda
        }
    });

    cart = [];
    updateCart();
    displayProducts('all'); // Atualiza a vitrine com novos estoques
    showSection("finalizado");
}

// DASHBOARD TOP 5
function updateDashboard() {
    const dashboardDiv = document.getElementById("dashboard-vendas");
    if(!dashboardDiv) return;

    // Ordena por mais vendidos
    const top5 = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
    
    let html = "<h3>📊 Top 5 Mais Vendidos</h3><table style='width:100%; margin-top:10px;'>";
    html += "<tr><th>Produto</th><th>Vendas</th><th>Estoque</th></tr>";
    top5.forEach(p => {
        html += `<tr><td>${p.name}</td><td>${p.sold}</td><td>${p.stock}</td></tr>`;
    });
    html += "</table>";
    dashboardDiv.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts("all");
});