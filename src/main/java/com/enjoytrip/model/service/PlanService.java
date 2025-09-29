package com.enjoytrip.model.service;

import java.util.List;
import java.util.Optional;

import com.enjoytrip.model.dto.Plan;

public interface PlanService {
    List<Plan> list(String memberId);

    Optional<Plan> find(String memberId, String planId);

    Plan create(String memberId, Plan plan);

    Plan update(String memberId, Plan plan);

    void delete(String memberId, String planId);

    void deleteAll(String memberId);
}
