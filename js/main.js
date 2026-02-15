const pages = {
    home: `<div><p style="color:var(--accent)">INTRO</p><h2 class="title">NEW<br>CHAPTER.</h2><p class="desc">2026年、情報工学の世界へ。<br>未踏の領域を切り拓くエンジニアリングの旅が始まります。</p></div>`,
    about: `<div><p style="color:var(--accent)">ABOUT</p><h2 class="title">MIZUKI<br>TATSUNORI.</h2><p class="desc">Web開発や映像制作、デザインの融合に関心があります。誰かの感情を動かすプロダクトを作るのが目標です。</p></div>`,
    works: `<div><p style="color:var(--accent)">WORKS</p><h2 class="title">PROJECTS.</h2><p class="desc">独学で構築した最初のSPAプロジェクト。<br>[ Coming Soon... ]</p></div>`,
    contact: `<div><p style="color:var(--accent)">CONTACT</p><h2 class="title">ORDER.</h2><p class="desc">制作の依頼やお問い合わせはこちら。<br>mzkt.tech@gmail.com</p><a href="mailto:mzkt.tech@gmail.com" style="display:inline-block; margin-top:20px; padding:10px 30px; border:1px solid var(--accent); color:var(--accent); text-decoration:none;">SEND EMAIL</a></div>`
};

// 初期音量を10段階中の「3」に設定
let volLevel = 3; 

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.opacity = 1;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.opacity > 0) this.opacity -= 0.01;
    }
    draw() {
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function handleParticle(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    for (let i = 0; i < 2; i++) particles.push(new Particle(x, y));
}
window.addEventListener('mousemove', handleParticle);
window.addEventListener('touchmove', handleParticle);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

window.initSite = function(isSoundOn) {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    animate();
    document.getElementById('audio-overlay').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-shell').style.display = 'flex';
        setTimeout(() => document.getElementById('app-shell').style.opacity = '1', 50);
        document.getElementById('audio-ui').style.display = 'flex';
        const params = new URLSearchParams(window.location.search);
        window.navigateTo(params.get('p') || 'home');
    }, 1000);

    const bgm = document.getElementById('bgm');
    if (isSoundOn) {
        // 起動時の音量を30%に制限
        bgm.volume = volLevel / 10; 
        bgm.play();
        updateUI(); // UIに反映
    } else {
        volLevel = 0;
        bgm.volume = 0;
        updateUI();
    }
};

window.navigateTo = function(key) {
    const h = document.getElementById('content-holder');
    h.style.opacity = '0';
    const url = `${window.location.pathname}?p=${key}`;
    window.history.pushState({path:url},'',url);
    document.querySelectorAll('.main-menu a').forEach(a => a.classList.remove('active'));
    if(document.getElementById('nav-'+key)) document.getElementById('nav-'+key).classList.add('active');
    setTimeout(() => {
        h.innerHTML = pages[key] || pages['home'];
        h.style.opacity = '1';
        h.scrollTop = 0;
    }, 400);
};

window.cycleVolume = function() {
    // クリックするごとに音量を上げる（10になったら0に戻る）
    volLevel = volLevel < 10 ? volLevel + 1 : 0;
    document.getElementById('bgm').volume = volLevel / 10;
    updateUI();
};

function updateUI() {
    const uiText = document.getElementById('ui-text');
    const volBar = document.getElementById('vol-bar');
    const audioUI = document.getElementById('audio-ui');

    uiText.innerText = volLevel === 0 ? 'MUTE' : volLevel;
    volBar.style.width = (volLevel * 10) + '%';
    
    if(volLevel === 0) {
        audioUI.classList.remove('is-playing');
    } else {
        audioUI.classList.add('is-playing');
    }
}
