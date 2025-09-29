package com.enjoytrip.model.service;

import java.util.List;
import java.util.Optional;

import com.enjoytrip.model.dao.FilePlanDao;
import com.enjoytrip.model.dao.PlanDao;
import com.enjoytrip.model.dto.Plan;
import com.enjoytrip.util.IdGenerator;

public class PlanServiceImpl implements PlanService {
    private static final PlanServiceImpl INSTANCE = new PlanServiceImpl();

    public static PlanServiceImpl getInstance() {
        return INSTANCE;
    }

    private final PlanDao planDao = FilePlanDao.getInstance();

    private PlanServiceImpl() {
    }

    @Override
    public List<Plan> list(String memberId) {
        return planDao.findByMember(memberId);
    }

    @Override
    public Optional<Plan> find(String memberId, String planId) {
        return planDao.findById(planId).filter(plan -> plan.getMemberId().equals(memberId));
    }

    @Override
    public Plan create(String memberId, Plan plan) {
        plan.setId(IdGenerator.generate("plan-"));
        plan.setMemberId(memberId);
        return planDao.save(plan);
    }

    @Override
    public Plan update(String memberId, Plan plan) {
        Plan existing = planDao.findById(plan.getId())
                .filter(p -> p.getMemberId().equals(memberId))
                .orElseThrow(() -> new IllegalArgumentException("계획을 찾을 수 없습니다."));
        plan.setMemberId(existing.getMemberId());
        plan.setCreatedAt(existing.getCreatedAt());
        return planDao.save(plan);
    }

    @Override
    public void delete(String memberId, String planId) {
        Plan existing = planDao.findById(planId)
                .filter(p -> p.getMemberId().equals(memberId))
                .orElseThrow(() -> new IllegalArgumentException("계획을 찾을 수 없습니다."));
        planDao.delete(existing.getId());
    }

    @Override
    public void deleteAll(String memberId) {
        planDao.deleteByMember(memberId);
    }
}
