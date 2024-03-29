package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.entities.TripEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TripService {
    TripEntity save(TripEntity tripEntity);
    List<TripDetailsProjection> getUserHistoryTrips(String user);

    List<TripDetailsProjection> getUserCurrentTrips(String user);

    TripDetailsProjection findTrip(int idTrip);

    void delete(int id);

    Optional<TripEntity> findOne(int id);

    List<TripDetailsProjection> getTrips(String source, String destination, LocalTime time, LocalDate date);
}
