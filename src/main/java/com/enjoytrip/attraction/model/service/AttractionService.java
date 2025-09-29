package com.enjoytrip.attraction.model.service;

import java.util.List;

import com.enjoytrip.attraction.model.dto.Area;
import com.enjoytrip.attraction.model.dto.Attraction;
import com.enjoytrip.attraction.model.dto.Sigungu;

public interface AttractionService {
    List<Area> findAreas();

    List<Sigungu> findSigungu(String areaCode);

    List<Attraction> search(String areaCode, String sigunguCode, String contentTypeId);
}
