package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.PassengerListEntity;
import com.RideSharingApp.domain.entities.PassengerListId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PassengerListRepository extends CrudRepository<PassengerListEntity, PassengerListId> {
    @Query(value="select * from passengerslists where trip=:id", nativeQuery = true)
    List<PassengerListEntity> findByTrip_IdTrip(@Param("id") int id);

    @Modifying
    @Transactional
    @Query(value="delete from passengerslists where trip=:id", nativeQuery = true)
    void deleteByIdTrip(@Param("id") int id);
}
