package com.RideSharingApp.services;

import com.RideSharingApp.controllers.AuthenticationResponse;
import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;

public interface AuthService {
    AuthenticationResponse register(UserEntity userEntity);
    AuthenticationResponse authenticate(UserLoginDto request);
}
