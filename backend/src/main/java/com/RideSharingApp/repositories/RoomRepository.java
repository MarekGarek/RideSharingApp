package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.RoomEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends CrudRepository<RoomEntity, Integer> {
}
