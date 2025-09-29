// assests/js/mypage.js
(function () {
  const FAV_KEY = "enjoytrip_favs";
  const $ = (s, r = document) => r.querySelector(s);

  // 로그인 상태가 아니면 홈으로
  function guard() {
    if (!ETAuth.isLoggedIn()) {
      ETUI.toast("로그인 후 이용해주세요.", "warning");
      setTimeout(() => location.replace("./index.html"), 400);
      return false;
    }
    return true;
  }

  // 로그아웃 이벤트를 어디서 눌러도 마이페이지에서는 홈으로
  window.addEventListener("et:logout", () => {
    location.replace("./index.html");
  });

  // 유저 정보 렌더
  function render() {
    const u = ETAuth.loadUser();
    if (!u) return;

    $("#u_name").textContent = u.name || "";
    $("#u_email").textContent = u.email || "";
    $("#u_join").textContent = u.createdAt
      ? new Date(u.createdAt).toLocaleDateString()
      : "-";

    try {
      const favs = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      $("#favCount").textContent = favs.length;
    } catch {
      $("#favCount").textContent = 0;
    }
  }

  // 수정 모달 열기
  $("#btnOpenEdit")?.addEventListener("click", () => {
    const u = ETAuth.loadUser() || {};
    $("#editName").value = u.name || "";
    $("#editEmail").value = u.email || "";
    $("#editPw").value = "";
    $("#editPw2").value = "";
    new bootstrap.Modal("#editModal").show();
  });

  // 수정 저장
  $("#editForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#editName").value.trim();
    const email = $("#editEmail").value.trim().toLowerCase();
    const pw = $("#editPw").value.trim();
    const pw2 = $("#editPw2").value.trim();

    if (!name || !email) {
      ETUI.toast("이름/이메일을 입력하세요.", "danger");
      return;
    }
    if (pw || pw2) {
      if (pw.length < 6) {
        ETUI.toast("비밀번호는 6자 이상.", "danger");
        return;
      }
      if (pw !== pw2) {
        ETUI.toast("비밀번호가 일치하지 않아요.", "danger");
        return;
      }
      ETAuth.updateUser({ name, email, password: pw });
    } else {
      ETAuth.updateUser({ name, email });
    }

    ETUI.toast("수정되었습니다.", "success");
    bootstrap.Modal.getInstance($("#editModal"))?.hide();
    render();
  });

  // 회원 탈퇴
  $("#btnDelete")?.addEventListener("click", () => {
    if (!confirm("정말 탈퇴하시겠어요? 저장된 스크랩도 함께 삭제됩니다."))
      return;
    ETAuth.deleteAccount(); // et:logout 이벤트로 홈으로 이동
  });

  if (guard()) render();
})();
