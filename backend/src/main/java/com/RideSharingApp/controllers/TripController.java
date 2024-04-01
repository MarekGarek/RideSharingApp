package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.TripDetailsProjection;
import com.RideSharingApp.domain.dto.TripDto;
import com.RideSharingApp.domain.entities.MessageEntity;
import com.RideSharingApp.domain.entities.RoomEntity;
import com.RideSharingApp.domain.entities.TripEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.ChatService;
import com.RideSharingApp.services.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TripController {
    private TripService tripService;
    private Mapper<TripEntity, TripDto> tripMapper;
    private ChatService chatService;

    public TripController(TripService tripService, Mapper<TripEntity, TripDto> tripMapper, ChatService chatService) {
        this.tripService = tripService;
        this.tripMapper = tripMapper;
        this.chatService = chatService;
    }

    @PostMapping(path = "/trip")
    public ResponseEntity<TripDto> createTrip(@RequestBody TripDto tripDto) {
        TripEntity tripEntity = tripMapper.mapFrom(tripDto);
        TripEntity savedTripEntity = tripService.save(tripEntity);
        RoomEntity savedRoomEntity = chatService.saveRoom(savedTripEntity);
        MessageEntity savedMessageEntity = chatService.saveMessage(savedRoomEntity,tripEntity.getDriver());
        return new ResponseEntity<>(tripMapper.mapTo(savedTripEntity),HttpStatus.CREATED);
    }

    @GetMapping(path = "/history-trips")
    public List<TripDetailsProjection> historyTrips(@RequestParam(name = "user") String user) {
        return tripService.getUserHistoryTrips(user);
    }

    @GetMapping(path = "/current-trips")
    public List<TripDetailsProjection> currentTrips(@RequestParam(name = "user") String user) {
        return tripService.getUserCurrentTrips(user);
    }

    @GetMapping(path = "/trip")
    public TripDetailsProjection getTrip(@RequestParam(name = "idTrip") int idTrip) {
        return tripService.findTrip(idTrip);
    }

    @DeleteMapping(path = "/trip/{id}")
    public ResponseEntity deleteTrip(@PathVariable("id") int id) {
        chatService.deleteTripChat(id);
        tripService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/trip-dto/{id}")
    public ResponseEntity<TripDto> getTripDto(@PathVariable("id") int id) {
        Optional<TripEntity> foundTrip = tripService.findOne(id);
        return foundTrip.map(tripEntity -> {
            TripDto tripDto = tripMapper.mapTo(tripEntity);
            return new ResponseEntity<>(tripDto,HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/trip/{id}")
    public ResponseEntity<TripDto> fullUpdateTrip(@RequestBody TripDto tripDto,@PathVariable("id") int id) {
        tripDto.setIdTrip(id);
        TripEntity tripEntity = tripMapper.mapFrom(tripDto);
        TripEntity savedTripEntity = tripService.save(tripEntity);
        return new ResponseEntity<>(tripMapper.mapTo(savedTripEntity),HttpStatus.OK);
    }

    @GetMapping(path = "/trips")
    public List<TripDetailsProjection> trips(@RequestParam(name = "source") String source,
                                             @RequestParam(name = "destination") String destination,
                                             @RequestParam(name = "time", required = false) LocalTime time,
                                             @RequestParam(name = "date", required = false) LocalDate date) {
        if (time == null) {
            time = LocalTime.now();
        }
        if (date == null) {
            date = LocalDate.now();
        }
        return tripService.getTrips(source,destination,time, date);
    }
}
