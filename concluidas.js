// Carregar tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Filtrar apenas concluídas
let concluidas = tarefas.filter(t => t.concluida);

// Selecionar lista
const lista = document.getElementById("lista-concluidas");

// Renderizar lista de concluídas
if (concluidas.length === 0) {
  lista.innerHTML = "<p style='text-align:center; color:#777;'>Nenhuma tarefa concluída ainda 🐶</p>";
} else {
  concluidas.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t.texto;
    li.classList.add("completed"); // aplica estilo de concluída
    lista.appendChild(li);
  });
}
