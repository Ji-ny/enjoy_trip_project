package com.enjoytrip.model.dao;

import java.util.List;

import com.enjoytrip.model.dto.ScrapItem;

public interface ScrapDao {
    void init(String dataDir);

    void load();

    void save();

    List<ScrapItem> findByMember(String memberId);

    ScrapItem save(ScrapItem item);

    void delete(String memberId, String scrapId);

    void deleteByMember(String memberId);
}
