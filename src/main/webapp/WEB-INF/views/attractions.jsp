<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>EnjoyTrip - 지역별 관광지 정보</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="${root}/resources/css/style.css" />
    <link rel="stylesheet" href="${root}/resources/css/responsive.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
      rel="stylesheet"
    />

    <style>
      #map {
        height: 520px;
      }
    </style>
  </head>
  <body class="page-attractions" data-root="${root}">
    <jsp:include page="header.jsp" />
    <script>
      window.APP_CONTEXT = '${root}';
    </script>

    <main class="container py-4">
      <h2 class="h5 mb-3">지역별 관광정보</h2>

      <form id="filterForm" class="row g-2 align-items-end">
        <div class="col-md-3">
          <label class="form-label">시/도</label>
          <select id="area" class="form-select">
            <option value="">로딩 중...</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">구/군</label>
          <select id="sigungu" class="form-select">
            <option value="">전체</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">콘텐츠 유형</label>
          <select id="contentTypeId" class="form-select">
            <option value="">전체</option>
            <option value="12">관광지</option>
            <option value="14">문화시설</option>
            <option value="15">축제/공연/행사</option>
            <option value="28">레포츠</option>
            <option value="32">숙박</option>
            <option value="38">쇼핑</option>
            <option value="39">음식점</option>
          </select>
        </div>
        <div class="col-md-3 d-grid">
          <button class="btn btn-primary" type="submit">
            <i class="bi bi-search"></i> 조회
          </button>
        </div>
      </form>

      <div class="row mt-3 g-3">
        <div class="col-lg-8">
          <div id="map" class="rounded-4 overflow-hidden shadow-sm"></div>
        </div>
        <div class="col-lg-4">
          <div class="card rounded-4 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title mb-0">검색 결과</h5>
                <span id="resultCount" class="badge bg-secondary">0</span>
              </div>
              <div id="list" class="list-group list-group-flush small"></div>
            </div>
          </div>
        </div>
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
    <script src="${root}/resources/js/config.js"></script>
    <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0bb2fe5baa74c1a0e85a9f2a5eb7cb5c&libraries=services"></script>
    <script src="${root}/resources/js/api.js"></script>
    <script src="${root}/resources/js/attractions.js"></script>
  </body>
</html>
