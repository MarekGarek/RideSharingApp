package com.RideSharingApp.services;

import com.RideSharingApp.domain.entities.UserEntity;

import java.util.List;

public interface UserService {
    List<UserEntity> findAll();

    UserEntity save(UserEntity userEntity);
}
