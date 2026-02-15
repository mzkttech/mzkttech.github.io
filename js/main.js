const pages = {
    home: `<div class="reveal">
             <p class="tag">STARTING LINE</p>
             <h2 class="title">NEW<br>JOURNEY.</h2>
             <p class="desc">2026年、情報工学の世界へ。<br>技術と創造性が交差する場所で、新しい物語を始めます。</p>
           </div>`,
    vision: `<div class="reveal">
                <p class="tag">VISION</p>
                <h2 class="title">BEYOND<br>THE TECH.</h2>
                <p class="desc">単なるコードの羅列ではなく、人の心を動かす体験を。<br>これから始まる学びのすべてを、表現の力に変えていきます。</p>
              </div>`,
    works: `<div class="reveal">
               <p class="tag">PORTFOLIO</p>
               <h2 class="title">FIRST<br>STEP.</h2>
               <p class="desc">このSPAサイトは、入学前に構築した最初のプロジェクトです。<br>エンジニアリングへの挑戦は、ここから始まります。</p>
            </div>`,
    contact: `<div class="reveal">
                <p class="tag">CONTACT</p>
                <h2 class="title">GET IN<br>TOUCH.</h2>
                <p class="desc">mzkt.tech@gmail.com</p>
              </div>`
};

let volLevel = 10;

window.initSite = function(isSoundOn) {
    const overlay = document.getElementById('audio-overlay');
    const shell = document.getElementById('app-shell');
    const bgm = document.getElementById('bgm');

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        shell.style.display = 'flex';
        setTimeout(() => shell.style.opacity = '1', 50);
        document.getElementById('audio-ui').style.display = 'flex';
        window.navigateTo('home');
    }, 1000);

    if (isSoundOn) {
        bgm.volume = 1.0;
        bgm.play().catch(e => console.log("Audio blocked"));
        document.getElementById('audio-ui').classList.add('is-playing');
    } else {
        volLevel = 0;
        updateVolumeUI();
    }
};

window.navigateTo = function(pageKey) {
    const holder = document.getElementById('content-holder');
    holder.style.opacity = '0';
    
    setTimeout(() => {
        holder.innerHTML = pages[pageKey] || '';
        holder.style.opacity = '1';
        const inner = holder.querySelector('.reveal');
        if(inner) setTimeout(() => inner.classList.add('is-visible'), 100);
    }, 400);
};

window.cycleVolume = function() {
    const bgm = document.getElementById('bgm');
    volLevel = (volLevel > 0) ? volLevel - 1 : 10;
    bgm.volume = volLevel / 10;
    updateVolumeUI();
    if (volLevel > 0 && bgm.paused) bgm.play();
};

function updateVolumeUI() {
    const uiText = document.getElementById('ui-text');
    const volBar = document.getElementById('vol-bar');
    const uiContainer = document.getElementById('audio-ui');
    uiText.innerText = volLevel === 0 ? 'MUTE' : volLevel;
    volBar.style.width = (volLevel * 10) + '%';
    if (volLevel === 0) uiContainer.classList.remove('is-playing');
    else uiContainer.classList.add('is-playing');
}
