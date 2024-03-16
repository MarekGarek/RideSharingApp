package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.CarDto;
import com.RideSharingApp.domain.dto.ReviewDto;
import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.domain.entities.ReviewEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarController {
    private CarService carService;
    private Mapper<CarEntity, CarDto> carMapper;

    private static final String CAR_IMAGE_DIRECTORY = "C:\\Users\\garek\\RideSharingApp\\backend\\src\\main\\resources\\static\\car-images\\";

    public CarController(CarService carService, Mapper<CarEntity, CarDto> carMapper) {
        this.carService = carService;
        this.carMapper = carMapper;
    }

    @PostMapping(path = "/cars")
    public ResponseEntity<CarDto> createCar(@RequestParam("owner") String owner, @RequestParam("model") String model,
                                            @RequestParam("seats") byte seats, @RequestParam("stk") String stkString,
                                            @RequestParam("modelYear") short modelYear, @RequestParam("trunkSpace") short trunkSpace,
                                            @RequestParam("idCar") String idCar,
                                            @RequestParam(value = "file", required = false) MultipartFile file) throws ParseException {
        if (carService.isExists(idCar)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date stk = formatter.parse(stkString);
        CarDto carDto = new CarDto(idCar,owner,model,stk,seats,modelYear,trunkSpace,null);
        try {
            String imgPath = null;
            if (file != null && !file.isEmpty()) {
                String originalFileName = file.getOriginalFilename();
                String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
                String fileName = carDto.getIdCar() + extension;
                Path path = Paths.get(CAR_IMAGE_DIRECTORY + fileName);
                Files.copy(file.getInputStream(), path);
                imgPath = carDto.getIdCar() + extension;
            }

            CarEntity carEntity = carMapper.mapFrom(carDto);
            carEntity.setImg(imgPath);

            CarEntity savedCarEntity = carService.save(carEntity);
            return new ResponseEntity<>(carMapper.mapTo(savedCarEntity), HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/cars")
    public List<CarDto> userCars(@RequestParam(name = "owner") String owner) {
        List<CarEntity> carEntities = carService.findCarsOfOwner(owner);
        return carEntities.stream().map(carMapper::mapTo).collect(Collectors.toList());
    }
}
