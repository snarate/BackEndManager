package com.bharuwa.annadata.bemgr.repository;

import com.bharuwa.annadata.bemgr.domain.Region;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Region entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegionRepository extends MongoRepository<Region, String> {}
