package com.enjoytrip.scrap.model.service;

import java.util.List;

import com.enjoytrip.scrap.model.dto.ScrapItem;

public interface ScrapService {
    List<ScrapItem> list(String memberId);

    ScrapItem add(String memberId, ScrapItem item);

    void remove(String memberId, String scrapId);

    void clear(String memberId);
}
