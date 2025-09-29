// src/main/webapp/resources/js/auth.js
// 서버 세션 기반 인증 모듈
(function () {
  const API = window.ETBACKEND;
  const $ = (s, r = document) => r.querySelector(s);
  let currentUser = null;

  function renderHeaderActions() {
    const wrap = $('.gh-actions');
    if (!wrap) return;

    if (currentUser) {
      wrap.innerHTML = `
        <a class="gh-icon-btn" href="${window.APP_CONTEXT || ''}/main?action=mypage" title="마이페이지">
          <i class="bi bi-person-circle"></i>
        </a>
        <button class="gh-btn" id="ghLogoutBtn" type="button">로그아웃</button>
      `;
      $('#ghLogoutBtn')?.addEventListener('click', logout);
    } else {
      wrap.innerHTML = `
        <button class="gh-btn" id="ghLoginOpen" type="button">로그인</button>
        <button class="gh-btn primary" id="ghSignupOpen" type="button">회원가입</button>
      `;
      $('#ghLoginOpen')?.addEventListener('click', () => openModal('loginModal'));
      $('#ghSignupOpen')?.addEventListener('click', () => openModal('signupModal'));
    }
  }

  function ensureModals() {
    if ($('#loginModal') || $('#signupModal')) return;
    const html = `
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
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    new bootstrap.Modal(el).show();
  }

  async function fetchProfile() {
    try {
      const res = await API.get('/member?action=profile');
      currentUser = res?.member || null;
    } catch (err) {
      if (err.status === 401) {
        currentUser = null;
      } else {
        console.error(err);
      }
    }
    renderHeaderActions();
    return currentUser;
  }

  async function signup(data) {
    const res = await API.post('/member?action=signup', data);
    currentUser = res?.member || null;
    renderHeaderActions();
    window.dispatchEvent(new CustomEvent('et:login'));
    return res;
  }

  async function login(data) {
    const res = await API.post('/member?action=login', data);
    currentUser = res?.member || null;
    renderHeaderActions();
    window.dispatchEvent(new CustomEvent('et:login'));
    return res;
  }

  async function logout() {
    try {
      await API.post('/member?action=logout');
    } catch (err) {
      console.error(err);
    }
    currentUser = null;
    renderHeaderActions();
    ETUI.toast('로그아웃 되었어요.', 'info');
    window.dispatchEvent(new CustomEvent('et:logout'));
  }

  function wireForms() {
    $('#signupForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const name = fd.get('name')?.toString().trim();
      const email = fd.get('email')?.toString().trim().toLowerCase();
      const password = fd.get('password')?.toString();
      const password2 = fd.get('password2')?.toString();

      if (!name || !email || !password) return;
      if (password !== password2) {
        ETUI.toast('비밀번호가 일치하지 않아요.', 'danger');
        return;
      }

      try {
        await signup({ name, email, password });
        ETUI.toast('가입 완료! 환영해요 🙌', 'success');
        bootstrap.Modal.getInstance($('#signupModal'))?.hide();
        e.currentTarget.reset();
      } catch (err) {
        if (err.status === 409) {
          ETUI.toast('이미 가입된 이메일입니다.', 'danger');
        } else {
          ETUI.toast(err.message || '회원가입에 실패했습니다.', 'danger');
        }
      }
    });

    $('#loginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const email = fd.get('email')?.toString().trim().toLowerCase();
      const password = fd.get('password')?.toString();

      try {
        await login({ email, password });
        ETUI.toast('로그인 완료!', 'success');
        bootstrap.Modal.getInstance($('#loginModal'))?.hide();
        e.currentTarget.reset();
      } catch (err) {
        if (err.status === 401) {
          ETUI.toast('이메일 또는 비밀번호를 확인하세요.', 'danger');
        } else {
          ETUI.toast(err.message || '로그인에 실패했습니다.', 'danger');
        }
      }
    });
  }

  async function init() {
    ensureModals();
    renderHeaderActions();
    wireForms();
    await fetchProfile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ETAUTH = {
    getCurrentUser: () => currentUser,
    fetchProfile,
    logout,
  };
})();
