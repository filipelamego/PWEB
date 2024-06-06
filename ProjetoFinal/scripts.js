let currentTask = null;

function abrirFormulario() {
    document.getElementById('taskFormModal').style.display = 'block';
    if (!currentTask) {
        document.getElementById('taskForm').reset();
        document.getElementById('formTitle').textContent = 'Nova Tarefa';
        document.querySelector('.form-buttons button[onclick="excluirTarefa()"]').style.display = 'none'; // Esconder botão excluir
    } else {
        document.getElementById('formTitle').textContent = 'Editar Tarefa';
        document.querySelector('.form-buttons button[onclick="excluirTarefa()"]').style.display = 'inline-block'; // Mostrar botão excluir
    }
}

function fecharFormulario() {
    document.getElementById('taskFormModal').style.display = 'none';
}

function salvarTarefa() {
    const form = document.getElementById('taskForm');
    const titulo = form.titulo.value;
    const descricao = form.descricao.value;
    const responsavel = form.responsavel.value;
    const prioridade = form.prioridade.value;
    const prazo = form.prazo.value;
    const status = form.status.value;

    if (currentTask) {
        // Atualizar tarefa existente
        currentTask.querySelector('span').textContent = titulo;
        currentTask.dataset.descricao = descricao;
        currentTask.dataset.responsavel = responsavel;
        currentTask.dataset.prioridade = prioridade;
        currentTask.dataset.prazo = prazo;
        currentTask.dataset.status = status;

        // Atualizar a cor e posição da tarefa
        atualizarCorTarefa(currentTask, status);
        document.getElementById(status).appendChild(currentTask);
    } else {
        // Criar nova tarefa
        const tarefa = document.createElement('div');
        tarefa.className = `task ${status}`;
        tarefa.draggable = true;
        tarefa.innerHTML = `<div class="task-content">
                                <div class="task-info">
                                    <div class="color-indicator"></div>
                                    <span>${titulo}</span>
                                </div>`;
        tarefa.dataset.descricao = descricao;
        tarefa.dataset.responsavel = responsavel;
        tarefa.dataset.prioridade = prioridade;
        tarefa.dataset.prazo = prazo;
        tarefa.dataset.status = status;
        tarefa.id = `task-${Date.now()}`;

        tarefa.ondragstart = dragStart;
        tarefa.ondragend = dragEnd;
        tarefa.onclick = () => editarTarefa(tarefa); // Adicionando evento de clique para edição

        document.getElementById(status).appendChild(tarefa);
    }

    currentTask = null;
    fecharFormulario();
}

function editarTarefa(tarefa) {
    currentTask = tarefa;
    const form = document.getElementById('taskForm');
    form.titulo.value = tarefa.querySelector('span').textContent.trim();
    form.descricao.value = tarefa.dataset.descricao;
    form.responsavel.value = tarefa.dataset.responsavel;
    form.prioridade.value = tarefa.dataset.prioridade;
    form.prazo.value = tarefa.dataset.prazo;
    form.status.value = tarefa.dataset.status;

    abrirFormulario();
}

function excluirTarefa() {
    if (currentTask) {
        currentTask.remove();
        currentTask = null;
    }
    fecharFormulario();
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    const dropzone = event.target.closest('.column');
    if (dropzone && draggable) {
        dropzone.appendChild(draggable);
        atualizarCorTarefa(draggable, dropzone.id);
    }
}

function atualizarCorTarefa(tarefa, colunaId) {
    const colorIndicator = tarefa.querySelector('.color-indicator');
    tarefa.classList.remove('pendente', 'andamento', 'concluida');
    if (colunaId === 'pendentes') {
        tarefa.classList.add('pendente');
        colorIndicator.style.backgroundColor = 'green';
    } else if (colunaId === 'emAndamento') {
        tarefa.classList.add('andamento');
        colorIndicator.style.backgroundColor = 'yellow';
    } else if (colunaId === 'concluidas') {
        tarefa.classList.add('concluida');
        colorIndicator.style.backgroundColor = 'red';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', () => editarTarefa(task)); // Adicionando evento de clique para edição
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });

    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });
});
