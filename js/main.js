const pages = {
    home: `<div class="content-inner">
             <p class="tag">INTRODUCTION</p>
             <h2 class="title">CRAFTING DIGITAL<br>EXPERIENCES.</h2>
             <p class="desc">工業高校で情報工学を専攻。テクノロジーとアートの交差点を追求しています。</p>
           </div>`,
    profile: `<div class="content-inner">
                <p class="tag">ABOUT ME</p>
                <h2 class="title">STUDENT /<br>CREATOR.</h2>
                <p class="desc">2026年卒業見込み。映像制作とWeb開発を主軸に活動中。</p>
              </div>`,
    works: `<div class="content-inner">
               <p class="tag">PORTFOLIO</p>
               <h2 class="title">SELECTED<br>PROJECTS.</h2>
               <p class="desc"> graduations / visuals / systems </p>
            </div>`,
    contact: `<div class="content-inner">
                <p class="tag">GET IN TOUCH</p>
                <h2 class="title">SAY HELLO.</h2>
                <p class="desc">mzkt.tech@gmail.com</p>
              </div>`
};

window.initSite = function(isSoundOn) {
    const overlay = document.getElementById('audio-overlay');
    const shell = document.getElementById('app-shell');
    const bgm = document.getElementById('bgm');

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        shell.style.visibility = 'visible';
        shell.style.opacity = '1';
        document.getElementById('audio-ui').style.display = 'flex';
        navigateTo('home');
    }, 1000);

    if (isSoundOn) {
        bgm.play();
        document.getElementById('audio-ui').classList.add('is-playing');
    }
};

window.navigateTo = function(pageKey) {
    const holder = document.getElementById('content-holder');
    holder.style.opacity = '0';
    holder.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        holder.innerHTML = pages[pageKey];
        holder.style.opacity = '1';
        holder.style.transform = 'translateY(0)';
    }, 600);
};

window.toggleAudio = function() {
    const bgm = document.getElementById('bgm');
    const ui = document.getElementById('audio-ui');
    if (bgm.paused) {
        bgm.play();
        ui.classList.add('is-playing');
    } else {
        bgm.pause();
        ui.classList.remove('is-playing');
    }
};
