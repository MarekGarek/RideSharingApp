package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.ReviewDto;
import com.RideSharingApp.domain.entities.ReviewEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReviewController {
    private ReviewService reviewService;
    private Mapper<ReviewEntity, ReviewDto> reviewMapper;

    public ReviewController(ReviewService reviewService, Mapper<ReviewEntity, ReviewDto> reviewMapper) {
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
    }

    @GetMapping(path = "/written-reviews")
    public List<ReviewDto> writtenReviews(@RequestParam(name = "loggedUser") String loggedUser) {
        List<ReviewEntity> reviewEntities = reviewService.findWrittenReviews(loggedUser);
        return reviewEntities.stream().map(reviewMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/reviews-about-me")
    public List<ReviewDto> reviewsAboutMe(@RequestParam(name = "loggedUser") String loggedUser) {
        List<ReviewEntity> reviewEntities = reviewService.findReviewsAboutUser(loggedUser);
        return reviewEntities.stream().map(reviewMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "reviews/{id}")
    public ResponseEntity<ReviewDto> getReview(@PathVariable("id") int id) {
        Optional<ReviewEntity> foundReview = reviewService.findOne(id);
        return foundReview.map(reviewEntity -> {
            ReviewDto reviewDto = reviewMapper.mapTo(reviewEntity);
            return new ResponseEntity<>(reviewDto,HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping(path = "/written-reviews/{id}")
    public ResponseEntity deleteReview(@PathVariable("id") int id) {
        reviewService.delete(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping(path = "/reviews")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        ReviewEntity reviewEntity = reviewMapper.mapFrom(reviewDto);
        ReviewEntity savedReviewEntity = reviewService.save(reviewEntity);
        return new ResponseEntity<>(reviewMapper.mapTo(savedReviewEntity),HttpStatus.CREATED);
    }

    @PutMapping(path = "/reviews")
    public ResponseEntity<ReviewDto> fullUpdateReview(@RequestBody ReviewDto reviewDto) {
        ReviewEntity reviewEntity = reviewMapper.mapFrom(reviewDto);
        ReviewEntity savedReviewEntity = reviewService.save(reviewEntity);
        return new ResponseEntity<>(reviewMapper.mapTo(savedReviewEntity),HttpStatus.OK);
    }

}
