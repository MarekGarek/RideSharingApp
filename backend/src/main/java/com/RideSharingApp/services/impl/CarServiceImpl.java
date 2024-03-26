package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.CarEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.repositories.CarRepository;
import com.RideSharingApp.services.CarService;
import com.RideSharingApp.services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CarServiceImpl implements CarService {
    private CarRepository carRepository;
    private FileService fileService;

    public CarServiceImpl(CarRepository carRepository, FileService fileService) {
        this.carRepository = carRepository;
        this.fileService = fileService;
    }


    @Override
    public CarEntity save(CarEntity carEntity, MultipartFile file, String stk) throws IOException, ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date stkDate = formatter.parse(stk);
        carEntity.setStk(stkDate);

        if(file != null && !file.isEmpty()) {
            String imgPath = fileService.saveFile(file, carEntity.getIdCar(),"CAR");
            carEntity.setImg(imgPath);
        }

        return carRepository.save(carEntity);
    }

    @Override
    public boolean isExists(String idCar) {
        return carRepository.existsById(idCar);
    }

    @Override
    public List<CarEntity> findCarsOfOwner(String owner) {
        return carRepository.findByOwner_Login(owner);
    }

    @Override
    public boolean delete(String idCar) throws IOException {
        Optional<CarEntity> carEntityOptional = carRepository.findById(idCar);
        if (!carEntityOptional.isPresent()) {
            return false;
        }

        CarEntity carEntity = carEntityOptional.get();
        if (carEntity.getImg() != null && !carEntity.getImg().isEmpty()) {
            this.deleteImg(carEntity.getImg());
        }

        this.deleteCarEntity(idCar);
        return true;
    }

    @Override
    public void deleteImg(String fileName) throws IOException {
        if (fileName != null && !fileName.isEmpty()) {
            fileService.deleteFile(fileName,"CAR");
        }
    }

    @Override
    public boolean deleteCarEntity(String idCar) {
        Optional<CarEntity> carEntityOptional = carRepository.findById(idCar);
        if (!carEntityOptional.isPresent()) {
            return false;
        }
        carRepository.deleteById(idCar);
        return true;
    }

    @Override
    public Optional<CarEntity> findById(String idCar) {
        return carRepository.findById(idCar);
    }

    @Override
    public CarEntity update(CarEntity carEntity, MultipartFile file, String stk, String unchangedIdCar) throws IOException, ParseException {
        Optional<CarEntity> dbCar = this.findById(unchangedIdCar);
        if (!dbCar.isPresent()) {
            throw new IllegalArgumentException("Car with ID " + unchangedIdCar + " not found.");
        }

        CarEntity car = dbCar.get();
        car.setStk(carEntity.getStk());
        car.setModel(carEntity.getModel());
        car.setModelYear(carEntity.getModelYear());
        car.setSeats(carEntity.getSeats());
        car.setTrunkSpace(carEntity.getTrunkSpace());
        if (file != null && !file.isEmpty()) {
            this.deleteImg(car.getImg());
        }

        return save(car, file, stk);
    }
}