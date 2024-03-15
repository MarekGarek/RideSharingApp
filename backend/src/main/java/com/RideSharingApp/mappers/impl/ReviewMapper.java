package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.ReviewDto;
import com.RideSharingApp.domain.entities.ReviewEntity;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper implements Mapper<ReviewEntity, ReviewDto> {
    private ModelMapper modelMapper;
    private UserRepository userRepository;

    public ReviewMapper(ModelMapper modelMapper, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public ReviewDto mapTo(ReviewEntity reviewEntity) {
        ReviewDto reviewDto = modelMapper.map(reviewEntity, ReviewDto.class);
        if (reviewEntity.getAuthor() != null) {
            reviewDto.setAuthor(reviewEntity.getAuthor().getLogin());
        }

        if (reviewEntity.getReviewer() != null) {
            reviewDto.setReviewer(reviewEntity.getReviewer().getLogin());
        }

        return reviewDto;
    }

    @Override
    public ReviewEntity mapFrom(ReviewDto reviewDto) {
        ReviewEntity reviewEntity = modelMapper.map(reviewDto, ReviewEntity.class);
        UserEntity author = userRepository.findById(reviewDto.getAuthor()).orElse(null);
        UserEntity reviewer = userRepository.findById(reviewDto.getReviewer()).orElse(null);

        reviewEntity.setAuthor(author);
        reviewEntity.setReviewer(reviewer);

        return reviewEntity;
    }
}
