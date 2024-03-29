package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.PassengerListDto;
import com.RideSharingApp.domain.entities.PassengerListEntity;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.TripRepository;
import com.RideSharingApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PassengerListMapper implements Mapper<PassengerListEntity, PassengerListDto> {
    private ModelMapper modelMapper;
    private UserRepository userRepository;
    private TripRepository tripRepository;

    public PassengerListMapper(ModelMapper modelMapper, UserRepository userRepository, TripRepository tripRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    @Override
    public PassengerListDto mapTo(PassengerListEntity passengerListEntity) {
        PassengerListDto passDto = modelMapper.map(passengerListEntity, PassengerListDto.class);
        if (passengerListEntity.getPassenger() != null) {
            passDto.setPassenger(passengerListEntity.getPassenger().getLogin());
        }

        if (passengerListEntity.getTrip() != null) {
            passDto.setTrip(passengerListEntity.getTrip().getIdTrip());
        }

        return passDto;
    }

    @Override
    public PassengerListEntity mapFrom(PassengerListDto passengerListDto) {
        PassengerListEntity passEntity = modelMapper.map(passengerListDto, PassengerListEntity.class);
        UserEntity passenger = userRepository.findById(passengerListDto.getPassenger()).orElse(null);
        TripEntity trip = tripRepository.findById(passengerListDto.getTrip()).orElse(null);

        passEntity.setPassenger(passenger);
        passEntity.setTrip(trip);

        return passEntity;
    }
}