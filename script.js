// Inicia tudo quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    
    // Tema claro/escuro
    const botaoTema = document.getElementById('theme-toggle');
    
    function configurarTema() {
        const temaSalvo = localStorage.getItem('tema');
        
        if (temaSalvo === 'escuro') {
            document.body.classList.add('dark-mode');
            botaoTema.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (temaSalvo === 'claro') {
            document.body.classList.remove('dark-mode');
            botaoTema.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // Se não tem preferência salva, verifica o sistema
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
                botaoTema.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('tema', 'escuro');
            } else {
                botaoTema.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('tema', 'claro');
            }
        }
    }
    
    botaoTema.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            botaoTema.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('tema', 'claro');
        } else {
            document.body.classList.add('dark-mode');
            botaoTema.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('tema', 'escuro');
        }
    });
    
    // Menu mobile
    const menuHamburger = document.getElementById('hamburger');
    const menuNav = document.querySelector('.nav-menu');
    
    menuHamburger.addEventListener('click', function() {
        menuHamburger.classList.toggle('active');
        menuNav.classList.toggle('active');
    });
    
    // Fecha menu quando clica em um link
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            menuHamburger.classList.remove('active');
            menuNav.classList.remove('active');
        });
    });
    
    // Formulário de contato
    const formulario = document.getElementById('form-contato');
    
    if (formulario) {
        // Elementos do formulário
        const campoNome = document.getElementById('nome');
        const campoEmail = document.getElementById('email');
        const campoMensagem = document.getElementById('mensagem');
        const erroNome = document.getElementById('nome-error');
        const erroEmail = document.getElementById('email-error');
        const erroMensagem = document.getElementById('mensagem-error');
        
        // Validação simples de email
        function emailValido(email) {
            return email.includes('@') && email.includes('.');
        }
        
        // Validação em tempo real
        campoNome.addEventListener('blur', function() {
            if (campoNome.value.trim().length < 2) {
                erroNome.textContent = 'Nome precisa ter pelo menos 2 letras';
            } else {
                erroNome.textContent = '';
            }
        });
        
        campoEmail.addEventListener('blur', function() {
            if (!emailValido(campoEmail.value)) {
                erroEmail.textContent = 'Email precisa ser válido';
            } else {
                erroEmail.textContent = '';
            }
        });
        
        campoMensagem.addEventListener('blur', function() {
            if (campoMensagem.value.trim().length < 10) {
                erroMensagem.textContent = 'Mensagem muito curta';
            } else {
                erroMensagem.textContent = '';
            }
        });
        
        // Envio do formulário
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let tudoCerto = true;
            
            // Valida nome
            if (campoNome.value.trim().length < 2) {
                erroNome.textContent = 'Nome precisa ter pelo menos 2 letras';
                tudoCerto = false;
            }
            
            // Valida email
            if (!emailValido(campoEmail.value)) {
                erroEmail.textContent = 'Email precisa ser válido';
                tudoCerto = false;
            }
            
            // Valida mensagem
            if (campoMensagem.value.trim().length < 10) {
                erroMensagem.textContent = 'Mensagem muito curta';
                tudoCerto = false;
            }
            
            // Se tudo estiver ok
            if (tudoCerto) {
                console.log('Dados do formulário:');
                console.log('Nome: ' + campoNome.value);
                console.log('Email: ' + campoEmail.value);
                console.log('Mensagem: ' + campoMensagem.value);
                
                // Mostra mensagem de sucesso
                const modal = document.getElementById('modal');
                modal.style.display = 'flex';
                
                // Limpa o formulário
                formulario.reset();
            }
        });
    }
    
    // Modal de confirmação
    const modal = document.getElementById('modal');
    const fecharModal = document.querySelector('.close-modal');
    const botaoModalOk = document.getElementById('modal-close');
    
    if (fecharModal && modal && botaoModalOk) {
        fecharModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        botaoModalOk.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Atualiza ano no rodapé
    const anoRodape = document.getElementById('current-year');
    if (anoRodape) {
        const dataAtual = new Date();
        anoRodape.textContent = dataAtual.getFullYear();
    }
    
    // Animação simples ao rolar
    window.addEventListener('scroll', function() {
        const itensFormacao = document.querySelectorAll('.formacao-item');
        
        itensFormacao.forEach(function(item) {
            const posicao = item.getBoundingClientRect();
            
            // Se o item está visível na tela
            if (posicao.top < window.innerHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Inicia algumas animações
    setTimeout(function() {
        const itensFormacao = document.querySelectorAll('.formacao-item');
        itensFormacao.forEach(function(item) {
            item.style.transition = 'opacity 0.5s, transform 0.5s';
        });
    }, 100);
    
    // Inicializa
    configurarTema();
    
    // Log simples no console
    console.log('Site do Alexandre carregado!');
    
});