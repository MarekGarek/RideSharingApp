package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.entities.ReviewEntity;
import com.RideSharingApp.repositories.ReviewRepository;
import com.RideSharingApp.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<ReviewEntity> findWrittenReviews(String userLogin) {
        return reviewRepository.findByAuthor_Login(userLogin);
    }

    @Override
    public List<ReviewEntity> findReviewsAboutUser(String userLogin) {
        return reviewRepository.findByReviewer_Login(userLogin);
    }

    @Override
    public void delete(int id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Optional<ReviewEntity> findOne(int id) {
        return reviewRepository.findById(id);
    }

    @Override
    public ReviewEntity save(ReviewEntity reviewEntity) {
        return reviewRepository.save(reviewEntity);
    }
}
