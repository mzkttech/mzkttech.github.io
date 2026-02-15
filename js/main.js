(function() {
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');
const statusTag = document.getElementById('status-tag');
let currentLang = 'ja';
let wasPlaying = false;

const content = {
    home: {
        ja: '<h2 class="title">MZKT.<br>TECH</h2><p>2026年。学生クリエイターによるデジタルアーカイブ。技術とデザインの融合を記録します。</p>',
        en: '<h2 class="title">MZKT.<br>TECH</h2><p>2026. A digital archive by a student creator, documenting the fusion of tech and design.</p>',
        zh: '<h2 class="title">MZKT.<br>TECH</h2><p>2026年。学生创作者的数字档案，记录技术与设计的融合。</p>'
    },
    works: {
        ja: `<h2 class="title">WORKS.</h2>
            <div class="work-card"><h3>UNIVERSAL ARCHIVE v3</h3><p>本サイトシステム。アクセシビリティと没入感を両立したWeb設計。</p></div>
            <div class="work-card"><h3>SOUND: VOID-S1</h3><p>Suno AIを用いたアンビエントトラック。ミニマルな空間音響を構築。</p></div>`,
        en: `<h2 class="title">WORKS.</h2><div class="work-card"><h3>UNIVERSAL ARCHIVE v3</h3><p>The system of this site.</p></div>`,
        zh: `<h2 class="title">作品集。</h2><div class="work-card"><h3>通用档案 v3</h3><p>本网站系统。</p></div>`
    },
    log: {
        ja: `<h2 class="title">LOG.</h2>
            <div class="log-entry">
                <span class="log-date">2026.02.15</span>
                <span class="log-title">AIによる音響演出の自動化</span>
                <p>Suno AIを使い、サイトの雰囲気に合わせた楽曲を生成。プロンプト制御による統一感の維持に成功。</p>
            </div>
            <div class="log-entry">
                <span class="log-date">2026.02.08</span>
                <span class="log-title">UIアップデート：集約型プレイヤー</span>
                <p>コントロール系を中央に配置。操作ミスを減らし、視認性を向上させた。</p>
            </div>`,
        en: `<h2 class="title">LOG.</h2><div class="log-entry"><h3>AI Audio</h3><p>Using Suno AI for web ambient...</p></div>`,
        zh: `<h2 class="title">日志。</h2><div class="log-entry"><h3>AI 音响</h3><p>利用 Suno AI 生成网页背景音乐...</p></div>`
    },
    contact: {
        ja: '<h2 class="title">CONTACT.</h2><p>お問い合わせはメールにて。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">SEND EMAIL</a>',
        en: '<h2 class="title">CONTACT.</h2><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">SEND EMAIL</a>',
        zh: '<h2 class="title">联系方式。</h2><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">发送邮件</a>'
    }
};

// 言語選択時の演出
window.handleLangSelect = function(lang) {
    currentLang = lang;
    // ロゴの色を変える
    const logo = document.getElementById('opening-logo');
    logo.classList.add('active');
    
    // ボタンの状態更新
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById(`btn-${lang}`).classList.add('selected');
    
    // スタートボタンを表示
    const actions = document.getElementById('start-actions');
    actions.style.display = 'block';
    setTimeout(() => { actions.style.opacity = '1'; }, 10);
};

window.handleInit = function(sound) {
    document.getElementById('audio-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-shell').style.display = 'flex';
        setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
    }, 800);
    
    window.handleLang(currentLang);
    if (sound) {
        bgm.play().catch(e => console.log("Sound failed"));
        playPauseBtn.innerText = "II";
        statusTag.innerText = "PLAYING";
    }
};

window.handleLang = function(lang) {
    document.querySelectorAll('.lang-text').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    window.handleNav('home');
};

window.handleNav = function(key) {
    const holder = document.getElementById('content-holder');
    holder.innerHTML = content[key] ? content[key][currentLang] : content['home'][currentLang];
    holder.scrollTop = 0;
};

window.handleFontSize = function(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
};

window.handleVolume = function(delta) {
    let v = parseInt(document.getElementById('ui-vol-text').innerText);
    v = Math.max(0, Math.min(10, v + delta));
    bgm.volume = v / 10;
    document.getElementById('ui-vol-text').innerText = v.toString().padStart(2, '0');
};

window.handleTogglePlay = function() {
    if (bgm.paused) { bgm.play(); playPauseBtn.innerText = "II"; statusTag.innerText = "PLAYING"; }
    else { bgm.pause(); playPauseBtn.innerText = "▶"; statusTag.innerText = "PAUSED"; }
};

window.handleTheme = function() { document.body.classList.toggle('light-theme'); document.body.classList.toggle('dark-theme'); };

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (!bgm.paused) { bgm.pause(); wasPlaying = true; playPauseBtn.innerText = "▶"; statusTag.innerText = "AUTO PAUSED"; }
    } else {
        if (wasPlaying) { bgm.play(); wasPlaying = false; playPauseBtn.innerText = "II"; statusTag.innerText = "PLAYING"; }
    }
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.opacity -= 0.01;
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 2, 2);
    });
    requestAnimationFrame(animate);
}
window.addEventListener('mousemove', (e) => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    for(let i=0; i<3; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.6});
});
animate();
})();
