package com.example.supermarketbackend.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUpload {

    public  String uploadImage(String path, MultipartFile file) throws IOException {

        String originslFilename = file.getOriginalFilename();
        String randomImagename = UUID.randomUUID().toString();

        String randomImageNameWithExtention =   randomImagename.concat(originslFilename.substring(originslFilename.lastIndexOf(".")));

        String fullpath =path+ File.separator+randomImageNameWithExtention;
        File folderFile = new File(path);

        if (!folderFile.exists()) {
            folderFile.mkdirs();

        }

        try {
            Files.copy(file.getInputStream(), Paths.get(fullpath));
            return randomImageNameWithExtention;
        } catch (IIOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
