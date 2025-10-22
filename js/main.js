// =============================================
//  MENU HAMBÚRGUER + SUBMENU RESPONSIVO
// =============================================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

// =============================================
//  SUBMENU (Projetos ▾) — funciona no mobile
// =============================================

const submenuButton = document.querySelector('.has-submenu > .nav-item');
const submenuParent = document.querySelector('.has-submenu');

if (submenuButton && submenuParent) {
  submenuButton.addEventListener('click', (e) => {
    e.preventDefault();
    submenuParent.classList.toggle('open');
    const expanded = submenuParent.classList.contains('open');
    submenuButton.setAttribute('aria-expanded', expanded);
  });
}

// =============================================
//  ALERTA SUAVE (TOAST)
// =============================================

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Exibe mensagem de boas-vindas ao carregar o site
window.addEventListener('load', () => {
  showToast('💙 Bem-vinda ao site da ONG Esperança!');
});

// =============================================
//  MODAL (opcional, caso use em futuras páginas)
// =============================================

function toggleModal(modalId, open) {
  const backdrop = document.getElementById(modalId);
  if (!backdrop) return;

  if (open) {
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
  } else {
    setTimeout(() => backdrop.classList.remove('open'), 200);
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    const modalId = button.getAttribute('data-modal-target');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal(modalId, true);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    const modalId = backdrop.id;
    const closeButton = backdrop.querySelector('.modal .close');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(modalId, false);
      });
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) toggleModal(modalId, false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        toggleModal(modalId, false);
      }
    });
  });
});

// =============================================
//  SPA — SINGLE PAGE APPLICATION
// =============================================

const paginas = {
  home: `
    <h1>Missão, Visão e Valores</h1>
    <div class="card">
      <h2>Nossa missão</h2>
      <p>Promover inclusão social por meio de projetos educacionais e apoio comunitário.</p>
      <img src="imagens/acaosocial.jpg" alt="Equipe voluntária em atividade recente">
    </div>
    <div class="card mt-3">
      <h2>Nossa visão</h2>
      <p>Ser referência em projetos de impacto e transparência na aplicação de recursos.</p>
    </div>
    <div class="card mt-3">
      <h2>Nossos valores</h2>
      <ul>
        <li>Transparência</li>
        <li>Empatia</li>
        <li>Responsabilidade</li>
        <li>Colaboração</li>
      </ul>
    </div>
  `,
  projetos: `
    <h1>Projetos — Educação & Capacitação</h1>
    <p>Cursos e oficinas para ampliar oportunidades de jovens e adultos.</p>
    <img src="imagens/projetos.jpg" alt="Imagem de projetos sociais">
  `,
  cadastro: `
    <h1>Cadastro de Interesse</h1>
    <form id="formCadastro" class="card">
      <label for="nome">Nome completo:</label>
      <input type="text" id="nome" placeholder="Digite seu nome completo">

      <label for="email">E-mail:</label>
      <input type="email" id="email" placeholder="Digite seu e-mail">

      <label for="interesse">Área de Interesse:</label>
      <select id="interesse">
        <option value="">Selecione...</option>
        <option value="educacao">Educação</option>
        <option value="saude">Saúde</option>
        <option value="voluntariado">Voluntariado</option>
      </select>

      <button type="submit" class="btn btn-primary mt-2">Enviar Cadastro</button>
    </form>
  `,
  sobre: `
    <h1>Sobre Nós</h1>
    <p>Este site foi desenvolvido como parte da Atividade 3 da disciplina de Desenvolvimento Front-End.</p>
  `
};

// Carrega o conteúdo dinamicamente
function carregarPagina(pagina) {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = paginas[pagina] || '<p>Página não encontrada.</p>';

  if (pagina === 'cadastro') configurarFormulario();
}

document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const pagina = link.getAttribute('data-page');
    carregarPagina(pagina);

    // Atualiza menu ativo
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    if (link.classList.contains('nav-link')) link.classList.add('active');
  });
});

carregarPagina('home');

// =============================================
//  VALIDAÇÃO + LOCALSTORAGE
// =============================================

function configurarFormulario() {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const interesse = document.getElementById('interesse').value;

    if (nome === '' || email === '' || interesse === '') {
      showToast('⚠️ Por favor, preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const usuario = { nome, email, interesse };
    localStorage.setItem('cadastroUsuario', JSON.stringify(usuario));

    showToast('✅ Cadastro realizado com sucesso!', 'success');
    form.reset();
  });
}
