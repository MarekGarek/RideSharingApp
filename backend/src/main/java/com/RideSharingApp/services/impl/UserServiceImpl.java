package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.PasswordChangeDto;
import com.RideSharingApp.domain.entities.UserEntity;
import com.RideSharingApp.repositories.UserRepository;
import com.RideSharingApp.services.FileService;
import com.RideSharingApp.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private FileService fileService;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, FileService fileService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity update(String login, String name, String surname, short age, String aboutMe, MultipartFile file) throws Exception {
        Optional<UserEntity> userOptional = userRepository.findById(login);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setName(name);
            user.setSurname(surname);
            user.setAge(age);
            user.setAboutMe(aboutMe);

            if(file != null && !file.isEmpty()) {
                if (user.getImg() != null) {
                    this.deleteImg(user.getImg());
                }
                String imgPath = fileService.saveFile(file, user.getLogin(),"USER");
                user.setImg(imgPath);
            }

            return userRepository.save(user);
        } else {
            throw new Exception();
        }
    }

    @Override
    public UserEntity findUser(String user) {
        Optional<UserEntity> userEntity = userRepository.findById(user);
        return userEntity.orElse(null);
    }

    @Override
    public ResponseEntity<String> changePassword(PasswordChangeDto passwordDto) {
        Optional<UserEntity> userEntity = userRepository.findById(passwordDto.getLogin());
        if (userEntity.isPresent()) {
            if (passwordEncoder.matches(passwordDto.getOldPwd(), userEntity.get().getPassword())) {
                userEntity.get().setPassword(passwordEncoder.encode(passwordDto.getNewPwd()));
                userRepository.save(userEntity.get());
                return ResponseEntity.ok("Password changed successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Staré heslo je nesprávne.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenašiel sa používateľ.");
        }
    }


    public void deleteImg(String fileName) throws IOException {
        if (fileName != null && !fileName.isEmpty()) {
            fileService.deleteFile(fileName,"USER");
        }
    }
}