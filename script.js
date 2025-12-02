// Comentário: Este arquivo contém toda a lógica JavaScript do portfólio

// DOMContentLoaded garante que o código execute após o carregamento do HTML
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const formContato = document.getElementById('form-contato');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const currentYear = document.getElementById('current-year');

    // 1. TEMA CLARO/ESCURO
    // Verifica se há preferência salva ou usa padrão do sistema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Alterna entre temas
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // 2. MENU RESPONSIVO
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function mostrarErro(elemento, mensagem) {
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
    }

    function limparErro(elemento) {
        elemento.textContent = '';
        elemento.style.display = 'none';
    }

    // Validação em tempo real
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const mensagemError = document.getElementById('mensagem-error');

    // Validação do nome
    nomeInput.addEventListener('input', function() {
        if (nomeInput.value.trim().length < 2) {
            mostrarErro(nomeError, 'Nome deve ter pelo menos 2 caracteres');
        } else {
            limparErro(nomeError);
        }
    });

    // Validação do email
    emailInput.addEventListener('input', function() {
        if (!validarEmail(emailInput.value)) {
            mostrarErro(emailError, 'Digite um email válido');
        } else {
            limparErro(emailError);
        }
    });

    // Validação da mensagem
    mensagemInput.addEventListener('input', function() {
        if (mensagemInput.value.trim().length < 10) {
            mostrarErro(mensagemError, 'Mensagem deve ter pelo menos 10 caracteres');
        } else {
            limparErro(mensagemError);
        }
    });

    // 4. ENVIO DO FORMULÁRIO (simulação)
    formContato.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne envio real do formulário
        
        // Validação final antes do envio
        let valido = true;
        
        if (nomeInput.value.trim().length < 2) {
            mostrarErro(nomeError, 'Nome é obrigatório');
            valido = false;
        }
        
        if (!validarEmail(emailInput.value)) {
            mostrarErro(emailError, 'Email é obrigatório e deve ser válido');
            valido = false;
        }
        
        if (mensagemInput.value.trim().length < 10) {
            mostrarErro(mensagemError, 'Mensagem é obrigatória');
            valido = false;
        }
        
        // Se tudo estiver válido, simula o envio
        if (valido) {
            // Simulação de envio (aqui normalmente faria uma requisição AJAX)
            console.log('Formulário enviado com sucesso!');
            console.log('Nome:', nomeInput.value);
            console.log('Email:', emailInput.value);
            console.log('Mensagem:', mensagemInput.value);
            
            // Limpa o formulário
            formContato.reset();
            
            // Esconde mensagens de erro
            limparErro(nomeError);
            limparErro(emailError);
            limparErro(mensagemError);
            
            // Mostra modal de confirmação
            modal.style.display = 'flex';
        }
    });

    // 5. CONTROLE DO MODAL
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalCloseBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 6. ATUALIZAÇÃO DO ANO NO RODAPÉ
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 7. ANIMAÇÃO AO ROLAR A PÁGINA
    function animacaoScroll() {
        const elementos = document.querySelectorAll('.formacao-item, .portfolio-item');
        
        elementos.forEach(elemento => {
            const elementoTop = elemento.getBoundingClientRect().top;
            const alturaTela = window.innerHeight;
            
            if (elementoTop < alturaTela * 0.8) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializa elementos com opacidade 0
    document.querySelectorAll('.formacao-item, .portfolio-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Adiciona evento de scroll
    window.addEventListener('scroll', animacaoScroll);
    
    // Executa uma vez ao carregar a página
    animacaoScroll();

    // 8. INICIALIZAÇÃO
    function init() {
        initTheme(); // Inicializa tema
        console.log('Portfólio inicializado com sucesso!');
    }

    init(); // Executa inicialização
});

// Comentário: Função para highlight do menu ativo (opcional)
function highlightMenuAtivo() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Chama a função após o carregamento
document.addEventListener('DOMContentLoaded', highlightMenuAtivo);