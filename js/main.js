let currentLang = 'ja';
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');

const contentData = {
home: {
ja: <h2 class="title">MZKT.<br>TECH</h2><p>学生クリエイターによるデジタルアーカイブ。2026年版。</p>,
en: <h2 class="title">MZKT.<br>TECH</h2><p>Digital archive by student creator. 2026 Edition.</p>,
zh: <h2 class="title">MZKT.<br>TECH</h2><p>学生创作者的数字档案。2026年版。</p>
},
about: {
ja: <h2 class="title">SPEC.</h2><p>WEB / SYSTEM / SOUND DESIGN</p>,
en: <h2 class="title">SPEC.</h2><p>WEB / SYSTEM / SOUND DESIGN</p>,
zh: <h2 class="title">能力。</h2><p>网页 / 系统 / 声音设计</p>
},
contact: {
ja: <h2 class="title">CONTACT.</h2><p>制作依頼はこちらから。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">メールを送る</a>,
en: <h2 class="title">CONTACT.</h2><p>Send an inquiry.</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">SEND MAIL</a>,
zh: <h2 class="title">联系。</h2><p>请联系我。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">发送邮件</a>
}
};

// 再生・一時停止
window.togglePlay = function() {
if (bgm.paused) {
bgm.play();
playPauseBtn.innerText = "II";
} else {
bgm.pause();
playPauseBtn.innerText = "▶";
}
};

// タブ連動（離れたら停止、戻ったら再生）
document.addEventListener("visibilitychange", () => {
if (document.hidden) {
if (!bgm.paused) {
bgm.pause();
window.wasPlaying = true;
playPauseBtn.innerText = "▶";
}
} else {
if (window.wasPlaying) {
bgm.play();
window.wasPlaying = false;
playPauseBtn.innerText = "II";
}
}
});

// 音量調節
window.adjustVolume = function(delta) {
let vol = parseInt(document.getElementById('ui-text').innerText);
vol = Math.max(0, Math.min(10, vol + delta));
bgm.volume = vol / 10;
document.getElementById('ui-text').innerText = vol.toString().padStart(2, '0');
};

// 文字サイズ変更
window.setFontSize = function(size) {
document.body.classList.remove('font-small', 'font-medium', 'font-large');
document.body.classList.add(font-${size});
};

window.setLang = function(lang) {
currentLang = lang;
document.querySelectorAll('.lang-text').forEach(el => {
el.innerText = el.getAttribute(data-${lang});
});
renderPage('home');
};

function renderPage(key) {
const h = document.getElementById('content-holder');
h.innerHTML = contentData[key] ? contentData[key][currentLang] : contentData['home'][currentLang];
}

window.navigateTo = function(key) {
renderPage(key);
document.querySelectorAll('.menu-item a').forEach(a => a.classList.remove('active'));
const active = document.getElementById(nav-${key});
if(active) active.classList.add('active');
};

window.initSite = function(sound) {
document.getElementById('audio-overlay').style.display = 'none';
document.getElementById('app-shell').style.display = 'flex';
setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
window.setLang(currentLang);
if(sound) { bgm.play(); playPauseBtn.innerText = "II"; }
};

window.toggleTheme = function() {
document.body.classList.toggle('light-theme');
document.body.classList.toggle('dark-theme');
};

// 背景パーティクル
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles = particles.filter(p => p.opacity > 0);
particles.forEach(p => {
p.x += p.sx; p.y += p.sy; p.opacity -= 0.01;
ctx.fillStyle = rgba(0, 229, 255, ${p.opacity});
ctx.fillRect(p.x, p.y, 2, 2);
});
requestAnimationFrame(animate);
}
window.addEventListener('mousemove', (e) => {
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
for(let i=0; i<2; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.5});
});
animate();
