// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const dynamicLine = document.getElementById('dynamic-line');

function updateLineOnScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;

  dynamicLine.style.width = scrollProgress + '%';
}

function updateLineOnMouseMove(e) {
  const mouseX = e.clientX;
  dynamicLine.style.transform = `translateX(${mouseX}px)`;
}

window.addEventListener('scroll', updateLineOnScroll);
document.addEventListener('mousemove', updateLineOnMouseMove);

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                document.body.style.transform = 'none';
            }, 1000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', toggleTheme);

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(progress => {
        const width = progress.getAttribute('data-width');
        progress.style.width = width + '%';
    });
}

// Animate progress bars on page load
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Add scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .achievement-card, .skill-category');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Download CV functionality
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();
    alert('CV download functionality will be implemented here');
});

// Add interactive hover effect to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Snake Line Animation
class RocketLine {
        constructor() {
            this.canvas = document.querySelector('.rocket-line canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.maxParticles = 100;
            this.mousePos = { x: 0, y: 0 };
            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', () => this.resize());
            document.addEventListener('mousemove', (e) => this.updateMousePosition(e));
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        updateMousePosition(e) {
            this.mousePos = {
                x: e.clientX,
                y: e.clientY
            };
        }

        createParticle(x, y) {
            const particle = {
                x: x,
                y: y,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: 1,
                color: 'rgb(8, 145, 8)' // Rocket flame-like color (red-orange)
            };
            this.particles.push(particle);
        }

        updateParticles() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity -= 0.02; // Gradual fade
                p.size -= 0.05; // Shrink over time
                if (p.opacity <= 0 || p.size <= 0) {
                    this.particles.splice(i, 1); // Remove expired particles
                }
            }
        }

        drawParticles() {
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fill();
            }
            this.ctx.globalAlpha = 1; // Reset global alpha
        }

        update() {
            this.createParticle(this.mousePos.x, this.mousePos.y); // Create a particle at mouse position
            this.updateParticles();
        }

        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
            this.drawParticles(); // Draw all particles
        }

        animate() {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.animate());
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const rocketLine = new RocketLine();
    });

// Animate project progress bars
function animateProjectProgress() {
    const progressBars = document.querySelectorAll('.project-progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateProjectProgress();
});