package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.RoomEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends CrudRepository<RoomEntity, Integer> {
    @Query(value = "select * from rooms where trip=:trip", nativeQuery = true)
    RoomEntity findByTrip(@Param("trip") int trip);

    @Query(value = "SELECT DISTINCT m.room " +
            "FROM messages m " +
            "JOIN rooms r ON m.room = r.id_room " +
            "WHERE r.trip IS NULL " +
            "AND m.user IN (:login, :user) " +
            "AND EXISTS ( " +
            "    SELECT 1 " +
            "    FROM messages m2 " +
            "    WHERE m2.room = m.room " +
            "    AND m2.user IN (:login, :user) " +
            "    AND m2.user != m.user " +
            ") " +
            "GROUP BY m.room, r.trip " +
            "HAVING COUNT(DISTINCT m.user) = 2", nativeQuery = true)
    Integer findRoom(@Param("login") String login, @Param("user") String user);
}
