<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>EnjoyTrip - 홈</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Fonts & Icons -->
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
      rel="stylesheet"
    />

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${root}/resources/css/style.css" />
    <link rel="stylesheet" href="${root}/resources/css/responsive.css" />
  </head>
  <body class="page-home" data-root="${root}">
    <jsp:include page="header.jsp" />
    <script>
      window.APP_CONTEXT = '${root}';
    </script>

    <main>
      <!-- Hero -->
      <section class="home-hero">
        <div class="container hero-inner">
          <div class="row g-5 align-items-center">
            <div class="col-lg-6">
              <h1 class="display-5 fw-bolder lh-sm mb-3">
                떠나고 싶은 곳이<br /><span class="brand-grad"
                  >여기 있습니다</span
                >
              </h1>
              <p class="lead text-muted mb-4">
                전국 방방곡곡 숨겨진 명소부터 인기 여행지까지, 당신만의 특별한
                여행을 계획해보세요.
              </p>

              <form id="heroSearchForm" class="row g-2 align-items-end">
                <div class="col-sm-4">
                  <label class="form-label small mb-1">시/도</label>
                  <select id="areaSelect" class="form-select">
                    <option value="">로딩 중...</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label class="form-label small mb-1">구/군</label>
                  <select id="sigunguSelect" class="form-select">
                    <option value="">전체</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label class="form-label small mb-1">유형</label>
                  <select id="contentTypeSelect" class="form-select">
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
                <div class="col-12 d-flex gap-2 mt-2">
                  <button class="btn btn-primary px-4" type="submit">
                    관광지 둘러보기
                  </button>
                  <a class="btn btn-outline-primary px-4" href="${root}/main?action=scrap"
                    >스크랩 보기</a
                  >
                </div>
              </form>
            </div>

            <div class="col-lg-6">
              <div class="hero-visual shadow-lg rounded-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1466354424719-343280fe118b?q=80&w=1400&auto=format&fit=crop"
                  alt="EnjoyTrip 대표 이미지"
                />
                <span class="hero-bubble"></span
                ><span class="hero-bubble2"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section class="features py-5">
        <div class="container">
          <h2 class="text-center fw-bolder mb-2">EnjoyTrip 서비스</h2>
          <p class="text-center text-muted mb-4">
            더 나은 여행 경험을 위한 다양한 서비스를 제공합니다
          </p>

          <div class="row g-3">
            <div class="col-md-3">
              <div class="feature-card">
                <div class="icon"><i class="bi bi-map"></i></div>
                <div class="title">맞춤 여행 계획</div>
                <div class="desc">취향에 맞는 여행 코스를 제안합니다</div>
                <a class="btn btn-light btn-sm" href="${root}/main?action=plan"
                  >계획 만들기</a
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="feature-card">
                <div class="icon"><i class="bi bi-broadcast"></i></div>
                <div class="title">실시간 정보</div>
                <div class="desc">
                  날씨, 교통, 축제 등 필요한 정보를 제공합니다
                </div>
                <a class="btn btn-light btn-sm" href="${root}/main?action=attractions"
                  >바로가기</a
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="feature-card">
                <div class="icon"><i class="bi bi-people"></i></div>
                <div class="title">여행 커뮤니티</div>
                <div class="desc">경로 리스트에서 공유하세요</div>
                <a class="btn btn-light btn-sm" href="${root}/main?action=plans"
                  >경로 리스트</a
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="feature-card">
                <div class="icon"><i class="bi bi-heart"></i></div>
                <div class="title">찜하기 기능</div>
                <div class="desc">마음에 드는 여행지를 저장하세요</div>
                <a class="btn btn-light btn-sm" href="${root}/main?action=scrap"
                  >스크랩 보러가기</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular -->
      <section class="popular pb-5">
        <div class="container">
          <h3 class="fw-bolder mb-2">인기 여행지</h3>
          <p class="text-muted mb-4">
            많은 여행자들이 사랑하는 대한민국의 아름다운 여행지를 소개합니다
          </p>
          <div id="cardContainer" class="row g-3"></div>
        </div>
      </section>
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
    <script src="${root}/resources/js/api.js"></script>
    <script src="${root}/resources/js/app.js"></script>
  </body>
</html>
