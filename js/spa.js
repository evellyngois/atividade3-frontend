// spa.js

const paginas = {
  home: `
    <div class="text-center">
      <h1>Bem-vindo!</h1>
      <p>Use o menu acima para navegar entre as páginas.</p>
    </div>
  `,
  cadastro: `
    <h2>Formulário de Cadastro</h2>
    <form id="formCadastro">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome:</label>
        <input type="text" id="nome" class="form-control" placeholder="Digite seu nome">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" class="form-control" placeholder="Digite seu e-mail">
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
  `,
  sobre: `
    <h2>Sobre</h2>
    <p>Este site foi desenvolvido como parte da Atividade 3 da disciplina de Desenvolvimento Front-End.</p>
  `
};

function carregarPagina(pagina) {
  document.getElementById("conteudo").innerHTML = paginas[pagina];
  if (pagina === "cadastro") {
    configurarFormulario();
  }
}
