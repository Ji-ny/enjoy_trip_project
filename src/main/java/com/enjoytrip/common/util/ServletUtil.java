package com.enjoytrip.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public final class ServletUtil {
    private static final ObjectMapper MAPPER = JsonMapper.getInstance();

    private ServletUtil() {
    }

    public static String readBody(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return sb.toString();
    }

    public static <T> T readJson(HttpServletRequest request, Class<T> type) throws IOException {
        String body = readBody(request);
        if (body == null || body.isBlank()) {
            return null;
        }
        return MAPPER.readValue(body, type);
    }

    public static void writeJson(HttpServletResponse response, Object data) throws IOException {
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setContentType("application/json; charset=UTF-8");
        try (PrintWriter writer = response.getWriter()) {
            writer.write(MAPPER.writeValueAsString(data));
        }
    }
}
