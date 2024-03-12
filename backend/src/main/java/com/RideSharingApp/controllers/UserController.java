package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.UserDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.exception.DuplicateLoginException;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    private UserService userService;                            //pristup k DB (CRUD)
    private Mapper<UserEntity, UserDto> userMapper;             //mapuje DB entitu na Java object a naopak

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping(path = "/users")
    public List<UserDto> listUsers() {
        List<UserEntity> userEntities = userService.findAll();
        return userEntities.stream().map(userMapper::mapTo).collect(Collectors.toList());
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        try {
            UserEntity userEntity = userMapper.mapFrom(userDto);
            UserEntity savedUserEntity = userService.save(userEntity);
            return new ResponseEntity<>(userMapper.mapTo(savedUserEntity), HttpStatus.CREATED);
        } catch (DuplicateLoginException e) {
            return new ResponseEntity<>("Login už existuje. Skús iný.",HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Vyskytla sa chyba. Skús znova.",HttpStatus.BAD_REQUEST);
        }

    }
}
