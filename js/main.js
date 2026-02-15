(function() {
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');
let currentLang = 'ja';
let wasPlaying = false;

const content = {
    home: {
        ja: '<h2 class="title">MZKT.TECH</h2><p>学生クリエイターによるアーカイブ。</p>',
        en: '<h2 class="title">MZKT.TECH</h2><p>Archive by a student creator.</p>',
        zh: '<h2 class="title">MZKT.TECH</h2><p>学生创作者的档案。</p>'
    },
    about: {
        ja: '<h2 class="title">SPEC.</h2><p>WEB / SYSTEM / SOUND</p>',
        en: '<h2 class="title">SPEC.</h2><p>WEB / SYSTEM / SOUND</p>',
        zh: '<h2 class="title">能力。</h2><p>网页 / 系统 / 声音</p>'
    },
    contact: {
        ja: '<h2 class="title">CONTACT.</h2><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">メールを送る</a>',
        en: '<h2 class="title">CONTACT.</h2><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">SEND MAIL</a>',
        zh: '<h2 class="title">联系。</h2><a href="mailto:mzkt.tech@gmail.com" class="mail-btn">发送邮件</a>'
    }
};

// グローバル関数として登録（HTMLのonclickから呼ぶため）
window.handleInit = function(withSound) {
    document.getElementById('audio-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
    window.handleLang(currentLang);
    if (withSound) {
        bgm.play().catch(e => console.log("Audio play failed"));
        playPauseBtn.innerText = "II";
    }
};

window.handleLang = function(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-text').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    window.handleNav('home');
};

window.handleNav = function(key) {
    const holder = document.getElementById('content-holder');
    holder.innerHTML = content[key] ? content[key][currentLang] : content['home'][currentLang];
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
    } else {
        bgm.pause();
        playPauseBtn.innerText = "▶";
    }
};

window.handleTheme = function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
};

// タブ連動（オートポーズ）
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (!bgm.paused) {
            bgm.pause();
            wasPlaying = true;
            playPauseBtn.innerText = "▶";
        }
    } else {
        if (wasPlaying) {
            bgm.play();
            wasPlaying = false;
            playPauseBtn.innerText = "II";
        }
    }
});

// 背景パーティクル
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
    for(let i=0; i<2; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.5});
});
animate();
})();
