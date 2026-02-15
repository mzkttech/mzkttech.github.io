// ... 以前のコードの基本構造を維持 ...

window.adjustVolume = function(delta) {
    // MZKT.TECH システム：0〜10の間で調整
    volLevel = Math.max(0, Math.min(10, volLevel + delta));
    const bgm = document.getElementById('bgm');
    bgm.volume = volLevel / 10;
    
    // UI反映
    document.getElementById('ui-text').innerText = volLevel.toString().padStart(2, '0');
    
    const playStatus = document.getElementById('play-status');
    if (volLevel === 0) {
        playStatus.innerText = "MZKT.TECH ¦MUTED";
        playStatus.style.opacity = "0.4";
    } else {
        playStatus.innerText = "MZKT.TECH ▶PLAYING";
        playStatus.style.opacity = "1";
    }
};

// 進行状況バーのアニメーション
const bgmElement = document.getElementById('bgm');
bgmElement.ontimeupdate = () => {
    const timeDisplay = document.getElementById('time-display');
    const progressBar = document.getElementById('progress-text');
    
    // 時間表示
    const current = formatTime(bgmElement.currentTime);
    const duration = isNaN(bgmElement.duration) ? "--:--" : formatTime(bgmElement.duration);
    timeDisplay.innerText = `${current} / ${duration}`;
    
    // プログレスバー（20文字のバーで表現）
    if (!isNaN(bgmElement.duration)) {
        const progress = Math.floor((bgmElement.currentTime / bgmElement.duration) * 20);
        const bar = "■".repeat(progress) + "□".repeat(20 - progress);
        progressBar.innerText = bar;
    }
};

// ... formatTime, navigateTo, initSite 等を継承 ...
