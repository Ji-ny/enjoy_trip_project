// src/main/webapp/resources/js/scrap.js
(async function () {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const q = document.getElementById('q');
  const clearAll = document.getElementById('clearAll');

  let scraps = [];

  function render(list) {
    grid.innerHTML = '';
    if (!list.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    list.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'fav-card';
      card.innerHTML = `
        <img src="${it.firstimage || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop'}"
             alt="${it.title}" onerror="this.src='https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop'">
        <div class="body">
          <div class="title">${it.title}</div>
          <div class="addr">${it.addr1 || ''}</div>
          <div class="actions">
            <a class="btn btn-outline-secondary btn-sm" target="_blank"
               href="https://map.kakao.com/link/map/${encodeURIComponent(it.title)},${it.mapy},${it.mapx}">
               지도에서 보기
            </a>
            <button class="btn btn-outline-danger btn-sm remove">삭제</button>
          </div>
        </div>`;
      card.querySelector('.remove').addEventListener('click', async () => {
        try {
          await ETBACKEND.delete(`/scrap?action=remove&id=${encodeURIComponent(it.id)}`);
          ETUI.toast('스크랩을 삭제했어요.');
          await load();
        } catch (err) {
          if (err.status === 401) {
            ETUI.toast('로그인이 필요합니다.', 'warning');
          } else {
            ETUI.toast('삭제 중 오류가 발생했습니다.', 'danger');
          }
        }
      });
      grid.appendChild(card);
    });
  }

  function filter(arr, term) {
    term = (term || '').trim().toLowerCase();
    if (!term) return arr;
    return arr.filter((x) =>
      (x.title || '').toLowerCase().includes(term) ||
      (x.addr1 || '').toLowerCase().includes(term)
    );
  }

  async function load() {
    try {
      const res = await ETBACKEND.get('/scrap?action=list');
      scraps = Array.isArray(res) ? res : res?.scraps || [];
    } catch (err) {
      if (err.status === 401) {
        scraps = [];
        ETUI.toast('로그인이 필요합니다.', 'warning');
      } else {
        console.error(err);
        ETUI.toast('스크랩을 불러오지 못했습니다.', 'danger');
      }
    }
    render(filter(scraps, q.value));
  }

  q?.addEventListener('input', () => {
    render(filter(scraps, q.value));
  });

  clearAll?.addEventListener('click', async () => {
    if (!confirm('스크랩을 모두 삭제할까요?')) return;
    try {
      await ETBACKEND.delete('/scrap?action=clear');
      ETUI.toast('모두 삭제했습니다.');
      await load();
    } catch (err) {
      if (err.status === 401) {
        ETUI.toast('로그인이 필요합니다.', 'warning');
      } else {
        ETUI.toast('삭제 중 오류가 발생했습니다.', 'danger');
      }
    }
  });

  await load();
})();
