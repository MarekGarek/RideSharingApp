package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;

public interface AuthService {
    public UserEntity save(UserEntity userEntity);
    public String hashPassword(String password);
    public boolean matchPassword(String password, String encodedPassword);
    public boolean login(UserLoginDto userLoginDto);
    public boolean isLogged();
}
