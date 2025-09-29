package com.enjoytrip.model.service;

import java.util.List;

import com.enjoytrip.model.dao.AttractionDao;
import com.enjoytrip.model.dao.TourApiDao;
import com.enjoytrip.model.dto.Area;
import com.enjoytrip.model.dto.Attraction;
import com.enjoytrip.model.dto.Sigungu;

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
