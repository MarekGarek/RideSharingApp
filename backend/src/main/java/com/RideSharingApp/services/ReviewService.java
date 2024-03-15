package com.RideSharingApp.services;

import com.RideSharingApp.domain.entities.ReviewEntity;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<ReviewEntity> findWrittenReviews(String userLogin);
    List<ReviewEntity> findReviewsAboutUser(String userLogin);

    void delete(int id);

    Optional<ReviewEntity> findOne(int id);

    ReviewEntity save(ReviewEntity reviewEntity);
}
