function confirmarCurso() {
    const curso = document.getElementById('curso').value;
    const cursoNome = document.getElementById('cursoNome');

    if (curso !== '') {
        cursoNome.textContent = curso;
        document.getElementById('confirmacao').style.display = 'block';
    }
}

function abrirCurso() {
    const curso = document.getElementById('curso').value;
    const url = gerarLinkCurso(curso);
    window.open(url, '_blank', 'width=600,height=300');
    document.getElementById('confirmacao').style.display = 'none';
}

function cancelarConfirmacao() {
    document.getElementById('confirmacao').style.display = 'none';
}

function gerarLinkCurso(curso) {
    switch (curso) {
        case 'ads':
            return "https://fatecsorocaba.edu.br/curso_ads.asp";
        case 'biomedicos':
            return "https://fatecsorocaba.edu.br/curso_sb.asp";
        case 'fabricacao':
            return "https://fatecsorocaba.edu.br/curso_fm.asp";
        case 'logistica':
            return "https://fatecsorocaba.edu.br/curso_log.asp";
        case 'projetos':
            return "https://fatecsorocaba.edu.br/curso_proj.asp";
        default:
            return '';
    }
}
