package com.RideSharingApp.services.impl;

import com.RideSharingApp.services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileServiceImpl implements FileService {

    private static final String CAR_IMAGE_DIRECTORY = "C:\\Users\\garek\\RideSharingApp\\images\\car-images\\";

    @Override
    public String saveFile(MultipartFile file, String idCar) throws IOException {
        String fileName = null;
        if (file != null && !file.isEmpty()) {
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            fileName = idCar + extension;
            Path path = Paths.get(CAR_IMAGE_DIRECTORY + fileName);
            try {
                Files.copy(file.getInputStream(), path);
            } catch (IOException e) {
                throw new IOException("File could not be saved: " + fileName, e);
            }
        }
        return fileName;
    }

    @Override
    public void deleteFile(String fileName) throws IOException {
        Path path = Paths.get(CAR_IMAGE_DIRECTORY + fileName);
        if (Files.exists(path)) {
            try {
                Files.delete(path);
            } catch (IOException e) {
                throw new IOException("File could not be deleted " + fileName, e);
            }
        } else {
            throw new IOException("File " + fileName + " not found.");
        }
    }

    @Override
    public String renameFile(String oldName, String newName) throws IOException {
        String extension = "";
        int lastIndexOfDot = oldName.lastIndexOf(".");
        if (lastIndexOfDot >= 0) {
            extension = oldName.substring(lastIndexOfDot);
        }

        newName += extension;

        Path source = Paths.get(CAR_IMAGE_DIRECTORY + oldName);
        if (Files.exists(source)) {
            Path target = Paths.get(CAR_IMAGE_DIRECTORY + newName);
            Files.move(source, target);
            return newName;
        } else {
            throw new IOException("File " + oldName + " not found.");
        }
    }

}
