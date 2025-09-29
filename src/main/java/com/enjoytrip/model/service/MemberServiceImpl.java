package com.enjoytrip.model.service;

import java.time.LocalDateTime;
import java.util.Optional;

import com.enjoytrip.model.dao.FileMemberDao;
import com.enjoytrip.model.dao.MemberDao;
import com.enjoytrip.model.dto.Member;
import com.enjoytrip.util.IdGenerator;
import com.enjoytrip.util.PasswordEncoder;

public class MemberServiceImpl implements MemberService {
    private static final MemberServiceImpl INSTANCE = new MemberServiceImpl();

    public static MemberServiceImpl getInstance() {
        return INSTANCE;
    }

    private final MemberDao memberDao = FileMemberDao.getInstance();
    private final PlanService planService = PlanServiceImpl.getInstance();
    private final ScrapService scrapService = ScrapServiceImpl.getInstance();

    private MemberServiceImpl() {
    }

    @Override
    public Member register(String name, String email, String password) {
        String normalizedEmail = email.toLowerCase();
        memberDao.findByEmail(normalizedEmail).ifPresent(m -> {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        });

        Member member = new Member();
        member.setId(IdGenerator.generate("mem-"));
        member.setName(name);
        member.setEmail(normalizedEmail);
        member.setPassword(PasswordEncoder.hash(password));
        member.setCreatedAt(LocalDateTime.now());
        member.setUpdatedAt(LocalDateTime.now());
        memberDao.save(member);
        return member;
    }

    @Override
    public Member login(String email, String password) {
        String normalizedEmail = email.toLowerCase();
        Member member = memberDao.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호를 확인하세요."));
        if (!PasswordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호를 확인하세요.");
        }
        return member;
    }

    @Override
    public Optional<Member> findById(String id) {
        return memberDao.findById(id);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        if (email == null) {
            return Optional.empty();
        }
        return memberDao.findByEmail(email.toLowerCase());
    }

    @Override
    public Member update(String id, String name, String email, String password) {
        Member member = memberDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));
        String normalizedEmail = email.toLowerCase();
        memberDao.findByEmail(normalizedEmail)
                .filter(other -> !other.getId().equals(id))
                .ifPresent(other -> {
                    throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
                });
        member.setName(name);
        member.setEmail(normalizedEmail);
        if (password != null && !password.isBlank()) {
            member.setPassword(PasswordEncoder.hash(password));
        }
        member.setUpdatedAt(LocalDateTime.now());
        memberDao.save(member);
        return member;
    }

    @Override
    public void delete(String id) {
        memberDao.delete(id);
        planService.deleteAll(id);
        scrapService.clear(id);
    }
}
