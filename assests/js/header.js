// assests/js/header.js
const svgPin = `
<svg class="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>`;

const markup = `
<header class="gh-header">
  <div class="gh-container">
    <a class="gh-logo" href="./index.html">
      <span class="gh-logo-badge">${svgPin}</span>
      <span class="gh-logo-text" style="font-weight:600">EnjoyTrip</span>
    </a>

    <nav class="gh-nav">
      <a href="./index.html" data-match="(^/|index\\.html$)">홈</a>
      <a href="./attractions.html" data-match="attractions\\.html$">여행지</a>
      <a href="./plan.html" data-match="plan\\.html$">여행계획</a>
      <a href="./plans.html" data-match="plans\\.html$">경로 리스트</a>
      <a href="./scrap.html" data-match="scrap\\.html$">스크랩</a>
    </nav>

    <div class="gh-actions" id="ghActions"></div>
  </div>
</header>
`;

const mount = document.getElementById("globalHeader");
if (mount) {
  mount.outerHTML = markup;
} else {
  document.body.insertAdjacentHTML("afterbegin", markup);
}

// 현재 경로에 맞춰 활성 링크 표시
const path = location.pathname;
document.querySelectorAll(".gh-nav a[data-match]").forEach((a) => {
  const re = new RegExp(a.dataset.match);
  if (
    re.test(path) ||
    (a.getAttribute("href")?.endsWith("index.html") &&
      (path === "/" || path.endsWith("/index.html")))
  ) {
    a.classList.add("active");
  }
});
