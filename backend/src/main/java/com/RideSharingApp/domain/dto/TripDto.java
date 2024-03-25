package com.RideSharingApp.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TripDto {
    private int idTrip;
    private String driver;
    private String car;
    private Date date;
    private String srcTown;
    private String dstTown;
    private LocalTime srcTime;
    private LocalTime dstTime;
    private byte seats;
    private short trunkSpace;
    private float price;
    private String info;
}