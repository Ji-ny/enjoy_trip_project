// assests/js/attractions.js
(async function () {
  const formEl = document.getElementById("filterForm");
  const areaSel = document.getElementById("area");
  const sigunguSel = document.getElementById("sigungu");
  const contentSel = document.getElementById("contentTypeId");
  const listEl = document.getElementById("list");
  const countEl = document.getElementById("resultCount");

  // ── URL 쿼리 읽기 (홈에서 전달)
  const qs = new URLSearchParams(location.search);
  const initArea = qs.get("area") || "";
  const initSigungu = qs.get("sigungu") || "";
  const initType = qs.get("contentTypeId") || "";

  // Kakao 지도 초기화(동일)
  const map = new kakao.maps.Map(document.getElementById("map"), {
    center: new kakao.maps.LatLng(36.5, 127.8),
    level: 9,
  });

  // InfoWindow 대신 CustomOverlay (동일)
  const infoOverlay = new kakao.maps.CustomOverlay({ yAnchor: 1, zIndex: 3 });
  function openInfo(pos, contentNode) {
    infoOverlay.setContent(contentNode);
    infoOverlay.setPosition(pos);
    infoOverlay.setMap(map);
    map.panTo(pos);
  }
  function closeInfo() {
    infoOverlay.setMap(null);
  }

  const geocoder = new kakao.maps.services.Geocoder();
  let markers = [];
  const clearMarkers = () => {
    markers.forEach((m) => m.setMap(null));
    markers = [];
  };

  const PLACEHOLDER =
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop";

  // 스크랩(동일) ...
  const FAV_KEY = "enjoytrip_favs";
  const loadFavs = () => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    } catch (_) {
      return [];
    }
  };
  const saveFavs = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  let favs = loadFavs();
  const isFav = (id) => favs.some((f) => f.id === id);
  const toggleFav = (item) => {
    if (isFav(item.id)) {
      favs = favs.filter((f) => f.id !== item.id);
      saveFavs(favs);
      ETUI.toast("스크랩을 취소했어요.", "info", 1000);
      return false;
    } else {
      favs = [{ ...item }, ...favs];
      saveFavs(favs);
      ETUI.toast("스크랩했어요!", "success", 1000);
      return true;
    }
  };

  // 좌표/포커스(동일)
  function isValidKoreaCoord(lat, lng) {
    return lat >= 32 && lat <= 39.7 && lng >= 124 && lng <= 132;
  }
  function moveToAddress(addr, level = 8) {
    return new Promise((resolve) => {
      if (!addr) return resolve(null);
      geocoder.addressSearch(addr, (results, status) => {
        if (status === kakao.maps.services.Status.OK && results[0]) {
          const pos = new kakao.maps.LatLng(+results[0].y, +results[0].x);
          map.setLevel(level);
          map.panTo(pos);
          resolve(pos);
        } else resolve(null);
      });
    });
  }
  async function focusToSelectedRegion() {
    const areaText = areaSel.options[areaSel.selectedIndex]?.text || "";
    const sigText = sigunguSel.options[sigunguSel.selectedIndex]?.text || "";
    const full = sigText ? `${areaText} ${sigText}` : areaText;
    await moveToAddress(full, sigText ? 6 : 8);
  }

  // 시/도 · 구/군 (초기 선선택 지원)
  async function loadAreas(preselectArea, preselectSigungu) {
    try {
      const areas = await ETAPI.fetchAreas();
      areaSel.innerHTML =
        `<option value="">시/도 선택</option>` +
        (areas || [])
          .map((a) => `<option value="${a.code}">${a.name}</option>`)
          .join("");
      if (preselectArea) areaSel.value = preselectArea;
    } catch (e) {
      areaSel.innerHTML = `<option value="">시/도 선택</option>`;
    }
    await loadSigungu(preselectSigungu);
  }

  async function loadSigungu(preselectSigungu) {
    try {
      const list = await ETAPI.fetchSigungu(areaSel.value);
      sigunguSel.innerHTML =
        `<option value="">전체</option>` +
        (list || [])
          .map((s) => `<option value="${s.code}">${s.name}</option>`)
          .join("");
      if (preselectSigungu) sigunguSel.value = preselectSigungu;
    } catch (e) {
      sigunguSel.innerHTML = `<option value="">전체</option>`;
    }
  }

  areaSel.addEventListener("change", async () => {
    await loadSigungu();
    await focusToSelectedRegion();
  });
  sigunguSel.addEventListener("change", async () => {
    await focusToSelectedRegion();
  });
  contentSel.addEventListener("change", () => search());
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
  });

  async function search() {
    const items = await ETAPI.fetchAttractions({
      areaCode: areaSel.value,
      sigunguCode: sigunguSel.value,
      contentTypeId: contentSel.value,
    });
    const hadMarkers = render(items);
    if (!hadMarkers) {
      await focusToSelectedRegion();
    }
  }

  function render(items) {
    countEl.textContent = items.length || 0;
    listEl.innerHTML = "";
    clearMarkers();
    closeInfo();

    if (!items.length) {
      listEl.innerHTML = `<div class="text-muted small">검색 결과가 없습니다.</div>`;
      return false;
    }

    let hadMarkers = false;
    const bounds = new kakao.maps.LatLngBounds();

    items.forEach((it) => {
      const id = String(it.id || `${it.title}-${it.mapx}-${it.mapy}`);
      const lat = Number(it.mapy),
        lng = Number(it.mapx);
      const title = it.title || "관광지";
      const addr = it.addr1 || "";
      const img = it.firstimage || "";

      const row = document.createElement("div");
      row.className = "list-group-item list-group-item-action";
      row.innerHTML = `
        <div class="d-flex gap-2">
          <img src="${img || PLACEHOLDER}" width="64" height="48"
               style="object-fit:cover" class="rounded"
               onerror="this.src='${PLACEHOLDER}'">
          <div class="flex-grow-1 pe-5">
            <div class="fw-semibold">${title}</div>
            <div class="text-muted small">${addr}</div>
          </div>
        </div>`;
      const scrapBtn = document.createElement("button");
      scrapBtn.className = "scrap-btn" + (isFav(id) ? " active" : "");
      scrapBtn.innerHTML = `<i class="bi bi-heart-fill"></i>`;
      row.appendChild(scrapBtn);

      row.addEventListener("click", (ev) => {
        if (ev.target.closest(".scrap-btn")) return;
        if (!isNaN(lat) && !isNaN(lng) && isValidKoreaCoord(lat, lng)) {
          const pos = new kakao.maps.LatLng(lat, lng);
          const node = buildInfoWindow({ title, addr, img });
          openInfo(pos, node);
        }
      });
      scrapBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const active = toggleFav({
          id,
          title,
          addr1: addr,
          mapx: lng,
          mapy: lat,
          firstimage: img,
        });
        scrapBtn.classList.toggle("active", active);
      });

      listEl.appendChild(row);

      if (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat &&
        lng &&
        isValidKoreaCoord(lat, lng)
      ) {
        const pos = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({ position: pos });
        marker.setMap(map);
        markers.push(marker);
        bounds.extend(pos);
        hadMarkers = true;

        const node = buildInfoWindow({ title, addr, img });
        kakao.maps.event.addListener(marker, "click", () =>
          openInfo(pos, node)
        );
      }
    });

    if (hadMarkers) {
      map.relayout?.();
      map.setBounds(bounds, 20, 20, 20, 20);
    }
    return hadMarkers;
  }

  function buildInfoWindow({ title, addr, img }) {
    const node = document.createElement("div");
    node.className = "et-iw";
    node.innerHTML = `
      <button class="et-iw-close" aria-label="닫기">×</button>
      <div class="marker-title">${title}</div>
      <div class="marker-addr">${addr}</div>
      <div class="marker-img-wrap">
        <img src="${
          img || PLACEHOLDER
        }" alt="${title}" onerror="this.src='${PLACEHOLDER}'">
      </div>`;
    node.querySelector(".et-iw-close").addEventListener("click", closeInfo);
    return node;
  }

  // ✅ 초기화: 쿼리값을 반영해 선선택 후 검색
  await loadAreas(initArea, initSigungu);
  if (initType) contentSel.value = initType;
  await focusToSelectedRegion();
  await search();
})();
