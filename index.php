<?php
session_start();

// Simulação simples de usuário (substituir por banco de dados depois)
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Cadastro
    if (isset($_POST['cadastro'])) {
        $_SESSION['usuario'] = $_POST['nome'];
        header("Location: index.php");
        exit();
    }

    // Login
    if (isset($_POST['login'])) {
        $_SESSION['usuario'] = $_POST['email'];
        header("Location: index.php");
        exit();
    }

    // Logout
    if (isset($_POST['logout'])) {
        session_destroy();
        header("Location: index.php");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>GLS - Moda Praia</title>
    <link rel="stylesheet" href="gls1.css">
</head>
<body>

<header>
    <img src="GLS.png" alt="Logotipo da empresa" width="300">

    <nav>
        <button onclick="showSection('categorias')">Categorias</button>

        <?php if(isset($_SESSION['usuario'])): ?>
            <span>Olá, <?php echo $_SESSION['usuario']; ?> 👋</span>
            <form method="POST" style="display:inline;">
                <button type="submit" name="logout">Sair</button>
            </form>
        <?php else: ?>
            <button onclick="showSection('login')">Login</button>
        <?php endif; ?>

        <button class="cart-btn" onclick="showSection('carrinho')">
            🛒 <span id="cart-count">0</span>
        </button>
    </nav>
</header>

<main>

    <!-- HOME -->
    <section id="home" class="active">
        <div class="hero">
            <h1>Verão 2026</h1>
            <p>Sinta a brisa do mar com estilo.</p>
            <button onclick="showSection('categorias')">Ver Coleção</button>
        </div>
    </section>

    <!-- LOGIN -->
    <section id="login" class="hidden">
        <div class="form-container">
            <h2>Login</h2>
            <form method="POST">
                <input type="email" name="email" placeholder="E-mail" required>
                <input type="password" name="senha" placeholder="Senha" required>
                <button class="btn-main" type="submit" name="login">Entrar</button>
            </form>
            <p>Não tem conta?
                <a href="#" onclick="showSection('cadastro')">Cadastre-se</a>
            </p>
        </div>
    </section>

    <!-- CADASTRO -->
    <section id="cadastro" class="hidden">
        <div class="form-container">
            <h2>Cadastro</h2>
            <form method="POST">
                <input type="text" name="nome" placeholder="Nome Completo" required>
                <input type="email" name="email" placeholder="E-mail" required>
                <input type="password" name="senha" placeholder="Crie uma Senha" required>
                <button class="btn-main" type="submit" name="cadastro">Criar Conta</button>
            </form>
            <p>Já tem conta?
                <a href="#" onclick="showSection('login')">Fazer Login</a>
            </p>
        </div>
    </section>

    <!-- CATEGORIAS -->
    <section id="categorias" class="hidden">
        <div class="filter-bar">
            <button onclick="filterProducts('all')">Todos</button>
            <button onclick="filterProducts('banho')">Roupas de Banho</button>
            <button onclick="filterProducts('saidas')">Saídas de Praia</button>
            <button onclick="filterProducts('calcados')">Calçados</button>
            <button onclick="filterProducts('acessorios')">Acessórios</button>
        </div>
        <div id="product-grid" class="product-grid"></div>
    </section>

    <!-- CARRINHO -->
    <section id="carrinho" class="hidden">
        <?php if(isset($_SESSION['usuario'])): ?>
            <h2>Seu Carrinho</h2>
            <div id="cart-items"></div>
            <div class="cart-total">
                <p>Total: <span id="total-price">R$ 0,00</span></p>
                <button class="btn-main" onclick="finalizePurchase()">
                    Finalizar Compra
                </button>
            </div>
        <?php else: ?>
            <h2>Você precisa estar logado para acessar o carrinho.</h2>
            <button onclick="showSection('login')" class="btn-main">
                Fazer Login
            </button>
        <?php endif; ?>
    </section>

    <!-- COMPRA FINALIZADA -->
    <section id="finalizado" class="hidden">
        <div class="success-message">
            <h2>✨ Compra Realizada!</h2>
            <p>Obrigada por escolher a GLS Moda Praia.</p>
            <button class="btn-main" onclick="showSection('home')">
                Voltar ao Início
            </button>
        </div>
    </section>

</main>

<script src="gls1.js"></script>
</body>
</html>