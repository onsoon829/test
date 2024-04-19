package com.blogfriday.user.dto;

import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.common.exception.WrongEmailPasswordException;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogFridayUserDTO {
	private String user_id;
    private String user_idemail; // 아이디로 사용할 이메일
    private String user_password; // password
    private String user_name; // 실명 저장
    private String user_phonenumber; // 전화번호
    private int user_state = 1; // state 값
    private String user_nickname; // 사이트 내 nickname
    private String user_profile; // 프로필 이미지 파일 경로
    private String user_code; // 사용자 코드
    
    // 프로필 사진을 받기 위한 필드
    private MultipartFile profilePicture;

    // ...

    public boolean matchPassword(String userPass) {
        return this.user_password.equals(userPass);
    }

    public void changePassword(String oldPassword, String newPassword) {
        if (!this.user_password.equals(oldPassword))
            throw new WrongEmailPasswordException("비밀번호 불일치");
        this.user_password = newPassword;
    }
}




