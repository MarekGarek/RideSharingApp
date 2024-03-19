package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.UserDto;
import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.exception.DuplicateLoginException;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

    private AuthService authService;                            //pristup k DB (CRUD)
    private Mapper<UserEntity, UserDto> userMapper;             //mapuje DB entitu na Java object a naopak

    public AuthController(AuthService authService, Mapper<UserEntity, UserDto> userMapper) {
        this.authService = authService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        try {
            UserEntity userEntity = userMapper.mapFrom(userDto);
            UserEntity savedUserEntity = authService.save(userEntity);
            return new ResponseEntity<>(userMapper.mapTo(savedUserEntity), HttpStatus.CREATED);
        } catch (DuplicateLoginException e) {
            return new ResponseEntity<>("Login už existuje. Skús iný.",HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Vyskytla sa chyba. Skús znova.",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto) {
        if (authService.login(userLoginDto)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("sss");
    }

    @GetMapping("/islogged")
    public ResponseEntity<?> isLogged() {
        if (authService.isLogged()) {
            return ResponseEntity.ok().body("Authorized");
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }
}