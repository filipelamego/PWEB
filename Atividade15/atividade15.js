function validar() {
    // Validação do nome
    const nome = document.forms[0].elements["nome"].value;
    if (nome.length < 10) {
      alert("O nome deve ter pelo menos 10 caracteres.");
      return false;
    }
   
    // Validação do email
    const email = document.forms[0].elements["email"].value;
    if (!email.includes("@") || !email.includes(".")) {
      alert("O email deve conter os caracteres '@' e '.'.");
      return false;
    }
   
    // Validação do comentário
    const comentario = document.forms[0].elements["comentario"].value;
    if (comentario.length < 20) {
      alert("O comentário deve ter pelo menos 20 caracteres.");
      return false;
    }
   
    // Validação da pesquisa
    const pesquisaSim = document.forms[0].elements["pesquisaSim"].checked;
    if (pesquisaSim) {
      alert("Que bom que você voltou a visitar essa página!");
    } else {
      alert("Volte sempre a esta página!");
    }
   
    // Retorna true para permitir o envio do formulário
    return true;
  }