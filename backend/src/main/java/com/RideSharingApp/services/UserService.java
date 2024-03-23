package com.RideSharingApp.services;


import com.RideSharingApp.domain.entities.UserEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserEntity update(String login, String name, String surname, short age, String aboutMe, MultipartFile file) throws Exception;
    UserEntity findUser(String user);
}
