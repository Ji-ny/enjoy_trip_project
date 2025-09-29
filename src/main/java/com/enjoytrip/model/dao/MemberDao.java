package com.enjoytrip.model.dao;

import java.util.List;
import java.util.Optional;

import com.enjoytrip.model.dto.Member;

public interface MemberDao {
    void init(String dataDir);

    void load();

    void save();

    Member save(Member member);

    Optional<Member> findById(String id);

    Optional<Member> findByEmail(String email);

    List<Member> findAll();

    void delete(String id);
}
