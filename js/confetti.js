// Configuración básica de confeti (usa Canvas)
function startConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];

    function createParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20,
                size: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 6.28,
                rotation: Math.random() * 0.2 - 0.1
            });
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speed;
            p.angle += p.rotation;
            p.x += Math.sin(p.angle) * 1.5;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.y > canvas.height) {
                particles.splice(i, 1);
                i--;
            }
        }

        if (particles.length < 100) {
            createParticles();
        }

        requestAnimationFrame(updateParticles);
    }

    createParticles();
    updateParticles();
}

function stopConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.remove();
    }
}
