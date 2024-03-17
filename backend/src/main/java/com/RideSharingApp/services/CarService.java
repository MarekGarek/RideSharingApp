package com.RideSharingApp.services;

import com.RideSharingApp.domain.entities.CarEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

public interface CarService {
    CarEntity save(CarEntity carEntity, MultipartFile file, String stk) throws IOException, ParseException;
    boolean isExists(String idCar);
    List<CarEntity> findCarsOfOwner(String owner);
    boolean delete(String idCar) throws IOException;
    void deleteImg(String fileName) throws IOException;
    boolean deleteCarEntity(String idCar);
    Optional<CarEntity> findById(String idCar);
    CarEntity update(CarEntity carEntity, MultipartFile file, String stk, String unchangedIdCar) throws IOException, ParseException;
}
