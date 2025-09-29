package com.enjoytrip.common.controller;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/main")
public class MainController extends HttpServlet implements ControllerHelper {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = getActionParameter(request);
        switch (action) {
        case "index" -> forward(request, response, "/WEB-INF/views/index.jsp");
        case "attractions" -> forward(request, response, "/WEB-INF/views/attractions.jsp");
        case "plan" -> forward(request, response, "/WEB-INF/views/plan.jsp");
        case "plans" -> forward(request, response, "/WEB-INF/views/plans.jsp");
        case "scrap" -> forward(request, response, "/WEB-INF/views/scrap.jsp");
        case "mypage" -> forward(request, response, "/WEB-INF/views/mypage.jsp");
        default -> response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
