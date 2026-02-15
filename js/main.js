(function() {
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');
const statusTag = document.getElementById('status-tag');
let currentLang = 'ja';
let wasPlaying = false;

const content = {
    home: {
        ja: '<h2 class="title">HELLO.<br>WORLD</h2><p>MZKT.TECHは、技術とデザインの融合を追求する次世代アーカイブです。全ての要素がプログラムによって制御されています。</p>',
        en: '<h2 class="title">HELLO.<br>WORLD</h2><p>MZKT.TECH is a next-gen archive pursuing the fusion of tech and design. Every element is controlled via program.</p>',
        zh: '<h2 class="title">你好。<br>世界</h2><p>MZKT.TECH 是追求技术与设计融合的新世代档案。所有元素均由程序控制。</p>'
    },
    works: {
        ja: `<h2 class="title">WORKS.</h2>
            <div class="card"><h3>UNIVERSAL PORTFOLIO v2.5</h3><p>本システム。レスポンス対応、テーマ切替、音響同期を実装。</p></div>
            <div class="card"><h3>AI SOUND UNIT</h3><p>Suno AIとWeb Audioを連携させた没入型サウンドデザイン。</p></div>`,
        en: `<h2 class="title">WORKS.</h2><div class="card"><h3>UNIVERSAL PORTFOLIO v2.5</h3><p>The current system.</p></div>`,
        zh: `<h2 class="title">作品集。</h2><div class="card"><h3>通用作品集 v2.5</h3><p>当前系统。</p></div>`
    },
    log: {
        ja: `<h2 class="title">LOG.</h2>
            <div class="card"><small>2026.02.15</small><h3>レスポンス対応の完全統合</h3><p>スマホ、PC、タブレットあらゆるデバイスでの視認性を確保。フッターユニットをセンター集約型へ再構築。</p></div>
            <div class="card"><small>2026.02.10</small><h3>ライト/ダークテーマの実装</h3><p>白背景を基本とし、設定で黒背景へ切り替え可能なモードを搭載。文字の読みやすさを最優先した。</p></div>`,
        en: `<h2 class="title">LOG.</h2><div class="card"><h3>Responsive Update</h3><p>Fully optimized for mobile devices.</p></div>`,
        zh: `<h2 class="title">日志。</h2><div class="card"><h3>响应式更新</h3><p>全面优化移动端体验。</p></div>`
    },
    contact: {
        ja: '<h2 class="title">CONTACT.</h2><p>制作依頼・フィードバックはメールにて。</p><a href="mailto:mzkt.tech@gmail.com" style="color:var(--accent);font-weight:bold;">mzkt.tech@gmail.com</a>',
        en: '<h2 class="title">CONTACT.</h2><p>Send me an email for inquiries.</p>',
        zh: '<h2 class="title">联系。</h2><p>请通过邮件联系我。</p>'
    }
};

window.handleLangSelect = function(lang) {
    currentLang = lang;
    document.getElementById('opening-logo').classList.add('active');
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById(`btn-${lang}`).classList.add('selected');
    const actions = document.getElementById('start-actions');
    actions.classList.add('show');
};

window.handleInit = function(sound) {
    document.getElementById('audio-overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-shell').style.opacity = '1';
    }, 800);
    window.handleLang(currentLang);
    if (sound) { bgm.play(); playPauseBtn.innerText = "II"; statusTag.innerText = "PLAYING"; }
};

window.handleLang = function(lang) {
    document.querySelectorAll('.lang-text').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    window.handleNav('home');
};

window.handleNav = function(key) {
    document.getElementById('content-holder').innerHTML = content[key][currentLang];
    document.getElementById('content-holder').scrollTop = 0;
    if(window.innerWidth <= 900) toggleMobileMenu();
};

window.toggleMobileMenu = function() {
    document.getElementById('side-nav').classList.toggle('active');
};

window.handleTheme = function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
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

// パーティクルアニメーション
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function animate() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.opacity -= 0.01;
        ctx.fillStyle = `rgba(0, 188, 212, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 2, 2);
    });
    requestAnimationFrame(animate);
}
window.addEventListener('mousemove', (e) => {
    for(let i=0; i<2; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.5});
});
animate();
})();
