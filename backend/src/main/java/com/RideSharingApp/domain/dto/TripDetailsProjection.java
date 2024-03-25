package com.RideSharingApp.domain.dto;

import java.time.LocalTime;
import java.util.Date;

public interface TripDetailsProjection {
    Integer getIdTrip();
    String getDriver();
    String getCar();
    Date getDate();
    String getSrcTown();
    String getDstTown();
    LocalTime getSrcTime();
    LocalTime getDstTime();
    Byte getSeats();
    Short getTrunkSpace();
    Float getPrice();
    String getInfo();
    String getModel();
    Byte getReservedSeats();
    Short getReservedTrunk();
}