document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Terminal Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const mainPortfolio = document.getElementById('main-portfolio');
    const typeWriterEl = document.getElementById('typewriter-text');
    const enterBtn = document.getElementById('enter-btn');
    
    const textToType = "INITIALIZING SYSTEM...\nLoading modules...\nLoading achievements...\nLoading projects...\n\n> USER IDENTIFIED: Rajanya Maity\n> ROLE: Frontend Developer | Google Student Ambassador\n\n> SYSTEM READY.";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeWriterEl.innerHTML += textToType.charAt(charIndex) === '\n' ? '<br/>' : textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, Math.random() * 30 + 20); // Fast typing
        } else {
            typeWriterEl.innerHTML += '<span class="cursor"></span>';
            enterBtn.classList.remove('hidden');
        }
    }

    setTimeout(typeWriter, 500);

    enterBtn.addEventListener('click', () => {
        bootScreen.style.transform = 'scale(1.1)';
        bootScreen.style.opacity = '0';
        
        setTimeout(() => {
            bootScreen.style.display = 'none';
            mainPortfolio.classList.remove('hidden');
            document.body.classList.remove('locked'); 
        }, 600);
    });

    // --- 2. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 3. Interactive 3D Tilt Effect on Hover ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // --- 4. The Falling 0 & 1 Matrix Background ---
    const canvas = document.getElementById('binary-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const binaryChars = '01';
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops array
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawBinary() {
        // Draw black background with 5% opacity to create the trailing tail effect
        ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffcc'; // Neon Cyan text
        ctx.font = fontSize + 'px monospace';

        // Loop over the drops and draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Send drop back to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawBinary, 50);

});