package com.enjoytrip.model.service;

import java.util.List;

import com.enjoytrip.model.dto.Area;
import com.enjoytrip.model.dto.Attraction;
import com.enjoytrip.model.dto.Sigungu;

public interface AttractionService {
    List<Area> findAreas();

    List<Sigungu> findSigungu(String areaCode);

    List<Attraction> search(String areaCode, String sigunguCode, String contentTypeId);
}
