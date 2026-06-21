// Armazena os produtos do carrinho
let carrinho = [];

// Variavel que armazena o valor total da compra
let total = 0;

document.addEventListener("DOMContentLoaded", () => {

    // ARMAZENAR
    // Recupera os dados salvos anteriormente no navegador
    const carrinhoSalvo = localStorage.getItem("carrinho");
    const totalSalvo = localStorage.getItem("total");

    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }

    if (totalSalvo) {
        total = Number(totalSalvo);
    }

    atualizarCarrinho();

    const iconeCarrinho =
        document.getElementById("icone-carrinho");

    const carrinhoPopup =
        document.getElementById("carrinho-popup");

    iconeCarrinho.addEventListener("click", () => {
        carrinhoPopup.classList.toggle("aberto");
    });

    const botoes =
        document.querySelectorAll(".btn-carrinho");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const produto =
                botao.parentElement;

            const nome =
                produto.querySelector("h3").textContent;

            const precoElemento =
                produto.querySelector(".preco");

            let preco;

            if(precoElemento.dataset.desconto){
                preco = parseFloat(precoElemento.dataset.desconto);
            }else{
                preco = parseFloat(precoElemento.dataset.preco);
            }

            if (!isNaN(preco)) {
                adicionarCarrinho(nome, preco);
            }

        });

    });

});

/*
FUNÇÃO ADICIONAR
Responsável por adicionar um produto
ao carrinho de compras.
*/
function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome,
        preco
    });

    total += preco;

    // Salva os dados apos adicionar
    salvarCarrinho();

    atualizarCarrinho();
}

/*
FUNÇÃO ARMAZENAR
Salva os produtos e o total no
localStorage do navegador.
*/
function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    localStorage.setItem(
        "total",
        total
    );
}

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista-carrinho");

    const totalElemento =
        document.getElementById("total");

    const contador =
        document.getElementById("contador-carrinho");

    lista.innerHTML = "";

    carrinho.forEach((produto, indice) => {

        const item =
            document.createElement("li");

        item.innerHTML = `
            <span>
                ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            </span>

            <button
                class="btn-remover"
                onclick="removerProduto(${indice})">
                X
            </button>
        `;

        lista.appendChild(item);

    });

    totalElemento.textContent =
        total.toFixed(2);

    contador.textContent =
        carrinho.length;
}

/*
FUNÇÃO REMOVER
Remove um produto do carrinho
de compras.
*/
function removerProduto(indice) {

    total -= carrinho[indice].preco;

    carrinho.splice(indice, 1);

    // Salva os dados após remover
    salvarCarrinho();

    atualizarCarrinho();
}

const btnLogin =
document.getElementById("btn-login");

btnLogin.addEventListener("click", () => {

    const nome =
    document.getElementById("nome").value;

    const email =
    document.getElementById("email").value;

    if(nome === "" || email === ""){
        alert("Preencha todos os campos!");
        return;
    }

    document.getElementById("login-overlay")
    .style.display = "none";

    aplicarDesconto();
});

function aplicarDesconto(){

    const precos =
    document.querySelectorAll(".preco");

    precos.forEach(preco => {

        const valorOriginal =
        Number(preco.dataset.preco);

        const valorComDesconto =
        valorOriginal * 0.8;

        preco.dataset.desconto =
        valorComDesconto;

        preco.innerHTML = `
            <del>R$ ${valorOriginal.toFixed(2)}</del>
            <br>
            R$ ${valorComDesconto.toFixed(2)}
        `;
    });

}