//Menu principal
function toggleMenu() {
    let menu = document.querySelector(".side-menu");
    
    // Alterna entre abrir e fechar o menu
    menu.classList.toggle("open");
}

// Função para buscar estados do IBGE
async function carregarEstados() {
    try {
        let response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        if (!response.ok) throw new Error("Erro ao buscar estados");

        let estados = await response.json();
        let select = document.getElementById("estados");

        // Preencher o select com os estados
        estados.forEach(estado => {
            let option = document.createElement("option");
            option.value = estado.id; // O ID do estado é usado para buscar municípios
            option.textContent = `${estado.nome} (${estado.sigla})`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error("Erro ao carregar estados:", erro);
    }
}

// Função para buscar municípios de um estado
async function carregarMunicipios(estadoId) {
    try {
        let response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        if (!response.ok) throw new Error("Erro ao buscar municípios");

        let municipios = await response.json();
        let lista = document.getElementById("municipios");
        lista.innerHTML = ""; // Limpa a lista antes de adicionar novos municípios

        // Adiciona os municípios na lista
        municipios.forEach(municipio => {
            let item = document.createElement("li");
            item.textContent = municipio.nome;
            lista.appendChild(item);
        });

    } catch (erro) {
        console.error("Erro ao carregar municípios:", erro);
    }
}

// Quando o usuário selecionar um estado, buscar os municípios
document.getElementById("estados").addEventListener("change", function() {
    let estadoId = this.value;
    if (estadoId) {
        carregarMunicipios(estadoId);
    } else {
        document.getElementById("municipios").innerHTML = ""; // Se nenhum estado for selecionado, limpar a lista
    }
});

// Carregar estados ao iniciar
carregarEstados();
