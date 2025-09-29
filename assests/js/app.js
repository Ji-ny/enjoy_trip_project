// assests/js/app.js
(async function () {
  const areaSel = document.getElementById("areaSelect");
  const sigunguSel = document.getElementById("sigunguSelect");
  const contentSel = document.getElementById("contentTypeSelect");
  const cardContainer = document.getElementById("cardContainer");

  if (areaSel && !areaSel.options.length) {
    areaSel.innerHTML = `<option value="">로딩 중...</option>`;
  }
  if (sigunguSel && !sigunguSel.options.length) {
    sigunguSel.innerHTML = `<option value="">전체</option>`;
  }

  async function loadAreas() {
    const areas = await ETAPI.fetchAreas();
    areaSel.innerHTML =
      `<option value="">시/도 선택</option>` +
      areas.map((a) => `<option value="${a.code}">${a.name}</option>`).join("");
    await loadSigungu();
  }
  async function loadSigungu() {
    const sig = await ETAPI.fetchSigungu(areaSel.value);
    sigunguSel.innerHTML =
      `<option value="">전체</option>` +
      sig.map((s) => `<option value="${s.code}">${s.name}</option>`).join("");
  }
  areaSel?.addEventListener("change", loadSigungu);

  async function loadSample() {
    const items = await ETAPI.fetchAttractions({ areaCode: 6, sigunguCode: 2 });
    cardContainer &&
      (cardContainer.innerHTML = items.slice(0, 8).map(ETUI.card).join(""));
  }

  // 관광지 둘러보기 -> 선택값 전달
  document.getElementById("heroSearchForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      area: areaSel.value || "",
      sigungu: sigunguSel.value || "",
      contentTypeId: contentSel.value || "",
    });
    location.href = `./attractions.html?${params.toString()}`;
  });

  await loadAreas();
  await loadSample();
})();
