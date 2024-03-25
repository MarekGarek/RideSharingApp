package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.repositories.TripRepository;
import com.RideSharingApp.services.TripService;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<TripDetailsProjection> getUserHistoryTrips(String user) {
        return tripRepository.getUserHistoryTrips(user);
    }
}
