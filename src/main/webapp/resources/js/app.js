// src/main/webapp/resources/js/app.js
(async function () {
  const ROOT = window.APP_CONTEXT || '';
  const areaSel = document.getElementById('areaSelect');
  const sigunguSel = document.getElementById('sigunguSelect');
  const contentSel = document.getElementById('contentTypeSelect');
  const cardContainer = document.getElementById('cardContainer');

  if (areaSel && !areaSel.options.length) {
    areaSel.innerHTML = `<option value="">로딩 중...</option>`;
  }
  if (sigunguSel && !sigunguSel.options.length) {
    sigunguSel.innerHTML = `<option value="">전체</option>`;
  }

  async function loadAreas() {
    try {
      const areas = await ETAPI.fetchAreas();
      areaSel.innerHTML =
        `<option value="">시/도 선택</option>` +
        areas.map((a) => `<option value="${a.code}">${a.name}</option>`).join('');
      await loadSigungu();
    } catch (e) {
      console.error(e);
      ETUI.toast('지역 정보를 불러오지 못했습니다.', 'danger');
    }
  }

  async function loadSigungu() {
    try {
      const sig = await ETAPI.fetchSigungu(areaSel.value);
      sigunguSel.innerHTML =
        `<option value="">전체</option>` +
        sig.map((s) => `<option value="${s.code}">${s.name}</option>`).join('');
    } catch (e) {
      console.error(e);
      sigunguSel.innerHTML = `<option value="">전체</option>`;
    }
  }
  areaSel?.addEventListener('change', loadSigungu);

  async function loadSample() {
    try {
      const items = await ETAPI.fetchAttractions({ areaCode: 6, sigunguCode: 2 });
      cardContainer &&
        (cardContainer.innerHTML = items.slice(0, 8).map(ETUI.card).join(''));
    } catch (e) {
      console.error(e);
    }
  }

  document.getElementById('heroSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      area: areaSel.value || '',
      sigungu: sigunguSel.value || '',
      contentTypeId: contentSel.value || '',
    });
    location.href = `${ROOT}/main?action=attractions&${params.toString()}`;
  });

  await loadAreas();
  await loadSample();
})();
