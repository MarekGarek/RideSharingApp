package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.PassengerListDto;
import com.RideSharingApp.domain.entities.PassengerListEntity;

import java.util.List;

public interface PassengerListService {
    PassengerListEntity save(PassengerListEntity passEntity);

    List<PassengerListEntity> getPassangers(int id);

    void delete(int id, String passenger);
}
