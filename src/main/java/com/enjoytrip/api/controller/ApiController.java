package com.enjoytrip.api.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.enjoytrip.attraction.model.dto.Area;
import com.enjoytrip.attraction.model.dto.Attraction;
import com.enjoytrip.attraction.model.dto.Sigungu;
import com.enjoytrip.attraction.model.service.AttractionService;
import com.enjoytrip.attraction.model.service.AttractionServiceImpl;
import com.enjoytrip.common.controller.ControllerHelper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api")
public class ApiController extends HttpServlet implements ControllerHelper {
    private static final long serialVersionUID = 1L;
    private final AttractionService attractionService = AttractionServiceImpl.getInstance();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = getActionParameter(request);
        switch (action) {
        case "areas" -> areas(response);
        case "sigungu" -> sigungu(request, response);
        case "attractions" -> attractions(request, response);
        default -> response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private void areas(HttpServletResponse response) throws IOException {
        List<Area> list = attractionService.findAreas();
        writeJson(response, list);
    }

    private void sigungu(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String areaCode = request.getParameter("areaCode");
        List<Sigungu> list = attractionService.findSigungu(areaCode);
        writeJson(response, list);
    }

    private void attractions(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String areaCode = request.getParameter("areaCode");
        String sigunguCode = request.getParameter("sigunguCode");
        String contentTypeId = request.getParameter("contentTypeId");
        List<Attraction> list = attractionService.search(areaCode, sigunguCode, contentTypeId);
        writeJson(response, Map.of("items", list));
    }
}
