package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.PassengerListEntity;
import com.RideSharingApp.domain.entities.PassengerListId;
import com.RideSharingApp.repositories.PassengerListRepository;
import com.RideSharingApp.services.PassengerListService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerListServiceImpl implements PassengerListService {

    private PassengerListRepository repository;

    public PassengerListServiceImpl(PassengerListRepository repository) {
        this.repository = repository;
    }

    @Override
    public PassengerListEntity save(PassengerListEntity passEntity) {
        return repository.save(passEntity);
    }

    @Override
    public List<PassengerListEntity> getPassangers(int id) {
        return repository.findByTrip_IdTrip(id);
    }

    @Override
    public void delete(int id, String passenger) {
        PassengerListId p = new PassengerListId(passenger,id);
        repository.deleteById(p);
    }
}