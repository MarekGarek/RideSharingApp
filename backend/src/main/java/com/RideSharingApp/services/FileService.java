package com.RideSharingApp.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    public String saveFile(MultipartFile file, String idCar) throws IOException;
    public void deleteFile(String fileName) throws IOException;
    public String renameFile(String oldName, String newName) throws IOException;
}
