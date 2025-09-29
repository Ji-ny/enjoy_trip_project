// src/main/webapp/resources/js/mypage.js
(async function () {
  const $ = (s, r = document) => r.querySelector(s);

  async function requireLogin() {
    const user = await ETAUTH.fetchProfile();
    if (!user) {
      ETUI.toast('로그인 후 이용해주세요.', 'warning');
      setTimeout(() => location.replace(`${window.APP_CONTEXT || ''}/main?action=index`), 400);
      return null;
    }
    return user;
  }

  window.addEventListener('et:logout', () => {
    location.replace(`${window.APP_CONTEXT || ''}/main?action=index`);
  });

  async function loadScrapCount() {
    try {
      const res = await ETBACKEND.get('/scrap?action=list');
      const list = Array.isArray(res) ? res : res?.scraps || [];
      $('#favCount').textContent = list.length;
    } catch (err) {
      if (err.status === 401) {
        $('#favCount').textContent = '0';
      } else {
        console.error(err);
        $('#favCount').textContent = '0';
      }
    }
  }

  function renderUser(user) {
    $('#u_name').textContent = user?.name || '';
    $('#u_email').textContent = user?.email || '';
    $('#u_join').textContent = user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : '-';
  }

  $('#btnOpenEdit')?.addEventListener('click', async () => {
    const user = await ETAUTH.fetchProfile();
    if (!user) return;
    $('#editName').value = user.name || '';
    $('#editEmail').value = user.email || '';
    $('#editPw').value = '';
    $('#editPw2').value = '';
    new bootstrap.Modal('#editModal').show();
  });

  $('#editForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#editName').value.trim();
    const email = $('#editEmail').value.trim().toLowerCase();
    const pw = $('#editPw').value.trim();
    const pw2 = $('#editPw2').value.trim();

    if (!name || !email) {
      ETUI.toast('이름/이메일을 입력하세요.', 'danger');
      return;
    }
    if (pw || pw2) {
      if (pw.length < 6) {
        ETUI.toast('비밀번호는 6자 이상.', 'danger');
        return;
      }
      if (pw !== pw2) {
        ETUI.toast('비밀번호가 일치하지 않아요.', 'danger');
        return;
      }
    }

    try {
      const body = pw ? { name, email, password: pw } : { name, email };
      const res = await ETBACKEND.put('/member?action=update', body);
      renderUser(res?.member || res);
      ETUI.toast('수정되었습니다.', 'success');
      bootstrap.Modal.getInstance('#editModal')?.hide();
    } catch (err) {
      if (err.status === 401) {
        ETUI.toast('로그인이 필요합니다.', 'warning');
      } else {
        ETUI.toast(err.message || '수정 중 오류가 발생했습니다.', 'danger');
      }
    }
  });

  $('#btnDelete')?.addEventListener('click', async () => {
    if (!confirm('정말 탈퇴하시겠어요? 저장된 스크랩도 함께 삭제됩니다.')) return;
    try {
      await ETBACKEND.delete('/member?action=delete');
      ETUI.toast('탈퇴되었습니다.', 'info');
      await ETAUTH.logout();
    } catch (err) {
      if (err.status === 401) {
        ETUI.toast('로그인이 필요합니다.', 'warning');
      } else {
        ETUI.toast('탈퇴 중 오류가 발생했습니다.', 'danger');
      }
    }
  });

  const user = await requireLogin();
  if (!user) return;
  renderUser(user);
  await loadScrapCount();
})();
