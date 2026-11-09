const input = document.querySelector(".input1") // input para escrever a tarefa
const botao = document.querySelector(".btn") // botao de add
const list = document.querySelector(".list") // div onde ficara as tarefas
const contador = document.querySelector("#contador") // CORRIGIDO: Agora aponta para o ID correto do seu HTML

// Função responsável por contar os checkboxes e atualizar o texto na tela
function atualizarContador() {
    // 1. Seleciona TODOS os checkboxes com a classe '.inpt' na tela
    const todosCheckboxes = document.querySelectorAll(".inpt");
    
    // 2. Filtra a lista para pegar apenas os que estão marcados (.checked)
    const concluidas = Array.from(todosCheckboxes).filter(checkbox => checkbox.checked).length;
    
    // 3. Pega a quantidade total de tarefas existentes
    const total = todosCheckboxes.length;
    
    // 4. Altera o texto do elemento HTML usando o padrão do seu HTML ("0 of 3")
    contador.textContent = `${concluidas} of ${total}`;
}

// Configura as tarefas que JÁ ESTÃO no HTML para atualizarem o contador ao serem clicadas
function configurarTarefasIniciais() {
    const checkboxesIniciais = document.querySelectorAll(".inpt");
    checkboxesIniciais.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarContador);
    });
}

botao.addEventListener('click', function(evento){
    evento.preventDefault(); 
    
    // VALIDAÇÃO: Verifica se o input está vazio (removendo espaços extras)
    if (input.value.trim() === "") {
        alert("Por favor, digite uma tarefa antes de adicionar!"); 
        return; 
    }
    criaCheckBox();
    cleanInput();
})

function criaCheckBox(){
    // 1. Cria a DIV contêiner para esta linha de tarefa
    const divTarefa = document.createElement("div");
    divTarefa.className = "item-tarefa"; 

    const newCheckbox = document.createElement("input");
    const label = document.createElement("label");
    const idUnico = "task_" + Date.now();

    // 2. Configura o Checkbox
    newCheckbox.type = "checkbox";
    newCheckbox.className = "inpt";
    newCheckbox.id = idUnico;
    newCheckbox.addEventListener('change', atualizarContador);

    // 3. Configura o Label
    label.innerHTML = input.value;
    label.className = "label";
    label.setAttribute("for", idUnico);

    // 4. Agrupa dentro do contêiner e injeta na lista principal
    divTarefa.appendChild(newCheckbox);
    divTarefa.appendChild(label);
    list.appendChild(divTarefa);

    atualizarContador();
}


function cleanInput(){
    input.value = ""; // Limpa o input totalmente
}

// --- INICIALIZAÇÃO DO APP ---
// 1. Ativa o clique nas tarefas que já vieram prontas no HTML
configurarTarefasIniciais();

// 2. Executa uma vez para calcular o valor inicial correto (ex: "0 of 3")
atualizarContador();
