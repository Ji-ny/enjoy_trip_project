package com.enjoytrip.model.dao;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import com.enjoytrip.model.dto.ScrapItem;
import com.enjoytrip.util.JsonMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FileScrapDao implements ScrapDao {
    private static final FileScrapDao INSTANCE = new FileScrapDao();

    public static FileScrapDao getInstance() {
        return INSTANCE;
    }

    private final ObjectMapper mapper = JsonMapper.getInstance();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private List<ScrapItem> scraps = new ArrayList<>();
    private Path dataFile;

    private FileScrapDao() {
    }

    @Override
    public void init(String dataDir) {
        this.dataFile = Path.of(dataDir, "scraps.json");
        try {
            Files.createDirectories(dataFile.getParent());
            if (Files.notExists(dataFile)) {
                Files.createFile(dataFile);
                save();
            } else {
                load();
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to initialize scrap data", e);
        }
    }

    @Override
    public void load() {
        lock.writeLock().lock();
        try {
            if (dataFile == null || Files.notExists(dataFile) || Files.size(dataFile) == 0) {
                scraps = new ArrayList<>();
                return;
            }
            try (var reader = Files.newBufferedReader(dataFile)) {
                scraps = mapper.readValue(reader, new TypeReference<List<ScrapItem>>() {
                });
            }
        } catch (IOException e) {
            scraps = new ArrayList<>();
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void save() {
        lock.readLock().lock();
        try {
            if (dataFile != null) {
                mapper.writerWithDefaultPrettyPrinter().writeValue(dataFile.toFile(), scraps);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to save scrap data", e);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public List<ScrapItem> findByMember(String memberId) {
        lock.readLock().lock();
        try {
            List<ScrapItem> list = new ArrayList<>();
            for (ScrapItem item : scraps) {
                if (item.getMemberId().equals(memberId)) {
                    list.add(item);
                }
            }
            list.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
            return Collections.unmodifiableList(list);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public ScrapItem save(ScrapItem item) {
        lock.writeLock().lock();
        try {
            item.setCreatedAt(LocalDateTime.now());
            scraps.removeIf(s -> s.getMemberId().equals(item.getMemberId()) && s.getId().equals(item.getId()));
            scraps.add(item);
            save();
            return item;
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void delete(String memberId, String scrapId) {
        lock.writeLock().lock();
        try {
            scraps.removeIf(s -> s.getMemberId().equals(memberId) && s.getId().equals(scrapId));
            save();
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void deleteByMember(String memberId) {
        lock.writeLock().lock();
        try {
            scraps.removeIf(s -> s.getMemberId().equals(memberId));
            save();
        } finally {
            lock.writeLock().unlock();
        }
    }
}
