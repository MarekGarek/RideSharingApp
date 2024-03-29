package com.RideSharingApp.services.impl;

import com.RideSharingApp.config.jwt.JwtService;
import com.RideSharingApp.domain.AuthenticationResponse;
import com.RideSharingApp.domain.Role;
import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.repositories.UserRepository;
import com.RideSharingApp.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

// upravena trieda
// https://github.com/ali-bouali/spring-boot-3-jwt-security

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public ResponseEntity<AuthenticationResponse> register(UserEntity userEntity) {
        if(userRepository.findById(userEntity.getLogin()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthenticationResponse("Používateľ s daným loginom už existuje."));
        }

        userEntity.setRole(Role.USER);
        String pwd = userEntity.getPassword();
        userEntity.setPassword(passwordEncoder.encode(pwd));

        userRepository.save(userEntity);
        return ResponseEntity.ok(response(userEntity));
    }

    @Override
    public ResponseEntity<AuthenticationResponse> authenticate(UserLoginDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getLogin(),
                            request.getPassword()
                    )
            );
            var user = userRepository.findById(request.getLogin()).orElseThrow();
            return ResponseEntity.ok(response(user));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationResponse("Nesprávne meno alebo heslo"));
        }
    }

    private AuthenticationResponse response(UserEntity userEntity) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", Collections.singletonList(userEntity.getRole()));
        var jwtToken = jwtService.generateToken(extraClaims, userEntity);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}