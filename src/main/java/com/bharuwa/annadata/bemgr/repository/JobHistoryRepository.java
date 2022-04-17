package com.bharuwa.annadata.bemgr.repository;

import com.bharuwa.annadata.bemgr.domain.JobHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the JobHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobHistoryRepository extends MongoRepository<JobHistory, String> {}
