package com.enjoytrip.model.service;

import java.util.List;

import com.enjoytrip.model.dao.FileScrapDao;
import com.enjoytrip.model.dao.ScrapDao;
import com.enjoytrip.model.dto.ScrapItem;
import com.enjoytrip.util.IdGenerator;

public class ScrapServiceImpl implements ScrapService {
    private static final ScrapServiceImpl INSTANCE = new ScrapServiceImpl();

    public static ScrapServiceImpl getInstance() {
        return INSTANCE;
    }

    private final ScrapDao scrapDao = FileScrapDao.getInstance();

    private ScrapServiceImpl() {
    }

    @Override
    public List<ScrapItem> list(String memberId) {
        return scrapDao.findByMember(memberId);
    }

    @Override
    public ScrapItem add(String memberId, ScrapItem item) {
        item.setMemberId(memberId);
        if (item.getId() == null || item.getId().isBlank()) {
            item.setId(IdGenerator.generate("scrap-"));
        }
        return scrapDao.save(item);
    }

    @Override
    public void remove(String memberId, String scrapId) {
        scrapDao.delete(memberId, scrapId);
    }

    @Override
    public void clear(String memberId) {
        scrapDao.deleteByMember(memberId);
    }
}
