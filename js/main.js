(function() {
    const bgm = document.getElementById('bgm');
    const glitch = document.getElementById('glitch-overlay');
    let currentLang = 'ja';
    let volValue = 5;

    const database = {
        home: { 
            ja: '<h1 class="page-h">HELLO.<br>MZKT</h1><p>MZKT.TECH 2026 アーカイブへようこそ。全ての要素はプログラムによって制御されています。</p>',
            en: '<h1 class="page-h">HELLO.<br>MZKT</h1><p>Welcome to MZKT.TECH 2026 Archive. All elements are controlled by the program.</p>',
            zh: '<h1 class="page-h">你好。<br>MZKT</h1><p>欢迎来到 MZKT.TECH 2026 档案。所有元素均由程序控制。</p>'
        },
        works: { 
            ja: '<h1 class="page-h">WORKS.</h1><div class="item-card"><h3>GLITCH SYSTEM</h3><p>ページ遷移時の視覚効果を最適化。</p></div>' 
        },
        log: { 
            ja: '<h1 class="page-h">LOG.</h1><div class="item-card"><h3>2026.02.15</h3><p>モバイルUIの重なり問題を解消。ナビゲーションを最下部に固定。</p></div>' 
        },
        contact: { ja: '<h1 class="page-h">MAIL.</h1><p>mzkt.tech@gmail.com</p>' }
    };

    window.handleLangSelect = function(l) {
        currentLang = l;
        document.getElementById('opening-logo').classList.add('active');
        document.querySelectorAll('.lang-selector button').forEach(b => b.classList.remove('selected'));
        document.getElementById(`btn-${l}`).classList.add('selected');
        document.getElementById('start-actions').classList.add('show');
    };

    window.handleInit = function(sound) {
        document.getElementById('audio-overlay').style.display = 'none';
        document.getElementById('app-shell').style.display = 'flex';
        setTimeout(() => { document.getElementById('app-shell').style.opacity = '1'; }, 50);
        window.handleNav('home');
        if (sound) { bgm.play(); document.getElementById('play-btn').innerText = 'II'; }
    };

    window.handleNav = function(key) {
        glitch.classList.add('active'); // グリッチ演出開始
        setTimeout(() => {
            const h = document.getElementById('view-container');
            h.innerHTML = database[key] ? (database[key][currentLang] || database[key]['ja']) : database['home'][currentLang];
            h.classList.remove('view-fade');
            void h.offsetWidth; // アニメーション再トリガー
            h.classList.add('view-fade');
            document.getElementById('main-content').scrollTop = 0;
            glitch.classList.remove('active'); // グリッチ終了
        }, 150);
    };

    window.handleTheme = function() {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    };

    window.handleFontSize = function(s) {
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add(`font-${s}`);
    };

    window.handleVolume = function(d) {
        volValue = Math.max(0, Math.min(10, volValue + d));
        bgm.volume = volValue / 10;
        document.getElementById('p-vol-status').innerText = `VOL: ${volValue.toString().padStart(2, '0')}`;
    };

    window.handleTogglePlay = function() {
        if (bgm.paused) { bgm.play(); document.getElementById('play-btn').innerText = 'II'; }
        else { bgm.pause(); document.getElementById('play-btn').innerText = '▶'; }
    };

    // 背景パーティクル
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let pts = [];
    function draw() {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pts = pts.filter(p => p.o > 0);
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.o -= 0.01;
            ctx.fillStyle = `rgba(0, 188, 212, ${p.o})`;
            ctx.fillRect(p.x, p.y, 2, 2);
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener('mousemove', (e) => {
        for(let i=0; i<2; i++) pts.push({x:e.clientX, y:e.clientY, vx:Math.random()-0.5, vy:Math.random()-0.5, o:0.5});
    });
    draw();
})();
