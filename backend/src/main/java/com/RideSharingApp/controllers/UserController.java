package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.CarDto;
import com.RideSharingApp.domain.dto.PasswordChangeDto;
import com.RideSharingApp.domain.dto.UserDto;
import com.RideSharingApp.domain.dto.UserProfileUpdateDto;
import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    private UserService userService;
    private Mapper<UserEntity, UserDto> userMapper;

    public UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PutMapping(path = "/info/{login}")
    public ResponseEntity<UserDto> updateProfile(@PathVariable("login") String login,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("surname") String surname,
                                                 @RequestParam("age") short age,
                                                 @RequestParam("aboutMe") String aboutMe,
                                                 @RequestPart(value = "file", required = false) MultipartFile file)
            throws Exception {
        UserEntity savedUserEntity = userService.update(login, name, surname, age, aboutMe, file);
        return new ResponseEntity<>(userMapper.mapTo(savedUserEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/info")
    public UserDto userInfo(@RequestParam(name = "user") String user) {
        UserEntity userEntity = userService.findUser(user);
        return userMapper.mapTo(userEntity);
    }

    @PutMapping(path = "/info")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeDto passwordDto) {
        return userService.changePassword(passwordDto);
    }
}
