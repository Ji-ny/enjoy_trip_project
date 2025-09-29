package com.enjoytrip.attraction.model.service;

import java.util.List;

import com.enjoytrip.attraction.model.dao.AttractionDao;
import com.enjoytrip.attraction.model.dao.TourApiDao;
import com.enjoytrip.attraction.model.dto.Area;
import com.enjoytrip.attraction.model.dto.Attraction;
import com.enjoytrip.attraction.model.dto.Sigungu;

public class AttractionServiceImpl implements AttractionService {
    private static final AttractionServiceImpl INSTANCE = new AttractionServiceImpl();

    public static AttractionServiceImpl getInstance() {
        return INSTANCE;
    }

    private final AttractionDao attractionDao = new TourApiDao();

    private AttractionServiceImpl() {
    }

    @Override
    public List<Area> findAreas() {
        return attractionDao.findAreas();
    }

    @Override
    public List<Sigungu> findSigungu(String areaCode) {
        return attractionDao.findSigungu(areaCode);
    }

    @Override
    public List<Attraction> search(String areaCode, String sigunguCode, String contentTypeId) {
        return attractionDao.search(areaCode, sigunguCode, contentTypeId);
    }
}
