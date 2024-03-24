package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.repositories.TripRepository;
import com.RideSharingApp.services.TripService;
import org.springframework.stereotype.Service;

@Service
public class TripServiceImpl implements TripService {
    private TripRepository tripRepository;

    public TripServiceImpl(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @Override
    public TripEntity save(TripEntity tripEntity) {
        return tripRepository.save(tripEntity);
    }
}
