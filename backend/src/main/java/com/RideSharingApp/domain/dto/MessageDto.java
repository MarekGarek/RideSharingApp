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
public class MessageDto {
    private int idMessage;
    private String user;
    private int room;
    private String message;
    private Date date;
}
