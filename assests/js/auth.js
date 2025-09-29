// assests/js/auth.js
// LocalStorage 기반 인증 모듈 + 헤더 액션 동기화 + 로그인/가입 모달
// 저장키: et_user, et_session
(function () {
  const USER_KEY = "et_user";
  const SESSION_KEY = "et_session";
  const FAV_KEY = "enjoytrip_favs";

  const $ = (s, r = document) => r.querySelector(s);

  // ---------- Storage ----------
  function loadUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  }
  function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  function clearUser() {
    localStorage.removeItem(USER_KEY);
  }
  function setSession() {
    sessionStorage.setItem(SESSION_KEY, String(Date.now()));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }
  function isLoggedIn() {
    return !!(loadUser() && sessionStorage.getItem(SESSION_KEY));
  }

  // ---------- Header Actions ----------
  function renderHeaderActions() {
    const wrap = $(".gh-actions");
    if (!wrap) return;

    if (isLoggedIn()) {
      wrap.innerHTML = `
          <a class="gh-icon-btn" href="./mypage.html" title="마이페이지">
            <i class="bi bi-person-circle"></i>
          </a>
          <button class="gh-btn" id="ghLogoutBtn" type="button">로그아웃</button>
        `;
      $("#ghLogoutBtn")?.addEventListener("click", () => logout());
    } else {
      wrap.innerHTML = `
          <button class="gh-btn" id="ghLoginOpen" type="button">로그인</button>
          <button class="gh-btn primary" id="ghSignupOpen" type="button">회원가입</button>
        `;
      $("#ghLoginOpen")?.addEventListener("click", () =>
        openModal("loginModal")
      );
      $("#ghSignupOpen")?.addEventListener("click", () =>
        openModal("signupModal")
      );
    }
  }

  // ---------- Modal 생성 ----------
  function ensureModals() {
    if ($("#loginModal") || $("#signupModal")) return;
    const html = `
      <!-- 로그인 모달 -->
      <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <form class="modal-content" id="loginForm">
            <div class="modal-header"><h5 class="modal-title">로그인</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">이메일</label>
                <input name="email" type="email" class="form-control" placeholder="you@example.com" required>
              </div>
              <div class="mb-1">
                <label class="form-label">비밀번호</label>
                <input name="password" type="password" class="form-control" placeholder="••••••••" required>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="submit">로그인</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- 회원가입 모달 -->
      <div class="modal fade" id="signupModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <form class="modal-content" id="signupForm">
            <div class="modal-header"><h5 class="modal-title">회원가입</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label">이름</label>
                <input name="name" type="text" class="form-control" placeholder="홍길동" required>
              </div>
              <div class="mb-2">
                <label class="form-label">이메일</label>
                <input name="email" type="email" class="form-control" placeholder="you@example.com" required>
              </div>
              <div class="mb-2">
                <label class="form-label">비밀번호</label>
                <input name="password" type="password" minlength="6" class="form-control" placeholder="6자 이상" required>
              </div>
              <div class="mb-1">
                <label class="form-label">비밀번호 확인</label>
                <input name="password2" type="password" minlength="6" class="form-control" required>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="submit">가입하기</button>
            </div>
          </form>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", html);
  }
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    new bootstrap.Modal(el).show();
  }

  // ---------- Form 핸들 ----------
  function wireForms() {
    $("#signupForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const name = fd.get("name")?.toString().trim();
      const email = fd.get("email")?.toString().trim().toLowerCase();
      const password = fd.get("password")?.toString();
      const password2 = fd.get("password2")?.toString();

      if (!name || !email || !password) return;
      if (password !== password2) {
        ETUI.toast("비밀번호가 일치하지 않아요.", "danger");
        return;
      }

      saveUser({ name, email, password, createdAt: new Date().toISOString() });
      setSession();
      ETUI.toast("가입 완료! 환영해요 🙌", "success");
      bootstrap.Modal.getInstance($("#signupModal"))?.hide();
      e.currentTarget.reset();
      renderHeaderActions();
      window.dispatchEvent(new CustomEvent("et:login"));
    });

    $("#loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const email = fd.get("email")?.toString().trim().toLowerCase();
      const password = fd.get("password")?.toString();

      const saved = loadUser();
      if (saved && saved.email === email && saved.password === password) {
        setSession();
        ETUI.toast("로그인 완료!", "success");
        bootstrap.Modal.getInstance($("#loginModal"))?.hide();
        e.currentTarget.reset();
        renderHeaderActions();
        window.dispatchEvent(new CustomEvent("et:login"));
      } else {
        ETUI.toast("이메일 또는 비밀번호를 확인하세요.", "danger");
      }
    });
  }

  // ---------- 계정 API ----------
  function updateUser(patch) {
    const u = loadUser() || {};
    const next = { ...u, ...patch };
    saveUser(next);
    return next;
  }
  function deleteAccount() {
    clearUser();
    clearSession();
    localStorage.removeItem(FAV_KEY);
    window.dispatchEvent(new CustomEvent("et:logout"));
  }
  function logout() {
    clearSession();
    renderHeaderActions();
    ETUI?.toast?.("로그아웃 되었어요.", "info");
    window.dispatchEvent(new CustomEvent("et:logout"));
  }

  function init() {
    ensureModals();
    renderHeaderActions();
    wireForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // 전역 노출
  window.ETAuth = { isLoggedIn, loadUser, updateUser, deleteAccount, logout };
})();
