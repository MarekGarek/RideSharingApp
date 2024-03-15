package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.ReviewEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<ReviewEntity, Integer> {
    List<ReviewEntity> findByAuthor_Login(String login); //JPA by malo podla nazvu vygenerovat SELECT len z názvu
    List<ReviewEntity> findByReviewer_Login(String login);
}
