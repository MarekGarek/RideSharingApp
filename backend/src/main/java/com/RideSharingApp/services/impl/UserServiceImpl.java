package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.repositories.UserRepository;
import com.RideSharingApp.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //userRepository.findAll() vráti Iterable<> -> konvert na List<>
    @Override
    public List<UserEntity> findAll() {
        return StreamSupport.stream(userRepository
                .findAll()
                .spliterator(),
                false)
                .collect(Collectors.toList());
    }
}