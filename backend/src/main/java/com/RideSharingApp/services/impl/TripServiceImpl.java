package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.repositories.PassengerListRepository;
import com.RideSharingApp.repositories.TripRepository;
import com.RideSharingApp.services.TripService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TripServiceImpl implements TripService {
    private TripRepository tripRepository;
    private PassengerListRepository passRepository;

    public TripServiceImpl(TripRepository tripRepository, PassengerListRepository passRepository) {
        this.tripRepository = tripRepository;
        this.passRepository = passRepository;
    }

    @Override
    public TripEntity save(TripEntity tripEntity) {
        return tripRepository.save(tripEntity);
    }

    @Override
    public List<TripDetailsProjection> getUserHistoryTrips(String user) {
        return tripRepository.getUserHistoryTrips(user);
    }

    @Override
    public List<TripDetailsProjection> getUserCurrentTrips(String user) {
        return tripRepository.getUserCurrentTrips(user);
    }

    @Override
    public TripDetailsProjection findTrip(int idTrip) {
        return tripRepository.getTrip(idTrip);
    }

    @Override
    public void delete(int id) {
        passRepository.deleteByIdTrip(id);
        tripRepository.deleteById(id);
    }

    @Override
    public Optional<TripEntity> findOne(int id) {
        return tripRepository.findById(id);
    }

    @Override
    public List<TripDetailsProjection> getTrips(String source, String destination, LocalTime time, LocalDate date) {
        return tripRepository.getTrips(source,destination,time,date);
    }
}
