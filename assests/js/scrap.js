(function(){
  const FAV_KEY = 'enjoytrip_favs';
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const q = document.getElementById('q');
  const clearAll = document.getElementById('clearAll');

  const load = () => {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); }
    catch(_) { return []; }
  };
  const save = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));

  function render(list){
    grid.innerHTML = '';
    if(!list.length){
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    list.forEach(it=>{
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
      card.querySelector('.remove').addEventListener('click', ()=>{
        const all = load().filter(x => x.id !== it.id);
        save(all);
        ETUI.toast('스크랩을 삭제했어요.');
        render(filter(all, q.value));
      });
      grid.appendChild(card);
    });
  }

  function filter(arr, term){
    term = (term||'').trim().toLowerCase();
    if(!term) return arr;
    return arr.filter(x =>
      (x.title||'').toLowerCase().includes(term) ||
      (x.addr1||'').toLowerCase().includes(term)
    );
  }

  // 초기 렌더
  const initial = load();
  render(initial);

  // 검색
  q.addEventListener('input', ()=>{
    render(filter(load(), q.value));
  });

  // 전체삭제
  clearAll.addEventListener('click', ()=>{
    if(!confirm('스크랩을 모두 삭제할까요?')) return;
    localStorage.removeItem(FAV_KEY);
    ETUI.toast('모두 삭제했습니다.');
    render([]);
  });
})();
