package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.CarDto;
import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarController {
    private CarService carService;
    private Mapper<CarEntity, CarDto> carMapper;

    public CarController(CarService carService, Mapper<CarEntity, CarDto> carMapper) {
        this.carService = carService;
        this.carMapper = carMapper;
    }

    @PostMapping(path = "/cars")
    public ResponseEntity<CarDto> createCar(@RequestParam("owner") String owner, @RequestParam("model") String model,
                                            @RequestParam("seats") byte seats, @RequestParam("stk") String stk,
                                            @RequestParam("modelYear") short modelYear, @RequestParam("trunkSpace") short trunkSpace,
                                            @RequestParam("idCar") String idCar,
                                            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException, ParseException {

        if (carService.isExists(idCar)) {return new ResponseEntity<>(HttpStatus.CONFLICT);}
        CarDto carDto = new CarDto(idCar,owner,model,null,seats,modelYear,trunkSpace,null);
        CarEntity carEntity = carMapper.mapFrom(carDto);
        CarEntity savedCarEntity = carService.save(carEntity, file, stk);
        return new ResponseEntity<>(carMapper.mapTo(savedCarEntity), HttpStatus.CREATED);
    }

    @PutMapping(path = "/cars/{unchangedIdCar}")
    public ResponseEntity<CarDto> updateCar(@RequestParam("owner") String owner, @RequestParam("model") String model,
                                            @RequestParam("seats") byte seats, @RequestParam("stk") String stk,
                                            @RequestParam("modelYear") short modelYear, @RequestParam("trunkSpace") short trunkSpace,
                                            @RequestParam("idCar") String idCar, @PathVariable("unchangedIdCar") String unchangedIdCar,
                                            @RequestParam(value = "file", required = false) MultipartFile file) throws ParseException, IOException {
        CarDto carDto = new CarDto(idCar,owner,model,null,seats,modelYear,trunkSpace,null);
        CarEntity carEntity = carMapper.mapFrom(carDto);
        CarEntity savedCarEntity = carService.update(carEntity, file, stk, unchangedIdCar);
        return new ResponseEntity<>(carMapper.mapTo(savedCarEntity), HttpStatus.CREATED);

    }

    @DeleteMapping(path = "/cars/{idCar}")
    public ResponseEntity deleteCar(@PathVariable("idCar") String idCar) throws IOException {
        if (carService.delete(idCar)) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(path = "/cars")
    public List<CarDto> userCars(@RequestParam(name = "owner") String owner) {
        List<CarEntity> carEntities = carService.findCarsOfOwner(owner);
        return carEntities.stream().map(carMapper::mapTo).collect(Collectors.toList());
    }
}
