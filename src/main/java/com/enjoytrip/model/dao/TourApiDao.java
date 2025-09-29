package com.enjoytrip.model.dao;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.enjoytrip.model.dto.Area;
import com.enjoytrip.model.dto.Attraction;
import com.enjoytrip.model.dto.Sigungu;
import com.enjoytrip.util.JsonMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TourApiDao implements AttractionDao {
    private static final String SERVICE_KEY = "5XKOIBzSGKuncx3c1ol%2Bx7bpsbYIcMA02D3PN4owkMkvLYOWlpOTWicxGKzcHYTjZvXVdXIeVtYCmp1KLZgBWA%3D%3D";
    private static final String BASE_URL = "https://apis.data.go.kr/B551011/KorService2";
    private static final ObjectMapper MAPPER = JsonMapper.getInstance();

    private static String queryBase() {
        return "serviceKey=" + SERVICE_KEY + "&MobileOS=ETC&MobileApp=EnjoyTrip&_type=json";
    }

    private JsonNode request(String pathWithParams) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(BASE_URL + pathWithParams);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(8000);
            conn.setReadTimeout(8000);
            int code = conn.getResponseCode();
            try (InputStream is = (code >= 200 && code < 300) ? conn.getInputStream() : conn.getErrorStream()) {
                if (is == null) {
                    return null;
                }
                return MAPPER.readTree(is);
            }
        } catch (IOException e) {
            return null;
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
    }

    @Override
    public List<Area> findAreas() {
        String params = "/areaCode2?" + queryBase() + "&numOfRows=100&pageNo=1";
        JsonNode node = request(params);
        List<Area> list = new ArrayList<>();
        if (node != null) {
            JsonNode items = node.at("/response/body/items/item");
            if (items.isArray()) {
                for (JsonNode item : items) {
                    list.add(new Area(item.path("code").asText(), item.path("name").asText()));
                }
            } else if (items.isObject()) {
                list.add(new Area(items.path("code").asText(), items.path("name").asText()));
            }
        }
        if (list.isEmpty()) {
            list.add(new Area("1", "서울"));
            list.add(new Area("6", "부산"));
            list.add(new Area("39", "제주"));
        }
        return list;
    }

    @Override
    public List<Sigungu> findSigungu(String areaCode) {
        if (areaCode == null || areaCode.isBlank()) {
            return new ArrayList<>();
        }
        String params = "/areaCode2?" + queryBase() + "&numOfRows=500&pageNo=1&areaCode=" + encode(areaCode);
        JsonNode node = request(params);
        List<Sigungu> list = new ArrayList<>();
        if (node != null) {
            JsonNode items = node.at("/response/body/items/item");
            if (items.isArray()) {
                for (JsonNode item : items) {
                    list.add(new Sigungu(item.path("code").asText(), item.path("name").asText()));
                }
            }
        }
        return list;
    }

    @Override
    public List<Attraction> search(String areaCode, String sigunguCode, String contentTypeId) {
        StringBuilder sb = new StringBuilder("/areaBasedList2?").append(queryBase());
        sb.append("&numOfRows=200&pageNo=1");
        if (areaCode != null && !areaCode.isBlank()) {
            sb.append("&areaCode=").append(encode(areaCode));
        }
        if (sigunguCode != null && !sigunguCode.isBlank()) {
            sb.append("&sigunguCode=").append(encode(sigunguCode));
        }
        if (contentTypeId != null && !contentTypeId.isBlank()) {
            sb.append("&contentTypeId=").append(encode(contentTypeId));
        }
        JsonNode node = request(sb.toString());
        List<Attraction> list = new ArrayList<>();
        if (node != null) {
            JsonNode items = node.at("/response/body/items/item");
            if (items.isArray()) {
                for (JsonNode item : items) {
                    list.add(mapAttraction(item));
                }
            } else if (items.isObject()) {
                list.add(mapAttraction(items));
            }
        }
        return list;
    }

    private Attraction mapAttraction(JsonNode node) {
        return new Attraction(
                node.path("contentid").asText(),
                node.path("title").asText(),
                node.path("addr1").asText(),
                node.path("mapx").asDouble(),
                node.path("mapy").asDouble(),
                node.path("firstimage").asText()
        );
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
