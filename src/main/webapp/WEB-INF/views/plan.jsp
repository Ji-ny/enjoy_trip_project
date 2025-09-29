<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>EnjoyTrip - 여행 계획</title>
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
  <body class="page-plan" data-root="${root}">
    <jsp:include page="header.jsp" />
    <script>
      window.APP_CONTEXT = '${root}';
    </script>

    <main class="container py-4">
      <div class="row g-3">
        <div class="col-lg-4">
          <div class="plan-panel card rounded-4 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-title mb-0">여행 계획</h5>
                <a class="btn btn-light btn-sm" href="${root}/main?action=plans">목록 보기</a>
              </div>

              <form id="searchForm" class="input-group mb-2">
                <input
                  id="q"
                  class="form-control"
                  placeholder="장소 이름 또는 주소 검색 (예: 광안리, 남산타워)"
                />
                <button class="btn btn-primary" type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </form>
              <div id="searchList" class="list-group small mb-3"></div>

              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="fw-bold">
                  경유지 <span id="wpCount" class="text-muted">(0)</span>
                </div>
                <div class="text-muted small">
                  총 거리 <span id="totalDist">0</span> · 예상 <span id="totalTime">0</span>
                </div>
              </div>

              <div id="waypointList" class="waypoint-list">
                <div class="hint small text-muted px-2">
                  장소를 추가하면 여기에 나타납니다. (드래그로 순서 변경)
                </div>
              </div>

              <div class="d-flex gap-2 mt-3">
                <button id="btnSavePlan" class="btn btn-primary flex-fill">
                  <i class="bi bi-save"></i> 저장
                </button>
                <button id="btnClear" class="btn btn-outline-secondary">
                  <i class="bi bi-x-circle"></i> 초기화
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div id="planMap" class="rounded-4 shadow-sm"></div>
        </div>
      </div>
    </main>

    <div class="modal fade" id="saveModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <form class="modal-content et-modal" id="saveForm">
          <div class="modal-header">
            <h5 class="modal-title">여행 계획 저장</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label class="form-label">계획 이름</label>
              <input
                id="planName"
                class="form-control"
                placeholder="예: 부산 1박2일 바다투어"
                required
              />
            </div>
            <div class="mb-0">
              <label class="form-label">메모 (선택)</label>
              <textarea
                id="planMemo"
                class="form-control"
                rows="3"
                placeholder="동선/예산/주의사항 등을 메모해두세요."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="submit">저장</button>
          </div>
        </form>
      </div>
    </div>

    <footer class="footer text-center py-4">
      <div class="container"><small>© 2025 EnjoyTrip</small></div>
    </footer>

    <script src="${root}/resources/js/header.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="${root}/resources/js/ui.js"></script>
    <script src="${root}/resources/js/backend.js"></script>
    <script src="${root}/resources/js/auth.js"></script>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0bb2fe5baa74c1a0e85a9f2a5eb7cb5c&libraries=services"></script>
    <script src="${root}/resources/js/plan.js"></script>
  </body>
</html>
