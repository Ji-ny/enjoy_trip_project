package com.enjoytrip.scrap.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.enjoytrip.common.controller.ControllerHelper;
import com.enjoytrip.common.util.ServletUtil;
import com.enjoytrip.member.model.dto.Member;
import com.enjoytrip.member.model.service.MemberService;
import com.enjoytrip.member.model.service.MemberServiceImpl;
import com.enjoytrip.scrap.model.dto.ScrapItem;
import com.enjoytrip.scrap.model.service.ScrapService;
import com.enjoytrip.scrap.model.service.ScrapServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/scrap")
public class ScrapController extends HttpServlet implements ControllerHelper {
    private static final long serialVersionUID = 1L;
    private final ScrapService scrapService = ScrapServiceImpl.getInstance();
    private final MemberService memberService = MemberServiceImpl.getInstance();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = getActionParameter(request);
        switch (action) {
        case "list" -> list(request, response);
        case "add" -> add(request, response);
        case "remove" -> remove(request, response);
        case "clear" -> clear(request, response);
        default -> response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private void list(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        List<ScrapItem> scraps = scrapService.list(member.getId());
        writeJson(response, scraps);
    }

    private void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        ScrapItem item = ServletUtil.readJson(request, ScrapItem.class);
        if (item == null || item.getTitle() == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "잘못된 요청입니다.");
            return;
        }
        ScrapItem saved = scrapService.add(member.getId(), item);
        writeJson(response, Map.of("scrap", saved));
    }

    private void remove(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        String id = request.getParameter("id");
        if (id == null || id.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "스크랩 ID가 필요합니다.");
            return;
        }
        scrapService.remove(member.getId(), id);
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

    private void clear(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        scrapService.clear(member.getId());
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

    private Member resolveLoginMember(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Object memberId = request.getSession(false) != null ? request.getSession(false).getAttribute("loginMemberId") : null;
        if (memberId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            writeJson(response, Map.of("message", "로그인이 필요합니다."));
            return null;
        }
        return memberService.findById(memberId.toString()).orElse(null);
    }
}
