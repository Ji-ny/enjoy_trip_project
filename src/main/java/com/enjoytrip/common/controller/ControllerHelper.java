package com.enjoytrip.common.controller;

import java.io.IOException;

import com.enjoytrip.common.util.JsonMapper;
import com.enjoytrip.common.util.ServletUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface ControllerHelper {
    ObjectMapper MAPPER = JsonMapper.getInstance();

    default String getActionParameter(HttpServletRequest request) {
        String action = request.getParameter("action");
        if (action == null || action.isBlank()) {
            action = "index";
        }
        return action;
    }

    default void redirect(HttpServletRequest request, HttpServletResponse response, String path) throws IOException {
        response.sendRedirect(request.getContextPath() + path);
    }

    default void forward(HttpServletRequest request, HttpServletResponse response, String path) throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher(path);
        dispatcher.forward(request, response);
    }

    default void writeJson(HttpServletResponse response, Object payload) throws IOException {
        ServletUtil.writeJson(response, payload);
    }
}
