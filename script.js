document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Glowing Cursor ---
    const cursorRing = document.getElementById('cursor-ring');
    document.addEventListener('mousemove', (e) => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    });

    const clickables = document.querySelectorAll('a, button, .project-trigger, .close-btn');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorRing.style.width = '50px';
            cursorRing.style.height = '50px';
            cursorRing.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            cursorRing.style.width = '30px';
            cursorRing.style.height = '30px';
            cursorRing.style.backgroundColor = 'transparent';
        });
    });

    // --- 2. Mobile Menu Logic ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('nav-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('nav-open');
        });
    });

    // --- 3. Terminal Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const mainPortfolio = document.getElementById('main-portfolio');
    const typeWriterEl = document.getElementById('typewriter-text');
    const enterBtn = document.getElementById('enter-btn');
    
    const textToType = "INITIALIZING SYSTEM...\nLoading education timeline...\nLoading frontend skills...\nCompiling 9 projects database...\n\n> USER IDENTIFIED: Rajanya Maity\n> ROLE: Frontend Developer\n\n> SYSTEM READY.";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeWriterEl.innerHTML += textToType.charAt(charIndex) === '\n' ? '<br/>' : textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, Math.random() * 15 + 10); 
        } else {
            typeWriterEl.innerHTML += '<span class="cursor"></span>';
            enterBtn.classList.remove('hidden');
        }
    }

    setTimeout(typeWriter, 400);

    enterBtn.addEventListener('click', () => {
        bootScreen.style.transform = 'scale(1.5) translateY(-50px)';
        bootScreen.style.opacity = '0';
        
        setTimeout(() => {
            bootScreen.style.display = 'none';
            mainPortfolio.classList.remove('hidden');
            document.body.classList.remove('locked'); 
        }, 600);
    });

    // --- 4. Bidirectional Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions); 

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 5. Interactive 3D Tilt Effect on Hover (Desktop only) ---
    if (window.innerWidth > 768) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
            });
            card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
        });
    }

    // --- 6. TEXT-ONLY HUD Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    const projectTriggers = document.querySelectorAll('.project-trigger');
    
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalRepo = document.getElementById('modal-repo');

    projectTriggers.forEach(project => {
        project.addEventListener('click', () => {
            modalTitle.innerText = project.getAttribute('data-title');
            modalDesc.innerText = project.getAttribute('data-desc');
            modalRepo.href = project.getAttribute('data-repo');
            
            modal.classList.add('active');
            document.body.classList.add('locked'); 
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.classList.remove('locked');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('locked');
        }
    });

    // --- 7. The Falling 0 & 1 Matrix Background ---
    const canvas = document.getElementById('binary-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const binaryChars = '01';
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) { drops[x] = 1; }

    function drawBinary() {
        ctx.fillStyle = 'rgba(26, 30, 36, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ffcc'; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
            drops[i]++;
        }
    }
    setInterval(drawBinary, 50);
});