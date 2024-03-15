package com.RideSharingApp.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDto {
    private int idReview;
    private String author;
    private String reviewer;
    private String text;
    private String date;
    private short stars;
    private String title;
    private boolean recommendation;
}
