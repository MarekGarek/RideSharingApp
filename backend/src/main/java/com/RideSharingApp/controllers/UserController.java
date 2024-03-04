package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.UserDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private UserService userService;                            //pristup k DB (CRUD)
    private Mapper<UserEntity, UserDto> userMapper;             //mapuje DB entitu na Java object a naopak

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping(path = "/student")
    public List<UserDto> listUsers() {
        List<UserEntity> userEntities = userService.findAll();
        return userEntities.stream().map(userMapper::mapTo).collect(Collectors.toList());
    }
}
