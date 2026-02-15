const pages = {
    home: `<div><span class="module-num">[ MODULE_01 ]</span><h2 class="title">MZKT.<br>TECH</h2><p style="color:#666">CREATOR ARCHIVE. ESTABLISHED 2026.</p></div>`,
    about: `<div><span class="module-num">[ MODULE_02 ]</span><h2 class="title">SPEC.</h2>
        <div class="skill-row"><p>HTML / CSS / UI_DESIGN</p><div class="skill-bar"><div class="skill-progress" data-percent="45%"></div></div></div>
        <div class="skill-row"><p>JAVASCRIPT / SYSTEM</p><div class="skill-bar"><div class="skill-progress" data-percent="35%"></div></div></div>
        <div class="skill-row"><p>SUNO_AI / SOUND_DES</p><div class="skill-bar"><div class="skill-progress" data-percent="60%"></div></div></div></div>`,
    works: `<div><span class="module-num">[ MODULE_03 ]</span><h2 class="title">WORKS.</h2><p style="color:#666">REPOSITORY_IS_EMPTY.</p></div>`,
    legal: `<div><span class="module-num">[ MODULE_04 ]</span><h2 class="title">LEGAL.</h2>
        <div class="legal-section">
            <h3 class="legal-title">TERMS OF SERVICE</h3>
            <p class="legal-text">当サイトは学術的探求を目的とした学生クリエイターのポートフォリオです。掲載内容の商用利用を禁じます。</p>
        </div>
        <div class="legal-section">
            <h3 class="legal-title">INTELLECTUAL PROPERTY</h3>
            <p class="legal-text">本サイトのデザイン、コード、およびSuno AIにて生成された音源の権利はMZKT.TECHに帰属します。&copy; 2026</p>
        </div></div>`,
    contact: `<div><span class="module-num">[ MODULE_05 ]</span><h2 class="title">CONNECT.</h2>
        <form class="contact-form" onsubmit="event.preventDefault(); alert('MESSAGE SENT (DEMO)');">
            <div class="form-group"><label>NAME</label><input type="text" required></div>
            <div class="form-group"><label>EMAIL</label><input type="email" required></div>
            <div class="form-group"><label>MESSAGE</label><textarea rows="4" required></textarea></div>
            <button type="submit" class="submit-btn">SEND MESSAGE</button>
        </form></div>`
};

let volLevel = 5;
const bgm = document.getElementById('bgm');

// URLパラメータ処理（リロード対応）
function getParam() { return new URLSearchParams(window.location.search).get('p') || 'home'; }

window.navigateTo = function(key) {
    const h = document.getElementById('content-holder');
    h.style.opacity = '0';
    // URLを更新
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?p=' + key;
    window.history.pushState({path:newUrl}, '', newUrl);

    document.querySelectorAll('.menu-item a').forEach(a => a.classList.remove('active'));
    if(document.getElementById('nav-'+key)) document.getElementById('nav-'+key).classList.add('active');

    setTimeout(() => {
        h.innerHTML = pages[key] || pages['home'];
        h.style.opacity = '1';
        document.querySelectorAll('.skill-progress').forEach(el => el.style.width = el.dataset.percent);
    }, 200);
};

// 戻るボタン対応
window.onpopstate = () => window.navigateTo(getParam());

window.adjustVolume = function(delta) {
    volLevel = Math.max(0, Math.min(10, volLevel + delta));
    bgm.volume = volLevel / 10;
    document.getElementById('ui-text').innerText = volLevel.toString().padStart(2, '0');
};

bgm.ontimeupdate = () => {
    const cur = Math.floor(bgm.currentTime);
    const dur = Math.floor(bgm.duration) || 0;
    document.getElementById('time-display').innerText = `${Math.floor(cur/60)}:${(cur%60).toString().padStart(2,'0')} / ${Math.floor(dur/60)}:${(dur%60).toString().padStart(2,'0')}`;
    const p = Math.floor((bgm.currentTime / (dur || 1)) * 20);
    document.getElementById('progress-text').innerText = "■".repeat(p) + "-".repeat(20 - p);
};

window.initSite = function(sound) {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight; animate();
    document.getElementById('audio-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('app-shell').style.opacity = '1';
        window.navigateTo(getParam());
    }, 50);
    if(sound) { bgm.volume = 0.5; bgm.play(); } else { volLevel = 0; window.adjustVolume(0); }
};

// パーティクル・カーソル処理
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.opacity -= 0.01;
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 1, 1);
    });
    requestAnimationFrame(animate);
}
window.addEventListener('mousemove', (e) => {
    document.getElementById('cursor').style.left = e.clientX + 'px';
    document.getElementById('cursor').style.top = e.clientY + 'px';
    document.getElementById('cursor-follower').style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 13}px)`;
    for(let i=0; i<2; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.5});
});

window.toggleTheme = function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
};
