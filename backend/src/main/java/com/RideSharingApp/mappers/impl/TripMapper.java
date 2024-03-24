package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.TripDto;
import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.CarRepository;
import com.RideSharingApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TripMapper implements Mapper<TripEntity, TripDto> {

    private ModelMapper modelMapper;
    private UserRepository userRepository;
    private CarRepository carRepository;

    public TripMapper(ModelMapper modelMapper, UserRepository userRepository, CarRepository carRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    @Override
    public TripDto mapTo(TripEntity tripEntity) {
        TripDto tripDto = modelMapper.map(tripEntity, TripDto.class);
        if (tripEntity.getDriver() != null) {
            tripDto.setDriver(tripEntity.getDriver().getLogin());
        }

        if (tripEntity.getCar() != null) {
            tripDto.setCar(tripEntity.getCar().getIdCar());
        }

        return tripDto;
    }

    @Override
    public TripEntity mapFrom(TripDto tripDto) {
        TripEntity tripEntity = modelMapper.map(tripDto, TripEntity.class);
        UserEntity driver = userRepository.findById(tripDto.getDriver()).orElse(null);
        CarEntity car = carRepository.findById(tripDto.getCar()).orElse(null);

        tripEntity.setDriver(driver);
        tripEntity.setCar(car);

        return tripEntity;
    }
}