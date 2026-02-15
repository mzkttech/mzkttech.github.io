const pages = {
    home: `<div><p style="color:var(--accent)">[ MODULE_01 ]</p><h2 class="title">MIZUKI<br>TATSUNORI.</h2><p class="desc">2026年、情報工学への挑戦。技術と感性が交差する地点で、新しいデジタル表現を構築中。</p></div>`,
    about: `<div><p style="color:var(--accent)">[ MODULE_02 ]</p><h2 class="title">SPECIFICATIONS.</h2>
        <div class="skill-container"><p>HTML / CSS / WEB_UI</p><div class="skill-bar"><div class="skill-progress" data-percent="45%"></div></div></div>
        <div class="skill-container"><p>JAVASCRIPT / SYSTEM</p><div class="skill-bar"><div class="skill-progress" data-percent="35%"></div></div></div>
        <div class="skill-container"><p>SUNO_AI / SOUND_DES</p><div class="skill-bar"><div class="skill-progress" data-percent="60%"></div></div></div></div>`,
    works: `<div><p style="color:var(--accent)">[ MODULE_03 ]</p><h2 class="title">REPOSITORY.</h2><p class="desc">現在、プロジェクトをアップロード中...<br>[ DATA_NOT_FOUND ]</p></div>`,
    contact: `<div><p style="color:var(--accent)">[ MODULE_04 ]</p><h2 class="title">CONNECT.</h2><p class="desc">制作依頼・コンタクトはこちらの周波数まで。<br>MAIL: mzkt.tech@gmail.com</p></div>`
};

let volLevel = 3;
const bgm = document.getElementById('bgm');

// カスタムカーソル
window.addEventListener('mousemove', (e) => {
    document.getElementById('cursor').style.left = e.clientX + 'px';
    document.getElementById('cursor').style.top = e.clientY + 'px';
    document.getElementById('cursor-follower').style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
});

// パーティクル
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.opacity -= 0.01;
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, 7); ctx.fill();
    });
    requestAnimationFrame(animate);
}
window.addEventListener('mousemove', (e) => {
    for(let i=0; i<2; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.8});
});

// 音量・UI更新
window.adjustVolume = function(delta) {
    volLevel = Math.max(0, Math.min(10, volLevel + delta));
    bgm.volume = volLevel / 10;
    document.getElementById('ui-text').innerText = volLevel.toString().padStart(2, '0');
    
    const playStatus = document.getElementById('play-status');
    const trackName = document.getElementById('track-name');
    if (volLevel === 0) {
        playStatus.innerText = "MZKT.SYSTEM // MUTED";
        playStatus.style.opacity = "0.3";
        trackName.style.opacity = "0.3";
    } else {
        playStatus.innerText = "MZKT.SYSTEM // ACTIVE";
        playStatus.style.opacity = "1";
        trackName.style.opacity = "1";
    }
};

// 時間・バー連動
bgm.ontimeupdate = () => {
    const timeDisplay = document.getElementById('time-display');
    const progressBar = document.getElementById('progress-text');
    const current = Math.floor(bgm.currentTime);
    const duration = Math.floor(bgm.duration) || 0;
    timeDisplay.innerText = `${Math.floor(current/60)}:${(current%60).toString().padStart(2,'0')} / ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2,'0')}`;
    if (duration > 0) {
        const p = Math.floor((bgm.currentTime / duration) * 20);
        progressBar.innerText = "■".repeat(p) + "□".repeat(20 - p);
    }
};

window.navigateTo = function(key) {
    const h = document.getElementById('content-holder');
    h.style.opacity = '0';
    window.history.pushState({}, '', `?p=${key}`);
    document.querySelectorAll('.menu-item a').forEach(a => a.classList.remove('active'));
    if(document.getElementById('nav-'+key)) document.getElementById('nav-'+key).classList.add('active');
    setTimeout(() => {
        h.innerHTML = pages[key] || pages['home'];
        h.style.opacity = '1';
        document.querySelectorAll('.skill-progress').forEach(el => el.style.width = el.dataset.percent);
    }, 400);
};

window.initSite = function(sound) {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight; animate();
    document.getElementById('audio-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-shell').style.display = 'flex';
        setTimeout(() => document.getElementById('app-shell').style.opacity = '1', 50);
        window.navigateTo(new URLSearchParams(window.location.search).get('p') || 'home');
    }, 1000);
    if(sound) { bgm.volume = 0.3; bgm.play(); } else { volLevel = 0; window.adjustVolume(0); }
};

window.toggleTheme = function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
};
