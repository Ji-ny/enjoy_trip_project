package com.enjoytrip.member.model.dao;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import com.enjoytrip.common.util.JsonMapper;
import com.enjoytrip.member.model.dto.Member;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FileMemberDao implements MemberDao {
    private static final FileMemberDao INSTANCE = new FileMemberDao();

    public static FileMemberDao getInstance() {
        return INSTANCE;
    }

    private final ObjectMapper mapper = JsonMapper.getInstance();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private List<Member> members = new ArrayList<>();
    private Path dataFile;

    private FileMemberDao() {
    }

    @Override
    public void init(String dataDir) {
        this.dataFile = Path.of(dataDir, "members.json");
        try {
            Files.createDirectories(this.dataFile.getParent());
            if (Files.notExists(this.dataFile)) {
                Files.createFile(this.dataFile);
                save();
            } else {
                load();
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to initialize member data", e);
        }
    }

    @Override
    public void load() {
        lock.writeLock().lock();
        try {
            if (dataFile == null || Files.notExists(dataFile) || Files.size(dataFile) == 0) {
                members = new ArrayList<>();
                return;
            }
            try (var reader = Files.newBufferedReader(dataFile)) {
                members = mapper.readValue(reader, new TypeReference<List<Member>>() {
                });
            }
        } catch (IOException e) {
            members = new ArrayList<>();
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void save() {
        lock.readLock().lock();
        try {
            if (dataFile != null) {
                mapper.writerWithDefaultPrettyPrinter().writeValue(dataFile.toFile(), members);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to save member data", e);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public Member save(Member member) {
        lock.writeLock().lock();
        try {
            members.removeIf(m -> m.getId().equals(member.getId()));
            members.add(member);
            save();
            return member;
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public Optional<Member> findById(String id) {
        lock.readLock().lock();
        try {
            return members.stream().filter(m -> m.getId().equals(id)).findFirst();
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        lock.readLock().lock();
        try {
            return members.stream()
                    .filter(m -> m.getEmail().equalsIgnoreCase(email))
                    .findFirst();
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public List<Member> findAll() {
        lock.readLock().lock();
        try {
            return Collections.unmodifiableList(new ArrayList<>(members));
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public void delete(String id) {
        lock.writeLock().lock();
        try {
            members.removeIf(m -> m.getId().equals(id));
            save();
        } finally {
            lock.writeLock().unlock();
        }
    }
}
