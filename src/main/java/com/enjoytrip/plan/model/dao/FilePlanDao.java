package com.enjoytrip.plan.model.dao;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import com.enjoytrip.common.util.JsonMapper;
import com.enjoytrip.plan.model.dto.Plan;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FilePlanDao implements PlanDao {
    private static final FilePlanDao INSTANCE = new FilePlanDao();

    public static FilePlanDao getInstance() {
        return INSTANCE;
    }

    private final ObjectMapper mapper = JsonMapper.getInstance();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private List<Plan> plans = new ArrayList<>();
    private Path dataFile;

    private FilePlanDao() {
    }

    @Override
    public void init(String dataDir) {
        this.dataFile = Path.of(dataDir, "plans.json");
        try {
            Files.createDirectories(dataFile.getParent());
            if (Files.notExists(dataFile)) {
                Files.createFile(dataFile);
                save();
            } else {
                load();
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to initialize plan data", e);
        }
    }

    @Override
    public void load() {
        lock.writeLock().lock();
        try {
            if (dataFile == null || Files.notExists(dataFile) || Files.size(dataFile) == 0) {
                plans = new ArrayList<>();
                return;
            }
            try (var reader = Files.newBufferedReader(dataFile)) {
                plans = mapper.readValue(reader, new TypeReference<List<Plan>>() {
                });
            }
        } catch (IOException e) {
            plans = new ArrayList<>();
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void save() {
        lock.readLock().lock();
        try {
            if (dataFile != null) {
                mapper.writerWithDefaultPrettyPrinter().writeValue(dataFile.toFile(), plans);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to save plan data", e);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public Plan save(Plan plan) {
        lock.writeLock().lock();
        try {
            if (plan.getCreatedAt() == null) {
                plan.setCreatedAt(LocalDateTime.now());
            }
            plan.setUpdatedAt(LocalDateTime.now());
            plans.removeIf(p -> p.getId().equals(plan.getId()));
            plans.add(plan);
            save();
            return plan;
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public List<Plan> findByMember(String memberId) {
        lock.readLock().lock();
        try {
            List<Plan> list = new ArrayList<>();
            for (Plan plan : plans) {
                if (plan.getMemberId().equals(memberId)) {
                    list.add(plan);
                }
            }
            list.sort((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()));
            return Collections.unmodifiableList(list);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public Optional<Plan> findById(String id) {
        lock.readLock().lock();
        try {
            return plans.stream().filter(p -> p.getId().equals(id)).findFirst();
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public void delete(String id) {
        lock.writeLock().lock();
        try {
            plans.removeIf(p -> p.getId().equals(id));
            save();
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void deleteByMember(String memberId) {
        lock.writeLock().lock();
        try {
            plans.removeIf(p -> p.getMemberId().equals(memberId));
            save();
        } finally {
            lock.writeLock().unlock();
        }
    }
}
