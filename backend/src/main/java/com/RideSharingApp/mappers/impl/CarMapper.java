package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.CarDto;
import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CarMapper implements Mapper<CarEntity, CarDto> {
    private ModelMapper modelMapper;
    private UserRepository userRepository;

    public CarMapper(ModelMapper modelMapper, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public CarDto mapTo(CarEntity carEntity) {
        CarDto carDto = modelMapper.map(carEntity, CarDto.class);
        if (carEntity.getOwner() != null) {
            carDto.setOwner(carEntity.getOwner().getLogin());
        }
        return carDto;
    }

    @Override
    public CarEntity mapFrom(CarDto carDto) {
        CarEntity carEntity = modelMapper.map(carDto, CarEntity.class);
        UserEntity owner = userRepository.findById(carDto.getOwner()).orElse(null);
        carEntity.setOwner(owner);
        return carEntity;
    }
}