// =============================================
//  VALIDAÇÃO DE FORMULÁRIO + LOCALSTORAGE
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cidade = document.getElementById('cidade').value.trim();

    if (!nome || !email) {
      showToast('⚠️ Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Cria o objeto com os dados
    const usuario = { nome, email, cidade };

    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Confirma o cadastro
    showToast('✅ Cadastro realizado com sucesso!', 'success');

    // Limpa o formulário
    form.reset();
  });
});
