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

    const [ano, mes, dia] = prazo.split('-');
    const prazoFormatado = `${dia}/${mes}/${ano}`;

    if (currentTask) {
        // Atualizar tarefa existente
        currentTask.querySelector('.task-title').textContent = `Título: ${titulo}`;
        currentTask.querySelector('.task-descricao').textContent = `Descrição: ${descricao}`;
        currentTask.querySelector('.task-responsavel').textContent = `Responsável: ${responsavel}`;
        currentTask.querySelector('.task-prioridade').textContent = `Prioridade: ${prioridade}`;
        currentTask.querySelector('.task-prazo').textContent = `Prazo: ${prazoFormatado}`;
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
                                    <span class="task-title">Título: ${titulo}</span>
                                    <div class="task-descricao">Descrição: ${descricao}</div>
                                    <div class="task-responsavel">Responsável: ${responsavel}</div>
                                    <div class="task-prioridade">Prioridade: ${prioridade}</div>
                                    <div class="task-prazo">Prazo: ${prazoFormatado}</div>
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
        atualizarCorTarefa(tarefa, status);
    }

    currentTask = null;
    fecharFormulario();
    salvarTarefas();
}


function editarTarefa(tarefa) {
    currentTask = tarefa;
    const form = document.getElementById('taskForm');
    form.titulo.value = tarefa.querySelector('.task-title').textContent.replace('Título: ', '').trim();
    form.descricao.value = tarefa.querySelector('.task-descricao').textContent.replace('Descrição: ', '').trim();
    form.responsavel.value = tarefa.querySelector('.task-responsavel').textContent.replace('Responsável: ', '').trim();
    form.prioridade.value = tarefa.querySelector('.task-prioridade').textContent.replace('Prioridade: ', '').trim();
    const prazo = tarefa.dataset.prazo;
    form.prazo.value = prazo;
    form.status.value = tarefa.dataset.status;

    abrirFormulario();
}


function excluirTarefa() {
    if (currentTask) {
        const confirmacao = confirm("Tem certeza de que deseja excluir esta tarefa?");
        if (confirmacao) {
            currentTask.remove();
            currentTask = null;
            salvarTarefas();
        }
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
        // Verificar se a tarefa já está no quadro correto
        if (dropzone.id !== draggable.parentNode.id) {
            // Atualizar a cor e posição da tarefa
            atualizarCorTarefa(draggable, dropzone.id);
            dropzone.appendChild(draggable);
            draggable.dataset.status = dropzone.id;
            salvarTarefas(); // Salvar a alteração no localStorage
        }
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

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('.task').forEach(task => {
        tarefas.push({
            id: task.id,
            titulo: task.querySelector('span').textContent.trim(),
            descricao: task.dataset.descricao,
            responsavel: task.dataset.responsavel,
            prioridade: task.dataset.prioridade,
            prazo: task.dataset.prazo,
            status: task.dataset.status
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefa => {
        const tarefaExistente = document.getElementById(tarefa.id);
        if (!tarefaExistente) {
            const [ano, mes, dia] = tarefa.prazo.split('-');
            const prazoFormatado = `${dia}/${mes}/${ano}`;

            const taskElement = document.createElement('div');
            taskElement.className = `task ${tarefa.status}`;
            taskElement.draggable = true;
            taskElement.innerHTML = `<div class="task-content">
                                        <div class="task-info">
                                            <div class="color-indicator"></div>
                                            <span class="task-title">Título: ${tarefa.titulo}</span>
                                            <div class="task-descricao">Descrição: ${tarefa.descricao}</div>
                                            <div class="task-responsavel">Responsável: ${tarefa.responsavel}</div>
                                            <div class="task-prioridade">Prioridade: ${tarefa.prioridade}</div>
                                            <div class="task-prazo">Prazo: ${prazoFormatado}</div>
                                        </div>`;
            taskElement.dataset.descricao = tarefa.descricao;
            taskElement.dataset.responsavel = tarefa.responsavel;
            taskElement.dataset.prioridade = tarefa.prioridade;
            taskElement.dataset.prazo = tarefa.prazo;
            taskElement.dataset.status = tarefa.status;
            taskElement.id = tarefa.id;

            taskElement.ondragstart = dragStart;
            taskElement.ondragend = dragEnd;
            taskElement.onclick = () => editarTarefa(taskElement); 

            document.getElementById(tarefa.status).appendChild(taskElement);
            atualizarCorTarefa(taskElement, tarefa.status);
        }
    });
}

function buscarTarefas() {
    const termo = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.task').forEach(task => {
        const titulo = task.querySelector('span').textContent.toLowerCase();
        const descricao = task.dataset.descricao.toLowerCase();
        if (titulo.includes(termo) || descricao.includes(termo)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function filtrarTarefas() {
    const filtro = document.getElementById('filtroPrioridade').value;
    document.querySelectorAll('.task').forEach(task => {
        if (!filtro || task.dataset.prioridade === filtro) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', () => editarTarefa(task));
        task.addEventListener('dragend', dragEnd);
    });

    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });

    carregarTarefas();
});

