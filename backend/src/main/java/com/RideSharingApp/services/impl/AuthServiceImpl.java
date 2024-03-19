package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.exception.DuplicateLoginException;
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

    @Override
    public UserEntity save(UserEntity userEntity) {
        if (userRepository.findById(userEntity.getLogin()).isPresent()) {
            throw new DuplicateLoginException("Používateľ " + userEntity.getLogin() + " už existuje.");
        }
        return userRepository.save(userEntity);
    }
}


