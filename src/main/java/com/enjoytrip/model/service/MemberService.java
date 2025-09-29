package com.enjoytrip.model.service;

import java.util.Optional;

import com.enjoytrip.model.dto.Member;

public interface MemberService {
    Member register(String name, String email, String password);

    Member login(String email, String password);

    Optional<Member> findById(String id);

    Optional<Member> findByEmail(String email);

    Member update(String id, String name, String email, String password);

    void delete(String id);
}
