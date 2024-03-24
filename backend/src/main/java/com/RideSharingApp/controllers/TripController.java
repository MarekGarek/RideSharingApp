package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.TripDto;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TripController {
    private TripService tripService;
    private Mapper<TripEntity, TripDto> tripMapper;

    public TripController(TripService tripService, Mapper<TripEntity, TripDto> tripMapper) {
        this.tripService = tripService;
        this.tripMapper = tripMapper;
    }

    @PostMapping(path = "/trip")
    public ResponseEntity<TripDto> createTrip(@RequestBody TripDto tripDto) {
        TripEntity tripEntity = tripMapper.mapFrom(tripDto);
        TripEntity savedTripEntity = tripService.save(tripEntity);
        return new ResponseEntity<>(tripMapper.mapTo(savedTripEntity),HttpStatus.CREATED);
    }
}
