package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.repositories.CarRepository;
import com.RideSharingApp.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private CarRepository carRepository;

    @Autowired
    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }


    @Override
    public CarEntity save(CarEntity carEntity) {
        return carRepository.save(carEntity);
    }

    @Override
    public boolean isExists(String idCar) {
        return carRepository.existsById(idCar);
    }

    @Override
    public List<CarEntity> findCarsOfOwner(String owner) {
        return carRepository.findByOwner_Login(owner);
    }

}
