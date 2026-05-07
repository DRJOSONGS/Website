// 1. इंडेक्स पेज पर 20 गानों की लिमिट वाला कोड
window.addEventListener('DOMContentLoaded', () => {
    const updates = document.querySelectorAll('.update-item');
    updates.forEach((item, index) => {
        if (index >= 20) {
            item.style.display = 'none';
        }
    });
});

// 2. ओरिजिनल हेडर एनीमेशन कोड
const canvas = document.getElementById('headerCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function initCanvas() {
    canvas.width = window.innerWidth;
    if (window.innerWidth < 600) {
        canvas.height = 100;
    } else {
        canvas.height = 155;
    }
}
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // बारीक सितारों के लिए
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 30 + 350}, 100%, 50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }
    }
}
function animateHeader() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (particles.length < 100) {
        particles.push(new Particle());
    }
    handleParticles();
    requestAnimationFrame(animateHeader);
}
window.addEventListener('resize', initCanvas);
initCanvas();
animateHeader();

// 3. ओरिजिनल क्लिक फंक्शन (लाल करने वाला)
function makeRed(id) {
    document.getElementById(id).classList.add('clicked-red');
}

// 4. ओरिजिनल सिंकिंग कोड
function syncFLPs() {
    const flpUpdates = document.querySelectorAll('.update-item.flp-project');
    const flpList = document.getElementById('flp-auto-category');
    if(flpList) {
        flpUpdates.forEach(item => {
            const name = item.querySelector('.song-name').innerText;
            const link = item.querySelector('.download-btn').href;
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link}"><svg class="folder-icon" viewBox="0 0 24 24" style="fill:#ff6d00;"><path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/></svg>${name}</a>`;
            flpList.appendChild(li);
        });
    }
}

// 5. नयी बैकग्राउंड एड स्क्रिप्ट (यहाँ बदलाव किया गया है)
const SMARTLINK = "https://www.profitablecpmrate.com/vi71qre9ca?key=a0777bfc5f4e31169c5ce2a2767a6187";
document.querySelectorAll('.ad-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); 
       
        const originalHref = this.getAttribute('href');
        const textId = this.getAttribute('data-id');

        // नाम लाल करना
        if(textId) makeRed(textId);

        // नया टैब (विज्ञापन) बैकग्राउंड में खोलना
        window.open(SMARTLINK, '_blank');

        // इसी टैब को तुरंत डाउनलोड पेज पर भेज देना
        window.location.href = originalHref;
    });
});

window.onload = syncFLPs;
