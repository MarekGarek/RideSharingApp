package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.TripEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends CrudRepository<TripEntity, Integer> {
}