document.addEventListener('DOMContentLoaded', () => {
    // 1. スクロールアニメーションの監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. URLパラメータ (?from=card) の判定
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'card') {
        // 名刺から来た場合のみ要素を表示
        const cardElements = document.querySelectorAll('.for-card-only');
        cardElements.forEach(el => {
            el.style.display = 'block';
        });
    }
});
