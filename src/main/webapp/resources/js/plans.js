// src/main/webapp/resources/js/plans.js
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const ROOT = window.APP_CONTEXT || '';
  let plans = [];

  function haversineKm(a, b) {
    const R = 6371;
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const s1 = Math.sin(dLat / 2) ** 2;
    const s2 =
      Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s1 + s2));
  }

  function sumDistanceKm(wps) {
    if ((wps || []).length < 2) return 0;
    let d = 0;
    for (let i = 1; i < wps.length; i += 1) {
      d += haversineKm(wps[i - 1], wps[i]);
    }
    return Math.round(d * 100) / 100;
  }

  function render() {
    const grid = $('#planGrid');
    const empty = $('#emptyPlans');
    grid.innerHTML = '';

    if (!plans.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    plans.forEach((plan) => {
      const stops = (plan.waypoints || []).length;
      const dist = sumDistanceKm(plan.waypoints || []);
      const card = document.createElement('div');
      card.className = 'col-12 col-md-6 col-lg-4';
      card.innerHTML = `
        <div class="plan-card card rounded-4 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between">
              <div class="me-2">
                <div class="h6 fw-bolder mb-1 text-truncate" title="${plan.name || ''}">
                  ${plan.name || '이름 없는 계획'}
                </div>
                <div class="text-muted small">${new Date(plan.updatedAt || plan.createdAt).toLocaleString()}</div>
              </div>
              <span class="badge bg-light text-dark">${stops}곳</span>
            </div>
            <div class="text-muted small mt-2">총 거리: ${dist.toLocaleString()}km</div>
            ${plan.memo ? `<div class="small mt-2 text-truncate-2">${plan.memo}</div>` : ''}
          </div>
          <div class="card-footer bg-white d-flex gap-2">
            <a class="btn btn-primary btn-sm flex-fill" href="${ROOT}/main?action=plan&id=${plan.id}"><i class="bi bi-pencil-square"></i> 열기</a>
            <button class="btn btn-light btn-sm flex-fill share" data-id="${plan.id}"><i class="bi bi-link-45deg"></i> 링크복사</button>
            <button class="btn btn-outline-danger btn-sm del" data-id="${plan.id}"><i class="bi bi-trash"></i> 삭제</button>
          </div>
        </div>`;

      card.querySelector('.del').addEventListener('click', async () => {
        if (!confirm('계획을 삭제할까요?')) return;
        try {
          await ETBACKEND.delete(`/plan?action=delete&id=${encodeURIComponent(plan.id)}`);
          ETUI.toast('삭제했습니다.', 'info');
          await load();
        } catch (err) {
          if (err.status === 401) {
            ETUI.toast('로그인이 필요합니다.', 'warning');
          } else {
            ETUI.toast('삭제 중 오류가 발생했습니다.', 'danger');
          }
        }
      });

      card.querySelector('.share').addEventListener('click', async () => {
        const url = new URL(`${ROOT}/main`, location.origin);
        url.searchParams.set('action', 'plan');
        url.searchParams.set('id', plan.id);
        try {
          await navigator.clipboard.writeText(url.toString());
          ETUI.toast('링크를 복사했어요.', 'success');
        } catch {
          ETUI.toast('복사 실패. 직접 선택해 복사하세요.', 'danger');
          alert(url.toString());
        }
      });

      grid.appendChild(card);
    });
  }

  async function load() {
    try {
      const res = await ETBACKEND.get('/plan?action=list');
      plans = Array.isArray(res) ? res : res?.plans || [];
    } catch (err) {
      if (err.status === 401) {
        plans = [];
        ETUI.toast('로그인이 필요합니다.', 'warning');
      } else {
        console.error(err);
        ETUI.toast('계획을 불러오지 못했습니다.', 'danger');
      }
    }
    render();
  }

  load();
})();
