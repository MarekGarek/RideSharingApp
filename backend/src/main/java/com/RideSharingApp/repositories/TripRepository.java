package com.RideSharingApp.repositories;


import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.entities.TripEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TripRepository extends CrudRepository<TripEntity, Integer> {
    @Query(value = "SELECT t.id_trip as idTrip, t.driver, t.car, t.date, t.src_town as srcTown, t.dst_town as dstTown, t.src_time as srcTime, " +
            "t.dst_time as dstTime, t.seats, t.trunk_space as trunkSpace, t.price, t.info, c.model, " +
            "COALESCE(pl.total_seats, 0) AS reservedSeats, COALESCE(pl.total_trunk, 0) AS reservedTrunk " +
            "FROM trips t JOIN cars c ON t.car = c.id_car " +
            "LEFT JOIN (SELECT trip, SUM(seats) AS total_seats, SUM(trunk_space) AS total_trunk FROM passengerslists GROUP BY trip) pl ON t.id_trip = pl.trip " +
            "WHERE (t.driver = :user OR t.id_trip IN ( " +
            "SELECT trip FROM passengerslists WHERE passenger = :user)) AND t.date < NOW()"+
            "ORDER BY t.date DESC", nativeQuery = true)
    List<TripDetailsProjection> getUserHistoryTrips(@Param("user") String user);

    @Query(value = "SELECT t.id_trip as idTrip, t.driver, t.car, t.date, t.src_town as srcTown, t.dst_town as dstTown, t.src_time as srcTime, " +
            "t.dst_time as dstTime, t.seats, t.trunk_space as trunkSpace, t.price, t.info, c.model, " +
            "COALESCE(pl.total_seats, 0) AS reservedSeats, COALESCE(pl.total_trunk, 0) AS reservedTrunk " +
            "FROM trips t JOIN cars c ON t.car = c.id_car " +
            "LEFT JOIN (SELECT trip, SUM(seats) AS total_seats, SUM(trunk_space) AS total_trunk FROM passengerslists GROUP BY trip) pl ON t.id_trip = pl.trip " +
            "WHERE (t.driver = :user OR t.id_trip IN ( " +
            "SELECT trip FROM passengerslists WHERE passenger = :user)) AND t.date > NOW()"+
            "ORDER BY t.date DESC", nativeQuery = true)
    List<TripDetailsProjection> getUserCurrentTrips(@Param("user") String user);

    @Query(value = "SELECT t.id_trip as idTrip, t.driver, t.car, t.date, t.src_town as srcTown, t.dst_town as dstTown, t.src_time as srcTime, " +
            "t.dst_time as dstTime, t.seats, t.trunk_space as trunkSpace, t.price, t.info, c.model, " +
            "COALESCE(pl.total_seats, 0) AS reservedSeats, COALESCE(pl.total_trunk, 0) AS reservedTrunk " +
            "FROM trips t JOIN cars c ON t.car = c.id_car " +
            "LEFT JOIN (SELECT trip, SUM(seats) AS total_seats, SUM(trunk_space) AS total_trunk FROM passengerslists GROUP BY trip) pl ON t.id_trip = pl.trip " +
            "WHERE t.id_trip = :id", nativeQuery = true)
    TripDetailsProjection getTrip(@Param("id") int id);
}