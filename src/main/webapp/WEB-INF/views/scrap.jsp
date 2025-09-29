<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>EnjoyTrip - 스크랩</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${root}/resources/css/style.css" />
  </head>
  <body class="page-scrap" data-root="${root}">
    <jsp:include page="header.jsp" />
    <script>
      window.APP_CONTEXT = '${root}';
    </script>

    <main class="container py-4">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h2 class="h5 mb-0">내 스크랩</h2>
        <div class="scrap-toolbar d-flex align-items-center gap-2">
          <input
            id="q"
            class="form-control form-control-sm"
            placeholder="검색(제목/주소)"
            autocomplete="off"
          />
          <button id="clearAll" class="btn btn-outline-danger btn-sm text-nowrap">
            전체삭제
          </button>
        </div>
      </div>

      <div id="empty" class="text-muted">스크랩한 장소가 없습니다.</div>
      <div id="grid" class="scrap-grid"></div>
    </main>

    <footer class="footer text-center py-4">
      <div class="container"><small>© 2025 EnjoyTrip</small></div>
    </footer>

    <script src="${root}/resources/js/header.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="${root}/resources/js/ui.js"></script>
    <script src="${root}/resources/js/backend.js"></script>
    <script src="${root}/resources/js/auth.js"></script>
    <script src="${root}/resources/js/scrap.js"></script>
  </body>
</html>
