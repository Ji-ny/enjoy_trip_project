package com.enjoytrip.member.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.enjoytrip.common.controller.ControllerHelper;
import com.enjoytrip.common.util.ServletUtil;
import com.enjoytrip.member.model.dto.Member;
import com.enjoytrip.member.model.service.MemberService;
import com.enjoytrip.member.model.service.MemberServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/member")
public class MemberController extends HttpServlet implements ControllerHelper {
    private static final long serialVersionUID = 1L;
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
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = getActionParameter(request);
        try {
            switch (action) {
            case "signup" -> signup(request, response);
            case "login" -> login(request, response);
            case "logout" -> logout(request, response);
            case "profile" -> profile(request, response);
            case "update" -> update(request, response);
            case "delete" -> delete(request, response);
            default -> response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writeJson(response, Map.of("message", e.getMessage()));
        }
    }

    private void signup(HttpServletRequest request, HttpServletResponse response) throws IOException {
        SignupRequest body = ServletUtil.readJson(request, SignupRequest.class);
        if (body == null || body.name == null || body.email == null || body.password == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "필수 정보가 누락되었습니다.");
            return;
        }
        Member member = memberService.register(body.name.trim(), body.email.trim(), body.password);
        saveSession(request, member);
        writeJson(response, Map.of("member", toPublic(member)));
    }

    private void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        LoginRequest body = ServletUtil.readJson(request, LoginRequest.class);
        if (body == null || body.email == null || body.password == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "이메일과 비밀번호를 입력하세요.");
            return;
        }
        try {
            Member member = memberService.login(body.email.trim(), body.password);
            saveSession(request, member);
            writeJson(response, Map.of("member", toPublic(member)));
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            writeJson(response, Map.of("message", e.getMessage()));
        }
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

    private void profile(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request);
        if (member == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            writeJson(response, Map.of("message", "로그인이 필요합니다."));
            return;
        }
        writeJson(response, Map.of("member", toPublic(member)));
    }

    private void update(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member current = resolveLoginMember(request);
        if (current == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            writeJson(response, Map.of("message", "로그인이 필요합니다."));
            return;
        }
        UpdateRequest body = ServletUtil.readJson(request, UpdateRequest.class);
        if (body == null || body.name == null || body.email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "필수 정보가 누락되었습니다.");
            return;
        }
        try {
            Member updated = memberService.update(current.getId(), body.name.trim(), body.email.trim(), body.password);
            saveSession(request, updated);
            writeJson(response, Map.of("member", toPublic(updated)));
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writeJson(response, Map.of("message", e.getMessage()));
        }
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request);
        if (member == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            writeJson(response, Map.of("message", "로그인이 필요합니다."));
            return;
        }
        memberService.delete(member.getId());
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }

    private void saveSession(HttpServletRequest request, Member member) {
        HttpSession session = request.getSession(true);
        session.setAttribute("loginMemberId", member.getId());
    }

    private Member resolveLoginMember(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return null;
        }
        Object memberId = session.getAttribute("loginMemberId");
        if (memberId == null) {
            return null;
        }
        return memberService.findById(memberId.toString()).orElse(null);
    }

    private Map<String, Object> toPublic(Member member) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", member.getId());
        map.put("name", member.getName());
        map.put("email", member.getEmail());
        map.put("createdAt", member.getCreatedAt());
        map.put("updatedAt", member.getUpdatedAt());
        return map;
    }

    private static class SignupRequest {
        public String name;
        public String email;
        public String password;
    }

    private static class LoginRequest {
        public String email;
        public String password;
    }

    private static class UpdateRequest {
        public String name;
        public String email;
        public String password;
    }
}
