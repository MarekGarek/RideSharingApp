package com.RideSharingApp.services;

import com.RideSharingApp.controllers.AuthenticationResponse;
import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<AuthenticationResponse> register(UserEntity userEntity);
    ResponseEntity<AuthenticationResponse> authenticate(UserLoginDto request);
}
