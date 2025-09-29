package com.enjoytrip.plan.model.dao;

import java.util.List;
import java.util.Optional;

import com.enjoytrip.plan.model.dto.Plan;

public interface PlanDao {
    void init(String dataDir);

    void load();

    void save();

    Plan save(Plan plan);

    List<Plan> findByMember(String memberId);

    Optional<Plan> findById(String id);

    void delete(String id);

    void deleteByMember(String memberId);
}
