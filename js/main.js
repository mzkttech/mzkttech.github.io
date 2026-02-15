// 1. 各ページの中身を定義
const pages = {
    home: `
        <nav class="reveal">
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
        <div class="reveal">
            <span class="nav-num">/ 01</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">PROFILE</h2>
            <p style="line-height: 2; color: var(--sub); letter-spacing: 0.1em;">
                工業高校で情報工学を専攻している2026年卒業見込みの学生です。<br>
                映像制作とIT技術の融合に興味があり、本サイトもSPA構成で構築しています。
            </p>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-top:40px;">BACK</button>
        </div>`,
    works: `
        <div class="reveal">
            <span class="nav-num">/ 02</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">WORKS</h2>
            <div style="margin-bottom: 60px;">
                <p style="font-size: 1.2rem; margin-bottom: 5px;">卒業生を送る会 記念動画</p>
                <p style="color: var(--sub); font-size: 0.8rem;">VIDEO PRODUCTION / 2025</p>
            </div>
            <div style="margin-bottom: 60px;">
                <p style="font-size: 1.2rem; margin-bottom: 5px;">SPA Portfolio Site</p>
                <p style="color: var(--sub); font-size: 0.8rem;">WEB DESIGN / 2026</p>
            </div>
            <button onclick="navigateTo('home')" class="btn-mail">BACK</button>
        </div>`,
    contact: `
        <div class="reveal">
            <span class="nav-num">/ 03</span>
            <h2 class="nav-title" style="font-size: 2.5rem;">CONTACT</h2>
            <p style="color: var(--sub); margin-bottom: 40px;">ご依頼やご相談は、以下のボタンよりメールにて受け付けております。</p>
            <a href="mailto:mzkt.tech@gmail.com" class="btn-mail">SEND EMAIL</a>
            <button onclick="navigateTo('home')" class="btn-mail" style="margin-left:20px; border:none; opacity:0.5;">BACK</button>
        </div>`
};

// 2. ページ遷移の関数
function navigateTo(pageKey) {
    const contentArea = document.getElementById('content-area');
    const indicator = document.getElementById('page-indicator');
    
    // フェードアウト
    contentArea.style.opacity = 0;
    
    setTimeout(() => {
        // 中身の書き換え
        contentArea.innerHTML = pages[pageKey];
        indicator.innerText = `/ ${pageKey.toUpperCase()}`;
        
        // フェードイン
        contentArea.style.opacity = 1;
        
        // アニメーション適用
        const reveals = contentArea.querySelectorAll('.reveal');
        reveals.forEach(el => {
            setTimeout(() => el.classList.add('is-visible'), 100);
        });
    }, 500);
}

// 3. サイト初期化
function initSite(isSoundOn) {
    const bgm = document.getElementById('bgm');
    document.getElementById('audio-overlay').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-body').style.display = 'flex';
        document.getElementById('audio-control').style.display = 'flex';
        navigateTo('home');
        
        // アニメーション（サイドバー用）
        document.querySelectorAll('.side-static .reveal').forEach(el => el.classList.add('is-visible'));
    }, 500);

    if (isSoundOn) {
        bgm.play();
        updateAudioUI(true);
    }
}

// 4. 音声管理
function toggleAudio() {
    const bgm = document.getElementById('bgm');
    if (bgm.paused) {
        bgm.play();
        updateAudioUI(true);
    } else {
        bgm.pause();
        updateAudioUI(false);
    }
}

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
