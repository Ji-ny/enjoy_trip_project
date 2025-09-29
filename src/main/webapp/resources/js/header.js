// src/main/webapp/resources/js/header.js
// JSP에서 렌더링된 네비게이션의 활성 상태만 처리한다.
(function () {
  const anchors = document.querySelectorAll('.gh-nav a[data-match]');
  const path = window.location.search ? window.location.search : window.location.pathname;

  anchors.forEach((a) => {
    const pattern = a.dataset.match;
    if (!pattern) return;
    const regex = new RegExp(pattern);
    if (regex.test(path)) {
      a.classList.add('active');
    }
  });
})();
