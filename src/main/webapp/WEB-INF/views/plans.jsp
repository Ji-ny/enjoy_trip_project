<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>EnjoyTrip - 경로 리스트</title>
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
    <link rel="stylesheet" href="${root}/resources/css/responsive.css" />
  </head>
  <body class="page-plans" data-root="${root}">
    <jsp:include page="header.jsp" />
    <script>
      window.APP_CONTEXT = '${root}';
    </script>

    <main class="container py-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 class="fw-bolder mb-1">나의 경로 리스트</h2>
          <div class="text-muted small">저장한 여행 계획을 관리하세요.</div>
        </div>
        <div class="d-flex gap-2">
          <a class="btn btn-primary" href="${root}/main?action=plan">
            <i class="bi bi-plus-lg"></i> 새 계획
          </a>
        </div>
      </div>

      <div class="row g-3" id="planGrid"></div>

      <div id="emptyPlans" class="text-center text-muted py-5" style="display: none">
        아직 저장된 계획이 없습니다. <a href="${root}/main?action=plan">새 계획 만들기</a>
      </div>
    </main>

    <footer class="footer text-center py-4">
      <div class="container"><small>© 2025 EnjoyTrip</small></div>
    </footer>

    <script src="${root}/resources/js/header.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="${root}/resources/js/ui.js"></script>
    <script src="${root}/resources/js/backend.js"></script>
    <script src="${root}/resources/js/auth.js"></script>
    <script src="${root}/resources/js/plans.js"></script>
  </body>
</html>
