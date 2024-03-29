package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.entities.TripEntity;

import java.util.List;

public interface TripService {
    TripEntity save(TripEntity tripEntity);
    List<TripDetailsProjection> getUserHistoryTrips(String user);

    List<TripDetailsProjection> getUserCurrentTrips(String user);

    TripDetailsProjection findTrip(int idTrip);

    void delete(int id);
}
