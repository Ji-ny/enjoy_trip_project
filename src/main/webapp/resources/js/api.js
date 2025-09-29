// src/main/webapp/resources/js/api.js
// 서버 측 관광 정보 API 래퍼
(function () {
  const API = window.ETBACKEND;

  async function fetchAreas() {
    return API.get('/api?action=areas');
  }

  async function fetchSigungu(areaCode) {
    if (!areaCode) return [];
    return API.get(`/api?action=sigungu&areaCode=${encodeURIComponent(areaCode)}`);
  }

  async function fetchAttractions(params) {
    const search = new URLSearchParams();
    if (params?.areaCode) search.append('areaCode', params.areaCode);
    if (params?.sigunguCode) search.append('sigunguCode', params.sigunguCode);
    if (params?.contentTypeId) search.append('contentTypeId', params.contentTypeId);
    const query = search.toString();
    const url = query ? `/api?action=attractions&${query}` : '/api?action=attractions';
    const res = await API.get(url);
    return res?.items || [];
  }

  window.ETAPI = { fetchAreas, fetchSigungu, fetchAttractions };
})();
