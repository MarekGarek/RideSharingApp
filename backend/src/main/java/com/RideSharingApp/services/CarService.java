package com.RideSharingApp.services;

import com.RideSharingApp.domain.entities.CarEntity;

import java.util.List;

public interface CarService {
    CarEntity save(CarEntity carEntity);

    boolean isExists(String idCar);
    List<CarEntity> findCarsOfOwner(String owner);
}
