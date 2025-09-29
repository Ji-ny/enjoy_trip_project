package com.enjoytrip.plan.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.enjoytrip.common.controller.ControllerHelper;
import com.enjoytrip.common.util.ServletUtil;
import com.enjoytrip.member.model.dto.Member;
import com.enjoytrip.member.model.service.MemberService;
import com.enjoytrip.member.model.service.MemberServiceImpl;
import com.enjoytrip.plan.model.dto.Plan;
import com.enjoytrip.plan.model.service.PlanService;
import com.enjoytrip.plan.model.service.PlanServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/plan")
public class PlanController extends HttpServlet implements ControllerHelper {
    private static final long serialVersionUID = 1L;
    private final PlanService planService = PlanServiceImpl.getInstance();
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
            case "list" -> list(request, response);
            case "find" -> find(request, response);
            case "create" -> create(request, response);
            case "update" -> update(request, response);
            case "delete" -> delete(request, response);
            default -> response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            writeJson(response, Map.of("message", e.getMessage()));
        }
    }

    private void list(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        List<Plan> plans = planService.list(member.getId());
        writeJson(response, Map.of("plans", plans));
    }

    private void find(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        String planId = request.getParameter("id");
        if (planId == null || planId.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "계획 ID가 필요합니다.");
            return;
        }
        Plan plan = planService.find(member.getId(), planId)
                .orElseThrow(() -> new IllegalArgumentException("계획을 찾을 수 없습니다."));
        writeJson(response, Map.of("plan", plan));
    }

    private void create(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        Plan plan = ServletUtil.readJson(request, Plan.class);
        if (plan == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "잘못된 요청입니다.");
            return;
        }
        if (plan.getWaypoints() == null) {
            plan.setWaypoints(new java.util.ArrayList<>());
        }
        Plan saved = planService.create(member.getId(), plan);
        writeJson(response, Map.of("plan", saved));
    }

    private void update(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        Plan plan = ServletUtil.readJson(request, Plan.class);
        if (plan == null || plan.getId() == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "잘못된 요청입니다.");
            return;
        }
        if (plan.getWaypoints() == null) {
            plan.setWaypoints(new java.util.ArrayList<>());
        }
        Plan updated = planService.update(member.getId(), plan);
        writeJson(response, Map.of("plan", updated));
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Member member = resolveLoginMember(request, response);
        if (member == null) {
            return;
        }
        String id = request.getParameter("id");
        if (id == null || id.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "계획 ID가 필요합니다.");
            return;
        }
        planService.delete(member.getId(), id);
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
