package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.UserDto;
import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;
    private Mapper<UserEntity, UserDto> userMapper;

    public AuthController(AuthService authService, Mapper<UserEntity, UserDto> userMapper) {
        this.authService = authService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDto userDto) {
        UserEntity userEntity = userMapper.mapFrom(userDto);
        return ResponseEntity.ok(authService.register(userEntity));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody UserLoginDto request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}