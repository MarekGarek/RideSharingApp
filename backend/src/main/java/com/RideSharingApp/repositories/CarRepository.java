package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.CarEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CarRepository extends CrudRepository<CarEntity, String> {
    List<CarEntity> findByOwner_Login(String owner);
}
