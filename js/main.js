// 各ページの内容
const pages = {
    home: `
        <nav class="reveal is-visible">
            <div class="nav-link" onclick="navigateTo('profile')">
                <span class="nav-num">/ 01</span><h2 class="nav-title">PROFILE</h2>
            </div>
            <div class="nav-link" onclick="navigateTo('works')">
                <span class="nav-num">/ 02</span><h2 class="nav-title">WORKS</h2>
            </div>
            <div class="nav-link" onclick="navigateTo('contact')">
                <span class="nav-num">/ 03</span><h2 class="nav-title">CONTACT</h2>
            </div>
        </nav>`,
    profile: `
        <div class="reveal is-visible">
            <span class="nav-num">/ 01</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">PROFILE</h2>
            <p style="line-height: 2; color: #666; letter-spacing: 0.1em;">
                工業高校で情報工学を専攻。2026年卒業見込み。<br>
                映像制作とIT技術の融合を探求しています。
            </p>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-top:40px;">BACK</button>
        </div>`,
    works: `
        <div class="reveal is-visible">
            <span class="nav-num">/ 02</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">WORKS</h2>
            <div style="margin-bottom: 40px;">
                <p style="font-size: 1.2rem;">卒業生を送る会 記念動画</p>
                <p style="color: #666; font-size: 0.8rem;">VIDEO PRODUCTION / 2025</p>
            </div>
            <button onclick="navigateTo('home')" class="btn-mail">BACK</button>
        </div>`,
    contact: `
        <div class="reveal is-visible">
            <span class="nav-num">/ 03</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">CONTACT</h2>
            <p style="color: #666; margin-bottom: 40px;">ご依頼はメールにて承ります。</p>
            <a href="mailto:mzkt.tech@gmail.com" class="btn-mail">SEND EMAIL</a>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-left:15px; border:none; opacity:0.5;">BACK</button>
        </div>`
};

// グローバルに関数を公開
window.navigateTo = function(pageKey) {
    const contentArea = document.getElementById('content-area');
    const indicator = document.getElementById('page-indicator');
    contentArea.style.opacity = 0;
    setTimeout(() => {
        contentArea.innerHTML = pages[pageKey];
        indicator.innerText = `/ ${pageKey.toUpperCase()}`;
        contentArea.style.opacity = 1;
    }, 400);
};

window.initSite = function(isSoundOn) {
    const bgm = document.getElementById('bgm');
    const overlay = document.getElementById('audio-overlay');
    const app = document.getElementById('app-body');
    
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = 'none';
        app.style.display = 'flex';
        setTimeout(() => app.style.opacity = 1, 50);
        document.getElementById('audio-control').style.display = 'flex';
        window.navigateTo('home');
    }, 500);

    if (isSoundOn) {
        bgm.play();
        updateAudioUI(true);
    }
};

window.toggleAudio = function() {
    const bgm = document.getElementById('bgm');
    bgm.paused ? bgm.play() : bgm.pause();
    updateAudioUI(!bgm.paused);
};

function updateAudioUI(isPlaying) {
    const control = document.getElementById('audio-control');
    const text = document.getElementById('audio-text');
    if (isPlaying) {
        control.classList.add('is-playing');
        text.innerText = 'SOUND ON';
    } else {
        control.classList.remove('is-playing');
        text.innerText = 'SOUND OFF';
    }
}
