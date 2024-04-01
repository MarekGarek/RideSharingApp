package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.PassengerListDto;
import com.RideSharingApp.domain.entities.PassengerListEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.ChatService;
import com.RideSharingApp.services.PassengerListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PassengerListController {
    private PassengerListService passService;
    private Mapper<PassengerListEntity, PassengerListDto> passMapper;
    private ChatService chatService;

    public PassengerListController(PassengerListService passService, Mapper<PassengerListEntity, PassengerListDto> passMapper, ChatService chatService) {
        this.passService = passService;
        this.passMapper = passMapper;
        this.chatService = chatService;
    }

    @PostMapping(path = "/passenger-list")
    public ResponseEntity<PassengerListDto> createList(@RequestBody PassengerListDto passDto) {
        PassengerListEntity passEntity = passMapper.mapFrom(passDto);
        PassengerListEntity savedPassEntity = passService.save(passEntity);
        chatService.addUserToRoom(savedPassEntity);
        return new ResponseEntity<>(passMapper.mapTo(savedPassEntity), HttpStatus.CREATED);
    }

    @GetMapping(path = "/passengers")
    public List<PassengerListDto> passengers(@RequestParam(name = "id") int id) {
        List<PassengerListEntity> pass = passService.getPassangers(id);
        return pass.stream().map(passMapper::mapTo).collect(Collectors.toList());
    }

    @DeleteMapping(path = "/passengers")
    public ResponseEntity deletePassanger(@RequestParam(name = "id") int id,@RequestParam(name = "passenger") String passenger) {
        chatService.logOutPassanger(id, passenger);
        passService.delete(id, passenger);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}