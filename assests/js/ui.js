// assests/js/ui.js
(function () {
  // 이미 존재하면 재사용, 없으면 새로 생성
  const ui = window.ETUI || {};

  /**
   * 경량 토스트 (의존성 없음)
   * @param {string} msg  - 메시지
   * @param {'info'|'success'|'danger'|'warning'} [type='info'] - 색상 토큰
   * @param {number} [timeout=1000] - 자동 닫힘(ms)
   */
  ui.toast = function (msg, type = 'info', timeout = 1000) {
    const t = document.createElement('div');
    t.className = 'et-toast';
    t.textContent = msg;

    // 타입별 배경색
    const colorMap = {
      info:    '#111',
      success: '#16a34a',
      danger:  '#e11d48',
      warning: '#d97706',
    };
    t.style.background = colorMap[type] || colorMap.info;

    document.body.appendChild(t);
    // 등장 애니메이션
    requestAnimationFrame(() => t.classList.add('show'));

    // 자동 닫힘
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 200);
    }, timeout);
  };

  // 풀스크린 스피너
  ui.spinner = {
    show(target = document.body) {
      const el = document.createElement('div');
      el.className =
        'et-spinner position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
      el.style.background = 'rgba(255,255,255,.6)';
      el.style.zIndex = '1070';
      el.innerHTML = `<div class="spinner-border text-primary" role="status"></div>`;
      el.id = 'etSpinner';
      target.appendChild(el);
    },
    hide() {
      document.getElementById('etSpinner')?.remove();
    },
  };

  // 카드 컴포넌트 (홈/추천 영역 등에서 사용)
  ui.card = (item) => {
    const img =
      item.firstimage ||
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop';
    return `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card shadow-sm">
          <img class="card-img-top" src="${img}" alt="">
          <div class="card-body">
            <h5 class="card-title h6 text-truncate" title="${item.title || ''}">
              ${item.title || '관광지'}
            </h5>
            <p class="card-text small text-muted text-truncate">${item.addr1 || ''}</p>
            <a class="btn btn-outline-primary btn-sm"
               href="./attractions.html?contentId=${item.contentid || ''}">
               자세히
            </a>
          </div>
        </div>
      </div>
    `;
  };

  // 전역으로 노출
  window.ETUI = ui;
})();
