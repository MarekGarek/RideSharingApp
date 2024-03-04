package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository <UserEntity, String> {}