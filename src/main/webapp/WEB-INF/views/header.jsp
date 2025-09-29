<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<c:set var="root" value="${pageContext.request.contextPath}" />
<header class="gh-header">
  <div class="gh-container">
    <a class="gh-logo" href="${root}/main?action=index">
      <span class="gh-logo-badge">
        <svg class="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </span>
      <span class="gh-logo-text" style="font-weight:600">EnjoyTrip</span>
    </a>

    <nav class="gh-nav">
      <a href="${root}/main?action=index" data-match="action=index">홈</a>
      <a href="${root}/main?action=attractions" data-match="action=attractions">여행지</a>
      <a href="${root}/main?action=plan" data-match="action=plan($|&)">여행계획</a>
      <a href="${root}/main?action=plans" data-match="action=plans">경로 리스트</a>
      <a href="${root}/main?action=scrap" data-match="action=scrap">스크랩</a>
    </nav>

    <div class="gh-actions" id="ghActions"></div>
  </div>
</header>
<hr class="gh-divider" />
