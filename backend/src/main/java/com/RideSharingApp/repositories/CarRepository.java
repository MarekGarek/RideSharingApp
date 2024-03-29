package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.CarEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<CarEntity, String> {
    List<CarEntity> findByOwner_Login(String owner);
}
