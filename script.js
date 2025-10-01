const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

const btnTodas = document.getElementById("btn-todas");
const btnConcluidas = document.getElementById("btn-concluidas");

let filtro = "todas"; // pode ser "todas" ou "concluidas"

// Carregar tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
renderTarefas();

// Adicionar nova tarefa
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const tarefa = input.value.trim();

  if (!tarefa) {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  tarefas.push({ texto: tarefa, concluida: false });
  salvarTarefas();
  renderTarefas();
  input.value = "";
});

// Botões de filtro
btnTodas.addEventListener("click", () => {
  filtro = "todas";
  renderTarefas();
});

btnConcluidas.addEventListener("click", () => {
  filtro = "concluidas";
  renderTarefas();
});

// Renderizar lista
function renderTarefas() {
  lista.innerHTML = "";

  let listaFiltrada = tarefas;
  if (filtro === "concluidas") {
    listaFiltrada = tarefas.filter(t => t.concluida);
  }

  if (listaFiltrada.length === 0) {
    lista.innerHTML = "<p style='text-align:center; color:#777;'>Nenhuma tarefa encontrada 🐾</p>";
    return;
  }

  listaFiltrada.forEach((t, i) => {
    const li = document.createElement("li");

    // Texto
    const span = document.createElement("span");
    span.textContent = t.texto;
    if (t.concluida) {
      li.classList.add("completed");
    }

    // Botão concluir
    const btnCheck = document.createElement("button");
    btnCheck.textContent = "✔";
    btnCheck.classList.add("check-btn");
    btnCheck.onclick = () => {
      tarefas[i].concluida = !tarefas[i].concluida;
      salvarTarefas();
      renderTarefas();
    };

    // Botão remover
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "X";
    btnRemove.classList.add("remove-btn");
    btnRemove.onclick = (e) => {
      e.stopPropagation();
      tarefas.splice(i, 1);
      salvarTarefas();
      renderTarefas();
    };

    li.appendChild(span);
    li.appendChild(btnCheck);
    li.appendChild(btnRemove);
    lista.appendChild(li);
  });
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
