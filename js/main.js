let currentLang = 'ja';
const bgm = document.getElementById('bgm');
const playPauseBtn = document.getElementById('play-pause-btn');

const contentData = {
home: {
ja: <h2 class="title">MZKT.<br>TECH</h2><p>2026年。学生クリエイターによるユニバーサル・デジタルアーカイブ。</p>,
en: <h2 class="title">MZKT.<br>TECH</h2><p>2026. Universal digital archive by a student creator.</p>,
zh: <h2 class="title">MZKT.<br>TECH</h2><p>2026年。由学生创作者开发的通用数码档案室。</p>
},
about: {
ja: <h2 class="title">能力。</h2><p>WEBデザイン / UI・UX / システム構築 / 楽曲制作 (Suno AI)</p>,
en: <h2 class="title">SPEC.</h2><p>WEB DESIGN / UI UX / SYSTEM / SOUND (Suno AI)</p>,
zh: <h2 class="title">能力。</h2><p>网页设计 / UI UX / 系统开发 / 音乐制作</p>
},
works: {
ja: <h2 class="title">制作物。</h2><p>現在、新しいプロジェクトをアップロード中です。しばらくお待ちください。</p>,
en: <h2 class="title">WORKS.</h2><p>Uploading new projects. Please wait a moment.</p>,
zh: <h2 class="title">作品集。</h2><p>正在上传新项目。请稍候。</p>
},
legal: {
ja: <h2 class="title">法的表記。</h2><p>本サイトは学生の教育・研究目的で制作されています。全ての権利はMZKT.TECHに帰属します。無断転載を禁じます。</p>,
en: <h2 class="title">LEGAL.</h2><p>This site is for educational/research purposes. All rights reserved by MZKT.TECH. No unauthorized reproduction.</p>,
zh: <h2 class="title">法律声明。</h2><p>本网站用于教学和研究目的。MZKT.TECH 保留所有权利。严禁未经授权的转载。</p>
},
contact: {
ja: <h2 class="title">連絡先。</h2><p>制作の依頼やフィードバックは、以下のボタンからメールにて送信してください。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">メールを起動する</a>,
en: <h2 class="title">CONTACT.</h2><p>For inquiries or feedback, please click below to send an email.</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">SEND EMAIL</a>,
zh: <h2 class="title">联系方式。</h2><p>如有咨询或反馈，请点击下方按钮发送邮件。</p><a href="mailto:mzkt.tech@gmail.com" class="mail-trigger-btn">发送邮件</a>
}
};

// 再生・停止制御
window.togglePlay = function() {
if (bgm.paused) {
bgm.play();
playPauseBtn.innerText = "II";
} else {
bgm.pause();
playPauseBtn.innerText = "▶";
}
};

// タブ連動オートポーズ
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

// 言語切替
window.setLang = function(lang) {
currentLang = lang;
document.querySelectorAll('.lang-btn').forEach(b => {
b.classList.remove('active');
if(b.innerText.toLowerCase() === lang) b.classList.add('active');
});
document.querySelectorAll('.lang-text').forEach(el => {
el.innerText = el.getAttribute(data-${lang});
});
renderPage(new URLSearchParams(window.location.search).get('p') || 'home');
};

// 文字サイズ切替
window.setFontSize = function(size) {
document.body.classList.remove('font-small', 'font-medium', 'font-large');
document.body.classList.add(font-${size});
};

function renderPage(key) {
const h = document.getElementById('content-holder');
h.innerHTML = contentData[key] ? contentData[key][currentLang] : contentData['home'][currentLang];
}

window.navigateTo = function(key) {
const newUrl = ${window.location.pathname}?p=${key};
window.history.pushState(null, '', newUrl);
renderPage(key);
document.querySelectorAll('.menu-item a').forEach(a => a.classList.remove('active'));
const activeNav = document.getElementById(nav-${key});
if(activeNav) activeNav.classList.add('active');
};

window.adjustVolume = function(delta) {
let vol = parseInt(document.getElementById('ui-text').innerText);
vol = Math.max(0, Math.min(10, vol + delta));
bgm.volume = vol / 10;
document.getElementById('ui-text').innerText = vol.toString().padStart(2, '0');
};

window.initSite = function(sound) {
document.getElementById('audio-overlay').style.display = 'none';
document.getElementById('app-shell').style.display = 'flex';
setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
window.setLang(currentLang);
if(sound) {
bgm.play();
playPauseBtn.innerText = "II";
}
};

// URL連動
window.onpopstate = () => renderPage(new URLSearchParams(window.location.search).get('p') || 'home');

// パーティクル背景
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
for(let i=0; i<3; i++) particles.push({x:e.clientX, y:e.clientY, sx:Math.random()-0.5, sy:Math.random()-0.5, opacity:0.6});
});
animate();
