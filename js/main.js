document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 名刺判定
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'card') {
        document.body.classList.add('is-card-access');
        const realName = document.querySelector('.real-name');
        if(realName) realName.style.display = 'block';
    }
});
