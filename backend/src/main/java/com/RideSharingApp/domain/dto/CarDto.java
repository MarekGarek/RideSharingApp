package com.RideSharingApp.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarDto {
    private String idCar;
    private String owner;
    private String model;
    private Date stk;
    private byte seats;
    private short modelYear;
    private short trunkSpace;
    private String img;
}
