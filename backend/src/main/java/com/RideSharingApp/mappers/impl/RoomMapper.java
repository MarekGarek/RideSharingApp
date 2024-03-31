package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.RoomDto;
import com.RideSharingApp.domain.entities.RoomEntity;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.TripRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper implements Mapper<RoomEntity, RoomDto> {
    private ModelMapper modelMapper;
    private TripRepository tripRepository;

    public RoomMapper(ModelMapper modelMapper, TripRepository tripRepository) {
        this.modelMapper = modelMapper;
        this.tripRepository = tripRepository;
    }

    @Override
    public RoomDto mapTo(RoomEntity roomEntity) {
        RoomDto roomDto = modelMapper.map(roomEntity, RoomDto.class);
        if (roomEntity.getTrip() != null) {
            roomDto.setTrip(roomEntity.getTrip().getIdTrip());
        }
        return roomDto;
    }

    @Override
    public RoomEntity mapFrom(RoomDto roomDto) {
        RoomEntity roomEntity = modelMapper.map(roomDto, RoomEntity.class);
        TripEntity trip = tripRepository.findById(roomDto.getTrip()).orElse(null);
        roomEntity.setTrip(trip);
        return roomEntity;
    }
}
