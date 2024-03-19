package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.UserLoginDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.exception.DuplicateLoginException;
import com.RideSharingApp.repositories.UserRepository;
import com.RideSharingApp.services.AuthService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
//    private BCryptPasswordEncoder pwdEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity save(UserEntity userEntity) {
        if (userRepository.findById(userEntity.getLogin()).isPresent()) {
            throw new DuplicateLoginException("Používateľ " + userEntity.getLogin() + " už existuje.");
        }

        //String pwd = userEntity.getPassword();
        //userEntity.setPassword(this.hashPassword(pwd));
        return userRepository.save(userEntity);
    }

    @Override
    public String hashPassword(String password) {
        //return pwdEncoder.encode(password);
        return null;
    }

    @Override
    public boolean matchPassword(String password, String encodedPassword) {
        //return pwdEncoder.matches(password, encodedPassword);
        return false;
    }

    @Override
    public boolean login(UserLoginDto userLoginDto) {
        String login = userLoginDto.getLogin();
        String pwd = userLoginDto.getPassword();

        if (login.isEmpty() || pwd.isEmpty()) {
            return false;
        }

        Optional<UserEntity> userEntity = userRepository.findById(login);
        if (userEntity.isEmpty()) {
            return false;
        }

        return matchPassword(pwd, userEntity.get().getPassword());
    }

    @Override
    public boolean isLogged() {
        return false;
    }
}