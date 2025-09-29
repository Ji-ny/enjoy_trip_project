// assests/js/plan.js
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const PLANS_KEY = "et_plans";

  // ---------- Storage ----------
  const loadPlans = () => {
    try {
      return JSON.parse(localStorage.getItem(PLANS_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const savePlans = (arr) =>
    localStorage.setItem(PLANS_KEY, JSON.stringify(arr));
  const genId = () => "p" + Date.now().toString(36);

  // ---------- Kakao map ----------
  const map = new kakao.maps.Map($("#planMap"), {
    center: new kakao.maps.LatLng(36.5, 127.8),
    level: 12,
  });
  const places = new kakao.maps.services.Places();
  const geocoder = new kakao.maps.services.Geocoder();

  let waypoints = []; // {id, name, lat, lng, addr}
  let markers = [];
  const polyline = new kakao.maps.Polyline({
    map,
    strokeWeight: 4,
    strokeOpacity: 0.9,
    strokeColor: "#2563eb",
    strokeStyle: "solid",
  });

  function clearMap() {
    markers.forEach((m) => m.setMap(null));
    markers = [];
    polyline.setMap(null);
    polyline.setMap(map);
  }

  function updateMap() {
    clearMap();
    if (!waypoints.length) {
      $("#wpCount").textContent = "(0)";
      $("#totalDist").textContent = "0km";
      $("#totalTime").textContent = "0분";
      return;
    }

    const path = [];
    const bounds = new kakao.maps.LatLngBounds();

    waypoints.forEach((wp, idx) => {
      const pos = new kakao.maps.LatLng(wp.lat, wp.lng);
      path.push(pos);
      bounds.extend(pos);

      // 마커 + 넘버 라벨
      const marker = new kakao.maps.Marker({
        position: pos,
        title: `${idx + 1}. ${wp.name}`,
      });
      marker.setMap(map);
      markers.push(marker);

      const iw = new kakao.maps.InfoWindow({
        content: `<div style="padding:6px 8px;font-size:12px">${idx + 1}. ${
          wp.name
        }</div>`,
      });
      kakao.maps.event.addListener(marker, "click", () => iw.open(map, marker));
    });

    polyline.setPath(path);
    if (path.length >= 2) {
      const distM = polyline.getLength();
      const distKm = Math.round(distM / 10) / 100; // 소수 2자리
      // 단순 주행시간 추정(시속 40km 가정)
      const minutes = Math.round((distKm / 40) * 60);
      $("#totalDist").textContent = `${distKm.toLocaleString()}km`;
      $("#totalTime").textContent = `${minutes}분`;
    } else {
      $("#totalDist").textContent = "0km";
      $("#totalTime").textContent = "0분";
    }

    map.setBounds(bounds, 40, 40, 40, 40);
    $("#wpCount").textContent = `(${waypoints.length})`;
  }

  // ---------- UI: 검색 ----------
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#q").value.trim();
    if (!q) return;

    ETUI.spinner.show();
    places.keywordSearch(
      q,
      (data, status) => {
        ETUI.spinner.hide();
        const list = $("#searchList");
        list.innerHTML = "";
        if (status !== kakao.maps.services.Status.OK || !data?.length) {
          list.innerHTML = `<div class="list-group-item small text-muted">검색 결과가 없습니다.</div>`;
          return;
        }
        data.slice(0, 10).forEach((p) => {
          const item = document.createElement("a");
          item.href = "javascript:void(0)";
          item.className = "list-group-item list-group-item-action";
          item.innerHTML = `
            <div class="d-flex justify-content-between">
              <div>
                <div class="fw-semibold">${p.place_name}</div>
                <div class="text-muted small">${
                  p.road_address_name || p.address_name || ""
                }</div>
              </div>
              <button class="btn btn-outline-primary btn-sm add">추가</button>
            </div>`;
          item.querySelector(".add").addEventListener("click", () => {
            addWaypoint({
              id: p.id,
              name: p.place_name,
              lat: +p.y,
              lng: +p.x,
              addr: p.road_address_name || p.address_name || "",
            });
          });
          item.addEventListener("click", (ev) => {
            if (ev.target.closest(".add")) return;
            const pos = new kakao.maps.LatLng(+p.y, +p.x);
            map.panTo(pos);
          });
          list.appendChild(item);
        });
      },
      { size: 15 }
    );
  });

  function addWaypoint(wp) {
    waypoints.push(wp);
    renderWaypointList();
    updateMap();
  }

  // ---------- 선택 리스트 렌더 + 드래그 정렬 ----------
  function renderWaypointList() {
    const box = $("#waypointList");
    box.innerHTML = "";
    if (!waypoints.length) {
      box.innerHTML = `<div class="hint small text-muted px-2">장소를 추가하면 여기에 나타납니다. (드래그로 순서 변경)</div>`;
      return;
    }
    waypoints.forEach((wp, idx) => {
      const row = document.createElement("div");
      row.className = "wp-row";
      row.draggable = true;
      row.dataset.id = wp.id;
      row.innerHTML = `
          <div class="handle"><i class="bi bi-grip-vertical"></i></div>
          <div class="info">
            <div class="title"><span class="idx">${idx + 1}</span> ${
        wp.name
      }</div>
            <div class="addr">${wp.addr || ""}</div>
          </div>
          <div class="actions">
            <button class="btn btn-light btn-sm up" title="위로"><i class="bi bi-arrow-up"></i></button>
            <button class="btn btn-light btn-sm down" title="아래로"><i class="bi bi-arrow-down"></i></button>
            <button class="btn btn-outline-danger btn-sm del" title="삭제"><i class="bi bi-trash"></i></button>
          </div>
        `;
      row.querySelector(".up").addEventListener("click", () => move(idx, -1));
      row.querySelector(".down").addEventListener("click", () => move(idx, +1));
      row.querySelector(".del").addEventListener("click", () => remove(idx));

      // 드래그 앤 드롭
      row.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", String(idx));
        row.classList.add("dragging");
      });
      row.addEventListener("dragend", () => row.classList.remove("dragging"));
      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        row.classList.add("dragover");
      });
      row.addEventListener("dragleave", () => row.classList.remove("dragover"));
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        row.classList.remove("dragover");
        const from = +e.dataTransfer.getData("text/plain");
        const to = idx;
        reorder(from, to);
      });

      row.addEventListener("click", () => {
        const pos = new kakao.maps.LatLng(wp.lat, wp.lng);
        map.panTo(pos);
      });

      box.appendChild(row);
    });
  }

  function move(i, diff) {
    const j = i + diff;
    if (j < 0 || j >= waypoints.length) return;
    const t = waypoints[i];
    waypoints[i] = waypoints[j];
    waypoints[j] = t;
    renderWaypointList();
    updateMap();
  }
  function remove(i) {
    waypoints.splice(i, 1);
    renderWaypointList();
    updateMap();
  }
  function reorder(from, to) {
    if (from === to) return;
    const item = waypoints.splice(from, 1)[0];
    waypoints.splice(to, 0, item);
    renderWaypointList();
    updateMap();
  }

  // ---------- 초기화 & 저장 ----------
  $("#btnClear").addEventListener("click", () => {
    if (!confirm("모든 경유지를 제거할까요?")) return;
    waypoints = [];
    renderWaypointList();
    updateMap();
  });

  // 기존 계획 로드 (plan.html?id=xxx)
  const qs = new URLSearchParams(location.search);
  const planId = qs.get("id");
  if (planId) {
    const plan = loadPlans().find((p) => p.id === planId);
    if (plan) {
      waypoints = (plan.waypoints || []).map((w) => ({ ...w }));
      renderWaypointList();
      updateMap();
      $("#planName").value = plan.name || "";
      $("#planMemo").value = plan.memo || "";
    }
  }

  // 저장
  $("#btnSavePlan").addEventListener("click", () => {
    if (!waypoints.length) {
      ETUI.toast("경유지를 1개 이상 추가하세요.", "warning");
      return;
    }
    new bootstrap.Modal("#saveModal").show();
  });
  $("#saveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#planName").value.trim();
    const memo = $("#planMemo").value.trim();
    if (!name) {
      ETUI.toast("계획 이름을 입력하세요.", "danger");
      return;
    }

    const list = loadPlans();
    const now = new Date().toISOString();

    if (planId) {
      // 수정 저장
      const idx = list.findIndex((p) => p.id === planId);
      if (idx >= 0)
        list[idx] = { ...list[idx], name, memo, waypoints, updatedAt: now };
    } else {
      // 새로 저장
      list.unshift({
        id: genId(),
        name,
        memo,
        createdAt: now,
        updatedAt: now,
        waypoints,
      });
    }
    savePlans(list);
    ETUI.toast("저장되었습니다.", "success");
    bootstrap.Modal.getInstance("#saveModal")?.hide();
    // 저장 후 목록으로 이동 여부는 선택. 여기서는 편집 계속.
  });

  // 첫 진입 도움말
  if (!planId && !waypoints.length) {
    // 현재 도시 중심으로 살짝 이동(서울)
    geocoder.addressSearch("서울특별시", (res, status) => {
      if (status === kakao.maps.services.Status.OK) {
        map.setLevel(8);
        map.panTo(new kakao.maps.LatLng(+res[0].y, +res[0].x));
      }
    });
  }
})();
