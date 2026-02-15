(function() {
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');
const statusTag = document.getElementById('status-tag');
let currentLang = 'ja';
let wasPlaying = false;

const content = {
    home: {
        ja: '<h2 class="title">HELLO.<br>WORLD</h2><p>MZKT.TECHは、2025年から始動した次世代のデジタルアーカイブです。誰もが使いやすく、美しい体験を提供します。</p>',
        en: '<h2 class="title">HELLO.<br>WORLD</h2><p>MZKT.TECH is a next-gen digital archive started in 2025. Providing a beautiful and accessible experience for everyone.</p>',
        zh: '<h2 class="title">你好。<br>世界</h2><p>MZKT.TECH 是始于 2025 年的新世代数字档案。致力于为每个人提供美观且便捷的体验。</p>'
    },
    works: {
        ja: `<h2 class="title">WORKS.</h2>
            <div class="work-card"><span class="work-tag">SYSTEM</span><h3>UNIVERSAL PORTFOLIO v3</h3><p>現在ご覧いただいているこのシステムです。多言語対応・アクセシビリティ・音響同期を追求したWebアーカイブ。</p></div>
            <div class="work-card"><span class="work-tag">SOUND</span><h3>MZKT AMBIENT BGM</h3><p>Suno AIと連携し、サイトの没入感を高めるためのアンビエント楽曲を制作・公開。</p></div>
            <div class="work-card"><span class="work-tag">DESIGN</span><h3>MINIMAL DARK UI</h3><p>視認性を極限まで高めたダークモード特化のUIデザインガイドラインの策定。</p></div>`,
        en: `<h2 class="title">WORKS.</h2>
            <div class="work-card"><span class="work-tag">SYSTEM</span><h3>UNIVERSAL PORTFOLIO v3</h3><p>The current system you are viewing. Pursuing multilingualism, accessibility, and audio synchronization.</p></div>
            <div class="work-card"><span class="work-tag">SOUND</span><h3>MZKT AMBIENT BGM</h3><p>Created ambient tracks using Suno AI to enhance the immersive site experience.</p></div>`,
        zh: `<h2 class="title">作品集。</h2>
            <div class="work-card"><span class="work-tag">系统</span><h3>通用作品集 v3</h3><p>即您当前看到的这个系统。追求多语言支持、无障碍访问和音效同步。</p></div>`
    },
    contact: {
        ja: '<h2 class="title">CONTACT.</h2><p>フィードバックや制作依頼は、メールにて24時間受け付けています。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">メールを送る</a>',
        en: '<h2 class="title">CONTACT.</h2><p>Feedback and requests are welcome via email 24/7.</p><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">SEND MAIL</a>',
        zh: '<h2 class="title">联系。</h2><p>欢迎通过邮件提供反馈或业务洽談，24小时接收。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">发送邮件</a>'
    },
    legal: {
        ja: '<h2 class="title">LEGAL.</h2><p>© 2026 MZKT.TECH. 学生によるポートフォリオ作品です。全ての権利はMZKT.TECHに帰属します。</p>',
        en: '<h2 class="title">LEGAL.</h2><p>© 2026 MZKT.TECH. Student portfolio project. All rights reserved.</p>',
        zh: '<h2 class="title">法律声明。</h2><p>© 2026 MZKT.TECH. 本站为学生作品集。保留所有权利。</p>'
    }
};

window.handleInit = function(sound) {
    document.getElementById('audio-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
    window.handleLang(currentLang);
    if (sound) {
        bgm.play().catch(e => console.log("Init play failed"));
        playPauseBtn.innerText = "II";
        statusTag.innerText = "PLAYING";
    }
};

window.handleLang = function(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.remove('active');
        if(b.innerText.toLowerCase() === lang) b.classList.add('active');
    });
    document.querySelectorAll('.lang-text').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    window.handleNav('home');
};

window.handleNav = function(key) {
    const holder = document.getElementById('content-holder');
    holder.innerHTML = content[key] ? content[key][currentLang] : content['home'][currentLang];
    // スクロールをトップに戻す
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
    if (bgm.paused) {
        bgm.play();
        playPauseBtn.innerText = "II";
        statusTag.innerText = "PLAYING";
    } else {
        bgm.pause();
        playPauseBtn.innerText = "▶";
        statusTag.innerText = "PAUSED";
    }
};

window.handleTheme = function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
};

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (!bgm.paused) {
            bgm.pause();
            wasPlaying = true;
            playPauseBtn.innerText = "▶";
            statusTag.innerText = "AUTO PAUSED";
        }
    } else {
        if (wasPlaying) {
            bgm.play();
            wasPlaying = false;
            playPauseBtn.innerText = "II";
            statusTag.innerText = "PLAYING";
        }
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
