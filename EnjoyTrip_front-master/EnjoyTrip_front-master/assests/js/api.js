// assests/js/api.js
// TourAPI2 KorService2 래퍼 + 실패 시 fallback

window.ETAPI = (function () {
  const KEY  = window.ENJOYTRIP_CONFIG?.KTO_SERVICE_KEY || '';
  const BASE = 'https://apis.data.go.kr/B551011/KorService2';
  const COMMON = `serviceKey=${KEY}&MobileOS=ETC&MobileApp=EnjoyTrip&_type=json`;

  async function fetchItems(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const body = data?.response?.body;
    const items = body?.items?.item || [];
    return Array.isArray(items) ? items : [items];
  }

  // 시/도
  async function fetchAreas() {
    const url = `${BASE}/areaCode2?${COMMON}&numOfRows=100&pageNo=1`;
    try {
      const items = await fetchItems(url);
      return items.map(it => ({ code: String(it.code), name: it.name }));
    } catch (e) {
      console.warn('TourAPI areaCode2 실패, fallback 사용:', e);
      return [
        {code:'1', name:'서울'}, {code:'2', name:'인천'}, {code:'3', name:'대전'},
        {code:'4', name:'대구'}, {code:'5', name:'광주'}, {code:'6', name:'부산'},
        {code:'7', name:'울산'}, {code:'8', name:'세종특별자치시'},
        {code:'31', name:'경기도'}, {code:'32', name:'강원특별자치도'},
        {code:'33', name:'충청북도'}, {code:'34', name:'충청남도'},
        {code:'35', name:'경상북도'}, {code:'36', name:'경상남도'},
        {code:'37', name:'전라북도'}, {code:'38', name:'전라남도'},
        {code:'39', name:'제주도'}
      ];
    }
  }

  // 구/군
  async function fetchSigungu(areaCode) {
    if (!areaCode) return [];
    const url = `${BASE}/areaCode2?${COMMON}&numOfRows=500&pageNo=1&areaCode=${areaCode}`;
    try {
      const items = await fetchItems(url);
      return items.map(it => ({ code: String(it.code), name: it.name }));
    } catch (e) {
      console.warn('TourAPI sigungu 실패:', e);
      return [];
    }
  }

  // 관광지 목록
  async function fetchAttractions({ areaCode, sigunguCode, contentTypeId }) {
    const q = new URLSearchParams(COMMON);
    q.append('numOfRows', '200');
    q.append('pageNo', '1');
    if (areaCode)     q.append('areaCode', areaCode);
    if (sigunguCode)  q.append('sigunguCode', sigunguCode);
    if (contentTypeId)q.append('contentTypeId', contentTypeId);
    const url = `${BASE}/areaBasedList2?${q.toString()}`;
    const items = await fetchItems(url);
    return items.map(it => ({
      id: String(it.contentid),    
      title: it.title,
      addr1: it.addr1,
      mapx: it.mapx,
      mapy: it.mapy,
      firstimage: it.firstimage
    }));
  }

  return { fetchAreas, fetchSigungu, fetchAttractions };
})();
