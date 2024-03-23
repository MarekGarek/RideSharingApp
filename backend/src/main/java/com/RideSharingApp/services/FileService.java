package com.RideSharingApp.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    public String saveFile(MultipartFile file, String idCar, String directory) throws IOException;
    public void deleteFile(String fileName, String directory) throws IOException;
    public String renameFile(String oldName, String newName, String directory) throws IOException;
}
