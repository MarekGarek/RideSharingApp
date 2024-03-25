package com.RideSharingApp.domain.dto;

import java.time.LocalTime;
import java.util.Date;

public interface TripDetailsProjection {
    int getIdTrip();
    String getDriver();
    String getCar();
    Date getDate();
    String getSrcTown();
    String getDstTown();
    LocalTime getSrcTime();
    LocalTime getDstTime();
    byte getSeats();
    short getTrunkSpace();
    float getPrice();
    String getInfo();
    String getModel();
    byte getReservedSeats();
    short getReservedTrunk();
}