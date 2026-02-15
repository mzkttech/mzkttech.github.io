const pages = {
    home: `
        <nav class="reveal">
            <div class="nav-link" onclick="navigateTo('profile')">
                <span class="nav-num">/ 01</span><h2 class="nav-title">PROFILE</h2>
            </div>
            <div class="nav-link" onclick="navigateTo('works')">
                <span class="nav-num">/ 02</span><h2 class="nav-title">WORKS</h2>
            </div>
        </nav>`,
    profile: `
        <div class="reveal">
            <span class="nav-num">/ 01</span><h2 class="nav-title">PROFILE</h2>
            <p class="nav-desc">工業高校で情報工学を専攻。AIと映像の融合を探求中。</p>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-top:40px;">BACK</button>
        </div>`,
    works: `
        <div class="reveal">
            <span class="nav-num">/ 02</span><h2 class="nav-title">WORKS</h2>
            <p class="nav-desc">卒業制作動画 / ポートフォリオサイト / AI Music</p>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-top:40px;">BACK</button>
        </div>`
};

const contentArea = document.getElementById('content-area');
const bgm = document.getElementById('bgm');

// ページ切り替え関数
function navigateTo(pageKey) {
    contentArea.style.opacity = 0;
    setTimeout(() => {
        contentArea.innerHTML = pages[pageKey];
        contentArea.style.opacity = 1;
        // アニメーション再発火
        const revealEl = contentArea.querySelector('.reveal');
        if (revealEl) setTimeout(() => revealEl.classList.add('is-visible'), 50);
    }, 400);
}

// サイト初期化
function initSite(isSoundOn) {
    document.getElementById('audio-overlay').style.display = 'none';
    document.getElementById('audio-control').style.display = 'flex';
    navigateTo('home');
    if (isSoundOn) {
        bgm.play();
        document.getElementById('audio-control').classList.add('is-playing');
        document.getElementById('audio-text').innerText = 'SOUND ON';
    }
}

function toggleAudio() {
    if (bgm.paused) {
        bgm.play();
        document.getElementById('audio-control').classList.add('is-playing');
        document.getElementById('audio-text').innerText = 'SOUND ON';
    } else {
        bgm.pause();
        document.getElementById('audio-control').classList.remove('is-playing');
        document.getElementById('audio-text').innerText = 'SOUND OFF';
    }
}
