//// 사용자 관리와 관련된 기능 
 package com.blogfriday.user.service;

import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;

import jnr.ffi.Struct.int16_t;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    SignResponse getByUserIdEmail(String userIdEmail);

    SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);

    BlogFridayUserDTO viewUserProcess(String userIdEmail);

    void deleteUserProcess(String userIdEmail);

    SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);
    
    public String generateRandomString(int length);
    
    public void updateUserStateProcess(int user_id);
    
    public String saveProfilePicture(MultipartFile file) throws IOException;
    
    // 프로필 사진에 사용할 난수 발생
    public String generateProfilePictureRandomString(int length);
    
}
