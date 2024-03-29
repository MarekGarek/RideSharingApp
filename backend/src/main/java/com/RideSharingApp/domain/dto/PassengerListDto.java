package com.RideSharingApp.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PassengerListDto {
    private String passenger;
    private int trip;
    private byte seats;
    private short trunkSpace;
    private String payment;
}